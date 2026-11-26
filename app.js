'use strict';

const languages = ['en', 'ru', 'uz'];
const strings = {
  language: ['Language', 'Язык', 'Til'],
  titleFirst: ["Stay connected in","Оставайтесь на связи","O‘zbekistonda"],
  titleSecond: ["Uzbekistan","в Узбекистане","aloqada qoling"],
  subtitle: ["Compare travel eSIM plans for your trip. Find the data you need and get online with a compatible phone.","Сравните туристические eSIM и подберите интернет по сроку поездки и объёму.","Sayohat eSIM paketlarini solishtiring va safaringizga mos internet hajmini tanlang."],
  duration: ['Trip length', 'Срок поездки', 'Safar muddati'],
  anyDuration: ['Any length', 'Любой срок', 'Istalgan muddat'],
  short: ['1–7 days', '1–7 дней', '1–7 kun'],
  medium: ['8–14 days', '8–14 дней', '8–14 kun'],
  long: ['15–30 days', '15–30 дней', '15–30 kun'],
  custom: ['Custom', 'Свой срок', 'Boshqa muddat'],
  daysCount: ['Number of days', 'Количество дней', 'Kunlar soni'],
  invalidDays: ['Enter a trip length from 1 to 365 days.', 'Введите срок поездки от 1 до 365 дней.', 'Safar muddatini 1 dan 365 kungacha kiriting.'],
  dataAmount: ['Data needed', 'Объём интернета', 'Internet hajmi'],
  anyData: ['Any amount', 'Любой объём', 'Istalgan hajm'],
  fromData: ['At least', 'От', 'Kamida'],
  showPlans: ['Show eSIM plans', 'Показать пакеты', 'Paketlarni ko‘rish'],
  featured: ["Plans for your trip","Пакеты для вашей поездки","Safaringizga mos paketlar"],
  plans: ["Compare eSIM plans","Сравните пакеты eSIM","eSIM paketlarini solishtiring"],
  sort: ['Sort by', 'Сортировка', 'Saralash'],
  sortPrice: ['Lowest price', 'Сначала дешевле', 'Avval arzonlari'],
  sortData: ['Most data', 'Больше интернета', 'Internet hajmi bo‘yicha'],
  resultsOne: ['{count} package found', 'Найден {count} пакет', '{count} ta paket topildi'],
  resultsFew: ['{count} packages found', 'Найдено {count} пакета', '{count} ta paket topildi'],
  resultsOther: ['{count} packages found', 'Найдено {count} пакетов', '{count} ta paket topildi'],
  compare: ['Compare', 'Сравнить', 'Solishtirish'],
  compareCount: ['{count} of 2 selected', 'Выбрано {count} из 2', '{count} / 2 ta tanlandi'],
  comparison: ['Compare eSIM plans', 'Сравнение eSIM', 'eSIM paketlarini solishtirish'],
  selectCompare: ['Compare', 'К сравнению', 'Solishtirish uchun'],
  empty: ['No package matches both your trip length and data needs.', 'Нет пакетов на выбранный срок и объём интернета.', 'Tanlangan muddat va internet hajmiga mos paket yo‘q.'],
  reset: ['Show all packages', 'Показать все пакеты', 'Barcha paketlarni ko‘rish'],
  back: ['Back', 'Назад', 'Orqaga'],
  price: ['Package price', 'Цена за пакет', 'Paket narxi'],
  data: ['Data', 'Интернет', 'Internet'],
  gb: ['GB', 'ГБ', 'GB'],
  validity: ['Validity', 'Срок действия', 'Amal qilish muddati'],
  network: ['Network in Uzbekistan', 'Сеть в Узбекистане', 'O‘zbekistondagi tarmoq'],
  beelineNetwork: ['Beeline (Unitel)', 'Beeline (Unitel)', 'Beeline (Unitel)'],
  enjoyNetwork: ['Usually Ucell or Beeline; check the provider', 'Обычно Ucell или Beeline; уточните у провайдера', 'Odatda Ucell yoki Beeline; provayderdan aniqlang'],
  service: ['What’s included', 'Что входит', 'Paket tarkibi'],
  dataOnly: ['Data only; no Uzbek number, calls or SMS', 'Только интернет, без местного номера, звонков и SMS', 'Faqat internet; mahalliy raqam, qo‘ng‘iroq va SMS yo‘q'],
  verification: ['Passport verification', 'Проверка паспорта', 'Pasport tekshiruvi'],
  noVerification: ['Not required by the provider for this data plan', 'Провайдер не требует для этого интернет-пакета', 'Provayder bu internet paketi uchun talab qilmaydi'],
  activation: ['Package starts', 'Когда начинается срок', 'Paket qachon boshlanadi'],
  firstNetwork: ['On first connection to a supported network', 'При первом подключении к поддерживаемой сети', 'Mos tarmoqqa birinchi ulanishda'],
  details: ["View plan","Смотреть пакет","Paketni ko‘rish"],
  buy: ["Continue to provider","Перейти к провайдеру","Provayder saytiga o‘tish"],
  purchaseNotice: ['Pay and receive your eSIM on the provider’s site.', 'Оплата и получение eSIM у провайдера.', 'To‘lov va eSIM olish provayder saytida.'],
  commonConditions: ['Shared conditions', 'Общие условия', 'Umumiy shartlar'],
  phoneCheck: ['Look for “Add eSIM” in your phone’s mobile network settings and make sure the phone is carrier-unlocked.', 'Найдите «Добавить eSIM» в настройках мобильной сети и убедитесь, что телефон не заблокирован под одного оператора.', 'Mobil tarmoq sozlamalaridan «eSIM qo‘shish» bandini toping va telefon bitta operatorga bog‘lanmaganini tekshiring.'],
  install: ['How to install', 'Как установить', 'Qanday o‘rnatiladi'],
  installWifi: ['Install the eSIM over Wi-Fi using the provider’s instructions.', 'Установите eSIM по Wi‑Fi по инструкции провайдера.', 'Provayder yo‘riqnomasi bo‘yicha eSIM’ni Wi‑Fi orqali o‘rnating.'],
  installData: ['In Uzbekistan, choose the travel eSIM for mobile data.', 'В Узбекистане выберите туристическую eSIM для мобильного интернета.', 'O‘zbekistonda mobil internet uchun sayohat eSIM’ini tanlang.'],
  installRoaming: ['Enable data roaming on the travel eSIM only. Leave data roaming off on your main SIM.', 'Включите роуминг данных только на туристической eSIM. На основной SIM оставьте его выключенным.', 'Ma’lumotlar roumingini faqat sayohat eSIM’ida yoqing. Asosiy SIM’da uni o‘chiq qoldiring.'],
  tagline: ["Travel eSIM for Uzbekistan","Туристические eSIM для Узбекистана","O‘zbekiston uchun sayohat eSIM paketlari"],
  samarkand: ["Samarkand, Uzbekistan","Самарканд, Узбекистан","Samarqand, O‘zbekiston"],
  navPlans: ["Plans","Пакеты","Paketlar"],
  navPlanner: ['Plan finder', 'Умный подбор', 'Paket tanlash'],
  navCoverage: ['Coverage', 'Карта покрытия', 'Qamrov xaritasi'],
  navPurchase: ['Purchase guide', 'Как купить eSIM', 'eSIM xarid qilish'],
  navAccount: ['My eSIMs', 'Личный кабинет', 'Mening eSIMlarim'],
  how: ["How it works","Как это работает","Qanday ishlaydi"],
  faq: ["FAQ","Частые вопросы","Savol-javob"],
  navLabel: ["Main navigation","Основная навигация","Asosiy navigatsiya"],
  footerLabel: ["Footer navigation","Навигация в подвале","Sahifa oxiri navigatsiyasi"],
  menu: ["Menu","Меню","Menyu"],
  skip: ["Skip to content","К содержимому","Asosiy mazmunga o‘tish"],
  showCatalog: ["View all matching plans","Все подходящие пакеты","Barcha mos paketlar"],
  lowestMatch: ["Lowest verified price","Минимальная проверенная цена","Eng arzon tekshirilgan paket"],
  emptyTitle: ["No matching plans","Подходящих пакетов нет","Mos paket topilmadi"],
  chooseTitle: ["Choose a plan","Выберите пакет","Paketni tanlang"],
  chooseBody: ["Set your trip length and data needs, then compare the available packages.","Укажите срок поездки и объём интернета, затем сравните доступные пакеты.","Safar muddati va internet hajmini belgilang, so‘ng mavjud paketlarni solishtiring."],
  buyTitle: ["Get your eSIM","Получите eSIM","eSIM oling"],
  buyBody: ["Check your phone and complete the purchase on the provider’s site.","Проверьте телефон и оформите покупку на сайте провайдера.","Telefoningizni tekshiring va provayder saytida xarid qiling."],
  connectTitle: ["Connect on arrival","Подключитесь по приезде","Yetib kelgach ulaning"],
  connectBody: ["Follow the provider’s instructions and select the travel eSIM for mobile data.","Следуйте инструкции провайдера и выберите туристическую eSIM для мобильного интернета.","Provayder yo‘riqnomasiga amal qiling va mobil internet uchun sayohat eSIM’ini tanlang."],
  faqCalls: ["Can I make calls or send SMS?","Можно ли звонить и отправлять SMS?","Qo‘ng‘iroq qilish yoki SMS yuborish mumkinmi?"],
  faqPhone: ['How do I check whether my phone supports eSIM?', 'Как проверить, поддерживает ли телефон eSIM?', 'Telefon eSIM’ni qo‘llashini qanday tekshiraman?'],
  faqPhoneBody: ['On iPhone, look under Cellular or Mobile Data. On Android, look under SIMs or SIM manager. Find “Add eSIM” and verify your exact model before buying if the option is missing.', 'На iPhone откройте «Сотовая связь» или «Мобильные данные», на Android — «SIM-карты» или «Диспетчер SIM». Найдите «Добавить eSIM». Если пункта нет, уточните поддержку eSIM для своей модели перед покупкой.', 'iPhone’da «Mobil aloqa» yoki «Mobil ma’lumotlar», Android’da «SIM-kartalar» yoki «SIM menejeri» bo‘limini oching. «eSIM qo‘shish» bandini qidiring. Agar band bo‘lmasa, xariddan oldin telefon modelingiz eSIM’ni qo‘llashini tekshiring.'],
  faqActivation: ["When does the plan start?","Когда начинает действовать пакет?","Paket qachon ishlay boshlaydi?"],
  faqActivationBody: ["The listed plans start when the eSIM first connects to a supported network.","У пакетов из каталога срок начинается при первом подключении к поддерживаемой сети.","Katalogdagi paketlar eSIM mos tarmoqqa ilk bor ulanganda ishlay boshlaydi."],
  faqPassport: ["Do I need a passport to buy a plan?","Нужен ли паспорт для покупки?","Xarid uchun pasport kerakmi?"],
  faqPassportBody: ["The providers of the listed data plans do not require passport verification. Check current terms before purchasing.","Для интернет-пакетов в каталоге провайдеры не требуют проверки паспорта. Перед покупкой проверьте актуальные условия.","Katalogdagi internet paketlari uchun provayderlar pasport tekshiruvini talab qilmaydi. Xariddan oldin amaldagi shartlarni tekshiring."],
  faqPayment: ["Where do I pay and receive the eSIM?","Где оплатить и получить eSIM?","eSIM uchun qayerda to‘lov qilinadi va u qayerdan olinadi?"],
  planDetails: ["Plan details","Условия пакета","Paket shartlari"],
  purchaseTitle: ["Buy from the provider","Покупка у провайдера","Provayderdan xarid qilish"],
  hotspot: ['Hotspot', 'Раздача интернета', 'Internet ulashish'],
  topUp: ['Top-up', 'Пополнение', 'To‘ldirish'],
  airaloHotspot: ['Depends on your phone and network', 'Зависит от телефона и сети', 'Telefon va tarmoqqa bog‘liq'],
  airaloTopUp: ['Check the package details', 'Уточните в условиях пакета', 'Paket shartlarini tekshiring'],
  enjoyHotspot: ['Yes, uses package data', 'Да, из объёма пакета', 'Ha, paketdan sarflanadi'],
  enjoyTopUp: ['Buy a new package', 'Купите новый пакет', 'Yangi paket xarid qiling'],
  availability: ['Check availability', 'Уточните наличие', 'Mavjudligini tekshiring'],
  sellerAvailability: ['Check whether {data} for {duration} is still available from the provider.', 'Сверьте у провайдера наличие пакета {data} на {duration}.', 'Provayderdan {duration} uchun {data} paketining mavjudligini tekshiring.'],
  selectAtSeller: ['Choose {data} for {duration} on the provider’s site.', 'Выберите {data} на {duration} на сайте провайдера.', 'Provayder saytida {duration} uchun {data} paketini tanlang.'],
  dataGuide: ['How much data do I need?', 'Сколько ГБ мне нужно?', 'Qancha GB kerak?'],
  usageMaps: ['Maps and chats', 'Карты и чаты', 'Xarita va chatlar'],
  usageSocial: ['Social media', 'Соцсети', 'Ijtimoiy tarmoqlar'],
  usageVideo: ['Video', 'Видео', 'Video'],
  usageEstimate: ['About {data} for {duration}', 'Около {data} на {duration}', '{duration} uchun taxminan {data}'],
  usageNote: ['An estimate. Video quality and Wi-Fi affect data use.', 'Это ориентир. Расход зависит от качества видео и доступа к Wi‑Fi.', 'Bu taxmin. Sarf video sifati va Wi‑Fi’ga bog‘liq.'],
  usageNeedsDuration: ['Choose a trip length to estimate data.', 'Выберите срок поездки, чтобы рассчитать объём.', 'Hisoblash uchun safar muddatini tanlang.'],
  usageTooLarge: ['Matching packages have up to {data}.', 'Подходящие по сроку пакеты содержат до {data}.', 'Muddatga mos paketlarda {data} gacha bor.'],
  applyEstimate: ['Apply to filters', 'Применить к фильтрам', 'Filtrlarga qo‘llash'],
  shareCompare: ['Share comparison', 'Поделиться сравнением', 'Solishtirishni ulashish'],
  shareUrl: ['Link', 'Ссылка', 'Havola'],
  shareLocal: ['This address is local. A public TourSIM address is needed to share it with other devices.', 'Это локальный адрес. Чтобы открыть ссылку на другом устройстве, TourSIM нужен публичный адрес.', 'Bu mahalliy manzil. Havolani boshqa qurilmada ochish uchun TourSIM ommaviy manzilda bo‘lishi kerak.'],
  copy: ['Copy link', 'Скопировать ссылку', 'Havolani nusxalash'],
  copied: ['Link copied', 'Ссылка скопирована', 'Havola nusxalandi'],
  copyManually: ['Select and copy the link.', 'Выделите и скопируйте ссылку.', 'Havolani belgilang va nusxalang.'],
  close: ['Close', 'Закрыть', 'Yopish']
};

