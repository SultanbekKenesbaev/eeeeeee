import { createHash, randomBytes, randomUUID, scrypt, timingSafeEqual } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import catalog from './catalog.js';

const port = Number(process.env.PORT ?? 4273);
const host = process.env.HOST ?? '127.0.0.1';
const publicUrl = new URL(process.env.PUBLIC_ORIGIN ?? `http://127.0.0.1:${port}`);
const secure = publicUrl.protocol === 'https:';
if (!Number.isInteger(port) || port < 1 || port > 65535 ||
    (!secure && (publicUrl.protocol !== 'http:' || !['127.0.0.1', 'localhost', '[::1]'].includes(publicUrl.hostname))) ||
    publicUrl.pathname !== '/' || publicUrl.search || publicUrl.hash || publicUrl.username || publicUrl.password) {
  throw new Error('Set PORT to a valid port and PUBLIC_ORIGIN to an HTTPS origin or a local HTTP origin.');
}
const allowedOrigins = new Set([publicUrl.origin]);
if (!process.env.PUBLIC_ORIGIN) {
  allowedOrigins.add(`http://localhost:${port}`);
  allowedOrigins.add(`http://[::1]:${port}`);
}

const databasePath = process.env.TOURSIM_DB ?? fileURLToPath(new URL('./.data/toursim.sqlite', import.meta.url));
process.umask(0o077);
if (databasePath !== ':memory:') mkdirSync(dirname(resolve(databasePath)), { recursive: true });
const db = new DatabaseSync(databasePath, { timeout: 5000 });
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    salt BLOB NOT NULL,
    password_hash BLOB NOT NULL
  ) STRICT;
  CREATE TABLE IF NOT EXISTS sessions (
    digest TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL
  ) STRICT;
  CREATE INDEX IF NOT EXISTS session_expiry ON sessions(expires_at);
  CREATE TABLE IF NOT EXISTS purchases (
    position INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    id TEXT NOT NULL,
    provider TEXT NOT NULL,
    data REAL NOT NULL,
    days INTEGER NOT NULL,
    status TEXT NOT NULL,
    expiry TEXT NOT NULL,
    remaining REAL,
    UNIQUE(user_id, id)
  ) STRICT;
  CREATE INDEX IF NOT EXISTS purchase_order ON purchases(user_id, position DESC);
`);
const findUser = db.prepare('SELECT id, email, salt, password_hash FROM users WHERE email = ?');
const insertUser = db.prepare(`
  INSERT INTO users (email, salt, password_hash) VALUES (?, ?, ?)
  ON CONFLICT(email) DO NOTHING RETURNING id, email
`);
const findSession = db.prepare(`
  SELECT users.id, users.email FROM sessions JOIN users ON users.id = sessions.user_id
  WHERE sessions.digest = ? AND sessions.expires_at > ?
`);
const addSession = db.prepare('INSERT INTO sessions (digest, user_id, expires_at) VALUES (?, ?, ?)');
const deleteSession = db.prepare('DELETE FROM sessions WHERE digest = ?');
const deleteExpired = db.prepare('DELETE FROM sessions WHERE expires_at <= ?');
const listPurchases = db.prepare(`
  SELECT id, provider, data, days, status, expiry, remaining FROM purchases
  WHERE user_id = ? ORDER BY position DESC
`);
const insertPurchase = db.prepare(`
  INSERT INTO purchases (user_id, id, provider, data, days, status, expiry, remaining)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(user_id, id) DO NOTHING
`);
const updatePurchase = db.prepare(`
  UPDATE purchases SET status = ?, expiry = ?, remaining = ? WHERE user_id = ? AND id = ?
