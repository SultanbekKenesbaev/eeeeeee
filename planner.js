'use strict';

const TourSIMPlanner = (() => {
  const storageKey = 'toursim-planner';
  const megabytesPerGigabyte = 1000;
  const backgroundMb = 30;
  const reservePercent = 20;
  const activity = [
    { key: 'instagram', name: 'Instagram', mb: [0, 40, 120, 300], initial: 2 },
    { key: 'youtube', name: 'YouTube', mb: [0, 150, 400, 900], initial: 0 },
    { key: 'telegram', name: 'Telegram', mb: [0, 10, 30, 100], initial: 2 },
    { key: 'maps', mb: [0, 5, 20, 50], initial: 2 }
  ];
  const copy = {
    title: ['Smart plan finder', 'Умный подбор тарифа', 'Aqlli tarif tanlash'],
    intro: [
      'Find an eSIM plan for your trip length, budget and typical mobile data use.',
      'Подберите eSIM на весь срок поездки с учётом бюджета и привычного расхода интернета.',
      'Safar muddati, byudjet va odatiy internet sarfingizga mos eSIM paketini toping.'
    ],
    trip: ['Your trip', 'Параметры поездки', 'Safar tafsilotlari'],
    days: ['Trip length (days)', 'Срок поездки (в днях)', 'Safar muddati (kun)'],
    budget: ['Budget (USD)', 'Бюджет (USD)', 'Byudjet (USD)'],
    invalidDays: ['Enter a whole number from 1 to 365.', 'Введите целое число от 1 до 365.', '1 dan 365 gacha butun son kiriting.'],
    invalidBudget: [
      'Enter a budget of 0 USD or more with up to two decimal places.',
      'Введите сумму от 0 USD с точностью до двух знаков после запятой.',
      '0 USD yoki undan katta summani ko‘pi bilan ikki kasr xonasi bilan kiriting.'
    ],
    usage: ['Daily mobile data use', 'Использование приложений', 'Ilovalardan foydalanish'],
    usageHint: [
      'Choose how much you usually use each app in a day away from Wi-Fi.',
      'Укажите, как часто вы пользуетесь каждым приложением за день без Wi-Fi.',
      'Wi-Fi bo‘lmagan odatiy kunda har bir ilovadan qanchalik ko‘p foydalanishingizni belgilang.'
    ],
    maps: ['Maps', 'Карты', 'Xaritalar'],
    none: ['None', 'Не пользуюсь', 'Yo‘q'],
    light: ['Light', 'Редко', 'Kam'],
    moderate: ['Moderate', 'Умеренно', 'O‘rtacha'],
    heavy: ['Heavy', 'Активно', 'Ko‘p'],
    gb: ['GB', 'ГБ', 'GB'],
    mb: ['MB', 'МБ', 'MB'],
    method: ['How the estimate works', 'Как рассчитан расход', 'Sarf qanday hisoblanadi'],
    assumptions: [
      'App volumes are approximate daily estimates. We add {base} MB per day for background traffic and a {reserve}% buffer, then round up to the next 0.1 GB. Video quality, calls and downloads can change actual use.',
      'Для приложений указан примерный расход за день. Мы добавляем {base} МБ в день на фоновый трафик и запас {reserve}%, затем округляем результат вверх до десятых долей ГБ. Фактический расход зависит от качества видео, звонков и загрузок.',
      'Ilovalar uchun kunlik sarf taxminan ko‘rsatilgan. Fon trafigi uchun kuniga {base} MB va {reserve}% zaxira qo‘shiladi. Natija 0,1 GB gacha yuqoriga yaxlitlanadi. Haqiqiy sarf video sifati, qo‘ng‘iroqlar va yuklamalarga bog‘liq.'
    ],
    estimate: ['Estimated data for the trip', 'Расчётный расход на поездку', 'Safar uchun taxminiy internet hajmi'],
    match: ['Lowest-priced matching plan', 'Самый доступный подходящий пакет', 'Eng arzon mos paket'],
    validity: ['Validity', 'Срок действия', 'Amal qilish muddati'],
    allowance: ['Data allowance', 'Интернет', 'Internet hajmi'],
    price: ['Price', 'Цена', 'Narx'],
    details: ['View plan', 'Смотреть пакет', 'Paketni ko‘rish'],
    noMatch: ['No matching plan', 'Подходящих пакетов нет', 'Mos paket topilmadi'],
    tooLong: [
      'No package in the catalog covers the full length of this trip.',
      'В каталоге нет пакета на весь срок вашей поездки.',
      'Katalogda safaringizning to‘liq muddatiga yetadigan paket yo‘q.'
    ],
    tooMuchData: [
      'Packages that cover the trip length offer less data than the estimate.',
      'У пакетов на этот срок меньше интернета, чем нужно по расчёту.',
      'Safar muddatiga mos paketlarning internet hajmi hisoblangan sarfdan kam.'
    ],
    overBudget: [
      'The cheapest package that covers your trip and data needs costs {price}, above your budget.',
      'Пакеты на нужный срок и объём начинаются от {price}. Это выше указанного бюджета.',
      'Kerakli muddat va internet hajmiga mos eng arzon paket {price} turadi. Bu byudjetingizdan yuqori.'
    ],
    incomplete: ['Check the trip length and budget.', 'Проверьте срок поездки и бюджет.', 'Safar muddati va byudjetni tekshiring.']
  };
  const levels = ['none', 'light', 'moderate', 'heavy'];
  const scenarios = [
    { label: ['Maps and messages', 'Карты и сообщения', 'Xarita va xabarlar'], levels: [0, 0, 1, 2] },
    { label: ['Social and photos', 'Соцсети и фото', 'Ijtimoiy tarmoq va suratlar'], levels: [2, 0, 2, 2] },
    { label: ['Video and social', 'Видео и соцсети', 'Video va ijtimoiy tarmoq'], levels: [2, 2, 2, 2] }
  ];
  const scenarioLabels = ['Typical use', 'Сценарий использования', 'Foydalanish stsenariysi'];
  const advancedLabels = ['Adjust individual apps', 'Настроить приложения', 'Ilovalarni alohida sozlash'];
  const recommendationCopy = ['Covers {days} and the estimated {data} within your budget.', 'Покрывает {days} и расчётные {data} в пределах бюджета.', '{days} va taxminiy {data} uchun byudjetga mos.'];
  const localeIndex = { en: 0, ru: 1, uz: 2 };
  const russianDays = { one: 'день', few: 'дня', many: 'дней', other: 'дня' };

  function readPreferences() {
    let saved;
    try { saved = JSON.parse(sessionStorage.getItem(storageKey)); } catch {}
    const days = saved?.days;
    const budget = saved?.budget;
    return {
      days: Number.isInteger(days) && days >= 1 && days <= 365 ? days : 7,
      budget: Number.isFinite(budget) && budget >= 0 ? budget : 15,
      usage: Object.fromEntries(activity.map(({ key, initial }) => {
        const level = saved?.usage?.[key];
        return [key, Number.isInteger(level) && levels[level] ? level : initial];
      }))
    };
  }

  const preferences = readPreferences();
  const text = (language, key) => copy[key][localeIndex[language] ?? 0];
  const number = (language, value) => new Intl.NumberFormat(language, { maximumFractionDigits: 2 }).format(value);
  const dataLabel = (language, value) => `${number(language, value)} ${text(language, 'gb')}`;
  const priceLabel = (language, value) => `${number(language, value)} USD`;

  function validityLabel(language, days) {
    const units = { en: days === 1 ? 'day' : 'days', ru: russianDays[new Intl.PluralRules('ru').select(days)], uz: 'kun' };
    return `${number(language, days)} ${units[language] ?? units.en}`;
  }

  function estimatedData(days, usage) {
    const dailyMb = activity.reduce((total, app) => total + app.mb[usage[app.key]], backgroundMb);
    const tenthsOfGb = Math.ceil(dailyMb * days * (100 + reservePercent) * 10 / (100 * megabytesPerGigabyte));
    return tenthsOfGb / 10;
  }

  function resultFor(plans, days, budget, data) {
    const forTrip = plans.filter(plan => plan.days >= days);
    if (!forTrip.length) return { message: 'tooLong' };

    const matches = forTrip.filter(plan => plan.data >= data);
    if (!matches.length) return { message: 'tooMuchData' };

    const [plan] = matches.sort((a, b) => a.price - b.price || b.data - a.data || b.days - a.days);
    return plan.price <= budget ? { plan } : { message: 'overBudget', price: plan.price };
  }

  function appFields(language) {
    const t = key => text(language, key);
    return activity.map(({ key, name, mb }) => `<div class="trip-field">
      <label for="planner-${key}">${name ?? t(key)}</label>
      <select class="input" id="planner-${key}" name="${key}">${levels.map((level, index) =>
        `<option value="${index}"${preferences.usage[key] === index ? ' selected' : ''}>${t(level)} · ${number(language, mb[index])} ${t('mb')}</option>`
      ).join('')}</select>
    </div>`).join('');
  }

  function matchCard(plan, context, data) {
    const { language, providers, icon, planHref } = context;
    const t = key => text(language, key);
    const provider = providers[plan.provider];
    const href = planHref ? planHref(plan) : `#plan/${encodeURIComponent(plan.id)}`;
    const reason = recommendationCopy[localeIndex[language] ?? 0].replace('{days}', validityLabel(language, preferences.days)).replace('{data}', dataLabel(language, data));
    return `<h3>${t('match')}</h3>
      <p class="carrier"><span class="provider-mark provider-${plan.provider}" aria-hidden="true">${provider.initial}</span>${provider.name}</p>
      <dl class="planner-plan">
        <div><dt>${t('allowance')}</dt><dd>${dataLabel(language, plan.data)}</dd></div>
        <div><dt>${t('validity')}</dt><dd>${validityLabel(language, plan.days)}</dd></div>
        <div><dt>${t('price')}</dt><dd>${priceLabel(language, plan.price)}</dd></div>
      </dl>
      <p class="note planner-reason">${icon('circle-check')}${reason}</p>
      <a class="button button-primary" href="${href}">${t('details')}${icon('arrow-right')}</a>`;
  }

  function resultMarkup(context, invalid = false) {
    const { language, plans, icon } = context;
    const t = key => text(language, key);
    if (invalid) return `<p class="notice">${icon('circle-alert')}${t('incomplete')}</p>`;

    const { days, budget, usage } = preferences;
    const data = estimatedData(days, usage);
    const result = resultFor(plans, days, budget, data);
    const explanation = result.message && t(result.message);
    const reason = result.price === undefined ? explanation : explanation.replace('{price}', priceLabel(language, result.price));
    return `<div class="planner-estimate">
      <span class="icon-tile">${icon('wifi')}</span>
      <div><h2>${t('estimate')}</h2><p>${dataLabel(language, data)}</p></div>
    </div>
    <div class="planner-match">${result.plan ? matchCard(result.plan, context, data) :
      `<h3>${t('noMatch')}</h3><p class="note">${reason}</p>`}</div>`;
  }

  function render(context) {
    const { language, icon } = context;
    const t = key => text(language, key);
    const assumptions = t('assumptions').replace('{base}', backgroundMb).replace('{reserve}', reservePercent);
    const locale = localeIndex[language] ?? 0;
    return `<section class="container page planner-page" aria-labelledby="planner-title">
      <div class="planner-heading">
        <h1 class="page-title" id="planner-title" tabindex="-1">${t('title')}</h1>
        <p>${t('intro')}</p>
      </div>
      <div class="planner-grid">
        <form class="panel planner-controls" id="planner-form">
          <h2>${t('trip')}</h2>
          <div class="planner-field-grid">
            <div class="trip-field">
              <label for="planner-days">${icon('calendar-days')}${t('days')}</label>
              <input class="input" type="number" id="planner-days" name="days" min="1" max="365" step="1" inputmode="numeric" value="${preferences.days}" aria-describedby="planner-days-error" required>
              <p class="note planner-field-error" id="planner-days-error" hidden>${t('invalidDays')}</p>
            </div>
            <div class="trip-field">
              <label for="planner-budget">${t('budget')}</label>
              <input class="input" type="number" id="planner-budget" name="budget" min="0" step="0.01" inputmode="decimal" value="${preferences.budget}" aria-describedby="planner-budget-error" required>
              <p class="note planner-field-error" id="planner-budget-error" hidden>${t('invalidBudget')}</p>
            </div>
          </div>
          <fieldset class="planner-usage planner-scenarios">
            <legend>${scenarioLabels[locale]}</legend>
            <div class="planner-scenario-list">${scenarios.map((scenario, index) => `<button type="button" class="button button-secondary" data-planner-scenario="${index}" aria-pressed="${scenario.levels.every((level, field) => preferences.usage[activity[field].key] === level)}">${scenario.label[locale]}</button>`).join('')}</div>
          </fieldset>
          <details class="planner-method planner-advanced"><summary>${advancedLabels[locale]}${icon('chevron-down')}</summary>
          <fieldset class="planner-usage" aria-describedby="planner-usage-hint">
            <legend>${t('usage')}</legend>
            <p class="note" id="planner-usage-hint">${t('usageHint')}</p>
            <div class="planner-field-grid">${appFields(language)}</div>
          </fieldset></details>
          <details class="planner-method">
            <summary>${t('method')}${icon('chevron-down')}</summary>
            <p class="note">${assumptions}</p>
          </details>
        </form>
        <div class="panel planner-result" id="planner-result" aria-live="polite" aria-atomic="true">${resultMarkup(context)}</div>
      </div>
    </section>`;
  }

  function mount(container, context) {
    const form = container.querySelector('#planner-form');
    const result = container.querySelector('#planner-result');
    if (!form || !result) return;

    const update = () => {
      const values = new FormData(form);
      let valid = true;
      for (const key of ['days', 'budget']) {
        const input = form.elements.namedItem(key);
        const error = form.querySelector(`#planner-${key}-error`);
        const invalid = !input.validity.valid;
        error.hidden = !invalid;
        if (invalid) {
          input.setAttribute('aria-invalid', 'true');
          valid = false;
        } else {
          input.removeAttribute('aria-invalid');
          preferences[key] = input.valueAsNumber;
        }
      }
      preferences.usage = Object.fromEntries(activity.map(({ key }) => [key, Number(values.get(key))]));
      try { sessionStorage.setItem(storageKey, JSON.stringify(preferences)); } catch {}
      const previous = result.querySelector('.planner-estimate p')?.textContent;
      result.innerHTML = resultMarkup(context, !valid);
      const current = result.querySelector('.planner-estimate p');
      if (current && previous && current.textContent !== previous) current.classList.add('estimate-changed');
      for (const button of form.querySelectorAll('[data-planner-scenario]')) {
        const scenario = scenarios[button.dataset.plannerScenario];
        button.setAttribute('aria-pressed', scenario.levels.every((level, field) => preferences.usage[activity[field].key] === level));
      }
    };

    form.addEventListener('submit', event => event.preventDefault());
    form.addEventListener('click', event => {
      const button = event.target.closest('[data-planner-scenario]');
      if (!button) return;
      const scenario = scenarios[button.dataset.plannerScenario];
      activity.forEach(({ key }, index) => { form.elements.namedItem(key).value = scenario.levels[index]; });
      update();
    });
    form.addEventListener('input', event => {
      if (event.target instanceof HTMLInputElement) update();
    });
    form.addEventListener('change', event => {
      if (event.target instanceof HTMLSelectElement) update();
    });
  }

  return { render, mount };
})();
