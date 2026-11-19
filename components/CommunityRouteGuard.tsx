'use client'

import { useUser } from '@/contexts/UserContext'
import { useRouter } from '@/i18n/navigation'
import { useEffect } from 'react'

/**
 * Guards the khalli-khales community pages: community members always, and
 * organization roles only while their active context is `community`.
 */
export function CommunityRouteGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const allowed = Boolean(
    user &&
    (user.role === 'community_member' ||
      ((user.role === 'org_admin' || user.role === 'team_worker') &&
        user.activeContext === 'community')),
  )

  useEffect(() => {
    if (!isLoading && !allowed) router.replace(user ? '/maktab' : '/login')
  }, [allowed, isLoading, router, user])

  return isLoading || !allowed ? null : children
}
