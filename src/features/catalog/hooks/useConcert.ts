import { useMemo } from 'react';
import { localizeConcert, useI18n } from '@shared/i18n';
import type { LocalizedConcert } from '@shared/types';
import { useCatalog } from '../state/CatalogProvider';

/** A single concert by id, merged with the active language. */
export function useConcert(id: string): LocalizedConcert {
  const { concerts } = useCatalog();
  const { lang } = useI18n();
  return useMemo(() => {
    const c = concerts.find((x) => x.id === id) ?? concerts[0];
    return localizeConcert(c, lang);
  }, [concerts, id, lang]);
}

/** All concerts, localized. Callers apply their own genre/query filtering. */
export function useLocalizedConcerts(): LocalizedConcert[] {
  const { concerts } = useCatalog();
  const { lang } = useI18n();
  return useMemo(() => concerts.map((c) => localizeConcert(c, lang)), [concerts, lang]);
}
