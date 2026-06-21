import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { strings, type Strings } from './strings';
import { formatRub } from './format';
import type { Lang } from '../types';

interface I18nValue {
  lang: Lang;
  /** Active language string table. */
  t: Strings;
  /** Ruble formatter bound to the active language. */
  fmt: (n: number) => string;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const I18nContext = createContext<I18nValue | null>(null);

/** App-wide language state. Re-localizes chrome and content live. */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru');

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      t: strings[lang],
      fmt: (n: number) => formatRub(n, lang),
      setLang,
      toggle: () => setLang((l) => (l === 'ru' ? 'en' : 'ru')),
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within an <I18nProvider>');
  return ctx;
}
