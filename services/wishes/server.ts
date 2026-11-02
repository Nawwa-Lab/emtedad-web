import 'server-only'
import { memberApi } from '@/services/members'
import { serverRequest } from '@/services/http/server'
import { toWishCardDataWithOwner, type Wish, type WishFamily, type WishPage } from './types'
const ENDPOINT_PREFIX = '/api/v1/wishes'
export const wishServerApi = {
  list: (family: WishFamily) => serverRequest<WishPage>(`${ENDPOINT_PREFIX}/${family}`),
  mine: (family: WishFamily) => serverRequest<Wish[]>(`${ENDPOINT_PREFIX}/${family}/mine`),
  get: (family: WishFamily, id: string) =>
    serverRequest<Wish>(`${ENDPOINT_PREFIX}/${family}/${encodeURIComponent(id)}`),
}

export async function toCommunityWishCards(wishes: Wish[]) {
  const ownerIds = [...new Set(wishes.flatMap((wish) => wish.ownerUserId ?? []))]
  const ownerNames = new Map<string, string>()

  // shortcut: profiles load in parallel per owner; add a batch endpoint if wish page sizes grow.
  await Promise.all(
    ownerIds.map(async (ownerId) => {
      try {
        const profile = await memberApi.getPublicProfile(ownerId)
        const name =
          profile.name?.trim() ||
          [profile.firstName ?? profile.first, profile.lastName ?? profile.last]
            .filter(Boolean)
            .join(' ')
        if (name) ownerNames.set(ownerId, name)
      } catch {
        // A removed or unavailable profile must not prevent the wish board from loading.
      }
    }),
  )

  return wishes.map((wish) =>
    toWishCardDataWithOwner(wish, wish.ownerUserId ? ownerNames.get(wish.ownerUserId) : undefined),
  )
}