const dayOptions = [['any', 'anyDuration'], ['7', 'short'], ['14', 'medium'], ['30', 'long'], ['custom', 'custom']];
const dataChoices = [0, 1, 3, 5, 10];
const usageProfiles = { usageMaps: 100, usageSocial: 300, usageVideo: 1000 };
const maxTripDays = 365;
const maxDataNeeded = Math.ceil(maxTripDays * Math.max(...Object.values(usageProfiles)) / 1000);
const sortOptions = [['price', 'sortPrice'], ['data', 'sortData']];
const headerNavigation = [['plans', 'navPlans'], ['planner', 'navPlanner'], ['coverage', 'navCoverage'], ['account', 'navAccount']];
const navigation = [...headerNavigation, ['purchase', 'navPurchase'], ['how-it-works', 'how'], ['faq', 'faq']];
const planOrigins = ['home', 'plans', 'compare', 'planner'];
const storageKey = 'toursim-trip';
const app = document.querySelector('#app');
const languageSelect = document.querySelector('#language');
const mobileMenu = document.querySelector('#mobile-navigation');
const getPlan = id => plans.find(plan => plan.id === id);
const validDuration = value => dayOptions.some(([choice]) => choice === value);
const validCustomDays = value => Number.isInteger(value) && value >= 1 && value <= maxTripDays;
const validData = value => Number.isInteger(value) && value >= 0 && value <= maxDataNeeded;

