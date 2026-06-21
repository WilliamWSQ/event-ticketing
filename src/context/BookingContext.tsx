import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { FEATURED_ID } from '../data/concerts';
import { MAX_QTY, MIN_QTY } from '../data/tiers';
import { strings, type Strings } from '../i18n/strings';
import { formatRub } from '../lib/format';
import { localizeConcert, localizeTier } from '../lib/localize';
import { api } from '../lib/api';
import { BootSplash } from '../components/layout/BootSplash';
import type {
  Concert,
  FilterKey,
  Lang,
  LocalizedConcert,
  LocalizedTier,
  PayMethod,
  Tier,
  TierId,
} from '../types';

/* ------------------------------------------------------------------ state */

interface BookingState {
  selectedId: string;
  tierId: TierId;
  qty: number;
  pay: PayMethod;
  filter: FilterKey;
  lang: Lang;
  searchOpen: boolean;
  query: string;
  orderId: string;
}

const initialState: BookingState = {
  selectedId: FEATURED_ID,
  tierId: 'vip',
  qty: 2,
  pay: 'card',
  filter: 'ALL',
  lang: 'ru',
  searchOpen: false,
  query: '',
  orderId: 'PLS-7F3K-26',
};

type Action =
  | { type: 'setLang'; lang: Lang }
  | { type: 'setSelected'; id: string }
  | { type: 'setTier'; id: TierId }
  | { type: 'incQty' }
  | { type: 'decQty' }
  | { type: 'setPay'; pay: PayMethod }
  | { type: 'setFilter'; filter: FilterKey }
  | { type: 'setQuery'; query: string }
  | { type: 'setSearchOpen'; open: boolean }
  | { type: 'clearSearch' }
  | { type: 'setOrderId'; orderId: string };

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'setLang':
      return { ...state, lang: action.lang };
    case 'setSelected':
      return { ...state, selectedId: action.id };
    case 'setTier':
      return { ...state, tierId: action.id };
    case 'incQty':
      return { ...state, qty: Math.min(MAX_QTY, state.qty + 1) };
    case 'decQty':
      return { ...state, qty: Math.max(MIN_QTY, state.qty - 1) };
    case 'setPay':
      return { ...state, pay: action.pay };
    case 'setFilter':
      return { ...state, filter: action.filter };
    case 'setQuery':
      return { ...state, query: action.query, searchOpen: true };
    case 'setSearchOpen':
      return { ...state, searchOpen: action.open };
    case 'clearSearch':
      return { ...state, query: '', searchOpen: false };
    case 'setOrderId':
      return { ...state, orderId: action.orderId };
    default:
      return state;
  }
}

/* ------------------------------------------------------------- public api */

interface BookingContextValue extends BookingState {
  /** Active language string table. */
  t: Strings;
  /** Ruble formatter bound to the active language. */
  fmt: (n: number) => string;

  /** Catalogue, fetched from the API at startup. */
  concerts: Concert[];
  tiers: Tier[];

  /** Selected concert/tier merged with the active language. */
  selectedConcert: LocalizedConcert;
  selectedTier: LocalizedTier;
  /** Optimistic subtotal (price × qty). Authoritative money comes from /orders/quote. */
  subtotal: number;

  /** Localize an arbitrary concert by id with the active language. */
  localize: (id: string) => LocalizedConcert;
  /** Localized display name for any tier id. */
  tierName: (id: TierId) => string;

