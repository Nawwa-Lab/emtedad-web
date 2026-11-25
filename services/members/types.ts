type OpenEnum<T extends string> = T | (string & {})

/* ---------- Shared ---------- */

export type Badge = 'basic' | 'pro' | 'elite'

export type BadgeCounts = Record<Badge, number>

export type Paginated<T> = {
  items: T[]
  total: number
}

/* ---------- member ---------- */

export type MemberOrganization = {
  organizationId: string
  legalName: string
  logoUrl?: string | null
}

export type Member = {
  accountId: string
  name: string
  headline?: string | null
  bio?: string | null
  profilePhotoUrl?: string | null
  role?: string | null
  skills: string[]
  areasOfExpertise: string[]
  organization?: MemberOrganization | null
}

/* ---------- satisfaction ---------- */

export type SatisfactionSide = {
  evaluationCount: number
  counts: BadgeCounts
}

export type Satisfaction = {
  overallIndex: Badge
  uniqueEvaluatorCount: number
  provider: SatisfactionSide
  recipient: SatisfactionSide
}

/* ---------- reviews ---------- */

export type Review = {
  badge: Badge
  evaluatorType: OpenEnum<'user'>
  profilePhotoUrl?: string | null
  logoUrl?: string | null
  evaluatorProfileStatus: OpenEnum<'ok'>
  reviewId: string
  exchangeId: string
  exchangeTitle?: string | null // TODO: add to backend response
  market?: OpenEnum<'namlya'> | null // TODO: add to backend response
  evaluatorEntityId: string
  evaluatorName: string
  evaluatedEntityId: string
  content: string
  createdAt: string // ISO 8601
}

/* ---------- offers ---------- */

export type OfferImage = {
  imageId: string
  url: string
  altText?: string | null
  position: number
}

export type OfferTag = {
  tagId: string
  name: string
}

export type Offer = {
  images: OfferImage[]
  tags: OfferTag[]
  offerId: string
  title: string
  description: string
  kind: OpenEnum<'human_service'>
  market: OpenEnum<'namlya'>
  providerId: string
  assignedWorkerId?: string | null
  publishedAt: string // ISO 8601
  shahamhamValue: number
  duration: number
  durationMode: OpenEnum<'open'>
  durationUnit: OpenEnum<'hours'>
  organization?: {
    name: string
    logoUrl?: string | null
  } | null
}

/* ---------- meta ---------- */

export type SectionMeta = {
  status: OpenEnum<'ok'>
  code?: OpenEnum<'MARKETPLACE_UNAVAILABLE'>
  message?: string
}

export type ResponseMeta = {
  requestId: string
  partial: boolean // true => at least one section failed
  sections: Record<string, SectionMeta>
}

/* ---------- Full response ---------- */

export type MemberPublicProfileData = {
  member: Member
  // May be missing/empty when meta.partial is true and that section failed.
  satisfaction?: Satisfaction
  reviews?: Paginated<Review>
  offers?: Paginated<Offer>
}

export type ApiResponse<T> = {
  data: T
  meta: ResponseMeta
}

export type MemberPublicProfileResponse = ApiResponse<MemberPublicProfileData>
