import { request } from '@shared/api/client';
import type { Concert } from '@shared/types';

export const catalogApi = {
  listConcerts: (genre?: string) =>
    request<Concert[]>(
      `/concerts${genre && genre !== 'ALL' ? `?genre=${encodeURIComponent(genre)}` : ''}`,
    ),
  getConcert: (id: string) => request<Concert>(`/concerts/${id}`),
};
