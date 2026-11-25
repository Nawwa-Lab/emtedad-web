'use client'

import { RoleRouteGuard } from '@/components/RoleRouteGuard'
import { useUser } from '@/contexts/UserContext'
import { CommunityAsksView } from './community-view'
import { OrgAsksView } from './org-view'

/**
 * Khalli Khales my-asks page. Organization roles see the requests their
 * organization made to the public (panel 40); community members, and any
 * account whose active context is `community`, see their own requests to
 * organizations (panel 42).
 */
export default function MyAsksPage() {
  const { user } = useUser()
  const isCommunity = user?.role === 'community_member' || user?.activeContext === 'community'

  return (
    <RoleRouteGuard roles={['org_admin', 'team_worker', 'community_member']}>
      {isCommunity ? <CommunityAsksView /> : <OrgAsksView />}
    </RoleRouteGuard>
  )
}
