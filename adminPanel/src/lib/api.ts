import axios, { type AxiosRequestConfig } from 'axios';
import type { AdminOrder, AdminUser, Concert, Stats, Tier, TierId } from '../types';

/** Optional shared secret — set VITE_ADMIN_TOKEN to match the backend's ADMIN_TOKEN. */
const ADMIN_TOKEN = (import.meta.env as Record<string, string | undefined>).VITE_ADMIN_TOKEN;

const http = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    ...(ADMIN_TOKEN ? { 'x-admin-token': ADMIN_TOKEN } : {}),
  },
});

// Surface the server's `{ error }` message as a plain Error.
http.interceptors.response.use(
  (res) => res,
  (error: unknown) => {
    let message = 'Request failed';
    if (axios.isAxiosError(error)) {
      message = (error.response?.data as { error?: string } | undefined)?.error ?? error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    return Promise.reject(new Error(message));
  },
);

async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const { data } = await http.request<T>(config);
  return data;
}

export const api = {
  // dashboard
  stats: () => request<Stats>({ url: '/admin/stats' }),

  // concerts (reads are public; writes are admin)
  listConcerts: () => request<Concert[]>({ url: '/concerts' }),
  getConcert: (id: string) => request<Concert>({ url: `/concerts/${id}` }),
  createConcert: (c: Concert) => request<Concert>({ method: 'post', url: '/admin/concerts', data: c }),
  updateConcert: (id: string, c: Concert) =>
    request<Concert>({ method: 'put', url: `/admin/concerts/${id}`, data: c }),
  deleteConcert: (id: string) => request<void>({ method: 'delete', url: `/admin/concerts/${id}` }),

  // orders
  listOrders: () => request<AdminOrder[]>({ url: '/admin/orders' }),

  // tiers
  listTiers: () => request<Tier[]>({ url: '/tiers' }),
  updateTierPrice: (id: TierId, price: number) =>
    request<Tier>({ method: 'put', url: `/admin/tiers/${id}`, data: { price } }),

  // users
  listUsers: () => request<AdminUser[]>({ url: '/admin/users' }),
  updateUser: (id: string, patch: Partial<AdminUser>) =>
    request<AdminUser>({ method: 'put', url: `/admin/users/${id}`, data: patch }),
};
