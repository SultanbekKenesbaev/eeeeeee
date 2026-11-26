'use strict';

const languages = ['en', 'ru', 'uz'];
const strings = {
  language: ['Language', 'Язык', 'Til'],
  heroTitle: ['Internet for your trip to Uzbekistan', 'Интернет для поездки в Узбекистан', 'O‘zbekistonga safar uchun internet'],
  subtitle: ['Compare eSIMs by trip length and data allowance.', 'Сравните eSIM по сроку поездки и объёму интернета.', 'eSIM’larni safar muddati va internet hajmi bo‘yicha solishtiring.'],
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
  showPlans: ['Find eSIM', 'Найти eSIM', 'eSIM topish'],
  featured: ["Plans for your trip","Пакеты для вашей поездки","Safaringizga mos paketlar"],
  plans: ["Compare eSIM plans","Сравните пакеты eSIM","eSIM paketlarini solishtiring"],
  sort: ['Sort by', 'Сортировка', 'Saralash'],
  sortPrice: ['Lowest price', 'Сначала дешевле', 'Avval arzonlari'],
  sortData: ['Most data', 'Больше интернета', 'Internet hajmi bo‘yicha'],
  resultsOne: ['{count} matching plan', 'Найден {count} пакет', '{count} ta paket topildi'],
  resultsFew: ['{count} matching plans', 'Найдено {count} пакета', '{count} ta paket topildi'],
  resultsOther: ['{count} matching plans', 'Найдено {count} пакетов', '{count} ta paket topildi'],
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
  shareCompare: ['Share comparison', 'Поделиться сравнением', 'Solishtirishni ulashish'],
  shareUrl: ['Link', 'Ссылка', 'Havola'],
  shareLocal: ['This address is local. A public TourSIM address is needed to share it with other devices.', 'Это локальный адрес. Чтобы открыть ссылку на другом устройстве, TourSIM нужен публичный адрес.', 'Bu mahalliy manzil. Havolani boshqa qurilmada ochish uchun TourSIM ommaviy manzilda bo‘lishi kerak.'],
  copy: ['Copy link', 'Скопировать ссылку', 'Havolani nusxalash'],
  copied: ['Link copied', 'Ссылка скопирована', 'Havola nusxalandi'],
  copyManually: ['Select and copy the link.', 'Выделите и скопируйте ссылку.', 'Havolani belgilang va nusxalang.'],
  close: ['Close', 'Закрыть', 'Yopish'],
  showingPlans: ['Showing {shown} of {total} matching plans', 'Показано {shown} из {total} подходящих тарифов', '{total} ta mos paketdan {shown} tasi ko‘rsatilgan'],
  showCatalogCount: ['View all {total}', 'Посмотреть все {total}', 'Hammasini ko‘rish ({total})'],
  presets: ['Quick trip lengths', 'Быстрый выбор срока', 'Safar muddatini tez tanlash'],
  networkShort: ['Local network', 'Местная сеть', 'Mahalliy tarmoq'],
  dataService: ['Data only', 'Только интернет', 'Faqat internet'],
  verifiedReason: ['Lowest price among verified plans that match your trip filters.', 'Самая низкая цена среди проверенных пакетов, подходящих по вашим фильтрам.', 'Filtrlaringizga mos tekshirilgan paketlar ichida eng arzon narx.'],
  compareLimit: ['Select up to two plans', 'Можно выбрать до двух тарифов', 'Ikkitagacha paketni tanlang'],
  removePlan: ['Remove {plan}', 'Убрать {plan}', '{plan} paketini olib tashlash'],
  differences: ['Different values are highlighted.', 'Различия выделены в таблице.', 'Farqli qiymatlar jadvalda belgilangan.'],
  openProvider: ['Continue to {provider}', 'Перейти к {provider}', '{provider} saytiga o‘tish'],
  checkEsim: ['Check my phone', 'Проверить телефон', 'Telefonni tekshirish'],
  checkCompatibility: ['Will my phone work?', 'Подойдёт ли мой телефон?', 'Telefonim mos keladimi?'],
  headerPlans: ['Plans', 'Тарифы', 'Tariflar'],
  headerCoverage: ['Coverage', 'Покрытие', 'Qamrov'],
  headerAccount: ['Account', 'Кабинет', 'Hisob'],
  compatibility: ['Compatibility', 'Совместимость', 'Moslik'],
  compatibilityIntro: ['Before buying, check for the Add eSIM option and make sure your phone is unlocked.', 'Перед покупкой проверьте, есть ли в настройках пункт «Добавить eSIM» и разблокирован ли телефон.', 'Xariddan oldin telefonda «eSIM qo‘shish» bandi borligini va operator blokirovkasi yo‘qligini tekshiring.'],
  checkPhone: ['Does your phone support eSIM?', 'Телефон поддерживает eSIM?', 'Telefoningiz eSIM’ni qo‘llaydimi?'],
  platform: ['Phone platform', 'Платформа телефона', 'Telefon platformasi'],
  iphoneSteps: ['Open Settings → Cellular (or Mobile Data) → Add eSIM.', 'Откройте «Настройки» → «Сотовая связь» или «Мобильные данные» → «Добавить eSIM».', '«Sozlamalar» → «Mobil aloqa» yoki «Mobil ma’lumotlar» → «eSIM qo‘shish» bandini oching.'],
  androidSteps: ['Open Settings → Connections or Network & Internet → SIMs or SIM manager. Look for Add eSIM or Download a SIM.', 'Откройте «Настройки» → «Подключения» или «Сеть и интернет» → «SIM-карты» или «Диспетчер SIM». Найдите «Добавить eSIM».', '«Sozlamalar» → «Ulanishlar» yoki «Tarmoq va internet» → «SIM-kartalar» yoki «SIM menejeri». «eSIM qo‘shish» bandini qidiring.'],
  phoneModels: ['Menu names depend on your model and region.', 'Названия пунктов зависят от модели и региона.', 'Menyu nomlari model va hududga bog‘liq.'],
  appleHelp: ['Apple instructions', 'Инструкция Apple', 'Apple yo‘riqnomasi'],
  samsungHelp: ['Samsung instructions', 'Инструкция Samsung', 'Samsung yo‘riqnomasi'],
  foundEsim: ['I found Add eSIM', 'Нашёл пункт «Добавить eSIM»', '«eSIM qo‘shish» bandini topdim'],
  missingEsim: ['I don’t see it', 'Такого пункта нет', 'Bu bandni ko‘rmadim'],
  confirmWithMaker: ['Check your exact device model with its manufacturer before buying.', 'Перед покупкой уточните поддержку eSIM для своей модели у производителя.', 'Xariddan oldin modelingiz eSIM’ni qo‘llashini ishlab chiqaruvchidan aniqlang.'],
  coverageIntro: ['Choose the cities on your route and check the operator sources before choosing a plan.', 'Выберите города маршрута и сверяйтесь с картами операторов при выборе тарифа.', 'Safar shaharlarini tanlang va paketdan oldin operator xaritalarini tekshiring.'],
  installTitle: ['Install your eSIM', 'Установите eSIM', 'eSIM’ni o‘rnating'],
  installBody: ['After purchasing from the provider, follow its QR code or app instructions over Wi-Fi.', 'После покупки откройте QR-код или приложение провайдера и установите профиль по Wi‑Fi.', 'Xariddan so‘ng provayder QR-kodi yoki ilovasi orqali profilni Wi‑Fi yordamida o‘rnating.']
};

