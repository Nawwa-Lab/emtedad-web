import { ApiError, type ApiErrorDetails } from './error'

export type QueryParams = Record<string, string | number | boolean | null | undefined>

export type RequestOptions = Omit<RequestInit, 'body' | 'headers'> & {
  body?: unknown
  headers?: HeadersInit
  query?: QueryParams
}

export function createUrl(path: string, query?: QueryParams) {
  const url = new URL(path, 'http://api.local')

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null) url.searchParams.set(key, String(value))
  }

  return `${url.pathname}${url.search}`
}

function isBodyInit(value: unknown): value is BodyInit {
  return (
    typeof value === 'string' ||
    value instanceof Blob ||
    value instanceof FormData ||
    value instanceof URLSearchParams ||
    value instanceof ArrayBuffer ||
    ArrayBuffer.isView(value)
  )
}

function createBody(body: unknown, headers: Headers) {
  if (body === undefined || isBodyInit(body)) return body

  if (!headers.has('content-type')) headers.set('content-type', 'application/json')
  return JSON.stringify(body)
}

async function parseBody(response: Response) {
  if (response.status === 204) return undefined

  const contentType = response.headers.get('content-type') ?? ''
  return contentType.includes('application/json') ? response.json() : response.text()
}

async function createApiError(response: Response) {
  const body = await parseBody(response).catch(() => undefined)
  const payload =
    typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : undefined
  const message =
    (typeof payload?.message === 'string' && payload.message) ||
    (typeof body === 'string' && body) ||
    response.statusText ||
    'Request failed'

  return new ApiError(
    response.status,
    message,
    typeof payload?.code === 'string' ? payload.code : undefined,
    payload?.details as ApiErrorDetails | undefined,
  )
}

export async function requestFromUrl<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers: initialHeaders, query, ...init } = options
  void query
  const headers = new Headers(initialHeaders)
  if (!headers.has('accept')) headers.set('accept', 'application/json')

  const response = await fetch(url, { ...init, body: createBody(body, headers), headers })

  if (!response.ok) throw await createApiError(response)
  return (await parseBody(response)) as T
}
