'use client'

import { useUser } from '@/contexts/UserContext'
import { usePathname, useRouter } from '@/i18n/navigation'
import { isPathAllowedInContext } from '@/lib/utils/context'
import { useEffect } from 'react'

export function ContextRouteGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser()
  const pathname = usePathname()
  const router = useRouter()
  const isAllowed =
    !user || user.role === 'emtedad_admin' || isPathAllowedInContext(pathname, user.activeContext)

  useEffect(() => {
    if (user && !isAllowed) {
      router.replace('/maktab')
    }
  }, [isAllowed, router, user])

  if (!isLoading && !isAllowed) return null

  return children
}
