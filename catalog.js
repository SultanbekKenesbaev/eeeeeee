'use strict';

const providers = {
  airalo: {
    name: 'Airalo', initial: 'A', network: 'beelineNetwork',
    store: { en: 'https://www.airalo.com/uzbekistan-esim', ru: 'https://www.airalo.com/ru/uzbekistan-esim', uz: 'https://www.airalo.com/uz/uzbekistan-esim' },
    conditions: {
      hotspot: ['airaloHotspot', 'https://www.airalo.com/help/using-managing-esims/ZSEEHBT5HW6F/can-i-use-tethering-personal-hotspot/5XTAX1X7HR0B'],
      topUp: ['airaloTopUp', 'https://www.airalo.com/help/using-managing-esims/ZSEEHBT5HW6F/si-mund-ta-rimbush-nje-karte-esim/2DMCF3341SYF']
    }
  },
  enjoy: {
    name: 'Enjoy eSIM', initial: 'E', network: 'enjoyNetwork',
    store: { en: 'https://enjoyesim.com/en/uzbekistan-esim' },
    conditions: {
      hotspot: ['enjoyHotspot', 'https://enjoyesim.com/en/uzbekistan-esim'],
      topUp: ['enjoyTopUp', 'https://enjoyesim.com/en/uzbekistan-esim']
    }
  }
};

const plans = [
  { id: 'airalo-1', provider: 'airalo', data: 1, days: 7, price: 4, checkAvailability: true },
  { id: 'airalo-2', provider: 'airalo', data: 2, days: 15, price: 7, featured: true, checkAvailability: true },
  {
    id: 'airalo-5', provider: 'airalo', data: 5, days: 30, price: 13,
    purchase: {
      en: 'https://www.airalo.com/uzbekistan-esim/uzbeknet-30days-5gb',
      ru: 'https://www.airalo.com/ru/uzbekistan-esim/uzbeknet-30days-5gb',
      uz: 'https://www.airalo.com/uz/uzbekistan-esim/uzbeknet-30days-5gb'
    }
  },
  { id: 'enjoy-3', provider: 'enjoy', data: 3, days: 30, price: 9, featured: true },
  { id: 'enjoy-5', provider: 'enjoy', data: 5, days: 30, price: 15 },
  { id: 'enjoy-10', provider: 'enjoy', data: 10, days: 30, price: 25 }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { plans, providers };
}