function initialLanguage() {
  let saved;
  try { saved = localStorage.getItem('toursim-language'); } catch {}
  const browserLanguage = navigator.language.split('-')[0];
  return languages.includes(saved) ? saved : languages.includes(browserLanguage) ? browserLanguage : 'en';
}

function savedTrip() {
  try { return JSON.parse(sessionStorage.getItem(storageKey)) ?? {}; } catch { return {}; }
}

const saved = savedTrip();
const state = {
  language: initialLanguage(),
  duration: validDuration(saved.duration) ? saved.duration : '14',
  customDays: validCustomDays(saved.customDays) ? saved.customDays : 14,
  dataNeeded: validData(saved.dataNeeded) ? saved.dataNeeded : 0,
  sort: saved.sort === 'data' ? 'data' : 'price',
  compare: new Set(Array.isArray(saved.compare) ? saved.compare.filter(getPlan).slice(0, 2) : []),
  usage: Object.hasOwn(usageProfiles, saved.usage) ? saved.usage : 'usageMaps'
};

function saveTrip() {
  const { duration, customDays, dataNeeded, sort, compare, usage } = state;
  try { sessionStorage.setItem(storageKey, JSON.stringify({ duration, customDays, dataNeeded, sort, compare: [...compare], usage })); } catch {}
}

