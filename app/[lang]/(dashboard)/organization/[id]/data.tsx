import type { Badge } from '@/services/members/types'

export type Market = 'namliya' | 'khalli' | 'alaesh'

export type OrganizationListing = {
  title: string
  category: string
  description: string
  owner: string
  ownerAvatarUrl?: string
  market: Market
  price?: number | string | null
  kind: 'service' | 'resource' | 'request'
  badge?: Badge
  provider?: {
    name: string
    logoUrl?: string | null
    badge?: Badge
  }
  details?: {
    description: string
    facts: Array<[label: string, value: string]>
    sectionTitle: string
    items: string[]
  }
}
