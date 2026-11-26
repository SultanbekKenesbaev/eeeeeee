# TourSIM

Mobile-first catalog for comparing prepaid travel eSIM data packages for Uzbekistan. The travel eSIM provides data through roaming, not a local Uzbek phone number.

Run `node server.mjs` with Node.js 24 or later and open `http://127.0.0.1:4273`. There are no npm dependencies or build steps. The Node server serves both the site and the account API.

- Filter Airalo and Enjoy eSIM data packages by trip length and gigabytes in EN, RU, or UZ.
- Estimate mobile data with one question at a time on the home page or in the catalog. Apply the exact trip length and estimate, including a 25% reserve, to the filters. Share comparisons with a link that retains the current filters.
- Use the plan finder to estimate data from Instagram, YouTube, Telegram, and maps and choose a verified package within your budget.
- Select cities on the coverage map to see documented 4G and links to the operator maps. The boundary uses [Natural Earth](https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/).
- Compare price, validity, network, hotspot and top-up terms, with links to provider sources. The catalog only includes data plans for which the provider discloses no identity verification.
- Choose a package, check out with its provider, and use the QR or installation option the provider issues. Check your phone and follow the setup guide.
- Create an account with your email and a password of at least 15 characters. Sign in to track purchased eSIMs manually on any device. Check live balances, confirmed dates, and an available top-up in the provider's account.
- Import purchases saved before accounts were available from My eSIMs. Open TourSIM at the same address in the browser where you saved them.
- Switch between light and dark themes. The initial theme follows the system setting.

The catalog displays a snapshot of published USD prices. Update plan values and checkout links in `catalog.js` after checking the providers' terms. Checkout may use another currency or price.

Providers handle payments, QR issuance, live balances and top-up.

## Server configuration

The default SQLite file is `.data/toursim.sqlite`. Set `TOURSIM_DB` to an absolute path on persistent storage when hosting the app. `HOST` and `PORT` default to `127.0.0.1` and `4273`.

For public hosting, run the Node server behind an HTTPS reverse proxy and set `PUBLIC_ORIGIN` to the public origin, for example `https://toursim.example.com`. This enables secure session cookies. Account creation accepts an email address and signs the user in immediately, with no email delivery service configured.

## Design assets

The TourSIM mark and Samarkand artwork are in `assets/`. Manrope and the selected Lucide icons are bundled locally. Their license notices are included in the same folder.

The four `assets/service-*.svg` illustrations are vector artwork for the home and account pages. `journey.css` defines the shared visual and motion tokens, including reduced-motion behavior.

## Browser regression check

With Playwright and its Chromium browser available, run `node tests/journey.mjs`. The check starts a loopback server with a temporary SQLite database and exercises filtering, comparison, compatibility and account flows. Set `TOURSIM_PLAYWRIGHT` or `TOURSIM_CHROMIUM` to use an existing installation, or `TOURSIM_TEST_TMPDIR` to use an existing directory for the temporary database.
