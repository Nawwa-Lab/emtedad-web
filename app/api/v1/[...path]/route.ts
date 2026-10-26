import { getApiBaseUrl } from '@/services/http/config'

export const runtime = 'nodejs'

const FORWARDED_HEADERS = ['accept', 'content-type', 'cookie', 'user-agent', 'x-request-id']
const RESPONSE_HEADERS = ['cache-control', 'content-type', 'etag', 'location']
const UNSAFE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

function hasAllowedOrigin(request: Request) {
  const origin = request.headers.get('origin')
  return !origin || origin === new URL(request.url).origin
}

function requestHeaders(request: Request) {
  const headers = new Headers()

  for (const name of FORWARDED_HEADERS) {
    const value = request.headers.get(name)
    if (value) headers.set(name, value)
  }

  return headers
}

function responseHeaders(response: Response) {
  const headers = new Headers()

  for (const name of RESPONSE_HEADERS) {
    const value = response.headers.get(name)
    if (value) headers.set(name, value)
  }

  const cookies =
    (response.headers as Headers & { getSetCookie?: () => string[] }).getSetCookie?.() ?? []
  for (const cookie of cookies) headers.append('set-cookie', cookie)

  return headers
}

async function proxy(request: Request, context: RouteContext<'/api/v1/[...path]'>) {
  if (UNSAFE_METHODS.has(request.method) && !hasAllowedOrigin(request)) {
    return Response.json(
      { code: 'invalid_origin', message: 'Invalid request origin.' },
      { status: 403 },
    )
  }

  const { path } = await context.params
  if (path.some((segment) => !segment || segment === '.' || segment === '..')) {
    return Response.json({ code: 'invalid_path', message: 'Invalid API path.' }, { status: 400 })
  }

  const requestUrl = new URL(request.url)
  const upstream = await fetch(
    `${getApiBaseUrl()}/api/v1/${path.map(encodeURIComponent).join('/')}${requestUrl.search}`,
    {
      method: request.method,
      headers: requestHeaders(request),
      body:
        request.method === 'GET' || request.method === 'HEAD'
          ? undefined
          : await request.arrayBuffer(),
      redirect: 'manual',
    },
  )

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders(upstream),
  })
}

export const GET = proxy
export const POST = proxy
export const PUT = proxy
export const PATCH = proxy
export const DELETE = proxy
