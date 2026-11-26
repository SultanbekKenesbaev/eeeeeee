import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.TOURSIM_PLAYWRIGHT ?? 'playwright');
const port = Number(process.env.TOURSIM_TEST_PORT ?? 4278);
const origin = 'http://127.0.0.1:' + port;
const directory = await mkdtemp(join(process.env.TOURSIM_TEST_TMPDIR ?? tmpdir(), 'toursim-test-'));
const database = join(directory, 'test.sqlite');
const server = spawn(process.execPath, ['server.mjs'], {
  cwd: new URL('../', import.meta.url),
  env: { ...process.env, PORT: String(port), HOST: '127.0.0.1', PUBLIC_ORIGIN: origin, TOURSIM_DB: database },
  stdio: ['ignore', 'pipe', 'inherit']
});
let browser;

try {
  const [ready] = await Promise.race([
    once(server.stdout, 'data'),
    once(server, 'exit').then(([code]) => { throw new Error('Test server exited with code ' + code); })
  ]);
  assert.match(String(ready), /TourSIM listening/);
  browser = await chromium.launch({ executablePath: process.env.TOURSIM_CHROMIUM });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: 'en-US' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.setDefaultTimeout(6000);
  const at = route => page.goto(origin + '/#' + route);
  const selectPlan = id => page.locator('input[name="compare"][value="' + id + '"]');
  const submit = action => page.locator('[data-esim-action="' + action + '"] button[type="submit"]').click();

  await at('home');
  await page.locator('#finder').waitFor();
  assert.match(await page.locator('#results-count').innerText(), /3 of 5/);
  await page.locator('#open-mobile-menu').click();
  await page.locator('#mobile-navigation a[href="#how-it-works"]').click();
  await page.locator('#how-it-works:focus').waitFor();
  assert.deepEqual(await page.locator('.how-list .how-illustration').evaluateAll(images =>
    images.map(image => new URL(image.src).pathname)), [
    '/assets/service-choose.svg', '/assets/service-install.svg', '/assets/service-connect.svg'
  ]);
  assert.deepEqual(await page.locator('.how-card').evaluateAll(cards =>
    cards.map(card => card.getAttribute('href'))), ['#plans', '#purchase', '#setup']);
  await at('home');
  await page.locator('.hero-compatibility').click();
  await page.locator('.compatibility-panel').waitFor();
  await at('home');
  await page.locator('#duration').selectOption('7');
  await page.locator('#data-needed').selectOption('3');
  await page.locator('#finder button[type="submit"]').click();
  await page.waitForURL('**/#plans');
  await page.locator('#results-count.sr-only').waitFor({ state: 'attached' });
  await selectPlan('airalo-5').check();
  await selectPlan('enjoy-5').check();
  assert.equal(await page.locator('#duration').inputValue(), '7');
  assert.equal(await page.locator('#data-needed').inputValue(), '3');
  assert.equal(await page.locator('#compare-picked .compare-chip').count(), 2);

  const sort = page.locator('#plan-sort');
  await sort.focus();
  await sort.selectOption('data');
  assert.equal(await sort.evaluate(node => node === document.activeElement), true);
  assert.equal(await selectPlan('airalo-5').isChecked(), true);
  await page.locator('[data-plan-id="enjoy-5"]').click();
  assert.equal(await selectPlan('enjoy-5').isChecked(), false);
  assert.equal(await page.locator('#compare-button').isDisabled(), true);
  await selectPlan('enjoy-5').check();

  await page.locator('#language').selectOption('ru');
  assert.equal(await page.locator('html').getAttribute('lang'), 'ru');
  assert.equal(await selectPlan('airalo-5').isChecked(), true);
  await page.locator('#compare-button').click();
  await page.locator('.comparison').waitFor();
  assert.ok(await page.locator('.different').count());
  const share = page.locator('[data-action="share"]');
  await share.click();
  const shared = await page.locator('.share-dialog input').inputValue();
  await page.keyboard.press('Escape');
  await page.locator('.share-dialog').waitFor({ state: 'detached' });
  assert.equal(await share.evaluate(node => node === document.activeElement), true);

  const fresh = await browser.newPage({ locale: 'en-US' });
  await fresh.goto(shared);
  assert.equal(await fresh.locator('.comparison thead th').count(), 2);
  await fresh.locator('.page-top a').click();
  await fresh.waitForURL('**/#plans');
  assert.equal(await fresh.locator('#data-needed').inputValue(), '3');
  assert.equal(await fresh.locator('#plan-sort').inputValue(), 'data');
  await fresh.close();

  await page.locator('.comparison-plan').first().click();
  await page.locator('.purchase-panel').waitFor();
  assert.equal(await page.locator('.desktop-buy a').getAttribute('href'), '#checkout/airalo-5/compare');
  await page.locator('.desktop-buy a').click();
  await page.waitForURL('**/#checkout/airalo-5/compare');
  const demoForm = page.locator('[data-demo-form]');
  assert.equal(await demoForm.locator('input[name]').count(), 0);
  await demoForm.locator('[data-demo-fill]').click();
  await demoForm.locator('#demo-card-cvv').fill('000');
  await demoForm.locator('button[type="submit"]').click();
  await demoForm.locator('#demo-card-cvv[aria-invalid="true"]').waitFor();
  await demoForm.locator('[data-demo-fill]').click();
  await demoForm.locator('button[type="submit"]').click();
  await page.locator('[data-demo-stage="processing"]').waitFor();
  await page.locator('[data-demo-stage="success"] [data-demo-setup]').click();
  await page.waitForURL('**/#setup/airalo-5/compare');
  await page.locator('#install-steps a[href*="support.apple.com"]').waitFor();
  await page.locator('.page-top a').click();
  await page.waitForURL('**/#plan/airalo-5/compare');
  await page.locator('.purchase-panel a[href^="#phone/"]').click();
  await page.locator('input[value="android"] + span').click();
  await page.locator('#phone-steps a[href*="samsung.com"]').waitFor();
  await page.locator('.compatibility-panel .actions a').click();
  await page.waitForURL('**/#plan/airalo-5/compare');

  await at('account');
  const email = 'toursim-' + randomUUID() + '@example.test';
  const password = 'Local QA ' + randomUUID();
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
  await submit('login');
  await page.locator('input[name="password"][aria-invalid="true"]').waitFor();
  await page.locator('[data-esim-auth="register"]').click();
  await page.locator('input[name="password"]').fill(password);
  await page.locator('#language').selectOption('uz');
  assert.equal(await page.locator('input[name="email"]').inputValue(), email);
  assert.equal(await page.locator('input[name="password"]').evaluate((node, expected) => node.value === expected, password), true);
  await submit('register');
  await page.locator('#esim-account-plan').selectOption('airalo-5');
  await submit('add');
  const record = page.locator('[data-esim-record]');
  await record.locator('summary').click();
  await record.locator('select[name="status"]').selectOption('active');
  await record.locator('input[name="remaining"]').fill('2.5');
  await submit('update');
  await record.getByText(/2[.,]5/).waitFor();
  await page.locator('[data-esim-logout]').click();
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
  await submit('login');
  await record.getByText(/2[.,]5/).waitFor();
  assert.deepEqual(errors, []);
  console.log('TourSIM journey and account regressions passed.');
} finally {
  await browser?.close();
  if (server.exitCode === null && server.signalCode === null) {
    const stopped = once(server, 'exit');
    server.kill();
    await stopped;
  }
  await rm(directory, { recursive: true, force: true });
}
