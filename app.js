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
  checkEsim: ["Check phone compatibility","Проверить совместимость","Telefon mosligini tekshirish"],
  featured: ["Plans for your trip","Пакеты для вашей поездки","Safaringizga mos paketlar"],
  plans: ["Compare eSIM plans","Сравните пакеты eSIM","eSIM paketlarini solishtiring"],
  checkedOn: ['Sources checked', 'Источники проверены', 'Manbalar tekshirildi'],
  publishedPrices: ['Price per package in USD. Confirm with the seller.', 'Цена за пакет в USD. Итоговая цена у продавца.', 'Paket narxi USDda. Yakuniy narx sotuvchida.'],
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
  enjoyNetwork: ['Usually Ucell or Beeline; check the package', 'Обычно Ucell или Beeline; проверьте условия пакета', 'Odatda Ucell yoki Beeline; paket shartlarini tekshiring'],
  service: ['What’s included', 'Что входит', 'Paket tarkibi'],
  dataOnly: ['Data only; no Uzbek number, calls or SMS', 'Только интернет, без местного номера, звонков и SMS', 'Faqat internet; mahalliy raqam, qo‘ng‘iroq va SMS yo‘q'],
  verification: ['Passport verification', 'Проверка паспорта', 'Pasport tekshiruvi'],
  noVerification: ['Not required by the provider for this data plan', 'Провайдер не требует для этого интернет-пакета', 'Provayder bu internet paketi uchun talab qilmaydi'],
  activation: ['Package starts', 'Когда начинается срок', 'Paket qachon boshlanadi'],
  firstNetwork: ['On first connection to a supported network', 'При первом подключении к поддерживаемой сети', 'Mos tarmoqqa birinchi ulanishda'],
  details: ["View plan","Смотреть пакет","Paketni ko‘rish"],
  providerTerms: ['Provider terms', 'Условия провайдера', 'Provayder shartlari'],
  buy: ["Buy eSIM","Купить eSIM","eSIM xarid qilish"],
  purchaseNotice: ['Pay and receive your eSIM on the provider’s site.', 'Оплата и получение eSIM у провайдера.', 'To‘lov va eSIM olish provayder saytida.'],
  tripMore: ['More offers on Trip.com', 'Другие предложения на Trip.com', 'Trip.com’dagi boshqa takliflar'],
  tripNote: ['Check prices and ID requirements on Trip.com.', 'Проверьте цену и требования к документам на Trip.com.', 'Narx va hujjat talablarini Trip.com’da tekshiring.'],
  checkPhone: ['Does your phone support eSIM?', 'Ваш телефон поддерживает eSIM?', 'Telefoningiz eSIM’ni qo‘llaydimi?'],
  beforePurchase: ['Before you buy', 'Перед покупкой', 'Xariddan oldin'],
  checkPhoneLink: ['Check your phone', 'Проверить телефон', 'Telefonni tekshirish'],
  commonConditions: ['Shared conditions', 'Общие условия', 'Umumiy shartlar'],
  unlocked: ['Before buying, confirm the phone is unlocked for other networks.', 'Перед покупкой убедитесь, что телефон не заблокирован под одного оператора.', 'Xariddan oldin telefon boshqa operatorlarga ochiq ekanini tekshiring.'],
  esimAvailable: ['I see “Add eSIM”', 'Есть «Добавить eSIM»', '«eSIM qo‘shish» bor'],
  esimUnknown: ['Not available or not sure', 'Нет пункта или не уверен', 'Yo‘q yoki ishonchim komil emas'],
  unsupported: ['Don’t buy an eSIM yet', 'Пока не покупайте eSIM', 'Hozircha eSIM sotib olmang'],
  fallback: ['Check your exact phone model, or ask your current carrier about a roaming data package for Uzbekistan.', 'Уточните поддержку eSIM для своей модели или проверьте интернет-пакет для Узбекистана у своего оператора.', 'Telefon modelingizni tekshiring yoki operatoringizdan O‘zbekiston uchun rouming internet paketini so‘rang.'],
  install: ['How to install', 'Как установить', 'Qanday o‘rnatiladi'],
  installWifi: ['Install the eSIM over Wi-Fi using the provider’s instructions.', 'Установите eSIM по Wi‑Fi по инструкции провайдера.', 'Provayder yo‘riqnomasi bo‘yicha eSIM’ni Wi‑Fi orqali o‘rnating.'],
  installData: ['In Uzbekistan, choose the travel eSIM for mobile data.', 'В Узбекистане выберите туристическую eSIM для мобильного интернета.', 'O‘zbekistonda mobil internet uchun sayohat eSIM’ini tanlang.'],
  installRoaming: ['Enable data roaming on the travel eSIM only. Leave data roaming off on your main SIM.', 'Включите роуминг данных только на туристической eSIM. На основной SIM оставьте его выключенным.', 'Ma’lumotlar roumingini faqat sayohat eSIM’ida yoqing. Asosiy SIM’da uni o‘chiq qoldiring.'],
  tagline: ["Travel eSIM for Uzbekistan","Туристические eSIM для Узбекистана","O‘zbekiston uchun sayohat eSIM paketlari"],
  samarkand: ["Samarkand, Uzbekistan","Самарканд, Узбекистан","Samarqand, O‘zbekiston"],
  navPlans: ["Plans","Пакеты","Paketlar"],
  navPlanner: ['Plan finder', 'Умный подбор', 'Paket tanlash'],
  navCoverage: ['Coverage', 'Карта покрытия', 'Qamrov xaritasi'],
  navPurchase: ['Buy eSIM', 'Покупка eSIM', 'eSIM xaridi'],
  navAccount: ['My eSIMs', 'Личный кабинет', 'Mening eSIMlarim'],
  how: ["How it works","Как это работает","Qanday ishlaydi"],
  compatibility: ["Compatibility","Совместимость","Moslik"],
  faq: ["FAQ","Частые вопросы","Savol-javob"],
  navLabel: ["Main navigation","Основная навигация","Asosiy navigatsiya"],
  footerLabel: ["Footer navigation","Навигация в подвале","Sahifa oxiri navigatsiyasi"],
  menu: ["Menu","Меню","Menyu"],
  skip: ["Skip to content","К содержимому","Asosiy mazmunga o‘tish"],
  showCatalog: ["View all matching plans","Все подходящие пакеты","Barcha mos paketlar"],
  lowestMatch: ["Lowest price","Минимальная цена","Eng arzon paket"],
  emptyTitle: ["No matching plans","Подходящих пакетов нет","Mos paket topilmadi"],
  chooseTitle: ["Choose a plan","Выберите пакет","Paketni tanlang"],
  chooseBody: ["Set your trip length and data needs, then compare the available packages.","Укажите срок поездки и объём интернета, затем сравните доступные пакеты.","Safar muddati va internet hajmini belgilang, so‘ng mavjud paketlarni solishtiring."],
  buyTitle: ["Get your eSIM","Получите eSIM","eSIM oling"],
  buyBody: ["Check your phone and complete the purchase on the provider’s site.","Проверьте телефон и оформите покупку на сайте провайдера.","Telefoningizni tekshiring va provayder saytida xarid qiling."],
  connectTitle: ["Connect on arrival","Подключитесь по приезде","Yetib kelgach ulaning"],
  connectBody: ["Follow the provider’s instructions and select the travel eSIM for mobile data.","Следуйте инструкции провайдера и выберите туристическую eSIM для мобильного интернета.","Provayder yo‘riqnomasiga amal qiling va mobil internet uchun sayohat eSIM’ini tanlang."],
  faqCalls: ["Can I make calls or send SMS?","Можно ли звонить и отправлять SMS?","Qo‘ng‘iroq qilish yoki SMS yuborish mumkinmi?"],
  faqActivation: ["When does the plan start?","Когда начинает действовать пакет?","Paket qachon ishlay boshlaydi?"],
  faqActivationBody: ["The listed plans start when the eSIM first connects to a supported network.","У пакетов из каталога срок начинается при первом подключении к поддерживаемой сети.","Katalogdagi paketlar eSIM mos tarmoqqa ilk bor ulanganda ishlay boshlaydi."],
  faqPassport: ["Do I need a passport to buy a plan?","Нужен ли паспорт для покупки?","Xarid uchun pasport kerakmi?"],
  faqPassportBody: ["The providers of the listed data plans do not require passport verification. Check current terms before purchasing.","Для интернет-пакетов в каталоге провайдеры не требуют проверки паспорта. Перед покупкой проверьте актуальные условия.","Katalogdagi internet paketlari uchun provayderlar pasport tekshiruvini talab qilmaydi. Xariddan oldin amaldagi shartlarni tekshiring."],
  faqPayment: ["Where do I pay and receive the eSIM?","Где оплатить и получить eSIM?","eSIM uchun qayerda to‘lov qilinadi va u qayerdan olinadi?"],
  planDetails: ["Plan details","Условия пакета","Paket shartlari"],
  purchaseTitle: ["Buy from the provider","Покупка у провайдера","Provayderdan xarid qilish"],
  selectedPlan: ["Selected plan","Выбранный пакет","Tanlangan paket"],
  deviceType: ["Phone type","Тип телефона","Telefon turi"],
  openSettings: ["Open Settings on your phone.","Откройте настройки телефона.","Telefon sozlamalarini oching."],
  iphoneCellular: ["Tap Cellular or Mobile Data.","Откройте «Сотовая связь» или «Мобильные данные».","«Mobil aloqa» yoki «Mobil ma’lumotlar»ni tanlang."],
  androidSim: ["Find SIMs or SIM manager under Network & internet or Connections.","В разделе «Сеть и интернет» или «Подключения» откройте «SIM-карты» или «Диспетчер SIM».","«Tarmoq va internet» yoki «Ulanishlar» bo‘limidan «SIM-kartalar» yoki «SIM menejeri»ni oching."],
  iphoneAdd: ["Look for Add eSIM or Set Up Cellular.","Найдите «Добавить eSIM» или «Настроить сотовую связь».","«eSIM qo‘shish» yoki «Mobil aloqani sozlash» bandini qidiring."],
  androidAdd: ["Look for Add eSIM or an eSIM option under Add SIM. Names vary by device.","Найдите «Добавить eSIM» или пункт eSIM в меню «Добавить SIM». Название зависит от модели.","«eSIM qo‘shish»ni yoki «SIM qo‘shish»dagi eSIM bandini qidiring. Nomi modelga bog‘liq."],
  unlockedTitle: ["Check the carrier lock","Проверьте блокировку оператора","Operator blokirovkasini tekshiring"],
  supported: ["Your phone has an eSIM option","В телефоне есть пункт eSIM","Telefonda eSIM bandi bor"],
  backToPlan: ["Return to selected plan","Вернуться к пакету","Tanlangan paketga qaytish"],
  backToPlans: ["Browse plans","К списку пакетов","Paketlar ro‘yxatiga"]
};

