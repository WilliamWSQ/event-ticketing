export type Lang = 'ru' | 'en';
export type TierId = 'ga' | 'gap' | 'vip' | 'cabana';
export type Genre = 'Techno' | 'Rave' | 'Pop' | 'Hip-Hop' | 'Electro-Pop';
export const GENRES: Genre[] = ['Techno', 'Rave', 'Pop', 'Hip-Hop', 'Electro-Pop'];

export interface SetTime {
  time: string;
  name: string;
}

export interface ConcertLocale {
  artist: string;
  tour: string;
  venue: string;
  city: string;
  month: string;
  dateLong: string;
  time: string;
  lineup: SetTime[];
}

export interface Concert {
  id: string;
  day: string;
  genre: Genre;
  priceFrom: number;
  art: string;
  ru: ConcertLocale;
  en: ConcertLocale;
}

export interface TierLocale {
  name: string;
  desc: string;
  perks: string[];
}

export interface Tier {
  id: TierId;
  price: number;
  ru: TierLocale;
  en: TierLocale;
}

export interface AdminOrder {
  id: string;
  createdAt: string;
  qty: number;
  subtotal: number;
  fees: number;
  total: number;
  payMethod: string | null;
  concertId: string;
  tierId: string;
  userId: string | null;
  concertArtist: { ru: string | null; en: string | null };
  tierName: { ru: string | null; en: string | null };
  userEmail: string | null;
}

export interface AdminUser {
  id: string;
  initials: string;
  email: string;
  nameRu: string;
  nameEn: string;
  cityRu: string;
  cityEn: string;
  statShows: number;
  statCities: number;
  statHours: number;
}

export interface Stats {
  concerts: number;
  orders: number;
  revenue: number;
  users: number;
}

/** A blank concert for the create form. */
export function emptyConcert(): Concert {
  const loc = (): ConcertLocale => ({
    artist: '',
    tour: '',
    venue: '',
    city: '',
    month: '',
    dateLong: '',
    time: '',
    lineup: [{ time: '', name: '' }],
  });
  return {
    id: '',
    day: '',
    genre: 'Techno',
    priceFrom: 0,
    art: 'linear-gradient(135deg,#80EAFF,#FF005C)',
    ru: loc(),
    en: loc(),
  };
}
