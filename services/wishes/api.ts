import { request } from '@/services/http'
import type { Endorser, Wish, WishFamily, WishInput, WishPage } from './types'
const ENDPOINT_PREFIX = '/api/v1/wishes'
export const wishApi = {
  list: (family: WishFamily, query?: { q?: string; category?: string; sort?: string }) =>
    request<WishPage>(`${ENDPOINT_PREFIX}/${family}`, { query }),
  mine: (family: WishFamily) => request<Wish[]>(`${ENDPOINT_PREFIX}/${family}/mine`),
  categories: (family: WishFamily) => request<string[]>(`${ENDPOINT_PREFIX}/${family}/categories`),
  get: (family: WishFamily, id: string) =>
    request<Wish>(`${ENDPOINT_PREFIX}/${family}/${encodeURIComponent(id)}`),
  create: (family: WishFamily, data: WishInput) =>
    request<Wish>(`${ENDPOINT_PREFIX}/${family}`, { method: 'POST', body: data }),
  update: (family: WishFamily, id: string, data: Partial<WishInput>) =>
    request<Wish>(`${ENDPOINT_PREFIX}/${family}/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: data,
    }),
  remove: (family: WishFamily, id: string) =>
    request<void>(`${ENDPOINT_PREFIX}/${family}/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  endorse: (family: WishFamily, id: string) =>
    request<{ endorsementCount: number; endorsedByMe: boolean }>(
      `${ENDPOINT_PREFIX}/${family}/${encodeURIComponent(id)}/endorse`,
      { method: 'POST' },
    ),
  unendorse: (family: WishFamily, id: string) =>
    request<{ endorsementCount: number; endorsedByMe: boolean }>(
      `${ENDPOINT_PREFIX}/${family}/${encodeURIComponent(id)}/endorse`,
      { method: 'DELETE' },
    ),
  endorsers: (family: WishFamily, id: string) =>
    request<Endorser[]>(`${ENDPOINT_PREFIX}/${family}/${encodeURIComponent(id)}/endorsers`),
}
