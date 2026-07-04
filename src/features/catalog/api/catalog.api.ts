import { request } from '@shared/api/client';
import type { Concert } from '@shared/types';

export const catalogApi = {
  listConcerts: (genre?: string) =>
    request<Concert[]>({
      url: '/concerts',
      params: genre && genre !== 'ALL' ? { genre } : undefined,
    }),
  getConcert: (id: string) => request<Concert>({ url: `/concerts/${id}` }),
};
