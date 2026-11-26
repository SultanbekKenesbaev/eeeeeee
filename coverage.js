'use strict';

const TourSIMCoverage = (() => {
  const cities = [
    { id: 'tashkent', names: ['Tashkent', 'Ташкент', 'Toshkent'], coordinates: [69.24, 41.31] },
    { id: 'samarkand', names: ['Samarkand', 'Самарканд', 'Samarqand'], coordinates: [66.96, 39.65] },
    { id: 'bukhara', names: ['Bukhara', 'Бухара', 'Buxoro'], coordinates: [64.43, 39.77] },
    { id: 'khiva', names: ['Khiva', 'Хива', 'Xiva'], coordinates: [60.36, 41.38] },
    { id: 'nukus', names: ['Nukus', 'Нукус', 'Nukus'], coordinates: [59.60, 42.46] }
  ];
  const beelineCities = 'https://b2b.beeline.uz/en/products/services/b2b-4g-beeline';
  const ucellWesternAndSamarkand = 'https://ucell.uz/ru/tech_alerts/tex_work';
  const networks = [
    {
      name: 'Beeline',
      map: { en: 'https://beeline.uz/en/coverage-and-offices', ru: 'https://beeline.uz/ru/coverage-and-offices', uz: 'https://beeline.uz/uz/coverage-and-offices' },
      sources: Object.fromEntries(cities.map(city => [city.id, beelineCities])),
      providers: [
        { name: 'Airalo', url: 'https://www.airalo.com/uzbekistan-esim' },
        { name: 'Enjoy eSIM', url: 'https://enjoyesim.com/en/uzbekistan-esim' }
      ]
    },
    {
      name: 'Ucell',
      map: { en: 'https://ucell.uz/en/coverage_map', ru: 'https://ucell.uz/ru/coverage_map', uz: 'https://ucell.uz/uz/coverage_map' },
      sources: {
        tashkent: 'https://ucell.uz/ru/tech_alerts/tashkent_14',
        samarkand: ucellWesternAndSamarkand,
        bukhara: 'https://ucell.uz/ru/news/plan_works_ucell0909',
        khiva: ucellWesternAndSamarkand,
        nukus: ucellWesternAndSamarkand
      },
      providers: [{ name: 'Enjoy eSIM', url: 'https://enjoyesim.com/en/uzbekistan-esim' }]
    }
  ];
  const mapSource = 'https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/';
  const checkedOn = '2026-11-25';
  const storage = 'toursim-coverage-cities';
  const width = 800;
  const height = 504;
  const strings = {
    back: ['Home', 'На главную', 'Bosh sahifa'],
    title: ['Network coverage', 'Карта покрытия', 'Tarmoq qamrovi'],
    intro: ['Select the cities you’ll visit to see which local networks have documented 4G and which travel eSIMs list them.', 'Выберите города поездки, чтобы узнать, где операторы подтверждают наличие 4G и какие туристические eSIM используют эти сети.', 'Safar shaharlarini tanlang. Operatorlar qayerda 4G mavjudligini tasdiqlagani va qaysi sayohat eSIM’lari bu tarmoqlardan foydalanishini ko‘ring.'],
    cities: ['Cities on your route', 'Города маршрута', 'Safar shaharlari'],
    selectAll: ['Select all', 'Выбрать все', 'Hammasini tanlash'],
    clear: ['Clear', 'Сбросить', 'Tozalash'],
    results: ['4G networks on your route', 'Сети 4G на маршруте', 'Safardagi 4G tarmoqlari'],
    pickCity: ['Select at least one city to see the results.', 'Выберите хотя бы один город, чтобы увидеть результаты.', 'Natijalarni ko‘rish uchun kamida bitta shaharni tanlang.'],
    noNetwork: ['No network has documented 4G in every selected city.', 'Нет сети с подтверждённым 4G во всех выбранных городах.', 'Tanlangan shaharlarning barchasida 4G mavjudligi tasdiqlangan tarmoq yo‘q.'],
    oneMatch: ['1 city', '1 город', '1 shahar'],
    matchCount: ['{matched} of {total} cities', '{matched} из {total} городов', '{total} shahardan {matched} tasi'],
    citySources: ['Sources by city', 'Источники по городам', 'Shaharlar bo‘yicha manbalar'],
    officialMap: ['Operator map', 'Карта оператора', 'Operator xaritasi'],
    availableVia: ['Travel eSIMs', 'Туристические eSIM', 'Sayohat eSIM’lari'],
    limits: ['Coverage is confirmed at city level. Check exact addresses on the operator’s map and roaming networks for the selected package. Signal between cities may vary.', 'Наличие 4G подтверждено на уровне города. Точные адреса проверяйте на карте оператора, а доступные сети — в условиях пакета. Между городами сигнал может отличаться.', '4G shahar darajasida tasdiqlangan. Aniq manzillarni operator xaritasidan, rouming tarmoqlarini paket shartlaridan tekshiring. Shaharlar orasida signal farq qilishi mumkin.'],
    checked: ['Sources checked', 'Источники проверены', 'Manbalar tekshirildi'],
    findPlan: ['Find a plan', 'Подобрать пакет', 'Paket tanlash']
  };

  function savedCities() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(storage));
      return Array.isArray(saved) ? saved.filter(id => cities.some(city => city.id === id)) : [];
    } catch {
      return [];
    }
  }

  const selected = new Set(savedCities());
  const locale = language => ['en', 'ru', 'uz'].indexOf(language);
  const label = (key, language) => strings[key][locale(language)];
  const cityName = (city, language) => city.names[locale(language)];

  function project([longitude, latitude]) {
    return [25 + (longitude - 55.5) * 41.3, 25 + (45.9 - latitude) * 52.1];
  }

  function marker(city, language) {
    const [x, y] = project(city.coordinates);
    const name = cityName(city, language);
    return `<button type="button" class="coverage-marker" data-coverage-city="${city.id}" aria-pressed="${selected.has(city.id)}" aria-label="${name}" style="--pin-x: ${x / width * 100}%; --pin-y: ${y / height * 100}%">
      <span class="coverage-marker-dot"></span><span class="coverage-marker-name" aria-hidden="true">${name}</span>
    </button>`;
  }

  function sourceLink(name, url, icon) {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${name}${icon('arrow-up-right')}</a>`;
  }

  function networkCard(network, matches, total, { language, icon }) {
    const count = total === 1 ? label('oneMatch', language) : label('matchCount', language).replace('{matched}', matches.length).replace('{total}', total);
    return `<article class="panel coverage-network">
      <div class="coverage-network-top"><span class="icon-tile">${icon('signal')}</span><h3>${network.name}</h3><span class="coverage-network-count">4G · ${count}</span></div>
      <p class="coverage-network-cities">${matches.map(city => cityName(city, language)).join(' · ')}</p>
      <p class="coverage-providers"><strong>${label('availableVia', language)}</strong> ${network.providers.map(provider => sourceLink(provider.name, provider.url, icon)).join(' · ')}</p>
      <div class="coverage-network-links">
        ${sourceLink(label('officialMap', language), network.map[language], icon)}
        <details><summary>${label('citySources', language)}${icon('chevron-down')}</summary>
          <ul>${matches.map(city => `<li>${sourceLink(cityName(city, language), network.sources[city.id], icon)}</li>`).join('')}</ul>
        </details>
      </div>
    </article>`;
  }

  function results(context) {
    const { language, icon } = context;
    const route = cities.filter(city => selected.has(city.id));
    if (!route.length) return `<p class="panel coverage-empty">${icon('map-pin')}${label('pickCity', language)}</p>`;
    const matching = networks.filter(network => route.every(city => network.sources[city.id]));
    if (!matching.length) return `<p class="panel coverage-empty">${icon('circle-alert')}${label('noNetwork', language)}</p>`;
    return matching.map(network => networkCard(network, route, route.length, context)).join('');
  }

  function render(context) {
    const { language, icon } = context;
    const date = new Intl.DateTimeFormat(language, { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(checkedOn));
    return `<div class="container page coverage-page">
      <div class="page-top">
        <a class="text-action" href="#home">${icon('arrow-left')}${label('back', language)}</a>
        <h1 class="page-title" tabindex="-1">${label('title', language)}</h1>
        <p class="coverage-intro">${label('intro', language)}</p>
      </div>
      <div class="coverage-layout">
        <section class="panel coverage-picker" aria-labelledby="coverage-cities">
          <h2 id="coverage-cities">${label('cities', language)}</h2>
          <div class="coverage-city-list">
            ${cities.map(city => `<button type="button" data-coverage-city="${city.id}" aria-pressed="${selected.has(city.id)}">
              ${icon('map-pin')}<span>${cityName(city, language)}</span><span class="coverage-city-indicator">${icon('check')}</span>
            </button>`).join('')}
          </div>
          <div class="coverage-picker-actions">
            <button type="button" data-coverage-select="all" class="text-action"${selected.size === cities.length ? ' disabled' : ''}>${label('selectAll', language)}</button>
            <button type="button" data-coverage-select="none" class="text-action"${selected.size ? '' : ' disabled'}>${label('clear', language)}</button>
          </div>
        </section>
        <figure class="panel coverage-figure">
          <div class="coverage-map">
            <canvas width="${width * 2}" height="${height * 2}" aria-hidden="true"></canvas>
            ${cities.map(city => marker(city, language)).join('')}
          </div>
          <figcaption><a href="${mapSource}" target="_blank" rel="noopener noreferrer">Natural Earth</a></figcaption>
        </figure>
      </div>
      <section class="coverage-results" aria-labelledby="coverage-results-heading">
        <h2 id="coverage-results-heading" class="section-title">${label('results', language)}</h2>
        <div class="coverage-networks" data-coverage-results aria-live="polite">${results(context)}</div>
        <p class="note coverage-limits">${label('limits', language)}</p>
        <div class="coverage-actions">
          <a class="button button-primary" href="#planner">${label('findPlan', language)}${icon('arrow-right')}</a>
          <p class="note">${label('checked', language)} <time datetime="${checkedOn}">${date}</time></p>
        </div>
      </section>
    </div>`;
  }

  function draw(canvas) {
    const surface = canvas.getContext('2d');
    if (!surface) return;
    surface.scale(2, 2);
    surface.fillStyle = '#C8D9F5';
    surface.strokeStyle = '#87A9DA';
    surface.lineWidth = 1.4;
    for (const polygon of uzbekistanOutline) {
      surface.beginPath();
      for (const [index, coordinates] of polygon.entries()) {
        const [x, y] = project(coordinates);
        if (index === 0) surface.moveTo(x, y);
        else surface.lineTo(x, y);
      }
      surface.closePath();
      surface.fill();
      surface.stroke();
    }
  }

  function mount(container, context) {
    const page = container.querySelector('.coverage-page');
    const controls = [...page.querySelectorAll('[data-coverage-city]')];
    const all = page.querySelector('[data-coverage-select="all"]');
    const clear = page.querySelector('[data-coverage-select="none"]');
    const output = page.querySelector('[data-coverage-results]');
    draw(page.querySelector('canvas'));
    page.addEventListener('click', event => {
      const control = event.target.closest('[data-coverage-city], [data-coverage-select]');
      if (!control) return;
      const id = control.dataset.coverageCity;
      if (control === all) {
        cities.forEach(city => selected.add(city.id));
      } else if (control === clear) {
        selected.clear();
      } else if (selected.has(id)) {
        selected.delete(id);
      } else {
        selected.add(id);
      }
      for (const button of controls) button.setAttribute('aria-pressed', selected.has(button.dataset.coverageCity));
      all.disabled = selected.size === cities.length;
      clear.disabled = selected.size === 0;
      output.innerHTML = results(context);
      try { sessionStorage.setItem(storage, JSON.stringify([...selected])); } catch {}
    });
  }

  return { render, mount };
})();
