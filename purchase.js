'use strict';

const TourSIMPurchase = (() => {
  const storageKey = 'toursim-purchases-v1';
  const statusOptions = ['unknown', 'pending', 'active'];
  const maxManualBalance = 10000;
  const providerHelp = {
    airalo: {
      account: 'https://www.airalo.com/my-esims',
      iosHelp: 'https://www.airalo.com/help/getting-started-with-airalo/E8DFWD88SHUX/how-do-i-install-an-esim-on-my-ios-device/3Z7U0CAC64GF',
      androidHelp: 'https://www.airalo.com/help/getting-started-with-airalo/E8DFWD88SHUX/how-do-i-install-and-start-using-an-esim-on-my-android-device/4SGRQMOETA5F',
      topUp: 'https://www.airalo.com/help/using-managing-esims/ZSEEHBT5HW6F/how-can-i-top-up-an-esim/2DMCF3341SYF'
    },
    enjoy: {
      account: 'https://enjoyesim.com/en/Customer/Login',
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
      setup: 'Phone setup guide', checkPhone: 'Check my phone',
      selected: 'Selected plan', chosen: 'Plan selected', changePlan: 'Change plan', priceNote: 'Catalog price. The provider displays the amount due at checkout.',
      trackHint: 'Already paid? Save the purchase here to track it in this browser.', track: 'Save my purchase',
      accountIntro: 'Keep your purchased plans, activation status and expiry dates in this browser.',
      savedOnly: 'Records are entered manually. Your provider account shows actual usage and activation.',
      savedOrders: 'Saved purchases', none: 'You have no saved purchases yet.',
      addHeading: 'Record a purchase', addHint: 'Choose the plan after payment is complete with the provider.',
      add: 'Add purchase', remove: 'Remove record', confirmRemove: 'Remove this purchase from this browser?',
      status: 'Activation status', expiry: 'Expiry date', balance: 'Remaining data',
      balanceProvider: 'Check with provider', manage: 'Open provider account', topUp: 'How to top up',
      newPackage: 'Buy another package', noTopUp: 'Enjoy eSIM requires a new package when data runs out.',
      edit: 'Edit eSIM details', update: 'Save changes', expiryHint: 'Use the expiry date and data balance shown by the provider, if available.',
      balanceInput: 'Remaining data (GB)', manualValue: 'Entered manually',
      unknown: 'Not recorded', pending: 'Not activated', active: 'Activated', expired: 'Expiry date passed',
      added: 'Purchase saved in this browser.', updated: 'Purchase updated.', removed: 'Purchase record removed.',
      storeError: 'Browser storage is unavailable. This purchase could not be saved.',
      recordGone: 'This purchase record has already been removed.', gb: 'GB', day: 'day', days: 'days'
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
      setup: 'Настройка телефона', checkPhone: 'Проверить телефон',
      selected: 'Выбранный тариф', chosen: 'Тариф выбран', changePlan: 'Изменить тариф', priceNote: 'Цена из каталога. Итоговую сумму покажет поставщик при оплате.',
      trackHint: 'Уже оплатили? Сохраните покупку, чтобы отслеживать её в этом браузере.', track: 'Сохранить покупку',
      accountIntro: 'Храните купленные тарифы, статусы активации и сроки действия в этом браузере.',
      savedOnly: 'Записи добавляются вручную. Фактический остаток и статус смотрите в аккаунте поставщика.',
      savedOrders: 'Сохранённые покупки', none: 'Здесь пока нет сохранённых покупок.',
      addHeading: 'Записать покупку', addHint: 'Выберите тариф, который вы уже оплатили у поставщика.',
      add: 'Добавить покупку', remove: 'Удалить запись', confirmRemove: 'Удалить запись о покупке из этого браузера?',
      status: 'Статус активации', expiry: 'Срок действия до', balance: 'Остаток интернета',
      balanceProvider: 'У поставщика', manage: 'Аккаунт поставщика', topUp: 'Как пополнить пакет',
      newPackage: 'Купить новый пакет', noTopUp: 'Когда трафик заканчивается, Enjoy eSIM предлагает купить новый пакет.',
      edit: 'Изменить данные eSIM', update: 'Сохранить изменения', expiryHint: 'Перенесите срок и остаток из аккаунта поставщика, если они известны.',
      balanceInput: 'Остаток интернета (ГБ)', manualValue: 'Введено вручную',
      unknown: 'Не указано', pending: 'Не активирована', active: 'Активирована', expired: 'Указанный срок истёк',
      added: 'Покупка сохранена в этом браузере.', updated: 'Запись обновлена.', removed: 'Запись о покупке удалена.',
      storeError: 'Хранилище браузера недоступно. Сохранить изменения не удалось.',
      recordGone: 'Запись о покупке уже удалена.', gb: 'ГБ', day: 'день', fewDays: 'дня', days: 'дней'
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
      setup: 'Telefonni sozlash', checkPhone: 'Telefonni tekshirish',
      selected: 'Tanlangan tarif', chosen: 'Tarif tanlandi', changePlan: 'Tarifni oʻzgartirish', priceNote: 'Katalogdagi narx. Yakuniy summani provayder toʻlov vaqtida koʻrsatadi.',
      trackHint: 'Toʻlab boʻldingizmi? Xarid holatini shu brauzerda kuzatish uchun uni saqlang.', track: 'Xaridni saqlash',
      accountIntro: 'Xarid qilingan tariflar, faollashuv holati va amal qilish muddatini shu brauzerda saqlang.',
      savedOnly: 'Yozuvlar qoʻlda kiritiladi. Haqiqiy qoldiq va faollashuv holati provayder hisobida koʻrsatiladi.',
      savedOrders: 'Saqlangan xaridlar', none: 'Hozircha saqlangan xaridlar yoʻq.',
      addHeading: 'Xaridni qayd etish', addHint: 'Provayder saytida toʻlovini amalga oshirgan tarifni tanlang.',
      add: 'Xarid qoʻshish', remove: 'Yozuvni oʻchirish', confirmRemove: 'Xarid yozuvi shu brauzerdan oʻchirilsinmi?',
      status: 'Faollashuv holati', expiry: 'Amal qilish sanasi', balance: 'Internet qoldigʻi',
      balanceProvider: 'Provayderda tekshiring', manage: 'Provayder hisobi', topUp: 'Paketni toʻldirish',
      newPackage: 'Yangi paket sotib olish', noTopUp: 'Trafik tugagach, Enjoy eSIM yangi paket sotib olishni taklif qiladi.',
      edit: 'eSIM maʼlumotlarini oʻzgartirish', update: 'Oʻzgarishlarni saqlash', expiryHint: 'Mavjud boʻlsa, provayder koʻrsatgan sana va trafik qoldigʻini kiriting.',
      balanceInput: 'Internet qoldigʻi (GB)', manualValue: 'Qoʻlda kiritilgan',
      unknown: 'Kiritilmagan', pending: 'Faollashtirilmagan', active: 'Faollashtirilgan', expired: 'Koʻrsatilgan muddat tugagan',
      added: 'Xarid shu brauzerda saqlandi.', updated: 'Xarid yozuvi yangilandi.', removed: 'Xarid yozuvi oʻchirildi.',
      storeError: 'Brauzer xotirasi mavjud emas. Oʻzgarishlar saqlanmadi.',
      recordGone: 'Xarid yozuvi avvalroq oʻchirilgan.', gb: 'GB', day: 'kun', days: 'kun'
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

  function store(context, providerId) {
    const { store } = context.providers[providerId];
    return store[context.language] ?? store.en;
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
          <div class="actions">
            ${plan ? internal(context, '#purchase', t.changePlan) : ''}
            ${internal(context, context.phoneHref ?? `#phone${suffix}`, t.checkPhone)}
          </div>
        </div>
        <ol class="panel esim-flow-panel esim-purchase-steps">
          <li><span class="icon-tile" aria-hidden="true">${icon(plan ? 'check' : 'sliders-horizontal')}</span><div><h2>${plan ? t.chosen : t.select}</h2>${plan ? '' : `<p>${t.selectHint}</p>`}</div></li>
          <li><span class="icon-tile" aria-hidden="true">${icon('shield-check')}</span><div><h2>${t.payment}</h2><p>${t.paymentHint}</p>${providerPayment}</div></li>
          <li><span class="icon-tile" aria-hidden="true">${icon('qr-code')}</span><div><h2>${t.qr}</h2><p>${qrHint}</p>${qrHelp}</div></li>
          <li><span class="icon-tile" aria-hidden="true">${icon('smartphone')}</span><div><h2>${t.activate}</h2><p>${t.activateHint}</p>${internal(context, context.setupHref ?? `#setup${suffix}`, t.setup)}</div></li>
        </ol>
      </div>
      ${plan ? `<form class="panel esim-flow-panel esim-track" data-esim-action="save-purchase">
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

  function readRecords() {
    try {
      const records = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
      if (!Array.isArray(records)) return [];
      return records.filter(record => record && typeof record.id === 'string' && /^[\da-f-]{36}$/.test(record.id) &&
        Object.hasOwn(providerHelp, record.provider) && Number.isFinite(record.data) && record.data > 0 &&
        Number.isInteger(record.days) && record.days > 0 && statusOptions.includes(record.status) &&
        (record.expiry === '' || validDate(record.expiry)) && validBalance(record.remaining));
    } catch {
      return [];
    }
  }

  function writeRecords(records) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(records));
      return true;
    } catch {
      return false;
    }
  }

  function newRecord(plan) {
    return {
      id: crypto.randomUUID(),
      provider: plan.provider,
      data: plan.data,
      days: plan.days,
      status: 'unknown',
      expiry: '',
      remaining: null
    };
  }

  function localDate() {
    const now = new Date();
    return [now.getFullYear(), now.getMonth() + 1, now.getDate()].map(value => String(value).padStart(2, '0')).join('-');
  }

  function renderRecord(context, record) {
    const t = labels(context);
    const provider = context.providers[record.provider];
    const help = providerHelp[record.provider];
    const metrics = formatPlan(context, record);
    const expiry = record.expiry ? new Intl.DateTimeFormat(context.language, { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${record.expiry}T00:00:00Z`)) : t.unknown;
    const expired = record.expiry && record.expiry < localDate();
    const balance = record.remaining == null ? t.balanceProvider : `${new Intl.NumberFormat(context.language).format(record.remaining)} ${t.gb}<small>${t.manualValue}</small>`;
    const offer = help.topUp ? external(context, help.topUp, t.topUp) : external(context, store(context, record.provider), t.newPackage);

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
      <div class="esim-record-links actions">${external(context, help.account, t.manage)}${offer}</div>
      ${help.topUp ? '' : `<p class="note">${t.noTopUp}</p>`}
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
        <p class="esim-flow-lede">${t.accountIntro}</p>
      </div>
      <div class="esim-account-grid">
        <section class="esim-account-list" aria-labelledby="esim-saved-heading">
          <h2 id="esim-saved-heading" tabindex="-1">${t.savedOrders}</h2>
          <p class="note">${t.savedOnly}</p>
          <div class="esim-account-records" data-esim-records>${renderRecords(context, readRecords())}</div>
        </section>
        <section class="panel esim-flow-panel esim-add-panel" aria-labelledby="esim-add-heading">
          <h2 id="esim-add-heading">${t.addHeading}</h2><p class="note">${t.addHint}</p>
          <form class="esim-flow-form" data-esim-action="add">
            <label class="esim-field" for="esim-account-plan"><span>${t.select}</span><select id="esim-account-plan" name="plan" class="input" required>${planOptions(context)}</select></label>
            <button class="button button-primary" type="submit">${t.add}${context.icon('arrow-right')}</button>
          </form>
          <p data-esim-feedback class="esim-feedback" role="status"></p>
        </section>
      </div>
    </section>`;
  }

  function mount(container, context) {
    const root = container.querySelector('[data-esim-page]');
    if (!root) return;
    const t = labels(context);
    const feedback = root.querySelector('[data-esim-feedback]');
    const recordsContainer = root.querySelector('[data-esim-records]');

    function save(records, message, recordId) {
      if (!writeRecords(records)) {
        feedback.textContent = t.storeError;
        feedback.dataset.error = 'true';
        return false;
      }
      feedback.textContent = message;
      delete feedback.dataset.error;
      if (recordsContainer) {
        recordsContainer.innerHTML = renderRecords(context, records);
        (recordId ? document.getElementById(`record-${recordId}`) : root.querySelector('#esim-saved-heading'))?.focus();
      }
      return true;
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
      const records = readRecords();
      if (action === 'add' || action === 'save-purchase') {
        const plan = action === 'add' ? context.plans.find(plan => plan.id === fields.get('plan')) : context.plan;
        if (!plan) return;
        const record = newRecord(plan);
        if (!save([record, ...records], t.added, record.id)) return;
        if (action === 'save-purchase') location.hash = 'account';
        else form.reset();
      } else if (action === 'update') {
        const id = form.closest('[data-esim-record]').dataset.esimRecord;
        const record = records.find(record => record.id === id);
        const status = fields.get('status');
        const expiry = fields.get('expiry');
        const remaining = fields.get('remaining') === '' ? null : Number(fields.get('remaining'));
        if (!record) {
          feedback.textContent = t.recordGone;
          return;
        }
        if (!statusOptions.includes(status) || (expiry !== '' && !validDate(expiry)) || !validBalance(remaining)) return;
        Object.assign(record, { status, expiry, remaining });
        save(records, t.updated, id);
      }
    });

    root.addEventListener('click', event => {
      const button = event.target.closest('[data-esim-remove]');
      if (!button || !window.confirm(t.confirmRemove)) return;
      const id = button.closest('[data-esim-record]').dataset.esimRecord;
      save(readRecords().filter(record => record.id !== id), t.removed);
    });
  }

  return { renderPurchase, renderAccount, mount };
})();
