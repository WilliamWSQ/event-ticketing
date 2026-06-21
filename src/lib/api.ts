import type { Concert, Tier, TierId, PayMethod } from '../types';

/**
 * API base. In dev, Vite proxies `/api` → the Express server (see vite.config).
 * In production, serve the frontend behind a reverse proxy that routes `/api`.
 */
const BASE = '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    let detail = '';
    try {
      detail = ((await res.json()) as { error?: string }).error ?? '';
    } catch {
      /* ignore non-JSON error bodies */
    }
    throw new Error(detail || `Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export interface Quote {
  subtotal: number;
  fees: number;
  total: number;
}

export interface OrderResult extends Quote {
  orderId: string;
  concertId: string;
  tierId: TierId;
  qty: number;
}

export interface MeProfile {
  initials: string;
  email: string;
  name: { ru: string; en: string };
  city: { ru: string; en: string };
  stats: { shows: number; cities: number; hours: number };
}

export interface MyTicket {
  orderId: string;
  concertId: string;
  tierId: TierId;
}

export const api = {
  listConcerts: (genre?: string) =>
    request<Concert[]>(
      `/concerts${genre && genre !== 'ALL' ? `?genre=${encodeURIComponent(genre)}` : ''}`,
    ),
  getConcert: (id: string) => request<Concert>(`/concerts/${id}`),
  listTiers: () => request<Tier[]>('/tiers'),
  quote: (tierId: TierId, qty: number) =>
    request<Quote>('/orders/quote', {
      method: 'POST',
      body: JSON.stringify({ tierId, qty }),
    }),
  createOrder: (body: { concertId: string; tierId: TierId; qty: number; payMethod: PayMethod }) =>
    request<OrderResult>('/orders', { method: 'POST', body: JSON.stringify(body) }),
  me: () => request<MeProfile>('/me'),
  myTickets: () => request<MyTicket[]>('/me/tickets'),
};