const dayOptions = [['any', 'anyDuration'], ['7', 'short'], ['14', 'medium'], ['30', 'long'], ['custom', 'custom']];
const dataChoices = [0, 1, 3, 5, 10];
const sortOptions = [['price', 'sortPrice'], ['data', 'sortData']];
const headerNavigation = [['plans', 'navPlans'], ['planner', 'navPlanner'], ['coverage', 'navCoverage'], ['phone', 'compatibility'], ['account', 'navAccount']];
const navigation = [...headerNavigation, ['purchase', 'navPurchase'], ['how-it-works', 'how'], ['faq', 'faq']];
const planOrigins = ['home', 'plans', 'compare', 'planner'];
const storageKey = 'toursim-trip';
const app = document.querySelector('#app');
const languageSelect = document.querySelector('#language');
const mobileMenu = document.querySelector('#mobile-navigation');
const getPlan = id => plans.find(plan => plan.id === id);

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
  duration: dayOptions.some(([value]) => value === saved.duration) ? saved.duration : '14',
  customDays: Number.isInteger(saved.customDays) && saved.customDays > 0 && saved.customDays <= 365 ? saved.customDays : 14,
  dataNeeded: dataChoices.includes(saved.dataNeeded) ? saved.dataNeeded : 0,
  sort: saved.sort === 'data' ? 'data' : 'price',
  compare: new Set(Array.isArray(saved.compare) ? saved.compare.filter(getPlan).slice(0, 2) : []),
  device: saved.device === 'android' ? 'android' : 'iphone'
};

