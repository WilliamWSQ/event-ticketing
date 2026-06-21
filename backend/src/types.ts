/** Shared domain types — the bilingual catalogue shape the frontend consumes. */

export type Lang = 'ru' | 'en';
export type TierId = 'ga' | 'gap' | 'vip' | 'cabana';
export type Genre = 'Techno' | 'Rave' | 'Pop' | 'Hip-Hop' | 'Electro-Pop';

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

/** Row shapes as returned by pg (snake_case, jsonb already parsed to objects). */
export interface ConcertRow {
  id: string;
  day: string;
  genre: Genre;
  price_from: number;
  art: string;
  ru: ConcertLocale;
  en: ConcertLocale;
}

export interface TierRow {
  id: TierId;
  price: number;
  ru: TierLocale;
  en: TierLocale;
}

export function toConcert(r: ConcertRow): Concert {
  return {
    id: r.id,
    day: r.day,
    genre: r.genre,
    priceFrom: r.price_from,
    art: r.art,
    ru: r.ru,
    en: r.en,
  };
}

export function toTier(r: TierRow): Tier {
  return { id: r.id, price: r.price, ru: r.ru, en: r.en };
}
