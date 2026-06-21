import { useEffect, useState } from 'react';
import type { TierId } from '@shared/types';
import { bookingApi, type Quote } from '../api/booking.api';

/** Fetches server-authoritative pricing for a tier + quantity. */
export function useQuote(tierId: TierId, qty: number): Quote | null {
  const [quote, setQuote] = useState<Quote | null>(null);
  useEffect(() => {
    let cancelled = false;
    setQuote(null);
    bookingApi
      .quote(tierId, qty)
      .then((q) => !cancelled && setQuote(q))
      .catch(() => {
        /* caller falls back to an optimistic figure */
      });
    return () => {
      cancelled = true;
    };
  }, [tierId, qty]);
  return quote;
}
