import type { Lang } from '../types';

/**
 * Interface-chrome copy, keyed by language. Concert/tier *content* is localized
 * separately in the data files. Lifted verbatim from the design prototype — to
 * move to a translation service later, keep these keys as the catalogue ids.
 */
export interface Strings {
  navAfisha: string;
  navFest: string;
  navVenues: string;
  searchPh: string;
  searchEmpty: string;
  logoSub: string;
  userShort: string;
  initials: string;
  heroBadge: string;
  heroSub: string;
  getTickets: string;
  trailer: string;
  upcoming: string;
  all: string;
  from: string;
  back: string;
  backDiscover: string;
  date: string;
  doors: string;
  venue: string;
  zone: string;
  order: string;
  about: string;
  aboutPre: string;
  aboutPost: string;
  lineup: string;
  ticketsFrom: string;
  perPerson: string;
  sellingFast: string;
  chooseTickets: string;
  securedBy: string;
  pickZone: string;
  stage: string;
  selected: string;
  howMany: string;
  maxOrder: string;
  continueCheckout: string;
  checkout: string;
  payMethod: string;
  tabCard: string;
  tabWallet: string;
  tabCrypto: string;
  cardNumber: string;
  expiry: string;
  nameOnCard: string;
  cardName: string;
  stablecoin: string;
  sendToWallet: string;
  serviceFees: string;
  eticket: string;
  free: string;
  total: string;
  payPrefix: string;
  encrypted: string;
  youreIn: string;
  ticketLive: string;
  admit: string;
  scanGate: string;
  viewAccount: string;
  moreShows: string;
  userName: string;
  neonTier: string;
  userMeta: string;
  findShows: string;
  statShows: string;
  statCities: string;
  statHours: string;
  myTickets: string;
  payMethods: string;
  cardLabel: string;
  cardExpires: string;
  cardDefault: string;
  walletConnected: string;
  settings: string;
  setAlerts: string;
  setPresale: string;
  setMarketing: string;
}

