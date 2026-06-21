/** Domain types for the PULSE booking flow. */

export type Lang = 'ru' | 'en';

export type TierId = 'ga' | 'gap' | 'vip' | 'cabana';

export type PayMethod = 'card' | 'wallet' | 'crypto';

/** Genre keys double as the home filter values (plus the synthetic 'ALL'). */
export type Genre = 'Techno' | 'Rave' | 'Pop' | 'Hip-Hop' | 'Electro-Pop';
export type FilterKey = 'ALL' | Genre;

export interface SetTime {
  time: string;
  name: string;
}

/** Fields of a concert that are translated per language. */
export interface ConcertLocale {
  artist: string;
  tour: string;
  venue: string;
  city: string;
  month: string; // localized abbreviation, e.g. ИЮН / JUN
  dateLong: string;
  time: string; // doors
  lineup: SetTime[];
}

/** Language-neutral concert fields + per-language sub-objects. */
export interface Concert {
  id: string;
  day: string;
  genre: Genre;
  priceFrom: number;
  art: string; // CSS gradient used as placeholder artwork
  ru: ConcertLocale;
  en: ConcertLocale;
}

/** A concert merged with the active language's fields. */
export type LocalizedConcert = Omit<Concert, 'ru' | 'en'> & ConcertLocale;

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

export type LocalizedTier = Omit<Tier, 'ru' | 'en'> & TierLocale;
