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
import { localizeTier, useI18n } from '@shared/i18n';
import { BootSplash } from '@shared/ui';
import type { LocalizedTier, PayMethod, Tier, TierId } from '@shared/types';
import { bookingApi } from '../api/booking.api';

const MAX_QTY = 8;
const MIN_QTY = 1;

interface OrderState {
  concertId: string;
  tierId: TierId;
  qty: number;
  pay: PayMethod;
  orderId: string;
}

const initialOrder: OrderState = {
  concertId: 'nova', // default featured concert
  tierId: 'vip',
  qty: 2,
  pay: 'card',
  orderId: 'PLS-7F3K-26',
};

type Action =
  | { type: 'setConcert'; id: string }
  | { type: 'setTier'; id: TierId }
  | { type: 'inc' }
  | { type: 'dec' }
  | { type: 'setPay'; pay: PayMethod }
  | { type: 'setOrderId'; orderId: string };

function reducer(s: OrderState, a: Action): OrderState {
  switch (a.type) {
    case 'setConcert':
      return s.concertId === a.id ? s : { ...s, concertId: a.id };
    case 'setTier':
      return { ...s, tierId: a.id };
    case 'inc':
      return { ...s, qty: Math.min(MAX_QTY, s.qty + 1) };
    case 'dec':
      return { ...s, qty: Math.max(MIN_QTY, s.qty - 1) };
    case 'setPay':
      return { ...s, pay: a.pay };
    case 'setOrderId':
      return { ...s, orderId: a.orderId };
    default:
      return s;
  }
}

interface BookingValue extends OrderState {
  tiers: Tier[];
  selectedTier: LocalizedTier;
  subtotal: number;
  setConcertId: (id: string) => void;
  selectTier: (id: TierId) => void;
  inc: () => void;
  dec: () => void;
  setPay: (pay: PayMethod) => void;
  tierName: (id: TierId) => string;
  confirmOrder: () => Promise<void>;
}

const BookingContext = createContext<BookingValue | null>(null);

/** Fetches tiers (boot-gated) and owns the in-flight order through the flow. */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [tiers, setTiers] = useState<Tier[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    bookingApi
      .listTiers()
      .then((d) => !cancelled && setTiers(d))
      .catch((e: unknown) =>
        !cancelled && setError(e instanceof Error ? e.message : 'Failed to load tiers'),
      );
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <BootSplash error={error} />;
  if (!tiers) return <BootSplash />;
  return <BookingProviderInner tiers={tiers}>{children}</BookingProviderInner>;
}

function BookingProviderInner({ tiers, children }: { tiers: Tier[]; children: ReactNode }) {
  const [order, dispatch] = useReducer(reducer, initialOrder);
  const { lang } = useI18n();
  const navigate = useNavigate();

  const selectedTier = useMemo(() => {
    const tier = tiers.find((x) => x.id === order.tierId) ?? tiers[0];
    return localizeTier(tier, lang);
  }, [tiers, order.tierId, lang]);

  const subtotal = selectedTier.price * order.qty;

  const tierName = useCallback(
    (id: TierId) => {
      const tier = tiers.find((x) => x.id === id) ?? tiers[0];
      return tier[lang].name;
    },
    [tiers, lang],
  );

  const confirmOrder = useCallback(async () => {
    const r = await bookingApi.createOrder({
      concertId: order.concertId,
      tierId: order.tierId,
      qty: order.qty,
      payMethod: order.pay,
    });
    dispatch({ type: 'setOrderId', orderId: r.orderId });
    navigate('/ticket');
  }, [order.concertId, order.tierId, order.qty, order.pay, navigate]);

  const value = useMemo<BookingValue>(
    () => ({
      ...order,
      tiers,
      selectedTier,
      subtotal,
      tierName,
      setConcertId: (id) => dispatch({ type: 'setConcert', id }),
      selectTier: (id) => dispatch({ type: 'setTier', id }),
      inc: () => dispatch({ type: 'inc' }),
      dec: () => dispatch({ type: 'dec' }),
      setPay: (pay) => dispatch({ type: 'setPay', pay }),
      confirmOrder,
    }),
    [order, tiers, selectedTier, subtotal, tierName, confirmOrder],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking(): BookingValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within a <BookingProvider>');
  return ctx;
}
