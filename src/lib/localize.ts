import type { Concert, Lang, LocalizedConcert, LocalizedTier, Tier } from '../types';

/** Merge a concert's language-neutral fields with the active language's content. */
export function localizeConcert(c: Concert, lang: Lang): LocalizedConcert {
  return { ...c, ...c[lang] };
}

/** Merge a tier's language-neutral fields with the active language's content. */
export function localizeTier(t: Tier, lang: Lang): LocalizedTier {
  return { ...t, ...t[lang] };
}
