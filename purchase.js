'use strict';

const TourSIMPurchase = (() => {
  const storageKey = 'toursim-purchases-v1';
  const statusOptions = ['unknown', 'pending', 'active'];
  const maxManualBalance = 10000;
  const importBatchSize = 30;
  const recordIdPattern = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/;
  let authAction = 'login';
  let pendingWrite;
  const sessionEvents = typeof BroadcastChannel === 'function' ? new BroadcastChannel('toursim-session') : null;
  sessionEvents?.addEventListener('message', () => {
    document.querySelector('[data-esim-profile]')?.dispatchEvent(new Event('toursim-session-changed'));
  });
  const providerHelp = {
    airalo: {
      iosHelp: 'https://www.airalo.com/help/getting-started-with-airalo/E8DFWD88SHUX/how-do-i-install-an-esim-on-my-ios-device/3Z7U0CAC64GF',
      androidHelp: 'https://www.airalo.com/help/getting-started-with-airalo/E8DFWD88SHUX/how-do-i-install-and-start-using-an-esim-on-my-android-device/4SGRQMOETA5F'
    },
    enjoy: {
      qrHelp: 'https://enjoyesim.com/en/faq'
    }
  };
  const copy = {
    en: {
      purchase: 'Buy and activate eSIM', account: 'My eSIMs', catalog: 'View all plans', planDetails: 'Back to plan',
      select: 'Choose a plan', choose: 'Select plan', selectHint: 'Choose the package you want to use in Uzbekistan.',
      payment: 'Pay the provider', paymentHint: 'Match the data allowance and validity to your choice. Check the final price and currency before paying.',
      checkout: 'Continue to {provider}', qr: 'Get your QR code',
      qrDefault: 'Open the installation instructions supplied by the provider after payment.',
      qrAiralo: 'Open your purchased eSIM in Airalo and look for the installation or sharing options.',
      qrEnjoy: 'Open the QR code sent by Enjoy eSIM to the email address used at checkout.',
      qrHelp: 'Provider instructions', activate: 'Install and activate',
      activateHint: 'Use the QR code or the provider’s direct installation instructions. Follow the provider’s timing for activation.',
      setup: 'Phone setup guide',
      selected: 'Selected plan', chosen: 'Plan selected', changePlan: 'Change plan', priceNote: 'Catalog price. The provider displays the amount due at checkout.',
      trackHint: 'Already paid? Save the purchase to your TourSIM account.', track: 'Save my purchase',
      accountIntro: 'Manage the eSIM purchases saved to your TourSIM account.',
      savedOnly: 'Records are entered manually. Your provider account shows actual usage and activation.',
      savedOrders: 'Saved purchases', none: 'You have no saved purchases yet.',
      addHeading: 'Record a purchase', addHint: 'Choose the plan after payment is complete with the provider.',
      add: 'Add purchase', remove: 'Remove record', confirmRemove: 'Remove this purchase from your account?',
      status: 'Activation status', expiry: 'Expiry date', balance: 'Remaining data',
      balanceProvider: 'Check with provider',
      edit: 'Edit eSIM details', update: 'Save changes', expiryHint: 'Use the expiry date and data balance shown by the provider, if available.',
      balanceInput: 'Remaining data (GB)', manualValue: 'Entered manually',
      unknown: 'Not recorded', pending: 'Not activated', active: 'Activated', expired: 'Expiry date passed',
      added: 'Purchase saved.', updated: 'Purchase updated.', removed: 'Purchase record removed.',
      gb: 'GB', day: 'day', days: 'days',
      login: 'Sign in', register: 'Create account', logout: 'Sign out', email: 'Email', password: 'Password',
      passwordHint: 'Use at least 15 characters.', authIntro: 'Sign in or create an account to save your purchases.',
      authPlanIntro: 'Sign in or create an account to save your selected plan.', loading: 'Loading your account…', retry: 'Try again',
      importHint: 'This browser has purchases saved before accounts were available.', import: 'Import purchases', imported: 'Purchases imported.',
      unavailable: 'Could not connect to TourSIM. Try again.',
      invalid_email: 'Enter a valid email address.', invalid_password: 'Use a password with 15 to 128 characters.',
      email_taken: 'An account already uses this email. Sign in to continue.', invalid_credentials: 'The email or password is incorrect.',
      rate_limited: 'Too many attempts. Wait a few minutes and try again.', signed_out: 'Sign in to continue.',
      record_gone: 'This purchase record has already been removed.', invalid_record: 'Check the purchase details and try again.'
    },
    ru: {
      purchase: 'Покупка и активация eSIM', account: 'Личный кабинет', catalog: 'Все тарифы', planDetails: 'К тарифу',
      select: 'Выберите тариф', choose: 'Выбрать тариф', selectHint: 'Выберите пакет для поездки по Узбекистану.',
      payment: 'Оплатите у поставщика', paymentHint: 'Сверьте объём и срок выбранного пакета. Перед оплатой проверьте итоговую сумму и валюту.',
      checkout: 'Перейти в {provider}', qr: 'Получите QR-код',
      qrDefault: 'После оплаты откройте инструкцию по установке от поставщика.',
      qrAiralo: 'Откройте купленную eSIM в Airalo и перейдите к настройкам установки или отправки.',
      qrEnjoy: 'Откройте QR-код из письма Enjoy eSIM, отправленного на адрес из заказа.',
      qrHelp: 'Инструкция поставщика', activate: 'Установите и активируйте eSIM',
      activateHint: 'Используйте QR-код или прямую установку. Когда активировать eSIM, уточните в инструкции поставщика.',
      setup: 'Настройка телефона',
      selected: 'Выбранный тариф', chosen: 'Тариф выбран', changePlan: 'Изменить тариф', priceNote: 'Цена из каталога. Итоговую сумму покажет поставщик при оплате.',
      trackHint: 'Уже оплатили? Сохраните покупку в личном кабинете TourSIM.', track: 'Сохранить покупку',
      accountIntro: 'Управляйте покупками eSIM, сохранёнными в личном кабинете TourSIM.',
      savedOnly: 'Записи добавляются вручную. Фактический остаток и статус смотрите в аккаунте поставщика.',
      savedOrders: 'Сохранённые покупки', none: 'Здесь пока нет сохранённых покупок.',
      addHeading: 'Записать покупку', addHint: 'Выберите тариф, который вы уже оплатили у поставщика.',
      add: 'Добавить покупку', remove: 'Удалить запись', confirmRemove: 'Удалить запись о покупке из личного кабинета?',
      status: 'Статус активации', expiry: 'Срок действия до', balance: 'Остаток интернета',
      balanceProvider: 'У поставщика',
      edit: 'Изменить данные eSIM', update: 'Сохранить изменения', expiryHint: 'Перенесите срок и остаток из аккаунта поставщика, если они известны.',
      balanceInput: 'Остаток интернета (ГБ)', manualValue: 'Введено вручную',
      unknown: 'Не указано', pending: 'Не активирована', active: 'Активирована', expired: 'Указанный срок истёк',
      added: 'Покупка сохранена.', updated: 'Запись обновлена.', removed: 'Запись о покупке удалена.',
      gb: 'ГБ', day: 'день', fewDays: 'дня', days: 'дней',
      login: 'Войти', register: 'Создать аккаунт', logout: 'Выйти', email: 'Электронная почта', password: 'Пароль',
      passwordHint: 'Минимум 15 символов.', authIntro: 'Войдите или создайте аккаунт, чтобы сохранять покупки.',
      authPlanIntro: 'Войдите или создайте аккаунт, чтобы сохранить выбранный тариф.', loading: 'Загружаем личный кабинет…', retry: 'Повторить',
      importHint: 'В этом браузере есть покупки, сохранённые до появления личного кабинета.', import: 'Перенести покупки', imported: 'Покупки перенесены.',
      unavailable: 'Не удалось подключиться к TourSIM. Попробуйте ещё раз.',
      invalid_email: 'Введите действительный адрес электронной почты.', invalid_password: 'Введите пароль длиной от 15 до 128 символов.',
      email_taken: 'На эту почту уже зарегистрирован аккаунт. Войдите, чтобы продолжить.', invalid_credentials: 'Неверная почта или пароль.',
      rate_limited: 'Слишком много попыток. Подождите несколько минут и повторите вход.', signed_out: 'Войдите, чтобы продолжить.',
      record_gone: 'Запись о покупке уже удалена.', invalid_record: 'Проверьте данные покупки и попробуйте ещё раз.'
    },
    uz: {
      purchase: 'eSIM xaridi va faollashtirish', account: 'Shaxsiy kabinet', catalog: 'Barcha tariflar', planDetails: 'Tarifga qaytish',
      select: 'Tarifni tanlang', choose: 'Tarifni tanlash', selectHint: 'Oʻzbekistonga safaringiz uchun paketni tanlang.',
      payment: 'Provayderda toʻlang', paymentHint: 'Paket hajmi va muddatini tekshiring. Toʻlovdan oldin yakuniy narx va valyutani koʻring.',
      checkout: '{provider} saytiga oʻtish', qr: 'QR-kodni oling',
      qrDefault: 'Toʻlovdan soʻng provayder bergan oʻrnatish yoʻriqnomasini oching.',
      qrAiralo: 'Xarid qilingan eSIMʼni Airaloʼda oching va oʻrnatish yoki ulashish boʻlimiga oʻting.',
      qrEnjoy: 'Buyurtmadagi elektron pochtaga Enjoy eSIM yuborgan QR-kodni oching.',
      qrHelp: 'Provayder yoʻriqnomasi', activate: 'eSIMʼni oʻrnating va faollashtiring',
      activateHint: 'QR-kod yoki bevosita oʻrnatish usulidan foydalaning. Qachon faollashtirish uchun provayder yoʻriqnomasiga qarang.',
      setup: 'Telefonni sozlash',
      selected: 'Tanlangan tarif', chosen: 'Tarif tanlandi', changePlan: 'Tarifni oʻzgartirish', priceNote: 'Katalogdagi narx. Yakuniy summani provayder toʻlov vaqtida koʻrsatadi.',
      trackHint: 'Toʻlab boʻldingizmi? Xaridni TourSIM hisobingizda saqlang.', track: 'Xaridni saqlash',
      accountIntro: 'TourSIM hisobingizda saqlangan eSIM xaridlarini boshqaring.',
      savedOnly: 'Yozuvlar qoʻlda kiritiladi. Haqiqiy qoldiq va faollashuv holati provayder hisobida koʻrsatiladi.',
      savedOrders: 'Saqlangan xaridlar', none: 'Hozircha saqlangan xaridlar yoʻq.',
      addHeading: 'Xaridni qayd etish', addHint: 'Provayder saytida toʻlovini amalga oshirgan tarifni tanlang.',
      add: 'Xarid qoʻshish', remove: 'Yozuvni oʻchirish', confirmRemove: 'Xarid yozuvi hisobingizdan oʻchirilsinmi?',
      status: 'Faollashuv holati', expiry: 'Amal qilish sanasi', balance: 'Internet qoldigʻi',
      balanceProvider: 'Provayderda tekshiring',
      edit: 'eSIM maʼlumotlarini oʻzgartirish', update: 'Oʻzgarishlarni saqlash', expiryHint: 'Mavjud boʻlsa, provayder koʻrsatgan sana va trafik qoldigʻini kiriting.',
      balanceInput: 'Internet qoldigʻi (GB)', manualValue: 'Qoʻlda kiritilgan',
      unknown: 'Kiritilmagan', pending: 'Faollashtirilmagan', active: 'Faollashtirilgan', expired: 'Koʻrsatilgan muddat tugagan',
      added: 'Xarid saqlandi.', updated: 'Xarid yozuvi yangilandi.', removed: 'Xarid yozuvi oʻchirildi.',
      gb: 'GB', day: 'kun', days: 'kun',
      login: 'Kirish', register: 'Hisob ochish', logout: 'Chiqish', email: 'Elektron pochta', password: 'Parol',
      passwordHint: 'Kamida 15 ta belgi ishlating.', authIntro: 'Xaridlarni saqlash uchun hisobga kiring yoki yangi hisob oching.',
      authPlanIntro: 'Tanlangan tarifni saqlash uchun hisobga kiring yoki yangi hisob oching.', loading: 'Hisob yuklanmoqda…', retry: 'Qayta urinib koʻring',
      importHint: 'Bu brauzerda hisob ochish imkoniyati paydo boʻlishidan oldin saqlangan xaridlar bor.', import: 'Xaridlarni koʻchirish', imported: 'Xaridlar koʻchirildi.',
      unavailable: 'TourSIM bilan bogʻlanib boʻlmadi. Qayta urinib koʻring.',
      invalid_email: 'Toʻgʻri elektron pochta manzilini kiriting.', invalid_password: '15 tadan 128 tagacha belgili parol kiriting.',
      email_taken: 'Bu elektron pochta bilan hisob ochilgan. Davom etish uchun kiring.', invalid_credentials: 'Elektron pochta yoki parol notoʻgʻri.',
      rate_limited: 'Juda koʻp urinish. Bir necha daqiqa kutib, qayta urinib koʻring.', signed_out: 'Davom etish uchun hisobga kiring.',
      record_gone: 'Xarid yozuvi avvalroq oʻchirilgan.', invalid_record: 'Xarid maʼlumotlarini tekshiring va qayta urinib koʻring.'
    }
  };

  function labels(context) {
    return copy[context.language] ?? copy.en;
  }

  function formatPlan(context, plan) {
    const t = labels(context);
    const language = context.language;
    const number = new Intl.NumberFormat(language);
    const dayWord = { one: t.day, few: t.fewDays ?? t.days }[new Intl.PluralRules(language).select(plan.days)] ?? t.days;
    return {
      data: `${number.format(plan.data)} ${t.gb}`,
      days: `${number.format(plan.days)} ${dayWord}`,
      price: plan.price == null ? '' : `${number.format(plan.price)} USD`
    };
  }

  function planOptions(context) {
    return `<option value="" selected disabled>${labels(context).select}</option>${context.plans.map(plan => {
      const metrics = formatPlan(context, plan);
      return `<option value="${plan.id}">${context.providers[plan.provider].name} · ${metrics.data} · ${metrics.days} · ${metrics.price}</option>`;
    }).join('')}`;
  }

  function external(context, href, label, className = 'text-action') {
    return `<a class="${className}" href="${href}" target="_blank" rel="noopener noreferrer">${label}${context.icon('arrow-up-right')}</a>`;
  }

  function internal(context, href, label, className = 'text-action') {
    return `<a class="${className}" href="${href}">${label}${context.icon('arrow-right')}</a>`;
  }

  function renderPurchase(context) {
    const t = labels(context);
    const { plan, icon, providers } = context;
    const provider = plan ? providers[plan.provider] : null;
    const metrics = plan ? formatPlan(context, plan) : null;
    const help = plan ? providerHelp[plan.provider] : null;
    const back = plan ? context.planHref?.(plan) ?? `#plan/${plan.id}` : '#plans';
    const qrHint = { airalo: t.qrAiralo, enjoy: t.qrEnjoy }[plan?.provider] ?? t.qrDefault;
    const suffix = plan ? `/${plan.id}` : '';
    const providerPayment = provider ? external(context, context.purchaseHref(plan), t.checkout.replace('{provider}', provider.name), 'button button-primary') : '';
    const qrHelp = help?.iosHelp ? `<div class="actions">${external(context, help.iosHelp, 'iPhone')}${external(context, help.androidHelp, 'Android')}</div>` :
      help?.qrHelp ? external(context, help.qrHelp, t.qrHelp) : '';

    return `<section class="container page esim-flow" data-esim-page="purchase" aria-labelledby="esim-purchase-title">
      <div class="page-top">
        <a class="text-action" href="${back}">${icon('arrow-left')}${plan ? t.planDetails : t.catalog}</a>
        <h1 class="page-title" id="esim-purchase-title" tabindex="-1">${t.purchase}</h1>
      </div>
      <div class="esim-flow-grid">
        <div class="panel esim-flow-panel">
          ${plan ? `<h2>${t.selected}</h2>` : `<form class="esim-flow-form" data-esim-action="choose">
            <label class="esim-field" for="esim-purchase-plan"><span>${t.select}</span>
              <select id="esim-purchase-plan" name="plan" class="input" required>${planOptions(context)}</select>
            </label>
            <button class="button button-secondary" type="submit">${t.choose}${icon('arrow-right')}</button>
          </form>`}
          ${plan ? `<div class="esim-selected">
            <div><span class="carrier"><span class="provider-mark${plan.provider === 'enjoy' ? ' provider-enjoy' : ''}">${provider.initial}</span>${provider.name}</span>
              <div class="esim-selected-data">${metrics.data} <span>· ${metrics.days}</span></div></div>
            <strong class="esim-selected-price">${metrics.price}</strong>
          </div><p class="note">${t.priceNote}</p>
          <p class="note${plan.checkAvailability ? ' plan-availability' : ''}">${context.purchaseHint(plan)}</p>` : ''}
          <p class="note">${context.phoneCheck}</p>
          ${plan ? `<div class="actions">${internal(context, '#purchase', t.changePlan)}</div>` : ''}
        </div>
        <ol class="panel esim-flow-panel esim-purchase-steps">
          <li><span class="icon-tile" aria-hidden="true">${icon(plan ? 'check' : 'sliders-horizontal')}</span><div><h2>${plan ? t.chosen : t.select}</h2>${plan ? '' : `<p>${t.selectHint}</p>`}</div></li>
          <li><span class="icon-tile" aria-hidden="true">${icon('shield-check')}</span><div><h2>${t.payment}</h2><p>${t.paymentHint}</p>${providerPayment}</div></li>
          <li><span class="icon-tile" aria-hidden="true">${icon('qr-code')}</span><div><h2>${t.qr}</h2><p>${qrHint}</p>${qrHelp}</div></li>
          <li><span class="icon-tile" aria-hidden="true">${icon('smartphone')}</span><div><h2>${t.activate}</h2><p>${t.activateHint}</p>${internal(context, context.setupHref ?? `#setup${suffix}`, t.setup)}</div></li>
        </ol>
      </div>
      ${plan ? `<form class="panel esim-flow-panel esim-track" method="post" data-esim-action="save-purchase">
        <p>${t.trackHint}</p><button class="button button-secondary" type="submit">${t.track}${icon('check')}</button>
        <p data-esim-feedback class="esim-feedback" role="status"></p>
      </form>` : ''}
    </section>`;
  }

  function validDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }

  function validBalance(value) {
    return value == null || (Number.isFinite(value) && value >= 0 && value <= maxManualBalance);
  }

  function readLegacyRecords() {
    try {
      const records = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
      if (!Array.isArray(records)) return [];
      return records.filter(record => record && typeof record.id === 'string' && recordIdPattern.test(record.id) &&
        Object.hasOwn(providerHelp, record.provider) && Number.isFinite(record.data) && record.data > 0 &&
        Number.isSafeInteger(record.days) && record.days > 0 && statusOptions.includes(record.status) &&
        (record.expiry === '' || validDate(record.expiry)) && validBalance(record.remaining))
        .map(({ id, provider, data, days, status, expiry, remaining }) => ({ id, provider, data, days, status, expiry, remaining: remaining ?? null }));
    } catch {
      return [];
    }
  }

  function removeImportedRecords(records) {
    try {
      const imported = new Set(records.map(record => record.id));
      const remaining = readLegacyRecords().filter(record => !imported.has(record.id));
      if (remaining.length) localStorage.setItem(storageKey, JSON.stringify(remaining));
      else localStorage.removeItem(storageKey);
    } catch {}
  }

  function localDate() {
    const now = new Date();
    return [now.getFullYear(), now.getMonth() + 1, now.getDate()].map(value => String(value).padStart(2, '0')).join('-');
  }

  function renderRecord(context, record) {
    const t = labels(context);
    const provider = context.providers[record.provider];
    const metrics = formatPlan(context, record);
    const expiry = record.expiry ? new Intl.DateTimeFormat(context.language, { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${record.expiry}T00:00:00Z`)) : t.unknown;
    const expired = record.expiry && record.expiry < localDate();
    const balance = record.remaining == null ? t.balanceProvider : `${new Intl.NumberFormat(context.language).format(record.remaining)} ${t.gb}<small>${t.manualValue}</small>`;

    return `<article class="panel esim-flow-panel esim-record" aria-labelledby="record-${record.id}" data-esim-record="${record.id}">
      <header class="esim-record-header">
        <h3 id="record-${record.id}" tabindex="-1" class="carrier"><span class="provider-mark${record.provider === 'enjoy' ? ' provider-enjoy' : ''}">${provider.initial}</span>${provider.name} · ${metrics.data}</h3>
        <span class="esim-record-term">${metrics.days}</span>
      </header>
      <dl class="metrics esim-record-metrics">
        <div><dt>${t.status}</dt><dd>${t[record.status]}</dd></div>
        <div><dt>${t.expiry}</dt><dd>${expiry}${expired ? `<small>${t.expired}</small>` : ''}</dd></div>
        <div><dt>${t.balance}</dt><dd>${balance}</dd></div>
      </dl>
      <details class="esim-record-edit">
        <summary>${t.edit}</summary>
        <form class="esim-flow-form esim-edit-form" data-esim-action="update">
          <label class="esim-field"><span>${t.status}</span><select name="status" class="input">${statusOptions.map(status => `<option value="${status}"${status === record.status ? ' selected' : ''}>${t[status]}</option>`).join('')}</select></label>
          <label class="esim-field"><span>${t.expiry}</span><input name="expiry" class="input" type="date" value="${record.expiry}" aria-describedby="expiry-${record.id}"></label>
          <label class="esim-field"><span>${t.balanceInput}</span><input name="remaining" class="input" type="number" min="0" max="${maxManualBalance}" step="0.01" value="${record.remaining ?? ''}" aria-describedby="expiry-${record.id}"></label>
          <p class="note" id="expiry-${record.id}">${t.expiryHint}</p>
          <div class="actions"><button class="button button-secondary" type="submit">${t.update}</button>
            <button type="button" class="esim-remove" data-esim-remove>${t.remove}</button></div>
        </form>
      </details>
    </article>`;
  }

  function renderRecords(context, records) {
    return records.length ? records.map(record => renderRecord(context, record)).join('') : `<div class="panel esim-empty"><span class="icon-tile" aria-hidden="true">${context.icon('smartphone')}</span><p>${labels(context).none}</p></div>`;
  }

  function renderAccount(context) {
    const t = labels(context);
    return `<section class="container page esim-flow" data-esim-page="account" aria-labelledby="esim-account-title">
      <div class="page-top">
        <a class="text-action" href="#plans">${context.icon('arrow-left')}${t.catalog}</a>
        <h1 class="page-title" id="esim-account-title" tabindex="-1">${t.account}</h1>
      </div>
      <div class="esim-account-body" data-esim-profile><p class="note" role="status">${t.loading}</p></div>
    </section>`;
  }

  function renderAuth(t, plan, action) {
    const registering = action === 'register';
    return `<section class="panel esim-flow-panel esim-auth" aria-label="${t[action]}">
      <p class="esim-flow-lede">${plan ? t.authPlanIntro : t.authIntro}</p>
      <div class="esim-auth-switch">
        ${['login', 'register'].map(mode => `<button type="button" data-esim-auth="${mode}" aria-pressed="${mode === action}">${t[mode]}</button>`).join('')}
      </div>
      <form class="esim-flow-form" method="post" action="/api/${action}" data-esim-action="${action}">
        <label class="esim-field"><span>${t.email}</span><input class="input" type="email" name="email" autocomplete="username" autocapitalize="none" spellcheck="false" maxlength="254" required></label>
        <label class="esim-field"><span>${t.password}</span><input class="input" type="password" name="password" autocomplete="${registering ? 'new-password' : 'current-password'}" maxlength="256"${registering ? ' aria-describedby="esim-password-hint"' : ''} required></label>
        ${registering ? `<p class="note" id="esim-password-hint">${t.passwordHint}</p>` : ''}
        <button class="button button-primary" type="submit">${t[action]}</button>
        <p data-esim-feedback class="esim-feedback" role="status"></p>
      </form>
    </section>`;
  }

  function renderDashboard(context, records) {
    const t = labels(context);
    return `<div class="esim-account-toolbar">
        <p data-esim-email dir="auto"></p>
        <button type="button" class="button button-secondary" data-esim-logout>${t.logout}</button>
      </div>
      <p class="esim-flow-lede">${t.accountIntro}</p>
      <div class="panel esim-flow-panel esim-track" data-esim-legacy hidden>
        <p>${t.importHint}</p><button type="button" class="button button-secondary" data-esim-import>${t.import}</button>
      </div>
      <div class="esim-account-grid">
        <section class="esim-account-list" aria-labelledby="esim-saved-heading">
          <h2 id="esim-saved-heading" tabindex="-1">${t.savedOrders}</h2>
          <p class="note">${t.savedOnly}</p>
          <p data-esim-feedback class="esim-feedback" role="status"></p>
          <div class="esim-account-records" data-esim-records>${renderRecords(context, records)}</div>
        </section>
        <section class="panel esim-flow-panel esim-add-panel" aria-labelledby="esim-add-heading">
          <h2 id="esim-add-heading">${t.addHeading}</h2><p class="note">${t.addHint}</p>
          <form class="esim-flow-form" method="post" data-esim-action="add">
            <label class="esim-field" for="esim-account-plan"><span>${t.select}</span><select id="esim-account-plan" name="plan" class="input" required>${planOptions(context)}</select></label>
            <button class="button button-primary" type="submit">${t.add}${context.icon('arrow-right')}</button>
          </form>
        </section>
      </div>`;
  }

  async function api(path, method = 'GET', body) {
    const options = { method, credentials: 'same-origin' };
    if (body !== undefined) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(body);
    }
    const response = await fetch(`/api/${path}`, options);
    const result = await response.json();
    if (!response.ok) {
      const error = new Error('TourSIM request failed');
      error.code = result.error;
      throw error;
    }
    return result;
  }

  function mount(container, context) {
    const root = container.querySelector('[data-esim-page]');
    if (!root) return;
    const t = labels(context);
    const profile = root.querySelector('[data-esim-profile]');
    const purchaseAttempts = new Map();
    let selectedPlan = context.plan;
    let profileLoad = 0;

    function setFeedback(message, error = false) {
      const feedback = root.querySelector('[data-esim-feedback]');
      feedback.textContent = message;
      if (error) feedback.dataset.error = 'true';
      else delete feedback.dataset.error;
    }

    function showProfile({ user, records }) {
      profile.innerHTML = user ? renderDashboard(context, records) : renderAuth(t, selectedPlan, authAction);
      if (!user) return;
      profile.querySelector('[data-esim-email]').textContent = user.email;
      profile.querySelector('[data-esim-legacy]').hidden = readLegacyRecords().length === 0;
      if (selectedPlan) profile.querySelector('#esim-account-plan').value = selectedPlan.id;
    }

    async function loadProfile() {
      const load = ++profileLoad;
      try {
        await pendingWrite;
        if (!root.isConnected || load !== profileLoad) return;
        profile.innerHTML = `<p class="note" role="status">${t.loading}</p>`;
        const result = await api('account');
        if (root.isConnected && load === profileLoad) showProfile(result);
      } catch {
        if (!root.isConnected || load !== profileLoad) return;
        profile.innerHTML = `<div class="panel esim-flow-panel esim-auth"><p role="status">${t.unavailable}</p>
          <button type="button" class="button button-secondary" data-esim-retry>${t.retry}</button></div>`;
      }
    }

    function showRecords(records, message, focusId) {
      root.querySelector('[data-esim-records]').innerHTML = renderRecords(context, records);
      if (message) setFeedback(message);
      if (focusId) (root.querySelector(`[data-esim-record="${focusId}"] h3`) ?? root.querySelector('#esim-saved-heading')).focus();
    }

    function submit(button, operation) {
      if (pendingWrite) return;
      button.disabled = true;
      setFeedback('');
      pendingWrite = operation().catch(error => {
        if (!root.isConnected) return;
        if (error.code === 'signed_out') {
          if (!profile) {
            location.hash = `account/${selectedPlan.id}`;
            return;
          }
          authAction = 'login';
          showProfile({ user: null });
        }
        setFeedback(Object.hasOwn(t, error.code) ? t[error.code] : t.unavailable, true);
      }).finally(() => {
        button.disabled = false;
        pendingWrite = undefined;
      });
    }

    root.addEventListener('submit', event => {
      const form = event.target;
      const action = form.dataset.esimAction;
      if (!action) return;
      event.preventDefault();
      const fields = new FormData(form);
      if (action === 'choose') {
        const id = fields.get('plan');
        if (context.plans.some(plan => plan.id === id)) location.hash = `purchase/${id}`;
        return;
      }
      submit(form.querySelector('button[type="submit"]'), async () => {
        if (action === 'login' || action === 'register') {
          const result = await api(action, 'POST', { email: fields.get('email'), password: fields.get('password') });
          authAction = 'login';
          sessionEvents?.postMessage('changed');
          if (!root.isConnected) return;
          showProfile(result);
          root.querySelector(selectedPlan ? '#esim-account-plan' : '#esim-saved-heading').focus();
        } else if (action === 'add' || action === 'save-purchase') {
          const planId = action === 'add' ? fields.get('plan') : selectedPlan.id;
          const purchaseId = purchaseAttempts.get(planId) ?? crypto.randomUUID();
          purchaseAttempts.set(planId, purchaseId);
          const { records, id } = await api('purchases', 'POST', { planId, id: purchaseId });
          purchaseAttempts.delete(planId);
          if (!root.isConnected) return;
          if (action === 'save-purchase') {
            location.hash = 'account';
            return;
          }
          if (selectedPlan) {
            selectedPlan = undefined;
            history.replaceState(history.state, '', '#account');
          }
          form.reset();
          showRecords(records, t.added, id);
        } else if (action === 'update') {
          const id = form.closest('[data-esim-record]').dataset.esimRecord;
          const status = fields.get('status');
          const expiry = fields.get('expiry');
          const remaining = fields.get('remaining') === '' ? null : Number(fields.get('remaining'));
          const { records } = await api(`purchases/${id}`, 'PATCH', { status, expiry, remaining });
          if (root.isConnected) showRecords(records, t.updated, id);
        }
      });
    });

    root.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button || pendingWrite) return;
      if (button.matches('[data-esim-auth]') && button.dataset.esimAuth !== authAction) {
        const email = profile.querySelector('input[name="email"]').value;
        authAction = button.dataset.esimAuth;
        showProfile({ user: null });
        const emailInput = profile.querySelector('input[name="email"]');
        emailInput.value = email;
        emailInput.focus();
      } else if (button.matches('[data-esim-retry]')) {
        loadProfile();
      } else if (button.matches('[data-esim-logout]')) {
        submit(button, async () => {
          await api('logout', 'POST', {});
          authAction = 'login';
          sessionEvents?.postMessage('changed');
          if (!root.isConnected) return;
          showProfile({ user: null });
          profile.querySelector('input[name="email"]').focus();
        });
      } else if (button.matches('[data-esim-remove]') && window.confirm(t.confirmRemove)) {
        submit(button, async () => {
          const id = button.closest('[data-esim-record]').dataset.esimRecord;
          const { records } = await api(`purchases/${id}`, 'DELETE');
          if (root.isConnected) showRecords(records, t.removed, id);
        });
      } else if (button.matches('[data-esim-import]')) {
        submit(button, async () => {
          const legacy = readLegacyRecords();
          for (let end = legacy.length; end > 0; end -= importBatchSize) {
            const batch = legacy.slice(Math.max(0, end - importBatchSize), end);
            const { records } = await api('purchases/import', 'POST', { records: batch });
            removeImportedRecords(batch);
            if (!root.isConnected) return;
            showRecords(records);
          }
          profile.querySelector('[data-esim-legacy]').hidden = readLegacyRecords().length === 0;
          setFeedback(t.imported);
          profile.querySelector('#esim-saved-heading').focus();
        });
      }
    });

    if (profile) {
      profile.addEventListener('toursim-session-changed', loadProfile);
      loadProfile();
    }
  }

  return { renderPurchase, renderAccount, mount };
})();