export const strings: Record<Lang, Strings> = {
  ru: {
    navAfisha: 'Афиша',
    navFest: 'Фестивали',
    navVenues: 'Площадки',
    searchPh: 'Поиск артистов…',
    searchEmpty: 'Ничего не найдено',
    logoSub: 'Live · Москва',
    userShort: 'Алиса',
    initials: 'АО',
    heroBadge: 'Билеты в продаже',
    heroSub:
      'Три ночи. Сорок артистов. Один невероятный город. Самый громкий электронный уикенд возвращается в «Лужники», Москва.',
    getTickets: 'Купить билеты',
    trailer: 'Трейлер',
    upcoming: 'Ближайшие концерты',
    all: 'Все',
    from: 'от',
    back: 'Назад',
    backDiscover: 'Назад к афише',
    date: 'Дата',
    doors: 'Двери',
    venue: 'Площадка',
    zone: 'Зона',
    order: 'Заказ',
    about: 'О концерте',
    aboutPre: 'Аудиовизуальный шторм для тех, кто живёт ночью. ',
    aboutPost:
      ' привозит кинетическую LED-сцену, стену сабвуферов и сет, собранный, чтобы качать зал. Эксклюзивные эдиты, лайв-пересборка любимых треков и лазеры, пробивающие дым насквозь.',
    lineup: 'Лайн-ап',
    ticketsFrom: 'Билеты от',
    perPerson: '/ чел.',
    sellingFast: 'Разбирают · продано 82%',
    chooseTickets: 'Выбрать билеты',
    securedBy: 'Защищено Xsolla Pay',
    pickZone: 'Выберите зону',
    stage: 'СЦЕНА',
    selected: 'Выбрано',
    howMany: 'Сколько билетов?',
    maxOrder: 'Не более 8 в заказе',
    continueCheckout: 'Перейти к оплате',
    checkout: 'Оформление заказа',
    payMethod: 'Способ оплаты',
    tabCard: 'Карта',
    tabWallet: 'Кошелёк',
    tabCrypto: 'Крипто',
    cardNumber: 'Номер карты',
    expiry: 'Срок',
    nameOnCard: 'Имя на карте',
    cardName: 'Алиса Орлова',
    stablecoin: 'Стейблкоин',
    sendToWallet: 'Адрес для перевода',
    serviceFees: 'Сервисный сбор',
    eticket: 'Электронный билет',
    free: 'Бесплатно',
    total: 'Итого',
    payPrefix: 'Оплатить ',
    encrypted: 'Шифрование 256-бит · Xsolla Pay',
    youreIn: 'Вы в деле!',
    ticketLive: 'Билет уже у вас. Копию отправили на alisa@pulse.live',
    admit: 'Вход на',
    scanGate: 'СКАН НА ВХОДЕ',
    viewAccount: 'В личный кабинет',
    moreShows: 'Ещё концерты',
    userName: 'Алиса Орлова',
    neonTier: 'NEON-УРОВЕНЬ',
    userMeta: 'alisa@pulse.live · Москва',
    findShows: 'Найти концерты',
    statShows: 'Концертов',
    statCities: 'Городов',
    statHours: 'Часов танцев',
    myTickets: 'Мои билеты',
    payMethods: 'Способы оплаты',
    cardLabel: 'МИР ···· 9081',
    cardExpires: 'Действует до 09/27',
    cardDefault: 'ОСНОВНАЯ',
    walletConnected: 'Привязанный кошелёк',
    settings: 'Настройки',
    setAlerts: 'Уведомления о новых концертах',
    setPresale: 'Ранний доступ к предпродаже',
    setMarketing: 'Рекламные письма',
  },
  en: {
    navAfisha: 'Discover',
    navFest: 'Festivals',
    navVenues: 'Venues',
    searchPh: 'Search artists…',
    searchEmpty: 'No results',
    logoSub: 'Live · Moscow',
    userShort: 'Alisa',
    initials: 'AO',
    heroBadge: 'On sale now',
    heroSub:
      'Three nights. Forty artists. One unreal city. The loudest electronic weekend returns to Luzhniki, Moscow.',
    getTickets: 'Get tickets',
    trailer: 'Watch trailer',
    upcoming: 'Upcoming shows',
    all: 'All',
    from: 'from',
    back: 'Back',
    backDiscover: 'Back to discover',
    date: 'Date',
    doors: 'Doors',
    venue: 'Venue',
    zone: 'Zone',
    order: 'Order',
    about: 'About the show',
    aboutPre: 'An audiovisual storm for those who live after dark. ',
    aboutPost:
      ' brings a kinetic LED stage, a wall of subwoofers and a set built to move the room. Expect unreleased edits, a live re-score of fan favourites, and lasers that punch through the fog.',
    lineup: 'Lineup',
    ticketsFrom: 'Tickets from',
    perPerson: '/ person',
    sellingFast: 'Selling fast · 82% claimed',
    chooseTickets: 'Choose tickets',
    securedBy: 'Secured by Xsolla Pay',
    pickZone: 'Pick your zone',
    stage: 'STAGE',
    selected: 'Selected',
    howMany: 'How many tickets?',
    maxOrder: 'Max 8 per order',
    continueCheckout: 'Continue to checkout',
    checkout: 'Checkout',
    payMethod: 'Payment method',
    tabCard: 'Card',
    tabWallet: 'Wallet',
    tabCrypto: 'Crypto',
    cardNumber: 'Card number',
    expiry: 'Expiry',
    nameOnCard: 'Name on card',
    cardName: 'Alisa Orlova',
    stablecoin: 'Stablecoin',
    sendToWallet: 'Send to wallet',
    serviceFees: 'Service & facility fees',
    eticket: 'Mobile ticket',
    free: 'Free',
    total: 'Total',
    payPrefix: 'Pay ',
    encrypted: '256-bit encrypted · Xsolla Pay',
    youreIn: "You're in.",
    ticketLive: 'Your ticket is live. We sent a copy to alisa@pulse.live',
    admit: 'Admit',
    scanGate: 'SCAN AT GATE',
    viewAccount: 'View in my account',
    moreShows: 'Discover more shows',
    userName: 'Alisa Orlova',
    neonTier: 'NEON TIER',
    userMeta: 'alisa@pulse.live · Moscow',
    findShows: 'Find shows',
    statShows: 'Shows attended',
    statCities: 'Cities',
    statHours: 'Hours danced',
    myTickets: 'Upcoming tickets',
    payMethods: 'Payment methods',
    cardLabel: 'MIR ···· 9081',
    cardExpires: 'Expires 09/27',
    cardDefault: 'DEFAULT',
    walletConnected: 'Connected wallet',
    settings: 'Settings',
    setAlerts: 'Drop alerts for followed artists',
    setPresale: 'Presale early access',
    setMarketing: 'Marketing emails',
  },
};