const dayOptions = [['any', 'anyDuration'], ['7', 'short'], ['14', 'medium'], ['30', 'long'], ['custom', 'custom']];
const dataChoices = [0, 1, 3, 5, 10];
const { maxDays: maxTripDays, maxFilterGb: maxDataNeeded } = TourSIMDataEstimate;
const sortOptions = [['price', 'sortPrice'], ['data', 'sortData']];
const headerNavigation = [['plans', 'headerPlans'], ['how-it-works', 'how'], ['coverage', 'headerCoverage']];
const navigation = [['plans', 'navPlans'], ['how-it-works', 'how'], ['coverage', 'navCoverage'], ['planner', 'navPlanner'], ['phone', 'compatibility'], ['account', 'navAccount'], ['purchase', 'navPurchase'], ['faq', 'faq']];
const planOrigins = ['home', 'plans', 'compare', 'planner'];
const storageKey = 'toursim-trip';
const app = document.querySelector('#app');
const siteHeader = document.querySelector('.site-header');
const languageSelect = document.querySelector('#language');
const mobileMenu = document.querySelector('#mobile-navigation');
const menuButton = document.querySelector('#open-mobile-menu');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let homeBanner;
let purchaseObserver;
const getPlan = id => plans.find(plan => plan.id === id);
const validDuration = value => dayOptions.some(([choice]) => choice === value);
const validCustomDays = value => Number.isInteger(value) && value >= 1 && value <= maxTripDays;
const validData = value => Number.isFinite(value) && value >= 0 && value <= maxDataNeeded;

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
  platform: saved.platform === 'android' ? 'android' : 'iphone'
};