const text = key => strings[key][languages.indexOf(state.language)];
const price = plan => new Intl.NumberFormat(state.language, { maximumFractionDigits: 2 }).format(plan.price);
function days(count) {
  if (state.language === 'uz') return `${count} kun`;
  if (state.language === 'en') return `${count} ${count === 1 ? 'day' : 'days'}`;
  const forms = { one: 'день', few: 'дня', many: 'дней', other: 'дня' };
  return `${count} ${forms[new Intl.PluralRules('ru').select(count)]}`;
}
const gigabytes = value => `${value} ${text('gb')}`;
const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${lucide[name]}</svg>`;
const option = (value, label, selected) => `<option value="${value}"${selected ? ' selected' : ''}>${label}</option>`;
const optionList = (options, selected) => options.map(([value, label]) => option(value, text(label), value === selected)).join('');
const link = (label, route, style = 'button button-secondary', iconName) => `<a class="${style}" href="#${route}">${text(label)}${iconName ? icon(iconName) : ''}</a>`;
const external = (label, url, style) => `<a class="${style}" href="${url}" target="_blank" rel="noopener noreferrer">${text(label)}${icon('arrow-up-right')}</a>`;
const comparePath = () => `compare/${[...state.compare].join('/')}`;
function storefront(plan) {
  const urls = plan.purchase ?? providers[plan.provider].store;
  return urls[state.language] ?? urls.en;
}

function purchaseHint(plan) {
  return text(plan.checkAvailability ? 'sellerAvailability' : 'selectAtSeller')
    .replace('{data}', gigabytes(plan.data)).replace('{duration}', days(plan.days));
}
const brand = () => '<a class="wordmark" href="#home" aria-label="TourSIM"><img class="brand-icon" src="assets/toursim-mark.svg" alt="" width="36" height="36">Tour<span>SIM</span></a>';

function planPath(plan, from) {
  return `plan/${plan.id}${from === 'plans' ? '' : `/${from}`}`;
}

function relatedPath(name, plan, from) {
  if (plan) return `${name}/${plan.id}${from === 'plans' ? '' : `/${from}`}`;
  return from === 'plans' ? `${name}/plans` : name;
}

function readRoute() {
  const [path, query] = location.hash.slice(1).split('?', 2);
  const [name, id, origin] = path.split('/');
  const plan = getPlan(id);
  const from = plan ? planOrigins.includes(origin) ? origin : 'plans' : id === 'plans' ? 'plans' : 'home';
  if (name === 'plans') return { name, query };
  if (['planner', 'coverage'].includes(name)) return { name };
  if (name === 'purchase' || name === 'account') return { name, plan, from };
  if (name === 'compare') return { name, query, pair: [plan, getPlan(origin)] };
  if (name === 'plan' && plan) return { name, plan, from };
  if (name === 'phone') return { name: 'setup', plan, from, redirect: relatedPath('setup', plan, from) };
  if (name === 'setup' && (plan || !id || id === 'plans')) return { name, plan, from };
  return { name: 'home', anchor: ['how-it-works', 'faq'].includes(name) ? name : undefined };
}

function go(route) {
  if (location.hash === `#${route}`) render(true);
  else location.hash = route;
}

function restoreSharedFilters(query) {
  const params = new URLSearchParams(query);
  const duration = params.get('duration');
  const customDays = Number(params.get('days'));
  const data = Number(params.get('data'));
  const sort = params.get('sort');
  if (validDuration(duration)) state.duration = duration;
  if (validCustomDays(customDays)) state.customDays = customDays;
  if (params.has('data') && validData(data)) state.dataNeeded = data;
  if (sortOptions.some(([choice]) => choice === sort)) state.sort = sort;
}

function clearSharedQuery() {
  if (!readRoute().query) return;
  try { history.replaceState(history.state, '', location.hash.split('?', 1)[0]); } catch {}
}

function showShare() {
  if (document.querySelector('.share-dialog')) return;
  const params = new URLSearchParams({ duration: state.duration, data: String(state.dataNeeded), sort: state.sort });
  if (state.duration === 'custom') params.set('days', state.customDays);
  const url = new URL(location.href);
  url.hash = `${comparePath()}?${params}`;
  const local = url.protocol === 'file:' || ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  const dialog = document.createElement('dialog');
  dialog.className = 'share-dialog panel';
  dialog.setAttribute('aria-labelledby', 'share-title');
  dialog.innerHTML = `<h2 id="share-title">${text('shareCompare')}</h2>
    <label class="share-url">${text('shareUrl')}<input class="input" type="url" readonly></label>
    ${local ? `<p class="note">${text('shareLocal')}</p>` : ''}
    <p class="note share-feedback" role="status"></p>
    <form class="actions share-actions" method="dialog"><button class="button button-primary" type="button" autofocus>${text('copy')}</button><button class="button button-secondary" type="submit">${text('close')}</button></form>`;
  const input = dialog.querySelector('input');
  const feedback = dialog.querySelector('.share-feedback');
  input.value = url.href;
  dialog.querySelector('button[type="button"]').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(input.value);
      feedback.textContent = text('copied');
    } catch {
      input.focus();
      input.select();
      feedback.textContent = text('copyManually');
    }
  });
  dialog.addEventListener('close', () => dialog.remove(), { once: true });
  document.body.append(dialog);
  dialog.showModal();
}

