import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/services/http'

let browserQueryClient: QueryClient | undefined

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: (failureCount, error) =>
          !(error instanceof ApiError && error.status < 500) && failureCount < 2,
      },
    },
  })
}

export function getQueryClient() {
  if (typeof window === 'undefined') return createQueryClient()

  browserQueryClient ??= createQueryClient()
  return browserQueryClient
}
