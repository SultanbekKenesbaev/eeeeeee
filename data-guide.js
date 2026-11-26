'use strict';

const TourSIMDataGuide = (() => {
  const { questions, dayChoices, maxDays, estimate } = TourSIMDataEstimate;
  const steps = ['days', ...Object.keys(questions)];
  const locales = { en: 0, ru: 1, uz: 2 };
  const copy = {
    title: ['How many GB do I need?', 'Сколько ГБ мне нужно?', 'Qancha GB kerak?'],
    progress: ['Calculator progress', 'Ход расчёта', 'Hisoblash jarayoni'],
    days: ['How many days is your trip?', 'На сколько дней вы едете?', 'Safaringiz necha kun davom etadi?'],
    other: ['Other length', 'Свой срок', 'Boshqa muddat'],
    dayCount: ['Number of days', 'Количество дней', 'Kunlar soni'],
    invalidDays: [`Enter a whole number from 1 to ${maxDays}.`, `Введите целое число от 1 до ${maxDays}.`, `1 dan ${maxDays} gacha butun son kiriting.`],
    next: ['Next', 'Дальше', 'Keyingi'],
    back: ['Back', 'Назад', 'Orqaga'],
    restart: ['Start over', 'Посчитать заново', 'Qayta hisoblash'],
    selected: ['Selected', 'Выбрано', 'Tanlangan'],
    none: ['None over mobile data', 'Только по Wi‑Fi или совсем нет', 'Faqat Wi‑Fi orqali yoki umuman yo‘q'],
    quarter: ['15 minutes', '15 минут', '15 daqiqa'],
    half: ['30 minutes', '30 минут', '30 daqiqa'],
    hour: ['1 hour', '1 час', '1 soat'],
    twoHours: ['2 hours', '2 часа', '2 soat'],
    gb: ['GB', 'ГБ', 'GB'],
    mb: ['MB', 'МБ', 'MB'],
    result: ['About {data} for {duration}', 'Около {data} на {duration}', '{duration} uchun taxminan {data}'],
    daily: ['About {data} per day', 'Около {data} в день', 'Kuniga taxminan {data}'],
    reserve: ['The trip total includes a 25% buffer', 'В итог включён запас 25%', 'Jami hajmga 25% zaxira qo‘shilgan'],
    group: ['Total for {people} people with similar usage', 'Общий объём для группы из {people} человек с одинаковым расходом', 'Bir xil sarflaydigan {people} kishi uchun jami'],
    match: ['Matching plan', 'Подходящий тариф', 'Mos tarif'],
    noDuration: ['No plans in the catalog cover that many days.', 'В каталоге нет тарифа на такой срок.', 'Katalogda bunday muddatga mos tarif yo‘q.'],
    noData: ['No plans in the catalog cover this amount for your trip length.', 'В каталоге нет тарифа с таким объёмом на ваш срок.', 'Katalogda safar muddatiga bunday hajmli tarif yo‘q.'],
    apply: ['Apply to filters', 'Применить к фильтрам', 'Filtrlarga qo‘llash']
  };
  const activities = {
    basics: {
      title: ['How often will you use maps and messaging?', 'Как часто будете пользоваться картами и мессенджерами?', 'Xarita va messenjerlardan qanchalik tez-tez foydalanasiz?'],
      light: ['Occasionally', 'Время от времени', 'Ba’zan'],
      daily: ['Every day', 'Каждый день', 'Har kuni'],
      frequent: ['Many times a day', 'Много раз за день', 'Kuniga ko‘p marta']
    },
    music: {
      title: ['How much time will you spend streaming music per day?', 'Сколько времени будете слушать музыку в день?', 'Kuniga qancha vaqt musiqa tinglaysiz?']
    },
    social: {
      title: ['How much time will you spend on social feeds and short videos per day?', 'Сколько времени будете смотреть ленту и короткие видео в день?', 'Kuniga lenta va qisqa videolarga qancha vaqt ajratasiz?']
    },
    video: {
      title: ['How much time will you spend watching videos per day?', 'Сколько времени будете смотреть видео в день?', 'Kuniga video ko‘rishga qancha vaqt ajratasiz?'],
      half: ['30 minutes in standard quality', '30 минут в обычном качестве', '30 daqiqa odatiy sifatda'],
      hour: ['1 hour in standard quality', '1 час в обычном качестве', '1 soat odatiy sifatda'],
      two: ['2 hours in standard quality', '2 часа в обычном качестве', '2 soat odatiy sifatda'],
      hdHour: ['1 hour in HD', '1 час в HD', '1 soat HD sifatda']
    },
    calls: {
      title: ['How much time will you spend on video calls per day?', 'Сколько времени займут видеозвонки в день?', 'Videoqo‘ng‘iroqlar kuniga qancha vaqt oladi?']
    },
    files: {
      title: ['What will you upload over mobile data each day?', 'Что будете отправлять через мобильную сеть в день?', 'Har kuni mobil internet orqali nimalar yuborasiz?'],
      wifi: ['Only over Wi‑Fi or nothing', 'Только по Wi‑Fi или ничего', 'Faqat Wi‑Fi orqali yoki hech narsa'],
      photos: ['About 20 photos', 'Около 20 фото', 'Taxminan 20 ta surat'],
      photosAndFile: ['Photos and a 100 MB file', 'Фото и файл на 100 МБ', 'Suratlar va 100 MB hajmli fayl'],
      large: ['Videos and files, about 500 MB', 'Видео и файлы, около 500 МБ', 'Video va fayllar, taxminan 500 MB']
    },
    people: {
      title: ['How many people need data?', 'На сколько человек нужен интернет?', 'Internet necha kishiga kerak?'],
      one: ['Just me', 'Только мне', 'Faqat menga'],
      two: ['2 people', 'Двум', '2 kishiga'],
      three: ['3 people', 'Троим', '3 kishiga'],
      four: ['4 people', 'Четверым', '4 kishiga']
    }
  };
  const russianDays = { one: 'день', few: 'дня', many: 'дней', other: 'дня' };

  let step = 0;
  let isOpen = false;
  let useCustomDays = false;
  let days = null;
  let dayDraft = '';
  let answers = {};

  const localize = (language, variants) => variants[locales[language] ?? 0];
  const text = (language, key) => localize(language, copy[key]);
  const number = (language, value, maximumFractionDigits = 0) => new Intl.NumberFormat(language, { maximumFractionDigits }).format(value);
  const dataLabel = (language, value, unit, digits) => `${number(language, value, digits)} ${text(language, unit)}`;

  function duration(language, value) {
    const unit = language === 'ru' ? russianDays[new Intl.PluralRules('ru').select(value)] :
      language === 'uz' ? 'kun' : value === 1 ? 'day' : 'days';
    return `${number(language, value)} ${unit}`;
  }

  function option(context, label, value, selected = false) {
    const { language, icon } = context;
    return `<button class="button button-secondary data-guide-option" type="button" data-guide-answer="${value}"${selected ? ' data-selected="true"' : ''}>
      <span>${label}${selected ? ` <span class="sr-only">${text(language, 'selected')}</span>` : ''}</span>${selected ? icon('check') : ''}
    </button>`;
  }

  function dayControls(context) {
    const { language, icon } = context;
    if (!useCustomDays) {
      return `<div class="data-guide-days">
        ${dayChoices.map(value => option(context, duration(language, value), value, days === value)).join('')}
        <button class="button button-secondary data-guide-option" type="button" data-guide-command="custom">${text(language, 'other')}</button>
      </div>`;
    }

    return `<form class="data-guide-custom" novalidate>
      <label for="guide-days-count">${text(language, 'dayCount')}</label>
      <div class="data-guide-custom-controls">
        <input class="input" id="guide-days-count" name="days" type="number" inputmode="numeric" required min="1" max="${maxDays}" step="1" value="${dayDraft}" aria-describedby="guide-days-error">
        <button class="button button-primary" type="submit">${text(language, 'next')}${icon('arrow-right')}</button>
      </div>
      <p class="data-guide-error" id="guide-days-error" role="alert" hidden>${text(language, 'invalidDays')}</p>
    </form>`;
  }

  function heading(language, key) {
    return key === 'days' ? text(language, key) : localize(language, activities[key].title);
  }

  function activityChoices(context, key) {
    const { language } = context;
    return `<div class="data-guide-choices">${questions[key].map(value => {
      const label = activities[key][value] ?? copy[value === 'two' ? 'twoHours' : value];
      return option(context, localize(language, label), value, answers[key] === value);
    }).join('')}</div>`;
  }

  function controls(context, restart = false) {
    const { language, icon } = context;
    return `<div class="actions data-guide-actions">
      <button class="button button-secondary" type="button" data-guide-command="back">${icon('arrow-left')}${text(language, 'back')}</button>
      ${restart ? `<button class="button button-secondary" type="button" data-guide-command="restart">${text(language, 'restart')}</button>` : ''}
    </div>`;
  }

  function resultMarkup(context) {
    const { language, icon, plans, providers } = context;
    const result = estimate(days, answers);
    const forTrip = plans.filter(plan => !plan.checkAvailability && plan.days >= result.days);
    const [plan] = forTrip.filter(plan => plan.data >= result.totalGb)
      .sort((a, b) => a.price - b.price || a.data - b.data || a.days - b.days);
    const total = dataLabel(language, result.totalGb, 'gb', result.totalGb < 1 ? 2 : 1);
    const daily = dataLabel(language, result.dailyMb, 'mb', 1);
    const title = text(language, 'result').replace('{data}', `<strong>${total}</strong>`).replace('{duration}', duration(language, result.days));
    return `<div class="data-guide-result">
      <div class="data-guide-summary">
        <h3 class="data-guide-total" data-guide-focus tabindex="-1">${title}</h3>
        <p class="data-guide-use">${text(language, 'daily').replace('{data}', daily)}. ${text(language, 'reserve')}.</p>
        ${result.people > 1 ? `<p>${text(language, 'group').replace('{people}', number(language, result.people))}.</p>` : ''}
      </div>
      ${plan ? `<div class="data-guide-match">
        <p><strong>${text(language, 'match')}</strong><span>${providers[plan.provider].name} · ${dataLabel(language, plan.data, 'gb')} · ${duration(language, plan.days)}</span></p>
        <button class="button button-primary" type="button" data-guide-command="apply">${text(language, 'apply')}${icon('arrow-right')}</button>
      </div>` : `<p class="data-guide-match">${text(language, forTrip.length ? 'noData' : 'noDuration')}</p>`}
      ${controls(context, true)}
    </div>`;
  }

  function card(context) {
    const { language } = context;
    const key = steps[step];
    return `<progress class="data-guide-progress" max="${steps.length}" value="${Math.min(step + 1, steps.length)}" aria-label="${text(language, 'progress')}"></progress>
      ${key ? `<h3 class="data-guide-question" data-guide-focus tabindex="-1">${heading(language, key)}</h3>
        ${key === 'days' ? dayControls(context) : activityChoices(context, key)}
        ${step || useCustomDays ? controls(context) : ''}` : resultMarkup(context)}`;
  }

  function render(context) {
    const { language, icon } = context;
    return `<details class="data-guide"${isOpen ? ' open' : ''}>
      <summary class="data-guide-trigger">${icon('wifi')}<span>${text(language, 'title')}</span>${icon('chevron-down')}</summary>
      <div class="panel data-guide-card">${card(context)}</div>
    </details>`;
  }

  function mount(container, context) {
    const root = container.querySelector('.data-guide');
    if (!root) return;
    const content = root.querySelector('.data-guide-card');

    function update(selector = '[data-guide-focus]') {
      content.innerHTML = card(context);
      content.querySelector(selector).focus();
    }

    root.addEventListener('toggle', () => {
      if (root.isConnected) isOpen = root.open;
    });

    content.addEventListener('click', (event) => {
      const choice = event.target.closest('[data-guide-answer]');
      if (choice) {
        const key = steps[step];
        if (key === 'days') {
          days = Number(choice.dataset.guideAnswer);
          dayDraft = days;
        } else {
          answers[key] = choice.dataset.guideAnswer;
        }
        step += 1;
        update();
        return;
      }

      switch (event.target.closest('[data-guide-command]')?.dataset.guideCommand) {
        case 'custom':
          useCustomDays = true;
          update('#guide-days-count');
          break;
        case 'back':
          if (step) step -= 1;
          else useCustomDays = false;
          update();
          break;
        case 'restart':
          step = 0;
          days = null;
          dayDraft = '';
          useCustomDays = false;
          answers = {};
          update();
          break;
        case 'apply':
          context.applyEstimate(estimate(days, answers));
          break;
      }
    });

    content.addEventListener('submit', (event) => {
      if (!event.target.matches('.data-guide-custom')) return;
      event.preventDefault();
      const input = event.target.elements.days;
      if (!input.validity.valid) {
        input.setAttribute('aria-invalid', 'true');
        event.target.querySelector('.data-guide-error').hidden = false;
        input.focus();
        return;
      }
      days = input.valueAsNumber;
      dayDraft = days;
      step += 1;
      update();
    });

    content.addEventListener('input', (event) => {
      const input = event.target;
      if (input.id !== 'guide-days-count') return;
      dayDraft = Number.isFinite(input.valueAsNumber) ? input.valueAsNumber : '';
      if (input.validity.valid) {
        input.removeAttribute('aria-invalid');
        input.form.querySelector('.data-guide-error').hidden = true;
      }
    });
  }

  return { render, mount };
})();
