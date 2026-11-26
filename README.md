# TourSIM

Mobile-first catalog for comparing prepaid travel eSIM data packages for Uzbekistan. The travel eSIM provides data through roaming, not a local Uzbek phone number.

Open `index.html` in a browser, or run `python3 -m http.server 4273 --bind 127.0.0.1` from this directory and open `http://127.0.0.1:4273`. No dependencies or build step are required.

- Filter Airalo and Enjoy eSIM data packages by trip length and gigabytes in EN, RU, or UZ.
- Estimate data for a trip and apply the estimate to the filters. Share comparisons with a link that retains the current filters.
- Use the plan finder to estimate data from Instagram, YouTube, Telegram, and maps and choose a verified package within your budget.
- Select cities on the coverage map to see documented 4G and links to the operator maps. The boundary uses [Natural Earth](https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/).
- Compare price, validity, network, hotspot and top-up terms, with links to provider sources. The catalog only includes data plans for which the provider discloses no identity verification.
- Check your phone and follow the setup guide. Purchase and eSIM issuance happen on the provider's site. Trip.com is an external marketplace, not an integrated checkout.
- Follow the purchase guide and add purchased plans to My eSIMs for manual tracking in this browser. Open the provider’s account to check the live balance.
- Switch between light and dark themes. The initial theme follows the system setting.

The catalog uses a reviewed snapshot, not a live feed or a quote. Update plan values, links, and the review date in `catalog.js` after checking the providers' terms. Displayed amounts are published USD prices; checkout may use another currency or price.

TourSIM does not collect documents or payments, issue an eSIM, or reserve a SIM. It has no provider API or affiliate integration.

## Design assets

The TourSIM mark and Samarkand artwork are in `assets/`. Manrope and the selected Lucide icons are bundled locally. Their license notices are included in the same folder.
