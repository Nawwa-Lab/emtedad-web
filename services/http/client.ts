import { createUrl, requestFromUrl, type RequestOptions } from './request'

export function request<T>(path: string, options: RequestOptions = {}) {
  const { query, ...init } = options
  return requestFromUrl<T>(createUrl(path, query), {
    ...init,
    credentials: 'include',
  })
}