function tripDays() {
  return state.duration === 'custom' ? state.customDays : Number(state.duration) || 0;
}

function availablePlans() {
  const length = tripDays();
  return plans.filter(plan => plan.days >= length && plan.data >= state.dataNeeded)
    .sort((first, second) => state.sort === 'data' ? second.data - first.data || first.price - second.price : first.price - second.price);
}

function trimComparison(items) {
  const available = new Set(items.map(plan => plan.id));
  for (const id of state.compare) if (!available.has(id)) state.compare.delete(id);
}

function dataOptions() {
  const amounts = [...new Set([...dataChoices, state.dataNeeded])].sort((first, second) => first - second);
  return amounts.map(value => option(value, value ? `${text('fromData')} ${gigabytes(value)}` : text('anyData'), value === state.dataNeeded)).join('');
}

function tripFields() {
  const custom = state.duration === 'custom';
  return `<div class="trip-field">
      <label for="duration">${icon('calendar-days')}${text('duration')}</label>
      <select class="input" id="duration" name="duration">${optionList(dayOptions, state.duration)}</select>
    </div>
    <div class="trip-field custom-row" id="custom-duration"${custom ? '' : ' hidden'}>
      <label for="custom-days">${text('daysCount')}</label>
      <input class="input" type="number" id="custom-days" name="custom-days" min="1" max="${maxTripDays}" required value="${state.customDays}"${custom ? '' : ' disabled'}>
    </div>
    <div class="trip-field">
      <label for="data-needed">${icon('wifi')}${text('dataAmount')}</label>
      <select class="input" id="data-needed" name="data-needed">${dataOptions()}</select>
    </div>`;
}

function finder() {
  return `<form class="panel finder" id="finder">
    ${tripFields()}
    <button class="button button-primary" type="submit">${text('showPlans')}${icon('arrow-right')}</button>
  </form>`;
}

function estimateData() {
  return Math.ceil(tripDays() * usageProfiles[state.usage] / 1000);
}

function estimateSummary(amount) {
  if (!amount) return text('usageNeedsDuration');
  return text('usageEstimate').replace('{data}', gigabytes(amount)).replace('{duration}', days(tripDays()));
}

function dataGuide() {
  const amount = estimateData();
  return `<details class="data-guide">
    <summary>${icon('wifi')}${text('dataGuide')}${icon('chevron-down')}</summary>
    <div class="data-guide-body">
      <fieldset class="device-switch usage-choices">
        <legend class="sr-only">${text('dataGuide')}</legend>
        ${Object.keys(usageProfiles).map(key => `<label><input type="radio" name="data-usage" value="${key}"${state.usage === key ? ' checked' : ''}><span>${text(key)}</span></label>`).join('')}
      </fieldset>
      <div class="data-guide-result">
        <div role="status"><p id="data-estimate">${estimateSummary(amount)}</p><p class="note" id="data-estimate-limit" hidden></p></div>
        <button class="button button-secondary" type="button" data-action="apply-estimate"${amount ? '' : ' disabled'}>${text('applyEstimate')}</button>
      </div>
      <p class="note">${text('usageNote')}</p>
    </div>
  </details>`;
}

function updateDataGuide(invalid = false) {
  const estimate = app.querySelector('#data-estimate');
  if (!estimate) return;
  const amount = invalid ? 0 : estimateData();
  const limit = app.querySelector('#data-estimate-limit');
  const packages = plans.filter(plan => plan.days >= tripDays() && !plan.checkAvailability);
  const maxAvailable = Math.max(0, ...packages.map(plan => plan.data));
  estimate.textContent = estimateSummary(amount);
  limit.hidden = !maxAvailable || amount <= maxAvailable;
  limit.textContent = limit.hidden ? '' : text('usageTooLarge').replace('{data}', gigabytes(maxAvailable));
  app.querySelector('[data-action="apply-estimate"]').disabled = !amount;
}

function sortField() {
  return `<label class="sort-field" for="plan-sort"><span class="sr-only">${text('sort')}</span>${icon('list-filter')}
    <select class="input" id="plan-sort" name="sort">${optionList(sortOptions, state.sort)}</select></label>`;
}

