import { request } from '@shared/api/client';
import type { TierId } from '@shared/types';

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

export const accountApi = {
  me: () => request<MeProfile>({ url: '/me' }),
  myTickets: () => request<MyTicket[]>({ url: '/me/tickets' }),
};
