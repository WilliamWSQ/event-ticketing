import { request } from '@shared/api/client';
import type { PayMethod, Tier, TierId } from '@shared/types';

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

export const bookingApi = {
  listTiers: () => request<Tier[]>('/tiers'),
  quote: (tierId: TierId, qty: number) =>
    request<Quote>('/orders/quote', { method: 'POST', body: JSON.stringify({ tierId, qty }) }),
  createOrder: (body: { concertId: string; tierId: TierId; qty: number; payMethod: PayMethod }) =>
    request<OrderResult>('/orders', { method: 'POST', body: JSON.stringify(body) }),
};