function saveTrip() {
  const { duration, customDays, dataNeeded, sort, compare, device } = state;
  try { sessionStorage.setItem(storageKey, JSON.stringify({ duration, customDays, dataNeeded, sort, compare: [...compare], device })); } catch {}
}

const text = key => strings[key][languages.indexOf(state.language)];
const price = plan => new Intl.NumberFormat(state.language, { maximumFractionDigits: 2 }).format(plan.price);
function days(plan) {
  if (state.language === 'uz') return `${plan.days} kun`;
  if (state.language === 'en') return `${plan.days} ${plan.days === 1 ? 'day' : 'days'}`;
  const forms = { one: 'день', few: 'дня', many: 'дней', other: 'дня' };
  return `${plan.days} ${forms[new Intl.PluralRules('ru').select(plan.days)]}`;
}
const gigabytes = value => `${value} ${text('gb')}`;
const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${lucide[name]}</svg>`;
const option = (value, label, selected) => `<option value="${value}"${selected ? ' selected' : ''}>${label}</option>`;
const optionList = (options, selected) => options.map(([value, label]) => option(value, text(label), value === selected)).join('');
const link = (label, route, style = 'button button-secondary', iconName) => `<a class="${style}" href="#${route}">${text(label)}${iconName ? icon(iconName) : ''}</a>`;
const external = (label, url, style = 'text-action') => `<a class="${style}" href="${url}" target="_blank" rel="noopener noreferrer">${text(label)}${icon('arrow-up-right')}</a>`;
const comparePath = () => `compare/${[...state.compare].join('/')}`;
const brand = () => '<a class="wordmark" href="#home" aria-label="TourSIM"><img class="brand-icon" src="assets/toursim-mark.svg" alt="" width="36" height="36">Tour<span>SIM</span></a>';

function planPath(plan, from) {
  return `plan/${plan.id}${from === 'plans' ? '' : `/${from}`}`;
}

function relatedPath(name, plan, from) {
  if (plan) return `${name}/${plan.id}${from === 'plans' ? '' : `/${from}`}`;
  return from === 'plans' ? `${name}/plans` : name;
}

function readRoute() {
  const [name, id, origin, status] = location.hash.slice(1).split('/');
  const plan = getPlan(id);
  const from = plan ? planOrigins.includes(origin) ? origin : 'plans' : id === 'plans' ? 'plans' : 'home';
  if (['plans', 'planner', 'coverage', 'account'].includes(name)) return { name };
  if (name === 'purchase') return { name, plan, from };
  if (name === 'compare') return { name, pair: [plan, getPlan(origin)] };
  if (name === 'plan' && plan) return { name, plan, from };
  if (name === 'phone') {
    const result = [id, origin, status].find(value => value === 'supported' || value === 'unsupported');
    return { name, plan, from, result };
  }
  if (name === 'setup' && (plan || !id || id === 'plans')) return { name, plan, from };
  return { name: 'home', anchor: ['how-it-works', 'faq'].includes(name) ? name : undefined };
}

function go(route) {
  if (location.hash === `#${route}`) render(true);
  else location.hash = route;
}

