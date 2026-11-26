'use strict';

const catalogCheckedOn = '2026-11-25';

const providers = {
  airalo: {
    name: 'Airalo', initial: 'A', network: 'beelineNetwork',
    store: { en: 'https://www.airalo.com/uzbekistan-esim', ru: 'https://www.airalo.com/ru/uzbekistan-esim', uz: 'https://www.airalo.com/uz/uzbekistan-esim' },
    terms: 'https://www.airalo.com/ru/uzbekistan-esim/uzbeknet-7days-1gb-x'
  },
  enjoy: {
    name: 'Enjoy eSIM', initial: 'E', network: 'enjoyNetwork',
    store: { en: 'https://enjoyesim.com/en/uzbekistan-esim' },
    terms: 'https://enjoyesim.com/en/uzbekistan-esim'
  }
};

const plans = [
  { id: 'airalo-1', provider: 'airalo', data: 1, days: 7, price: 4 },
  { id: 'airalo-2', provider: 'airalo', data: 2, days: 15, price: 7, featured: true },
  { id: 'airalo-5', provider: 'airalo', data: 5, days: 30, price: 13 },
  { id: 'enjoy-3', provider: 'enjoy', data: 3, days: 30, price: 9, featured: true },
  { id: 'enjoy-5', provider: 'enjoy', data: 5, days: 30, price: 15 },
  { id: 'enjoy-10', provider: 'enjoy', data: 10, days: 30, price: 25 }
];

const tripStore = {
  en: 'https://www.trip.com/things-to-do/experiences/uzbekistan-connectivity-solutions/',
  ru: 'https://ru.trip.com/things-to-do/experiences/uzbekistan-connectivity-solutions/'
};
