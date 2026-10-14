import 'server-only'

export function getApiBaseUrl() {
  const apiBaseUrl = process.env.API_BASE_URL
  if (!apiBaseUrl) throw new Error('API_BASE_URL is required to proxy API requests.')

  return apiBaseUrl.replace(/\/$/, '')
}