function planList(items, compare, recommended) {
  return `<div class="plan-list">${items.map(plan => {
    const provider = providers[plan.provider];
    const data = gigabytes(plan.data);
    const label = `${provider.name} · ${data}`;
    const selected = state.compare.has(plan.id);
    return `<article class="plan-item">
      <div class="plan-card-header">
        <h3 class="carrier"><span class="provider-mark provider-${plan.provider}" aria-hidden="true">${provider.initial}</span>${provider.name}</h3>
        ${compare ? `<label class="compare-choice"><input type="checkbox" name="compare" value="${plan.id}" aria-label="${text('selectCompare')}: ${label}"${selected ? ' checked' : state.compare.size === 2 ? ' disabled' : ''}><span>${text('selectCompare')}</span></label>`
          : plan === recommended ? `<span class="recommendation">${icon('check')}${text('lowestMatch')}</span>` : ''}
      </div>
      <div class="plan-values"><strong class="plan-data">${data}</strong><strong class="plan-price">${price(plan)} <small>USD</small></strong></div>
      <ul class="plan-meta">
        <li>${icon('calendar-days')}<span>${days(plan.days)}</span></li>
        <li>${icon('signal')}<span>${text(provider.network)}</span></li>
        ${plan.checkAvailability ? `<li class="plan-availability">${icon('circle-alert')}<span>${text('availability')}</span></li>` : ''}
      </ul>
      <a class="button button-secondary plan-details" href="#${planPath(plan, compare ? 'plans' : 'home')}" aria-label="${text('details')}: ${label}">${text('details')}${icon('arrow-right')}</a>
    </article>`;
  }).join('')}</div>`;
}

function resultCount(count) {
  const keys = { one: 'resultsOne', few: 'resultsFew' };
  const category = new Intl.PluralRules(state.language).select(count);
  return text(keys[category] ?? 'resultsOther').replace('{count}', count);
}

function planResults(items, compare) {
  if (!items.length) return `<div class="panel empty-state">
    <span class="icon-tile">${icon('search')}</span><h3>${text('emptyTitle')}</h3><p>${text('empty')}</p>
    <button type="button" class="button button-secondary" data-action="reset">${text('reset')}</button>
  </div>`;
  const shown = compare ? items : items.slice(0, 3);
  const verified = items.filter(plan => !plan.checkAvailability);
  const recommended = compare ? undefined : verified.reduce((lowest, plan) => lowest && lowest.price <= plan.price ? lowest : plan, null);
  return `${planList(shown, compare, recommended)}
    ${items.length > shown.length ? `<div class="show-all">${link('showCatalog', 'plans', 'button button-secondary', 'arrow-right')}</div>` : ''}`;
}

function resultsSection(items, compare) {
  const heading = compare ? 'h1' : 'h2';
  return `<section class="results-section" aria-labelledby="catalog-heading">
    <div class="results-heading">
      <div>
        <${heading} class="section-title" id="catalog-heading" tabindex="-1">${text(compare ? 'plans' : 'featured')}</${heading}>
        <p class="note" id="results-count" role="status">${resultCount(items.length)}</p>
      </div>
      ${sortField()}
    </div>
    ${compare ? `<div class="panel catalog-fields">${tripFields()}</div>${dataGuide()}` : ''}
    <div id="catalog-results" data-compare="${compare}">${planResults(items, compare)}</div>
  </section>`;
}

function hero() {
  return `<section class="hero">
    <img class="hero-photo" src="assets/samarkand-hero.webp" alt="" width="2172" height="724" fetchpriority="high">
    <div class="container hero-inner">
      <div class="hero-copy">
        <h1 tabindex="-1">${text('titleFirst')}<br><span>${text('titleSecond')}</span></h1>
        <p>${text('subtitle')}</p>
      </div>
      <span class="hero-location">${icon('map-pin')}${text('samarkand')}</span>
    </div>
  </section>`;
}

const howSteps = [
  ['sliders-horizontal', 'chooseTitle', 'chooseBody'],
  ['smartphone', 'buyTitle', 'buyBody'],
  ['qr-code', 'connectTitle', 'connectBody']
];
const faqItems = [
  ['faqPhone', 'faqPhoneBody'], ['faqCalls', 'dataOnly'], ['faqActivation', 'faqActivationBody'],
  ['faqPassport', 'faqPassportBody'], ['faqPayment', 'purchaseNotice']
];

function home() {
  return `${hero()}
    <div class="container home-content">
      ${finder()}
      ${dataGuide()}
      ${resultsSection(availablePlans(), false)}
      <section class="home-section" aria-labelledby="how-it-works">
        <h2 class="section-title" id="how-it-works" tabindex="-1">${text('how')}</h2>
        <ol class="how-list">${howSteps.map(([glyph, title, body], index) => `<li>
          <span class="icon-tile">${icon(glyph)}</span><h3>${index + 1}. ${text(title)}</h3><p>${text(body)}</p>
        </li>`).join('')}</ol>
      </section>
      <section class="home-section faq-section" aria-labelledby="faq">
        <h2 class="section-title" id="faq" tabindex="-1">${text('faq')}</h2>
        <div class="faq-list">${faqItems.map(([question, answer]) => `<details>
          <summary>${text(question)}${icon('chevron-down')}</summary><p>${text(answer)}</p>
        </details>`).join('')}</div>
      </section>
    </div>`;
}

function compareTray() {
  return `<div class="compare-tray" id="compare-tray"${state.compare.size ? '' : ' hidden'}>
    <span id="compare-count" role="status">${text('compareCount').replace('{count}', state.compare.size)}</span>
    <button class="button button-primary" id="compare-button" type="button" data-action="compare"${state.compare.size === 2 ? '' : ' disabled'}>${text('compare')}${icon('arrow-right')}</button>
  </div>`;
}

function catalog() {
  const items = availablePlans();
  trimComparison(items);
  return `<div class="container page catalog-page">
    <div class="page-top"><a class="text-action" href="#home">${icon('arrow-left')}${text('back')}</a></div>
    ${resultsSection(items, true)}
    ${compareTray()}
  </div>`;
}

function updateCompareTray() {
  const tray = app.querySelector('#compare-tray');
  if (!tray) return;
  tray.hidden = state.compare.size === 0;
  app.querySelector('#compare-count').textContent = text('compareCount').replace('{count}', state.compare.size);
  app.querySelector('#compare-button').disabled = state.compare.size !== 2;
}

