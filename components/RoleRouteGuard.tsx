'use client'

import { type Role, useUser } from '@/contexts/UserContext'
import { useRouter } from '@/i18n/navigation'
import { useEffect } from 'react'

export function RoleRouteGuard({ roles, children }: { roles: Role[]; children: React.ReactNode }) {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const allowed = Boolean(user && roles.includes(user.role))

  useEffect(() => {
    if (!isLoading && !allowed) router.replace(user ? '/maktab' : '/login')
  }, [allowed, isLoading, router, user])

  return isLoading || !allowed ? null : children
}
