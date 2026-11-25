'use client'

import { RoleRouteGuard } from '@/components/RoleRouteGuard'
import { useUser } from '@/contexts/UserContext'
import { CommunityOffersView } from './community-view'
import { OrgOffersView } from './org-view'

/**
 * Khalli Khales my-offers page. Organization roles see the offers their
 * organization publishes (panel 38); community members, and any account whose
 * active context is `community`, see their own services (panel 41).
 */
export default function MyOffersPage() {
  const { user } = useUser()
  const isCommunity = user?.role === 'community_member' || user?.activeContext === 'community'

  return (
    <RoleRouteGuard roles={['org_admin', 'team_worker', 'community_member']}>
      {isCommunity ? <CommunityOffersView /> : <OrgOffersView />}
    </RoleRouteGuard>
  )
}