function saveTrip() {
  const { duration, customDays, dataNeeded, sort, compare, platform } = state;
  try { sessionStorage.setItem(storageKey, JSON.stringify({ duration, customDays, dataNeeded, sort, compare: [...compare], platform })); } catch {}
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

function providerButton(plan, checkout) {
  const label = text('openProvider').replace('{provider}', providers[plan.provider].name);
  return `<a class="button button-primary" href="${checkout}" target="_blank" rel="noopener noreferrer">${label}${icon('external-link')}</a>`;
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
  if (name === 'phone') return { name, plan, from };
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
  const number = new Intl.NumberFormat(state.language, { maximumFractionDigits: 5 });
  return amounts.map(value => option(value, value ? `${text('fromData')} ${gigabytes(number.format(value))}` : text('anyData'), value === state.dataNeeded)).join('');
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

function finder(context) {
  return `<div class="panel finder-module">
    <form class="finder" id="finder">
      <div class="finder-fields">${tripFields()}</div>
      <button class="button button-primary" type="submit">${text('showPlans')}${icon('arrow-right')}</button>
    </form>
    ${TourSIMDataGuide.render(context)}
  </div>`;
}

function tripPresets() {
  return `<div class="trip-presets" role="group" aria-label="${text('presets')}">
    ${dayOptions.slice(1, 4).map(([value, label]) => `<button type="button" data-action="trip-preset" data-duration="${value}" aria-pressed="${value === state.duration}">${text(label)}</button>`).join('')}
  </div>`;
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
    return `<article class="plan-item" data-plan="${plan.id}">
      <div class="plan-card-header">
        <h3 class="carrier"><span class="provider-mark provider-${plan.provider}" aria-hidden="true">${provider.initial}</span>${provider.name}</h3>
        ${compare ? `<label class="compare-choice"><input type="checkbox" name="compare" value="${plan.id}" aria-label="${text('selectCompare')}: ${label}"${selected ? ' checked' : state.compare.size === 2 ? ' disabled' : ''}><span>${text('selectCompare')}</span></label>` : ''}
      </div>
      <div class="plan-values"><strong class="plan-data">${data}</strong><strong class="plan-price">${price(plan)} <small>USD</small></strong></div>
      <ul class="plan-meta">
        <li>${icon('calendar-days')}<span>${compare ? `<span class="meta-label">${text('validity')}</span>` : ''}${days(plan.days)}</span></li>
        <li>${icon('signal')}<span>${compare ? `<span class="meta-label">${text('networkShort')}</span>` : ''}${text(provider.network)}</span></li>
        <li>${icon('wifi')}<span>${text('dataService')}</span></li>
        ${plan.checkAvailability ? `<li class="plan-availability">${icon('circle-alert')}<span>${text('availability')}</span></li>` : ''}
        ${plan === recommended ? `<li class="recommendation">${icon('check')}${text('lowestMatch')}</li>` : ''}
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

function resultSummary(count, full) {
  return full || count <= 3 ? resultCount(count) : text('showingPlans').replace('{shown}', 3).replace('{total}', count);
}

function planResults(items, compare) {
  if (!items.length) return `<div class="panel empty-state">
    <span class="icon-tile">${icon('search')}</span><h3>${text('emptyTitle')}</h3><p>${text('empty')}</p>
    <button type="button" class="button button-secondary" data-action="reset">${text('reset')}</button>
  </div>`;
  const shown = compare ? items : items.slice(0, 3);
  const verified = items.filter(plan => !plan.checkAvailability);
  const recommended = verified.reduce((lowest, plan) => lowest && lowest.price <= plan.price ? lowest : plan, null);
  return `${planList(shown, compare, recommended)}
    ${shown.includes(recommended) ? `<p class="note recommendation-note">${icon('circle-check')}${text('verifiedReason')}</p>` : ''}
    ${items.length > shown.length ? `<div class="show-all"><a href="#plans" class="button button-secondary">${text('showCatalogCount').replace('{total}', items.length)}${icon('arrow-right')}</a></div>` : ''}`;
}

function resultsSection(items, compare, context) {
  const heading = compare ? 'h1' : 'h2';
  return `<section class="results-section" aria-labelledby="catalog-heading">
    <div class="results-heading">
      <div>
        <${heading} class="section-title" id="catalog-heading" tabindex="-1">${text(compare ? 'plans' : 'featured')}</${heading}>
        <p class="${compare || items.length <= 3 ? 'sr-only' : 'note'}" id="results-count" role="status">${resultSummary(items.length, compare)}</p>
      </div>
      ${sortField()}
    </div>
    ${compare ? `<div class="panel catalog-fields">${tripFields()}${tripPresets()}</div>${TourSIMDataGuide.render(context)}` : ''}
    <div id="catalog-results" data-compare="${compare}" tabindex="-1">${planResults(items, compare)}</div>
  </section>`;
}

function hero() {
  return `<section class="hero" aria-labelledby="hero-title">
    <img class="hero-photo" src="assets/samarkand-hero.webp" alt="" width="2172" height="724" fetchpriority="high">
    <div class="container hero-inner">
      <div class="hero-copy">
        <h1 id="hero-title" tabindex="-1">${text('heroTitle')}</h1>
        <p>${text('subtitle')}</p>
        <a href="#phone" class="text-action hero-compatibility">${icon('smartphone')}${text('checkCompatibility')}</a>
      </div>
      <span class="hero-location">${icon('map-pin')}${text('samarkand')}</span>
    </div>
  </section>`;
}

const howSteps = [
  ['choose', 'chooseTitle', 'chooseBody', 'plans'],
  ['install', 'installTitle', 'installBody', 'purchase'],
  ['connect', 'connectTitle', 'connectBody', 'setup']
];
const faqItems = [
  ['faqPhone', 'faqPhoneBody'], ['faqCalls', 'dataOnly'], ['faqActivation', 'faqActivationBody'],
  ['faqPassport', 'faqPassportBody'], ['faqPayment', 'purchaseNotice']
];

function home(context) {
  return `${hero()}
    ${finder(context)}
    <div class="container home-content">
      ${resultsSection(availablePlans(), false, context)}
      <section class="home-section" aria-labelledby="how-it-works">
        <h2 class="section-title" id="how-it-works" tabindex="-1">${text('how')}</h2>
        <ol class="how-list">${howSteps.map(([scene, title, body, route]) => `<li>
          <a class="how-card" href="#${route}" aria-labelledby="how-${scene}-title" aria-describedby="how-${scene}-description">
            <div class="how-card-copy">
              <h3 id="how-${scene}-title">${text(title)}</h3>
              <span class="home-card-arrow">${icon('arrow-right')}</span>
              <p id="how-${scene}-description">${text(body)}</p>
            </div>
            <img class="how-illustration" src="assets/service-${scene}.svg?v=20261126-5" alt="" width="360" height="220" loading="lazy" decoding="async">
          </a>
        </li>`).join('')}</ol>
      </section>
      <div class="home-section home-resources">
        <a class="panel home-resource" href="#phone" aria-labelledby="compatibility-heading" aria-describedby="compatibility-summary">
          <span class="home-step-icon">${icon('smartphone')}</span>
          <h2 id="compatibility-heading">${text('checkPhone')}</h2>
          <span class="home-card-arrow">${icon('arrow-right')}</span>
          <p id="compatibility-summary">${text('compatibilityIntro')}</p>
        </a>
        <a class="panel home-resource" href="#coverage" aria-labelledby="coverage-entry" aria-describedby="coverage-summary">
          <span class="home-step-icon">${icon('map')}</span>
          <h2 id="coverage-entry">${text('navCoverage')}</h2>
          <span class="home-card-arrow">${icon('arrow-right')}</span>
          <p id="coverage-summary">${text('coverageIntro')}</p>
        </a>
      </div>
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
    <div class="compare-overview">
      <span id="compare-count" role="status">${text('compareCount').replace('{count}', state.compare.size)}</span>
      <span class="note compare-limit">${text('compareLimit')}</span>
    </div>
    <div class="compare-picked" id="compare-picked">${compareChips()}</div>
    <button class="button button-primary" id="compare-button" type="button" data-action="compare"${state.compare.size === 2 ? '' : ' disabled'}>${text('compare')}${icon('git-compare-arrows')}</button>
  </div>`;
}

function compareChips() {
  return [...state.compare].map(getPlan).filter(Boolean).map(plan => {
    const label = `${providers[plan.provider].name} · ${gigabytes(plan.data)}`;
    return `<span class="compare-chip"><span>${label}</span><button type="button" data-action="remove-compare" data-plan-id="${plan.id}" aria-label="${text('removePlan').replace('{plan}', label)}">${icon('x')}</button></span>`;
  }).join('');
}

function catalog(context) {
  const items = availablePlans();
  trimComparison(items);
  return `<div class="container page catalog-page">
    <div class="page-top"><a class="text-action" href="#home">${icon('arrow-left')}${text('back')}</a></div>
    ${resultsSection(items, true, context)}
    ${compareTray()}
  </div>`;
}

function updateCompareTray() {
  const tray = app.querySelector('#compare-tray');
  if (!tray) return;
  tray.hidden = state.compare.size === 0;
  app.querySelector('#compare-count').textContent = text('compareCount').replace('{count}', state.compare.size);
  app.querySelector('#compare-picked').innerHTML = compareChips();
  app.querySelector('#compare-button').disabled = state.compare.size !== 2;
}

function synchronizeCompareInputs() {
  for (const checkbox of app.querySelectorAll('input[name="compare"]')) {
    checkbox.checked = state.compare.has(checkbox.value);
    checkbox.disabled = !checkbox.checked && state.compare.size === 2;
  }
}

function refreshPlans() {
  const results = app.querySelector('#catalog-results');
  if (!results) return;
  const numberField = app.querySelector('#custom-days');
  const count = app.querySelector('#results-count');
  const invalid = numberField.willValidate && !numberField.validity.valid;
  results.hidden = invalid;
  if (invalid) {
    numberField.setAttribute('aria-invalid', 'true');
    numberField.setAttribute('aria-describedby', 'results-count');
    count.className = 'note';
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
  const compare = results.dataset.compare === 'true';
  results.innerHTML = planResults(items, compare);
  if (!compare && !reduceMotion.matches) {
    results.firstElementChild?.animate?.([{ opacity: .9 }, { opacity: 1 }], { duration: 150, easing: 'ease-out' });
  }
  count.className = compare || items.length <= 3 ? 'sr-only' : 'note';
  count.textContent = resultSummary(items.length, compare);
  updateCompareTray();
}

function applyEstimate({ days, totalGb }) {
  state.customDays = days;
  state.dataNeeded = totalGb;
  app.querySelector('#custom-days').value = days;
  app.querySelector('#data-needed').innerHTML = dataOptions();
  const duration = app.querySelector('#duration');
  duration.value = 'custom';
  duration.dispatchEvent(new Event('change', { bubbles: true }));
  const results = app.querySelector('#catalog-results');
  results.scrollIntoView({ block: 'start' });
  results.focus({ preventScroll: true });
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

function compare(pair, context) {
  if (pair.some(plan => !plan) || pair[0].id === pair[1].id) return catalog(context);
  state.compare = new Set(pair.map(plan => plan.id));
  const metrics = pair.map(planMetrics);
  return page(text('comparison'), 'plans', `<div class="panel comparison-panel">
    <div class="comparison-actions"><p class="note">${text('differences')}</p><button class="button button-secondary share-button" type="button" data-action="share">${text('shareCompare')}</button></div>
    <div class="compare-table-wrap"><table class="comparison"><thead><tr><td></td>${pair.map(plan => `<th scope="col">${providers[plan.provider].name}<br><strong>${gigabytes(plan.data)}</strong></th>`).join('')}</tr></thead>
    <tbody>${metrics[0].map(([key, value, source], index) => `<tr${value === metrics[1][index][1] ? '' : ' class="different"'}><th scope="row">${text(key)}</th><td>${metricContent(value, source)}</td><td>${metricContent(...metrics[1][index].slice(1))}</td></tr>`).join('')}
    <tr><td></td>${pair.map(plan => `<td><a href="#${planPath(plan, 'compare')}" class="button button-secondary comparison-plan" aria-label="${text('details')}: ${providers[plan.provider].name} · ${gigabytes(plan.data)}">${text('details')}${icon('arrow-right')}</a></td>`).join('')}</tr></tbody></table></div>
    <section class="shared-conditions"><h2>${text('commonConditions')}</h2>${metricList(commonConditions())}</section>
  </div>`, 'narrow-page');
}

function details(plan, from) {
  const provider = providers[plan.provider];
  const back = from === 'compare' ? state.compare.size === 2 ? comparePath() : 'plans' : from;
  const [, , ...facts] = planMetrics(plan);
  const checkout = storefront(plan);
  const checkRoute = relatedPath('phone', plan, from);
  return page(`${provider.name} <span class="title-divider">·</span> ${gigabytes(plan.data)}`, back, `<div class="detail-grid">
    <section class="panel plan-facts">
      <h2>${text('planDetails')}</h2>
      <p class="plan-facts-lead">${icon('calendar-days')}${days(plan.days)}<span aria-hidden="true">·</span>${icon('signal')}${text(provider.network)}</p>
      ${metricList([...facts, ...commonConditions()])}
    </section>
    <aside class="panel purchase-panel" aria-label="${text('purchaseTitle')}">
      <div class="purchase-price"><span>${text('price')}</span><strong>${price(plan)} <small>USD</small></strong></div>
      ${link('checkEsim', checkRoute, 'button button-secondary', 'smartphone')}
      <div class="desktop-buy">${providerButton(plan, checkout)}</div>
      <p class="note">${text('purchaseNotice')}</p>
      <p class="note${plan.checkAvailability ? ' plan-availability' : ''}">${purchaseHint(plan)}</p>
      ${link('navPurchase', relatedPath('purchase', plan, from), 'text-action', 'arrow-right')}
      ${link('install', relatedPath('setup', plan, from), 'text-action', 'smartphone')}
    </aside></div>
    <div class="mobile-purchase" hidden><div class="mobile-price"><strong>${price(plan)}</strong><small> USD</small></div>${providerButton(plan, checkout)}</div>`, 'offer-page');
}

function phoneSteps() {
  return state.platform === 'iphone'
    ? `<p>${text('iphoneSteps')}</p>${external('appleHelp', 'https://support.apple.com/en-us/118669')}`
    : `<p>${text('androidSteps')}</p>${external('samsungHelp', 'https://www.samsung.com/us/support/answer/ANS10001619/')}`;
}

function phone(plan, from) {
  const back = plan ? planPath(plan, from) : from;
  return page(text('checkPhone'), back, `<div class="panel setup-panel compatibility-panel">
    <p>${text('compatibilityIntro')}</p>
    <fieldset class="device-switch"><legend class="sr-only">${text('platform')}</legend>
      ${[['iphone', 'iPhone'], ['android', 'Android']].map(([value, label]) => `<label><input type="radio" name="platform" value="${value}"${state.platform === value ? ' checked' : ''}><span>${icon('smartphone')}${label}</span></label>`).join('')}
    </fieldset>
    <div class="phone-steps" id="phone-steps" aria-live="polite">${phoneSteps()}</div>
    <p class="note">${text('phoneModels')}</p>
    <p class="notice">${icon('shield-check')}${text('phoneCheck')}</p>
    <div class="actions">
      ${link('foundEsim', plan ? back : 'plans', 'button button-primary', 'check')}
      <button class="button button-secondary" type="button" data-action="phone-help">${text('missingEsim')}</button>
    </div>
    <p class="notice" id="phone-feedback" hidden role="status">${icon('circle-alert')}${text('confirmWithMaker')}</p>
  </div>`, 'narrow-page');
}

function setup(plan, from) {
  const back = plan ? planPath(plan, from) : from;
  return page(text('install'), back, `<div class="panel setup-panel">
    <p class="notice">${icon('smartphone')}${text('phoneCheck')}</p>
    <ol class="steps">${['installWifi', 'installData', 'installRoaming'].map(step => `<li>${text(step)}</li>`).join('')}</ol>
    <div class="actions">${link('checkEsim', relatedPath('phone', plan, from), 'button button-secondary', 'smartphone')}${link('navPurchase', relatedPath('purchase', plan, from), 'text-action', 'arrow-right')}</div>
  </div>`, 'narrow-page');
}

function renderChrome(active) {
  document.documentElement.lang = state.language;
  document.title = `TourSIM | ${text('tagline')}`;
  document.querySelector('#language-label').textContent = text('language');
  document.querySelector('#menu-label').textContent = text('menu');
  document.querySelector('#drawer-title').textContent = text('menu');
  document.querySelector('#menu-close-label').textContent = text('close');
  document.querySelector('#skip-link').textContent = text('skip');
  const accountLabel = document.querySelector('#header-account-label');
  accountLabel.textContent = text('headerAccount');
  const accountLink = accountLabel.closest('a');
  if (active === 'account') accountLink.setAttribute('aria-current', 'page');
  else accountLink.removeAttribute('aria-current');
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

function syncHeader() {
  siteHeader.toggleAttribute('data-overlay', Boolean(homeBanner && homeBanner.getBoundingClientRect().bottom > siteHeader.offsetHeight));
}

function observePurchaseBar() {
  purchaseObserver?.disconnect();
  const bar = app.querySelector('.mobile-purchase');
  const buy = app.querySelector('.desktop-buy a');
  if (bar && buy && 'IntersectionObserver' in window) {
    purchaseObserver = new IntersectionObserver(([entry]) => {
      const buyVisible = entry.intersectionRatio >= 0.6;
      if (buyVisible && bar.contains(document.activeElement)) buy.focus({ preventScroll: true });
      bar.hidden = buyVisible;
    }, { rootMargin: '-78px 0px -20px 0px', threshold: 0.6 });
    purchaseObserver.observe(buy);
  }
}

function render(navigate = false, loadSharedFilters = false) {
  const { name, plan, pair, from, anchor, query } = readRoute();
  if (loadSharedFilters && query) restoreSharedFilters(query);
  document.querySelector('.share-dialog[open]')?.close();
  const pendingAuth = !navigate && name === 'account' && app.querySelector('.esim-auth form');
  const authDraft = pendingAuth ? {
    email: pendingAuth.elements.email.value,
    password: pendingAuth.elements.password.value
  } : null;
  const context = {
    language: state.language, plans: name === 'planner' ? plans.filter(item => !item.checkAvailability) : plans,
    providers, icon, plan, purchaseHref: storefront, purchaseHint, authDraft, applyEstimate,
    planHref: selected => `#${planPath(selected, name === 'planner' ? 'planner' : from)}`,
    phoneCheck: text('phoneCheck'),
    phoneHref: `#${relatedPath('phone', plan, from)}`, phoneLabel: text('checkEsim'),
    setupHref: `#${relatedPath('setup', plan, from)}`
  };
  const views = {
    home, plans: catalog, compare: () => compare(pair, context), plan: () => details(plan, from),
    setup: () => setup(plan, from), phone: () => phone(plan, from),
    planner: TourSIMPlanner.render, coverage: TourSIMCoverage.render,
    purchase: TourSIMPurchase.renderPurchase, account: TourSIMPurchase.renderAccount
  };
  const mounts = {
    planner: TourSIMPlanner.mount, coverage: TourSIMCoverage.mount,
    purchase: TourSIMPurchase.mount, account: TourSIMPurchase.mount
  };
  renderChrome(anchor ?? (name === 'compare' || name === 'plan' ? 'plans' : name));
  app.innerHTML = views[name](context);
  homeBanner = app.querySelector('.hero');
  document.body.classList.toggle('home-route', Boolean(homeBanner));
  mounts[name]?.(app, context);
  TourSIMDataGuide.mount(app, context);
  saveTrip();
  if (navigate) {
    if (mobileMenu.open) mobileMenu.close();
    const target = anchor ? document.getElementById(anchor) : app.querySelector('h1');
    if (anchor) target.scrollIntoView({ block: 'start' });
    else window.scrollTo(0, 0);
    target.focus({ preventScroll: true });
  }
  syncHeader();
  observePurchaseBar();
}

window.addEventListener('scroll', syncHeader, { passive: true });
window.addEventListener('resize', syncHeader);

for (const element of document.querySelectorAll('[data-icon]')) element.innerHTML = icon(element.dataset.icon);

document.querySelector('#skip-link').addEventListener('click', event => {
  event.preventDefault();
  app.focus();
});
menuButton.addEventListener('click', () => {
  mobileMenu.showModal();
  menuButton.setAttribute('aria-expanded', 'true');
});
mobileMenu.addEventListener('close', () => menuButton.setAttribute('aria-expanded', 'false'));
mobileMenu.addEventListener('click', event => {
  if (event.target.closest('a')) mobileMenu.close();
  if (event.target !== mobileMenu) return;
  const rect = mobileMenu.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) mobileMenu.close();
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
    for (const preset of app.querySelectorAll('[data-duration]')) preset.setAttribute('aria-pressed', preset.dataset.duration === state.duration);
  } else if (control.id === 'data-needed') {
    state.dataNeeded = Number(control.value);
  } else if (control.id === 'plan-sort') {
    state.sort = control.value;
  } else if (control.name === 'platform') {
    state.platform = control.value;
    app.querySelector('#phone-steps').innerHTML = phoneSteps();
    app.querySelector('#phone-feedback').hidden = true;
    saveTrip();
    return;
  } else if (control.name === 'compare' && getPlan(control.value)) {
    if (control.checked && state.compare.size < 2) state.compare.add(control.value);
    else state.compare.delete(control.value);
    updateCompareTray();
    synchronizeCompareInputs();
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
  if (control.dataset.action === 'trip-preset') {
    const duration = app.querySelector('#duration');
    duration.value = control.dataset.duration;
    duration.dispatchEvent(new Event('change', { bubbles: true }));
  }
  if (control.dataset.action === 'remove-compare') {
    const id = control.dataset.planId;
    state.compare.delete(id);
    updateCompareTray();
    synchronizeCompareInputs();
    saveTrip();
    const target = app.querySelector('#compare-picked button') ?? app.querySelector(`input[name="compare"][value="${id}"]`);
    target?.focus();
  }
  if (control.dataset.action === 'phone-help') app.querySelector('#phone-feedback').hidden = false;
  if (control.dataset.action === 'share') showShare();
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
