'use strict';

const TourSIMDemoCheckout = (() => {
  const testCard = {
    number: '4242 4242 4242 4242',
    expiry: '12/30',
    cvv: '123'
  };
  const cardValue = {
    number: value => value.replace(/[\s-]/g, ''),
    expiry: value => value.replace(/^(\d{2})\s*\/\s*(\d{2})$/, '$1$2'),
    cvv: value => value
  };
  const labels = {
    en: {
      title: 'Demo checkout', back: 'Back to plan', card: 'Card payment', summary: 'Selected plan',
      data: 'Data', days: 'Validity', amount: 'Demo amount', gb: 'GB', day: 'day', pluralDays: 'days',
      demo: 'Use the test details below. This demo does not charge your card or issue an eSIM.',
      fill: 'Fill test card', number: 'Test card number', expiry: 'Expiry date', cvv: 'CVV',
      error: 'Use the test card shown in the fields or select Fill test card.',
      pay: 'Pay {amount} in demo', processing: 'Processing demo payment…',
      success: 'Demo payment complete', next: 'How to connect your eSIM',
      activation: 'For a real installation, use the QR code or activation instructions issued by your provider.'
    },
    ru: {
      title: 'Демо-оплата', back: 'К тарифу', card: 'Оплата картой', summary: 'Выбранный тариф',
      data: 'Интернет', days: 'Срок действия', amount: 'Сумма в демо', gb: 'ГБ', day: 'день', fewDays: 'дня', pluralDays: 'дней',
      demo: 'Используйте тестовые данные из полей. Списание денег и выдача eSIM в демо отключены.',
      fill: 'Подставить тестовую карту', number: 'Номер тестовой карты', expiry: 'Срок действия', cvv: 'CVV',
      error: 'Введите тестовые данные из полей или нажмите «Подставить тестовую карту».',
      pay: 'Оплатить {amount} в демо', processing: 'Проводим демо-оплату…',
      success: 'Демо-оплата прошла', next: 'Как подключить eSIM',
      activation: 'Для реальной установки понадобится QR-код или инструкция по активации от провайдера.'
    },
    uz: {
      title: 'Demo toʻlov', back: 'Tarifga qaytish', card: 'Karta orqali toʻlov', summary: 'Tanlangan tarif',
      data: 'Internet', days: 'Amal qilish muddati', amount: 'Demo summa', gb: 'GB', day: 'kun', pluralDays: 'kun',
      demo: 'Maydonlardagi sinov maʼlumotlaridan foydalaning. Demo rejimida pul yechilmaydi va eSIM berilmaydi.',
      fill: 'Sinov kartasini toʻldirish', number: 'Sinov kartasi raqami', expiry: 'Amal qilish muddati', cvv: 'CVV',
      error: 'Maydonlardagi sinov maʼlumotlarini kiriting yoki sinov kartasini avtomatik toʻldiring.',
      pay: 'Demo rejimida {amount} toʻlash', processing: 'Demo toʻlov bajarilmoqda…',
      success: 'Demo toʻlov muvaffaqiyatli oʻtdi', next: 'eSIMni qanday ulash mumkin',
      activation: 'Haqiqiy oʻrnatish uchun provayder bergan QR-kod yoki faollashtirish yoʻriqnomasi kerak.'
    }
  };

  function copy(context) {
    return labels[context.language] ?? labels.en;
  }

  function planDetails(context) {
    const { language, plan } = context;
    const t = copy(context);
    const number = new Intl.NumberFormat(language, { maximumFractionDigits: 2 });
    const plural = new Intl.PluralRules(language).select(plan.days);
    const day = plural === 'one' ? t.day : (plural === 'few' ? t.fewDays : null) ?? t.pluralDays;
    return {
      data: `${number.format(plan.data)} ${t.gb}`,
      days: `${number.format(plan.days)} ${day}`,
      amount: `${number.format(plan.price)} USD`
    };
  }

  function cardField(key, label) {
    return `<label class="demo-checkout-field" for="demo-card-${key}"><span>${label}</span>
      <input class="input" id="demo-card-${key}" data-demo-card="${key}" type="text" inputmode="numeric"
        autocomplete="off" maxlength="${testCard[key].length}" placeholder="${testCard[key]}" required>
    </label>`;
  }

  function render(context) {
    const { plan, providers, icon, planHref } = context;
    const provider = providers[plan.provider];
    const t = copy(context);
    const details = planDetails(context);
    const back = planHref(plan);
    return `<section class="container page demo-checkout" data-demo-checkout aria-labelledby="demo-checkout-title">
      <div class="page-top">
        <a class="text-action" href="${back}">${icon('arrow-left')}${t.back}</a>
        <h1 class="page-title" id="demo-checkout-title" tabindex="-1">${t.title}</h1>
      </div>
      <div class="demo-checkout-grid">
        <aside class="panel demo-checkout-panel demo-checkout-summary" aria-labelledby="demo-checkout-summary">
          <h2 id="demo-checkout-summary">${t.summary}</h2>
          <p class="carrier"><span class="provider-mark provider-${plan.provider}" aria-hidden="true">${provider.initial}</span>${provider.name}</p>
          <dl>
            <div><dt>${t.data}</dt><dd>${details.data}</dd></div>
            <div><dt>${t.days}</dt><dd>${details.days}</dd></div>
            <div class="demo-checkout-amount"><dt>${t.amount}</dt><dd>${details.amount}</dd></div>
          </dl>
        </aside>
        <div class="panel demo-checkout-panel demo-checkout-stage" data-demo-stage="card">
          <h2>${t.card}</h2>
          <p class="notice">${icon('circle-alert')}<span>${t.demo}</span></p>
          <form class="demo-checkout-form" data-demo-form autocomplete="off" novalidate>
            ${cardField('number', t.number)}
            <div class="demo-checkout-fields">
              ${cardField('expiry', t.expiry)}
              ${cardField('cvv', t.cvv)}
            </div>
            <p class="demo-checkout-error" id="demo-checkout-error" role="alert" hidden>${t.error}</p>
            <button class="button button-secondary demo-checkout-fill" type="button" data-demo-fill>${t.fill}</button>
            <button class="button button-primary" type="submit">${t.pay.replace('{amount}', details.amount)}${icon('arrow-right')}</button>
          </form>
        </div>
      </div>
    </section>`;
  }

  function mount(container, context) {
    const stage = container.querySelector('[data-demo-stage]');
    if (!stage) return;
    const form = stage.querySelector('[data-demo-form]');
    const fields = [...form.querySelectorAll('[data-demo-card]')];
    const error = form.querySelector('#demo-checkout-error');
    const { icon, setupHref } = context;
    const t = copy(context);

    function clearError() {
      error.hidden = true;
      for (const field of fields) {
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
      }
    }

    form.querySelector('[data-demo-fill]').addEventListener('click', () => {
      for (const field of fields) field.value = testCard[field.dataset.demoCard];
      clearError();
      form.querySelector('[type="submit"]').focus();
    });
    form.addEventListener('input', clearError);

    form.addEventListener('submit', event => {
      event.preventDefault();
      if (stage.dataset.demoStage !== 'card') return;
      const invalid = fields.filter(field => {
        const key = field.dataset.demoCard;
        return cardValue[key](field.value.trim()) !== cardValue[key](testCard[key]);
      });
      clearError();
      if (invalid.length) {
        for (const field of invalid) {
          field.value = '';
          field.setAttribute('aria-invalid', 'true');
          field.setAttribute('aria-describedby', error.id);
        }
        error.hidden = false;
        invalid[0].focus();
        return;
      }

      form.reset();
      stage.dataset.demoStage = 'processing';
      stage.innerHTML = `<span class="demo-checkout-spinner" aria-hidden="true"></span>
        <h2 tabindex="-1">${t.processing}</h2>`;
      stage.querySelector('h2').focus();

      setTimeout(() => {
        if (!stage.isConnected) return;
        stage.dataset.demoStage = 'success';
        stage.innerHTML = `<span class="demo-checkout-success-icon" aria-hidden="true">${icon('circle-check')}</span>
          <h2 tabindex="-1">${t.success}</h2>
          <p>${t.activation}</p>
          <a class="button button-primary" href="${setupHref}" data-demo-setup>${t.next}${icon('arrow-right')}</a>`;
        stage.querySelector('h2').focus();
      }, 950);
    });
  }

  return { render, mount };
})();