function refreshPlans() {
  const results = app.querySelector('#catalog-results');
  if (!results) return;
  const numberField = app.querySelector('#custom-days');
  const count = app.querySelector('#results-count');
  const invalid = numberField.willValidate && !numberField.validity.valid;
  updateDataGuide(invalid);
  results.hidden = invalid;
  if (invalid) {
    numberField.setAttribute('aria-invalid', 'true');
    numberField.setAttribute('aria-describedby', 'results-count');
    count.textContent = text('invalidDays');
    const tray = app.querySelector('#compare-tray');
    if (tray) tray.hidden = true;
    return;
  }
  numberField.removeAttribute('aria-invalid');
  numberField.removeAttribute('aria-describedby');
  const items = availablePlans();
  trimComparison(items);
  saveTrip();
  results.innerHTML = planResults(items, results.dataset.compare === 'true');
  count.textContent = resultCount(items.length);
  updateCompareTray();
}

function page(title, back, content, className = '') {
  return `<div class="container page ${className}">
    <div class="page-top"><a class="text-action" href="#${back}">${icon('arrow-left')}${text('back')}</a><h1 class="page-title" tabindex="-1">${title}</h1></div>
    ${content}</div>`;
}

function planMetrics(plan) {
  const provider = providers[plan.provider];
  return [
    ['price', `${price(plan)} USD`], ['data', gigabytes(plan.data)], ['validity', days(plan.days)], ['network', text(provider.network)],
    ...['hotspot', 'topUp'].map(key => {
      const [label, source] = provider.conditions[key];
      return [key, text(label), source];
    })
  ];
}

function commonConditions() {
  return [['service', text('dataOnly')], ['verification', text('noVerification')], ['activation', text('firstNetwork')]];
}

function metricContent(value, source) {
  return source ? `<a class="metric-source" href="${source}" target="_blank" rel="noopener noreferrer">${value}</a>` : value;
}

function metricList(metrics) {
  const glyphs = { validity: 'calendar-days', network: 'signal', hotspot: 'wifi', topUp: 'arrow-up-right', service: 'wifi', verification: 'shield-check', activation: 'sliders-horizontal' };
  return `<dl class="metrics">${metrics.map(([key, value, source]) => `<div>${icon(glyphs[key])}<dt>${text(key)}</dt><dd>${metricContent(value, source)}</dd></div>`).join('')}</dl>`;
}

function compare(pair) {
  if (pair.some(plan => !plan) || pair[0].id === pair[1].id) return catalog();
  state.compare = new Set(pair.map(plan => plan.id));
  const metrics = pair.map(planMetrics);
  return page(text('comparison'), 'plans', `<div class="panel comparison-panel">
    <div class="comparison-actions"><button class="button button-secondary share-button" type="button" data-action="share">${text('shareCompare')}</button></div>
    <table class="comparison"><thead><tr><td></td>${pair.map(plan => `<th scope="col">${providers[plan.provider].name}<br><span class="note">${gigabytes(plan.data)}</span></th>`).join('')}</tr></thead>
    <tbody>${metrics[0].map(([key, value, source], index) => `<tr><th scope="row">${text(key)}</th><td>${metricContent(value, source)}</td><td>${metricContent(...metrics[1][index].slice(1))}</td></tr>`).join('')}
    <tr><td></td>${pair.map(plan => `<td>${link('details', planPath(plan, 'compare'), 'text-action', 'arrow-right')}</td>`).join('')}</tr></tbody></table>
    <section class="shared-conditions"><h2>${text('commonConditions')}</h2>${metricList(commonConditions())}</section>
  </div>`, 'narrow-page');
}

function details(plan, from) {
  const provider = providers[plan.provider];
  const back = from === 'compare' ? state.compare.size === 2 ? comparePath() : 'plans' : from;
  const [, , ...facts] = planMetrics(plan);
  const checkout = storefront(plan);
  return page(`${provider.name} <span class="title-divider">·</span> ${gigabytes(plan.data)}`, back, `<div class="detail-grid">
    <section class="panel plan-facts">
      <h2>${text('planDetails')}</h2>
      ${metricList([...facts, ...commonConditions()])}
    </section>
    <aside class="panel purchase-panel" aria-label="${text('purchaseTitle')}">
      <div class="purchase-price"><span>${text('price')}</span><strong>${price(plan)} <small>USD</small></strong></div>
      <div class="desktop-buy">${external('buy', checkout, 'button button-primary')}</div>
      <p class="note">${text('purchaseNotice')}</p>
      <p class="note${plan.checkAvailability ? ' plan-availability' : ''}">${purchaseHint(plan)}</p>
      <p class="note">${text('phoneCheck')}</p>
      ${link('navPurchase', relatedPath('purchase', plan, from), 'text-action', 'arrow-right')}
    </aside></div>
    <div class="mobile-purchase"><div class="mobile-price"><strong>${price(plan)}</strong><small> USD</small></div>${external('buy', checkout, 'button button-primary')}</div>`, 'offer-page');
}

function setup(plan, from) {
  const back = plan ? planPath(plan, from) : from;
  return page(text('install'), back, `<div class="panel setup-panel">
    <p class="notice">${icon('smartphone')}${text('phoneCheck')}</p>
    <ol class="steps">${['installWifi', 'installData', 'installRoaming'].map(step => `<li>${text(step)}</li>`).join('')}</ol>
  </div>`, 'narrow-page');
}

