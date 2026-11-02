export type WishFamily = 'network' | 'community'
export type Wish = {
  id: string
  family: WishFamily
  status: 'active' | 'withdrawn'
  title: string
  category: string[]
  description: string
  impact: string | null
  ownerOrgId: string | null
  ownerUserId: string | null
  createdAt: string
  updatedAt: string
  endorsementCount: number
  endorsedByMe: boolean
  locked: boolean
  canEdit: boolean
  canDelete: boolean
  canWithdraw: boolean
}
export type WishInput = { title: string; category: string[]; description: string; impact?: string }
export type WishPage = { items: Wish[]; page: number; limit: number; total: number }
export type Endorser = { actorType: 'organization' | 'member'; actorId: string }

export function toWishCardData(wish: Wish) {
  return mapWishCardData(wish)
}

export function toWishCardDataWithOwner(wish: Wish, ownerName?: string) {
  return mapWishCardData(wish, ownerName)
}

function mapWishCardData(wish: Wish, ownerName?: string) {
  return {
    id: wish.id,
    title: wish.title,
    category: wish.category,
    description: wish.description,
    impact: wish.impact,
    count: wish.endorsementCount,
    isEndorsed: wish.endorsedByMe,
    isOwner: wish.canEdit || wish.canDelete || wish.canWithdraw,
    ownerId: wish.ownerUserId ?? wish.ownerOrgId ?? undefined,
    ownerName,
    createdAt: wish.createdAt,
    supporters: [],
  }
}