`);
const deletePurchase = db.prepare('DELETE FROM purchases WHERE user_id = ? AND id = ?');

const sessionSeconds = 30 * 24 * 60 * 60;
const cookieName = secure ? '__Host-toursim_session' : 'toursim_session';
const deriveKey = promisify(scrypt);
const scryptOptions = { N: 2 ** 17, r: 8, p: 1, maxmem: 160 * 1024 * 1024 };
const missingUserSalt = randomBytes(16);
const missingUserHash = randomBytes(64);
const attempts = new Map();
const attemptWindow = 10 * 60 * 1000;
const attemptKeyLimit = 10000;
let activeHashes = 0;

const planById = new Map(catalog.plans.map(plan => [plan.id, plan]));
const recordStatuses = new Set(['unknown', 'pending', 'active']);
const recordIdPattern = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/;

const publicFiles = new Set([
  'index.html', 'app.js', 'catalog.js', 'icons.js', 'planner.js', 'coverage.js', 'purchase.js', 'theme.js',
  'data-estimate.js', 'data-guide.js', 'data-guide.css', 'demo-checkout.js', 'demo-checkout.css',
  'styles.css', 'planner.css', 'coverage.css', 'purchase.css', 'journey.css',
  'assets/favicon.svg', 'assets/toursim-mark.svg', 'assets/samarkand-hero.webp', 'assets/uzbekistan-outline.js',
  'assets/manrope-latin.woff2', 'assets/manrope-cyrillic.woff2', 'assets/manrope-OFL.txt',
  'assets/feather-license.txt', 'assets/lucide-license.txt',
  'assets/service-choose.svg', 'assets/service-install.svg', 'assets/service-connect.svg', 'assets/service-map.svg'
]);
const contentTypes = {
  html: 'text/html; charset=utf-8', js: 'text/javascript; charset=utf-8', css: 'text/css; charset=utf-8',
  svg: 'image/svg+xml', webp: 'image/webp', woff2: 'font/woff2', txt: 'text/plain; charset=utf-8'
};
const contentPolicy = [
  "default-src 'self'", "style-src 'self' 'unsafe-inline'", "img-src 'self' data:",
  "base-uri 'none'", "object-src 'none'", "frame-ancestors 'none'", "form-action 'self'"
].join('; ');

class RequestError extends Error {
  constructor(status, code) {
    super(code);
    this.status = status;
  }
}

function json(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  const limit = 16 * 1024;
  if (request.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    throw new RequestError(415, 'bad_request');
  }
  if (Number(request.headers['content-length']) > limit) throw new RequestError(413, 'payload_too_large');

  let size = 0;
  const chunks = [];
  for await (const chunk of request.iterator({ destroyOnReturn: false })) {
    size += chunk.length;
    if (size > limit) throw new RequestError(413, 'payload_too_large');
    chunks.push(chunk);
  }
  let body;
  try {
    body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new RequestError(400, 'bad_request');
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new RequestError(400, 'bad_request');
  return body;
}

function normalizeEmail(input) {
  if (typeof input !== 'string') return null;
  const email = input.trim().toLowerCase();
  if (email.length > 254 || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/.test(email)) return null;
  const [mailbox, domain] = email.split('@');
  if (mailbox.length > 64 || mailbox.startsWith('.') || mailbox.endsWith('.') || mailbox.includes('..') ||
      domain.split('.').some(label => label.length > 63 || label.startsWith('-') || label.endsWith('-'))) return null;
  return email;
}

function countAttempt(key, limit, now) {
  const entry = attempts.get(key);
  if (entry && entry.until > now) {
    if (entry.count >= limit) throw new RequestError(429, 'rate_limited');
    entry.count += 1;
    return;
  }
  if (!entry && attempts.size >= attemptKeyLimit) throw new RequestError(429, 'rate_limited');
  attempts.set(key, { count: 1, until: now + attemptWindow });
}

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of attempts) {
    if (entry.until <= now) attempts.delete(key);
  }
}, 60_000).unref();

async function authenticate(request, body, register) {
  const address = request.socket.remoteAddress;
  const now = Date.now();
  countAttempt(address, 120, now);
  const email = normalizeEmail(body.email);
  const { password } = body;
  const length = typeof password === 'string' ? [...password].length : 0;
  if (register && !email) throw new RequestError(400, 'invalid_email');
  if (register && (length < 15 || length > 128)) throw new RequestError(400, 'invalid_password');
  if (!email || length < 1 || length > 128) throw new RequestError(401, 'invalid_credentials');

  const attemptKey = `${address} ${email}`;
  countAttempt(attemptKey, 8, now);
  if (activeHashes >= 2) throw new RequestError(429, 'rate_limited');

  const user = findUser.get(email);
  if (register && user) throw new RequestError(409, 'email_taken');
  const salt = register ? randomBytes(16) : (user?.salt ?? missingUserSalt);
  activeHashes += 1;
  let key;
  try {
    key = await deriveKey(password, salt, 64, scryptOptions);
  } finally {
    activeHashes -= 1;
  }

  if (register) {
    const created = insertUser.get(email, salt, key);
    if (!created) throw new RequestError(409, 'email_taken');
    attempts.delete(attemptKey);
    return created;
  }

  if (!timingSafeEqual(key, user?.password_hash ?? missingUserHash) || !user) {
    throw new RequestError(401, 'invalid_credentials');
  }
  attempts.delete(attemptKey);
  return user;
}

function cookieDigest(token) {
  return createHash('sha256').update(token).digest('hex');
}

function sessionDigest(request) {
  const prefix = `${cookieName}=`;
  for (const pair of (request.headers.cookie ?? '').split(';')) {
    const entry = pair.trim();
    if (!entry.startsWith(prefix)) continue;
    const token = entry.slice(prefix.length);
    if (/^[a-zA-Z0-9_-]{43}$/.test(token)) return cookieDigest(token);
  }
  return null;
}

function setSessionCookie(response, value, maxAge) {
  response.setHeader('Set-Cookie', `${cookieName}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Strict${secure ? '; Secure' : ''}`);
}

function startSession(request, response, user) {
  const token = randomBytes(32).toString('base64url');
  const now = Date.now();
  deleteExpired.run(now);
  deleteSession.run(sessionDigest(request));
  addSession.run(cookieDigest(token), user.id, now + sessionSeconds * 1000);
  setSessionCookie(response, token, sessionSeconds);
}

function account(user) {
  return user ? { user: { email: user.email }, records: listPurchases.all(user.id) } : { user: null, records: [] };
}

function validRecordFields({ status, expiry, remaining }) {
  if (!recordStatuses.has(status) || typeof expiry !== 'string' ||
      (remaining !== null && (!Number.isFinite(remaining) || remaining < 0 || remaining > 10000))) return false;
  if (expiry === '') return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(expiry)) return false;
  const date = new Date(`${expiry}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === expiry;
}

