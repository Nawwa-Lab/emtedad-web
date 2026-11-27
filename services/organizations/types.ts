import type {
  Badge,
  BadgeCounts,
  Offer,
  OfferImage,
  OfferTag,
  Paginated,
  ResponseMeta,
  Review,
} from '@/services/members/types'

export type Organization = {
  organizationId: string
  legalName: string
  mission: string | null
  description: string | null
  areasOfWork: string[] | null
  country: string | null
  city: string | null
  foundationDate: string | null
  websiteUrl: string | null
  logoUrl: string | null
  coverImageUrl: string | null
  socialLinks: Record<string, string> | null
}

export type OrganizationMember = {
  accountId: string
  fullName: string
  avatarUrl: string | null
  headline: string | null
  rating: Badge
}

export type OrganizationOffer = Offer & {
  rating: Badge
}

export type OrganizationOfferSection = {
  items: OrganizationOffer[]
  total: number
  href: string
}

export type OrganizationOffers = {
  humanServices: OrganizationOfferSection
  materialResources: OrganizationOfferSection
}

export type OrganizationPublicProfile = {
  organization: Organization
  satisfaction: Badge
  satisfactionEvaluatorCount: number
  members: OrganizationMember[]
  offers: OrganizationOffers
}

export type OrganizationPublicProfileResponse = {
  data: OrganizationPublicProfile
  meta: ResponseMeta
}

/* ---------- human services / material resources catalog ---------- */

export type OrganizationCatalogKind = 'human_service' | 'material_resource'

export type OrganizationCatalogPage = {
  hasMore: boolean
  nextCursor: string | null
}

export type OrganizationCatalogDisplay = {
  id: string
  type: 'organization' | 'user'
  name: string
  imageUrl: string | null
  headline?: string | null
  city?: string | null
}

export type OrganizationCatalogRating = {
  subjectId: string
  subjectType: 'organization' | 'user'
  context: 'overall'
  status: 'rated' | 'unrated'
  badge: Badge | null
}

export type OrganizationOfferActivity = {
  offerId: string
  pendingRequests: number
  activeExchanges: number
  completedExchanges: number
  assignments: Array<{
    exchangeId: string
    assignedWorkerId: string | null
    status: string
  }>
}

export type OrganizationCatalogOffer<Kind extends OrganizationCatalogKind> = {
  offerId: string
  images: OfferImage[]
  tags: OfferTag[]
  title: string
  description: string | null
  kind: Kind
  market: 'namlya' | 'khalli_khales'
  assignedWorkerId: string | null
  publishedAt: string
  status: 'active' | 'unpublished'
  shahamhamValue: number | string | null
  duration: number | null
  durationMode: 'open' | 'fixed' | null
  durationUnit: 'hours' | 'days' | 'sessions' | null
  saved: boolean
  assignedWorker: OrganizationCatalogDisplay | null
  assignedWorkerRating: OrganizationCatalogRating | null
  activity?: OrganizationOfferActivity | null
}

export type OrganizationCatalogRequest<Kind extends OrganizationCatalogKind> = {
  listingId: string
  title: string
  description: string | null
  category: Kind
  market: 'namlya' | 'khalli_khales'
  status: 'active' | 'converted' | 'withdrawn'
  createdAt: string
  updatedAt: string
  authorId: string
  authorType: 'organization' | 'user'
  author: OrganizationCatalogDisplay | null
  responseCount: number
  hasResponded: boolean
  own: boolean
  canReply: boolean
}

export type OrganizationHumanServiceOffer = OrganizationCatalogOffer<'human_service'>
export type OrganizationHumanServiceRequest = OrganizationCatalogRequest<'human_service'>
export type OrganizationMaterialResourceOffer = OrganizationCatalogOffer<'material_resource'>
export type OrganizationMaterialResourceRequest = OrganizationCatalogRequest<'material_resource'>

export type OrganizationCatalogItem<Kind extends OrganizationCatalogKind> =
  OrganizationCatalogOffer<Kind> | OrganizationCatalogRequest<Kind>

export type OrganizationCatalogCollection<Kind extends OrganizationCatalogKind> = {
  items: Array<OrganizationCatalogItem<Kind>>
  page: OrganizationCatalogPage
}

/**
 * The endpoint returns one paginated collection when `market` is given, and
 * otherwise a collection per market plus the request board.
 */
export type OrganizationCatalogData<Kind extends OrganizationCatalogKind> =
  | OrganizationCatalogCollection<Kind>
  | {
      namlya: OrganizationCatalogCollection<Kind>
      khalli: OrganizationCatalogCollection<Kind>
      requestBoard: OrganizationCatalogCollection<Kind>
    }

export type OrganizationHumanServicesData = OrganizationCatalogData<'human_service'>

export type OrganizationHumanServicesResponse = {
  data: OrganizationHumanServicesData
  meta: ResponseMeta
}

export type OrganizationMaterialResourcesData = OrganizationCatalogData<'material_resource'>

export type OrganizationMaterialResourcesResponse = {
  data: OrganizationMaterialResourcesData
  meta: ResponseMeta
}

/* ---------- satisfaction details ---------- */

export type OrganizationSatisfactionRating = {
  overallIndex: Badge | null
  evaluationCount: number
  counts: BadgeCounts
}

export type OrganizationSatisfactionDetails = {
  reviews: Paginated<Review>
  overallIndex: Badge | null
  uniqueEvaluatorCount: number
  all: OrganizationSatisfactionRating
  humanServices: OrganizationSatisfactionRating & {
    provider: OrganizationSatisfactionRating
    recipient: OrganizationSatisfactionRating
  }
  materialResources: OrganizationSatisfactionRating & {
    resourceSharing: OrganizationSatisfactionRating
    resourceUsage: OrganizationSatisfactionRating
  }
  community: OrganizationSatisfactionRating
}
