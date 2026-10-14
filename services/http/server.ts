import 'server-only'

import { cookies } from 'next/headers'
import { getApiBaseUrl } from './config'
import { createUrl, requestFromUrl, type RequestOptions } from './request'

export async function serverRequest<T>(path: string, options: RequestOptions = {}) {
  const { query, headers: initialHeaders, ...init } = options
  const headers = new Headers(initialHeaders)
  const cookieStore = await cookies()

  if (cookieStore.size) headers.set('cookie', cookieStore.toString())

  return requestFromUrl<T>(`${getApiBaseUrl()}${createUrl(path, query)}`, {
    ...init,
    headers,
  })
}