function validLegacyRecord(record) {
  return record && typeof record.id === 'string' && recordIdPattern.test(record.id) &&
    typeof record.provider === 'string' && Object.hasOwn(catalog.providers, record.provider) &&
    Number.isFinite(record.data) && record.data > 0 &&
    Number.isSafeInteger(record.days) && record.days > 0 && validRecordFields(record);
}

function importPurchases(userId, { records }) {
  if (!Array.isArray(records) || records.length > 30 || !records.every(validLegacyRecord)) {
    throw new RequestError(400, 'invalid_record');
  }

  db.exec('BEGIN IMMEDIATE');
  try {
    for (const { id, provider, data, days, status, expiry, remaining } of records.toReversed()) {
      insertPurchase.run(userId, id, provider, data, days, status, expiry, remaining);
    }
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

async function handleApi(request, response, path) {
  const method = request.method;
  if (method === 'GET' && path === '/api/account') {
    return json(response, 200, account(findSession.get(sessionDigest(request), Date.now())));
  }

  if (['POST', 'PATCH', 'DELETE'].includes(method) && !allowedOrigins.has(request.headers.origin)) {
    throw new RequestError(403, 'forbidden_origin');
  }

  if (method === 'POST' && (path === '/api/register' || path === '/api/login')) {
    const register = path === '/api/register';
    const user = await authenticate(request, await readJson(request), register);
    startSession(request, response, user);
    return json(response, register ? 201 : 200, account(user));
  }
  if (method === 'POST' && path === '/api/logout') {
    request.resume();
    deleteSession.run(sessionDigest(request));
    setSessionCookie(response, '', 0);
    return json(response, 200, {});
  }

  const id = path.startsWith('/api/purchases/') ? path.slice('/api/purchases/'.length) : '';
  const mutation = method === 'POST' && ['/api/purchases', '/api/purchases/import'].includes(path);
  const change = ['PATCH', 'DELETE'].includes(method) && recordIdPattern.test(id);
  if (!mutation && !change) throw new RequestError(404, 'not_found');

  const body = method === 'DELETE' ? null : await readJson(request);
  const user = findSession.get(sessionDigest(request), Date.now());
  if (!user) throw new RequestError(401, 'signed_out');

  if (path === '/api/purchases') {
    const plan = planById.get(body.planId);
    if (!plan) throw new RequestError(400, 'invalid_record');
    const newId = body.id ?? randomUUID();
    if (typeof newId !== 'string' || !recordIdPattern.test(newId)) throw new RequestError(400, 'invalid_record');
    const inserted = insertPurchase.run(user.id, newId, plan.provider, plan.data, plan.days, 'unknown', '', null);
    return json(response, inserted.changes ? 201 : 200, { records: listPurchases.all(user.id), id: newId });
  }
  if (path === '/api/purchases/import') {
    importPurchases(user.id, body);
  } else if (method === 'PATCH') {
    if (!validRecordFields(body)) throw new RequestError(400, 'invalid_record');
    const { status, expiry, remaining } = body;
    if (!updatePurchase.run(status, expiry, remaining, user.id, id).changes) throw new RequestError(404, 'record_gone');
  } else if (!deletePurchase.run(user.id, id).changes) {
    throw new RequestError(404, 'record_gone');
  }
  return json(response, 200, { records: listPurchases.all(user.id) });
}

const server = createServer({ requestTimeout: 15_000, headersTimeout: 10_000 }, async (request, response) => {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'no-referrer');
  response.setHeader('Content-Security-Policy', contentPolicy);
  try {
    const { pathname } = new URL(request.url, publicUrl);
    if (pathname.startsWith('/api/')) return await handleApi(request, response, pathname);

    const file = pathname === '/' ? 'index.html' : pathname.slice(1);
    if (!['GET', 'HEAD'].includes(request.method) || !publicFiles.has(file)) throw new RequestError(404, 'not_found');
    const contents = await readFile(new URL(`./${file}`, import.meta.url));
    response.writeHead(200, {
      'Content-Type': contentTypes[file.split('.').at(-1)],
      'Content-Length': contents.length,
      'Cache-Control': 'no-cache'
    });
    response.end(request.method === 'HEAD' ? undefined : contents);
  } catch (error) {
    request.resume();
    if (response.destroyed) return;
    if (error instanceof RequestError) return json(response, error.status, { error: error.message });
    console.error(error);
    return json(response, 500, { error: 'server_error' });
  }
});

server.listen(port, host, () => console.log(`TourSIM listening on ${publicUrl.origin}`));
