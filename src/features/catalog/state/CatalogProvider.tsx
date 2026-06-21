import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { BootSplash } from '@shared/ui';
import type { Concert, FilterKey } from '@shared/types';
import { catalogApi } from '../api/catalog.api';

/** The featured concert opened from the home hero CTA. */
export const FEATURED_ID = 'nova';

interface CatalogValue {
  concerts: Concert[];
  filter: FilterKey;
  setFilter: (f: FilterKey) => void;
  query: string;
  searchOpen: boolean;
  setQuery: (q: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
  clearSearch: () => void;
}

const CatalogContext = createContext<CatalogValue | null>(null);

/**
 * Fetches the concert catalogue once (boot-gated), and owns the discover
 * filter + header search UI state.
 */
export function CatalogProvider({ children }: { children: ReactNode }) {
  const [concerts, setConcerts] = useState<Concert[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterKey>('ALL');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    catalogApi
      .listConcerts()
      .then((d) => !cancelled && setConcerts(d))
      .catch((e: unknown) =>
        !cancelled && setError(e instanceof Error ? e.message : 'Failed to load catalogue'),
      );
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<CatalogValue>(
    () => ({
      concerts: concerts ?? [],
      filter,
      setFilter,
      query,
      searchOpen,
      setQuery: (q) => {
        setQuery(q);
        setSearchOpen(true);
      },
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      clearSearch: () => {
        setQuery('');
        setSearchOpen(false);
      },
    }),
    [concerts, filter, query, searchOpen],
  );

  if (error) return <BootSplash error={error} />;
  if (!concerts) return <BootSplash />;
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCatalog(): CatalogValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within a <CatalogProvider>');
  return ctx;
}
