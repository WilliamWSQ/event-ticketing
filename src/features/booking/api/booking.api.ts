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
  listTiers: () => request<Tier[]>({ url: '/tiers' }),
  quote: (tierId: TierId, qty: number) =>
    request<Quote>({ method: 'post', url: '/orders/quote', data: { tierId, qty } }),
  createOrder: (body: { concertId: string; tierId: TierId; qty: number; payMethod: PayMethod }) =>
    request<OrderResult>({ method: 'post', url: '/orders', data: body }),
};