function availablePlans() {
  const tripDays = state.duration === 'custom' ? state.customDays : Number(state.duration) || 0;
  return plans.filter(plan => plan.days >= tripDays && plan.data >= state.dataNeeded)
    .sort((first, second) => state.sort === 'data' ? second.data - first.data || first.price - second.price : first.price - second.price);
}

function trimComparison(items) {
  const available = new Set(items.map(plan => plan.id));
  for (const id of state.compare) if (!available.has(id)) state.compare.delete(id);
}

function catalogStamp() {
  const date = new Intl.DateTimeFormat(state.language, { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(catalogCheckedOn));
  return `<p class="catalog-stamp note">${icon('calendar-days')}<span>${text('checkedOn')}: <time datetime="${catalogCheckedOn}">${date}</time>. ${text('publishedPrices')}</span></p>`;
}

function dataOptions() {
  return dataChoices.map(value => option(value, value ? `${text('fromData')} ${gigabytes(value)}` : text('anyData'), value === state.dataNeeded)).join('');
}

function tripFields() {
  const custom = state.duration === 'custom';
  return `<div class="trip-field">
      <label for="duration">${icon('calendar-days')}${text('duration')}</label>
      <select class="input" id="duration" name="duration">${optionList(dayOptions, state.duration)}</select>
    </div>
    <div class="trip-field custom-row" id="custom-duration"${custom ? '' : ' hidden'}>
      <label for="custom-days">${text('daysCount')}</label>
      <input class="input" type="number" id="custom-days" name="custom-days" min="1" max="365" required value="${state.customDays}"${custom ? '' : ' disabled'}>
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
        <li>${icon('calendar-days')}<span>${days(plan)}</span></li>
        <li>${icon('signal')}<span>${text(provider.network)}</span></li>
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
  const recommended = compare ? undefined : items.reduce((lowest, plan) => plan.price < lowest.price ? plan : lowest);
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
    ${compare ? `<div class="panel catalog-fields">${tripFields()}</div>` : ''}
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
        ${link('checkEsim', 'phone', 'hero-link', 'arrow-right')}
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
  ['faqCalls', 'dataOnly'], ['faqActivation', 'faqActivationBody'],
  ['faqPassport', 'faqPassportBody'], ['faqPayment', 'purchaseNotice']
];

function home() {
  return `${hero()}
    <div class="container home-content">
      ${finder()}
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
    <aside class="panel purchase-guide" aria-label="${text('beforePurchase')}">
      <span class="icon-tile">${icon('smartphone')}</span>
      <div><h2>${text('beforePurchase')}</h2><p class="note">${text('dataOnly')}</p></div>
      <div class="actions">${link('checkPhoneLink', 'phone/plans', 'text-action', 'arrow-right')}${link('install', 'setup/plans', 'text-action', 'arrow-right')}</div>
    </aside>
    <div class="catalog-source">${catalogStamp()}${external('tripMore', tripStore[state.language] ?? tripStore.en)}<p class="note">${text('tripNote')}</p></div>
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
  return [['price', `${price(plan)} USD`], ['data', gigabytes(plan.data)], ['validity', days(plan)], ['network', text(providers[plan.provider].network)]];
}

function commonConditions() {
  return [['service', text('dataOnly')], ['verification', text('noVerification')], ['activation', text('firstNetwork')]];
}

function metricList(metrics) {
  const glyphs = { validity: 'calendar-days', network: 'signal', service: 'wifi', verification: 'shield-check', activation: 'sliders-horizontal' };
  return `<dl class="metrics">${metrics.map(([key, value]) => `<div>${icon(glyphs[key])}<dt>${text(key)}</dt><dd>${value}</dd></div>`).join('')}</dl>`;
}

function compare(pair) {
  if (pair.some(plan => !plan) || pair[0].id === pair[1].id) return catalog();
  state.compare = new Set(pair.map(plan => plan.id));
  const metrics = pair.map(planMetrics);
  return page(text('comparison'), 'plans', `<div class="panel comparison-panel">
    <table class="comparison"><thead><tr><td></td>${pair.map(plan => `<th scope="col">${providers[plan.provider].name}<br><span class="note">${gigabytes(plan.data)}</span></th>`).join('')}</tr></thead>
    <tbody>${metrics[0].map(([key, value], index) => `<tr><th scope="row">${text(key)}</th><td>${value}</td><td>${metrics[1][index][1]}</td></tr>`).join('')}
    <tr><td></td>${pair.map(plan => `<td>${link('details', planPath(plan, 'compare'), 'text-action', 'arrow-right')}</td>`).join('')}</tr></tbody></table>
    <section class="shared-conditions"><h2>${text('commonConditions')}</h2>${metricList(commonConditions())}</section>
    ${catalogStamp()}</div>`, 'narrow-page');
}

function details(plan, from) {
  const provider = providers[plan.provider];
  const back = from === 'compare' ? state.compare.size === 2 ? comparePath() : 'plans' : from;
  const [, , ...facts] = planMetrics(plan);
  const checkout = relatedPath('purchase', plan, from);
  return page(`${provider.name} <span class="title-divider">·</span> ${gigabytes(plan.data)}`, back, `<div class="detail-grid">
    <section class="panel plan-facts">
      <h2>${text('planDetails')}</h2>
      ${metricList([...facts, ...commonConditions()])}
      ${catalogStamp()}
      ${external('providerTerms', provider.terms)}
    </section>
    <aside class="panel purchase-panel" aria-label="${text('purchaseTitle')}">
      <div class="purchase-price"><span>${text('price')}</span><strong>${price(plan)} <small>USD</small></strong></div>
      <div class="desktop-buy">${link('buy', checkout, 'button button-primary', 'arrow-right')}</div>
      <p class="note">${text('purchaseNotice')}</p>
      <div class="purchase-actions">
        ${link('checkEsim', relatedPath('phone', plan, from), 'text-action', 'arrow-right')}
        ${link('install', relatedPath('setup', plan, from), 'text-action', 'arrow-right')}
      </div>
    </aside></div>
    <div class="mobile-purchase"><div class="mobile-price"><strong>${price(plan)}</strong><small> USD</small></div>${link('buy', checkout, 'button button-primary', 'arrow-right')}</div>`, 'offer-page');
}

function deviceSteps() {
  const steps = state.device === 'iphone' ? ['openSettings', 'iphoneCellular', 'iphoneAdd'] : ['openSettings', 'androidSim', 'androidAdd'];
  return steps.map(step => `<li>${text(step)}</li>`).join('');
}

function phone(plan, from, result) {
  const route = relatedPath('phone', plan, from);
  const back = plan ? planPath(plan, from) : from;
  const next = plan ? back : 'plans';
  const returnLabel = plan ? 'backToPlan' : 'backToPlans';
  const selected = plan ? `<p class="selected-plan">${text('selectedPlan')}: <strong>${providers[plan.provider].name} · ${gigabytes(plan.data)}</strong></p>` : '';
  if (result) {
    const ok = result === 'supported';
    return page(text(ok ? 'supported' : 'unsupported'), route, `<div class="panel phone-panel">
      ${selected}
      <div class="notice${ok ? ' notice-success' : ''}">${icon(ok ? 'circle-check' : 'circle-alert')}<p>${text(ok ? 'unlocked' : 'fallback')}</p></div>
      <div class="actions">${link(returnLabel, next, 'button button-primary', 'arrow-right')}</div>
    </div>`, 'narrow-page');
  }
  return page(text('checkPhone'), back, `<div class="panel phone-panel">
    ${selected}
    <fieldset class="device-switch">
      <legend class="sr-only">${text('deviceType')}</legend>
      ${[['iphone', 'iPhone'], ['android', 'Android']].map(([id, label]) => `<label>
        <input type="radio" name="device" value="${id}"${state.device === id ? ' checked' : ''}><span>${icon('smartphone')}${label}</span>
      </label>`).join('')}
    </fieldset>
    <ol class="steps" id="device-steps" aria-live="polite">${deviceSteps()}</ol>
    <div class="notice">${icon('lock-keyhole-open')}<div><strong>${text('unlockedTitle')}</strong><p>${text('unlocked')}</p></div></div>
    <div class="actions">
      ${link('esimAvailable', `${route}/supported`, 'button button-primary', 'check')}
      ${link('esimUnknown', `${route}/unsupported`)}
    </div>
  </div>`, 'narrow-page');
}

function setup(plan, from) {
  const back = plan ? planPath(plan, from) : from;
  return page(text('install'), back, `<div class="panel phone-panel">
    <ol class="steps">${['installWifi', 'installData', 'installRoaming'].map(step => `<li>${text(step)}</li>`).join('')}</ol>
    <div class="actions">${link('checkEsim', relatedPath('phone', plan, from), 'button button-secondary', 'arrow-right')}</div>
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

function render(navigate = false) {
  const { name, plan, pair, from, result, anchor } = readRoute();
  const context = {
    language: state.language, plans, providers, icon, plan,
    planHref: selected => `#${planPath(selected, name === 'planner' ? 'planner' : from)}`,
    phoneHref: `#${relatedPath('phone', plan, from)}`,
    setupHref: `#${relatedPath('setup', plan, from)}`
  };
  const views = {
    home, plans: catalog, compare: () => compare(pair), plan: () => details(plan, from),
    phone: () => phone(plan, from, result), setup: () => setup(plan, from),
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
  } else if (control.name === 'device') {
    state.device = control.value;
    app.querySelector('#device-steps').innerHTML = deviceSteps();
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
  refreshPlans();
});

app.addEventListener('input', event => {
  const control = event.target;
  if (control.id !== 'custom-days') return;
  if (control.validity.valid) state.customDays = Number(control.value);
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
  if (control.dataset.action === 'compare' && state.compare.size === 2) go(comparePath());
  if (control.dataset.action === 'reset') {
    state.duration = 'any';
    state.dataNeeded = 0;
    render();
    app.querySelector('#duration').focus();
  }
});

window.addEventListener('hashchange', () => render(true));
render(Boolean(readRoute().anchor));
