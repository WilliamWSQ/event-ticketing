import type { AdminOrder, AdminUser, Concert, Stats, Tier, TierId } from '../types';

const BASE = '/api';

/** Optional shared secret — set VITE_ADMIN_TOKEN to match the backend's ADMIN_TOKEN. */
const ADMIN_TOKEN = (import.meta.env as Record<string, string | undefined>).VITE_ADMIN_TOKEN;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (ADMIN_TOKEN) headers['x-admin-token'] = ADMIN_TOKEN;

  const res = await fetch(`${BASE}${path}`, { ...init, headers: { ...headers, ...init?.headers } });
  if (!res.ok) {
    let detail = '';
    try {
      detail = ((await res.json()) as { error?: string }).error ?? '';
    } catch {
      /* ignore */
    }
    throw new Error(detail || `Request failed: ${res.status} ${res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const api = {
  // dashboard
  stats: () => request<Stats>('/admin/stats'),

  // concerts (reads are public; writes are admin)
  listConcerts: () => request<Concert[]>('/concerts'),
  getConcert: (id: string) => request<Concert>(`/concerts/${id}`),
  createConcert: (c: Concert) =>
    request<Concert>('/admin/concerts', { method: 'POST', body: JSON.stringify(c) }),
  updateConcert: (id: string, c: Concert) =>
    request<Concert>(`/admin/concerts/${id}`, { method: 'PUT', body: JSON.stringify(c) }),
  deleteConcert: (id: string) => request<void>(`/admin/concerts/${id}`, { method: 'DELETE' }),

  // orders
  listOrders: () => request<AdminOrder[]>('/admin/orders'),

  // tiers
  listTiers: () => request<Tier[]>('/tiers'),
  updateTierPrice: (id: TierId, price: number) =>
    request<Tier>(`/admin/tiers/${id}`, { method: 'PUT', body: JSON.stringify({ price }) }),

  // users
  listUsers: () => request<AdminUser[]>('/admin/users'),
  updateUser: (id: string, patch: Partial<AdminUser>) =>
    request<AdminUser>(`/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(patch) }),
};
