# TourSIM

Mobile-first catalog for comparing prepaid travel eSIM data packages for Uzbekistan. The travel eSIM provides data through roaming, not a local Uzbek phone number.

Open `index.html` in a browser, or run `python3 -m http.server 4273 --bind 127.0.0.1` from this directory and open `http://127.0.0.1:4273`. No dependencies or build step are required.

- Filter Airalo and Enjoy eSIM data packages by trip length and gigabytes in EN, RU, or UZ.
- Compare package prices, validity, and local network information. The catalog only includes data plans for which the provider discloses no identity verification.
- Use the smart plan finder to estimate trip data from Instagram, YouTube, Telegram, and maps, then select the least expensive catalog package that fits the estimate, duration, and budget.
- Select cities on the route coverage map. It shows documented 4G in those cities, with links to operator sources and street-level coverage maps. The boundary is from [Natural Earth](https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/).
- Choose a package, check out with its provider, and use the QR or installation option the provider issues. Check your phone and follow the setup guide. Trip.com is an external marketplace.
- Add purchased eSIMs to My eSIMs on this browser for manual tracking. Check live balances, confirmed dates, and an available top-up in the provider's account.

The catalog uses a reviewed snapshot, not a live feed or a quote. Update plan values, links, and the review date in `catalog.js` after checking the providers' terms. Displayed amounts are published USD prices; checkout may use another currency or price.

TourSIM serves a browser-local catalog and account. Payments, QR issuance, live balances and top-up are handled by providers. A TourSIM checkout or live account needs a backend, provider partner access, and payment processing. The theme uses the browser's system preference until a user chooses light or dark.

## Design assets

The TourSIM mark and Samarkand artwork are in `assets/`. Manrope and the selected Lucide icons are bundled locally. Their license notices are included in the same folder.