  // state mutators
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  selectTier: (id: TierId) => void;
  inc: () => void;
  dec: () => void;
  setPay: (pay: PayMethod) => void;
  setFilter: (filter: FilterKey) => void;
  setQuery: (query: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
  clearSearch: () => void;
  /** Keep selectedId in sync with a concert route param. */
  syncSelected: (id: string) => void;

  // navigation
  goHome: () => void;
  goAccount: () => void;
  goTickets: () => void;
  goDetails: () => void;
  goSeats: () => void;
  goCheckout: () => void;
  openConcert: (id: string) => void;
  openFeatured: () => void;
  /** Create the order server-side, store the real id, go to the ticket. */
  confirmOrder: () => Promise<void>;
}

const BookingContext = createContext<BookingContextValue | null>(null);

/**
 * Loads the catalogue once, then renders the inner provider with non-empty
 * concerts/tiers so every downstream selector stays non-null.
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<{ concerts: Concert[]; tiers: Tier[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([api.listConcerts(), api.listTiers()])
      .then(([concerts, tiers]) => {
        if (!cancelled) setCatalog({ concerts, tiers });
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load catalogue');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <BootSplash error={error} />;
  if (!catalog) return <BootSplash />;
  return (
    <BookingProviderInner concerts={catalog.concerts} tiers={catalog.tiers}>
      {children}
    </BookingProviderInner>
  );
}

function BookingProviderInner({
  concerts,
  tiers,
  children,
}: {
  concerts: Concert[];
  tiers: Tier[];
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { lang, selectedId, tierId, qty, pay } = state;

  const fmt = useCallback((n: number) => formatRub(n, lang), [lang]);

  const localize = useCallback(
    (id: string) => {
      const c = concerts.find((x) => x.id === id) ?? concerts[0];
      return localizeConcert(c, lang);
    },
    [concerts, lang],
  );

  const tierName = useCallback(
    (id: TierId) => {
      const tier = tiers.find((x) => x.id === id) ?? tiers[0];
      return tier[lang].name;
    },
    [tiers, lang],
  );

  const selectedConcert = useMemo(() => localize(selectedId), [localize, selectedId]);

  const selectedTier = useMemo(() => {
    const tier = tiers.find((x) => x.id === tierId) ?? tiers[0];
    return localizeTier(tier, lang);
  }, [tiers, tierId, lang]);

  const subtotal = selectedTier.price * qty;

  const openConcert = useCallback(
    (id: string) => {
      dispatch({ type: 'setSelected', id });
      navigate(`/concert/${id}`);
    },
    [navigate],
  );

  const confirmOrder = useCallback(async () => {
    const result = await api.createOrder({ concertId: selectedId, tierId, qty, payMethod: pay });
    dispatch({ type: 'setOrderId', orderId: result.orderId });
    navigate('/ticket');
  }, [selectedId, tierId, qty, pay, navigate]);

  const value = useMemo<BookingContextValue>(
    () => ({
      ...state,
      t: strings[lang],
      fmt,
      concerts,
      tiers,
      selectedConcert,
      selectedTier,
      subtotal,
      localize,
      tierName,

      setLang: (l) => dispatch({ type: 'setLang', lang: l }),
      toggleLang: () => dispatch({ type: 'setLang', lang: lang === 'ru' ? 'en' : 'ru' }),
      selectTier: (id) => dispatch({ type: 'setTier', id }),
      inc: () => dispatch({ type: 'incQty' }),
      dec: () => dispatch({ type: 'decQty' }),
      setPay: (p) => dispatch({ type: 'setPay', pay: p }),
      setFilter: (filter) => dispatch({ type: 'setFilter', filter }),
      setQuery: (query) => dispatch({ type: 'setQuery', query }),
      openSearch: () => dispatch({ type: 'setSearchOpen', open: true }),
      closeSearch: () => dispatch({ type: 'setSearchOpen', open: false }),
      clearSearch: () => dispatch({ type: 'clearSearch' }),
      syncSelected: (id) => dispatch({ type: 'setSelected', id }),

      goHome: () => navigate('/'),
      goAccount: () => navigate('/account'),
      goTickets: () => navigate('/ticket'),
      goDetails: () => navigate(`/concert/${selectedId}`),
      goSeats: () => navigate(`/concert/${selectedId}/seats`),
      goCheckout: () => navigate('/checkout'),
      openConcert,
      openFeatured: () => openConcert(FEATURED_ID),
      confirmOrder,
    }),
    [
      state,
      lang,
      fmt,
      concerts,
      tiers,
      selectedConcert,
      selectedTier,
      subtotal,
      localize,
      tierName,
      selectedId,
      navigate,
      openConcert,
      confirmOrder,
    ],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within a <BookingProvider>');
  return ctx;
}