function renderChrome(active) {
  document.documentElement.lang = state.language;
  document.title = `TourSIM | ${text('tagline')}`;
  document.querySelector('#language-label').textContent = text('language');
  document.querySelector('#menu-label').textContent = text('menu');
  document.querySelector('#skip-link').textContent = text('skip');
  languageSelect.value = state.language;
  for (const nav of document.querySelectorAll('[data-navigation]')) {
    nav.setAttribute('aria-label', text('navLabel'));
    const items = nav.classList.contains('header-nav') ? headerNavigation : navigation;
    nav.innerHTML = items.map(([route, label]) => `<a href="#${route}"${route === active ? ' aria-current="page"' : ''}>${text(label)}</a>`).join('');
  }
  document.querySelector('#site-footer').innerHTML = `<div class="container footer-inner">
    <div>${brand()}<p class="note">${text('tagline')}</p></div>
    <nav aria-label="${text('footerLabel')}">${navigation.map(([route, label]) => link(label, route, 'text-action')).join('')}</nav>
  </div>`;
}

function render(navigate = false, loadSharedFilters = false) {
  const { name, plan, pair, from, redirect, anchor, query } = readRoute();
  if (redirect) history.replaceState(history.state, '', `#${redirect}`);
  if (loadSharedFilters && query) restoreSharedFilters(query);
  document.querySelector('.share-dialog[open]')?.close();
  const context = {
    language: state.language, plans: name === 'planner' ? plans.filter(item => !item.checkAvailability) : plans,
    providers, icon, plan, purchaseHref: storefront, purchaseHint,
    planHref: selected => `#${planPath(selected, name === 'planner' ? 'planner' : from)}`,
    phoneCheck: text('phoneCheck'),
    setupHref: `#${relatedPath('setup', plan, from)}`
  };
  const views = {
    home, plans: catalog, compare: () => compare(pair), plan: () => details(plan, from),
    setup: () => setup(plan, from),
    planner: TourSIMPlanner.render, coverage: TourSIMCoverage.render,
    purchase: TourSIMPurchase.renderPurchase, account: TourSIMPurchase.renderAccount
  };
  const mounts = {
    planner: TourSIMPlanner.mount, coverage: TourSIMCoverage.mount,
    purchase: TourSIMPurchase.mount, account: TourSIMPurchase.mount
  };
  renderChrome(anchor ?? (name === 'compare' || name === 'plan' ? 'plans' : name));
  app.innerHTML = views[name](context);
  mounts[name]?.(app, context);
  updateDataGuide();
  saveTrip();
  if (navigate) {
    mobileMenu.open = false;
    const target = anchor ? document.getElementById(anchor) : app.querySelector('h1');
    if (anchor) target.scrollIntoView({ block: 'start' });
    else window.scrollTo(0, 0);
    target.focus({ preventScroll: true });
  }
}

for (const element of document.querySelectorAll('[data-icon]')) element.innerHTML = icon(element.dataset.icon);

document.querySelector('#skip-link').addEventListener('click', event => {
  event.preventDefault();
  app.focus();
});
mobileMenu.addEventListener('click', event => {
  if (event.target.closest('a')) mobileMenu.open = false;
});
mobileMenu.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobileMenu.open) {
    mobileMenu.open = false;
    mobileMenu.querySelector('summary').focus();
  }
});

languageSelect.addEventListener('change', () => {
  if (!languages.includes(languageSelect.value)) return;
  state.language = languageSelect.value;
  try { localStorage.setItem('toursim-language', state.language); } catch {}
  render();
});

app.addEventListener('change', event => {
  const control = event.target;
  if (control.id === 'duration') {
    state.duration = control.value;
    const custom = control.value === 'custom';
    app.querySelector('#custom-duration').hidden = !custom;
    app.querySelector('#custom-days').disabled = !custom;
  } else if (control.id === 'data-needed') {
    state.dataNeeded = Number(control.value);
  } else if (control.id === 'plan-sort') {
    state.sort = control.value;
  } else if (control.name === 'data-usage') {
    state.usage = control.value;
    const numberField = app.querySelector('#custom-days');
    updateDataGuide(numberField.willValidate && !numberField.validity.valid);
    saveTrip();
    return;
  } else if (control.name === 'compare' && getPlan(control.value)) {
    if (control.checked && state.compare.size < 2) state.compare.add(control.value);
    else state.compare.delete(control.value);
    updateCompareTray();
    for (const checkbox of app.querySelectorAll('input[name="compare"]')) {
      checkbox.checked = state.compare.has(checkbox.value);
      checkbox.disabled = !checkbox.checked && state.compare.size === 2;
    }
    saveTrip();
    return;
  } else {
    return;
  }
  clearSharedQuery();
  refreshPlans();
});

app.addEventListener('input', event => {
  const control = event.target;
  if (control.id !== 'custom-days') return;
  if (control.validity.valid) state.customDays = Number(control.value);
  clearSharedQuery();
  refreshPlans();
});

app.addEventListener('submit', event => {
  if (event.target.id !== 'finder') return;
  event.preventDefault();
  go('plans');
});

app.addEventListener('click', event => {
  const control = event.target.closest('[data-action]');
  if (!control) return;
  if (control.dataset.action === 'share') showShare();
  if (control.dataset.action === 'apply-estimate' && estimateData()) {
    state.dataNeeded = estimateData();
    app.querySelector('#data-needed').innerHTML = dataOptions();
    clearSharedQuery();
    refreshPlans();
  }
  if (control.dataset.action === 'compare' && state.compare.size === 2) go(comparePath());
  if (control.dataset.action === 'reset') {
    state.duration = 'any';
    state.dataNeeded = 0;
    clearSharedQuery();
    render();
    app.querySelector('#duration').focus();
  }
});

window.addEventListener('hashchange', () => render(true, true));
render(Boolean(readRoute().anchor), true);
