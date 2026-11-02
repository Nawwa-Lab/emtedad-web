import { describe, expect, it } from 'vitest'
import { toWishCardDataWithOwner, type Wish } from './types'

describe('toWishCardData', () => {
  it('keeps the owner id for links and the owner name for display', () => {
    const wish = {
      id: 'wish-id',
      family: 'community',
      ownerUserId: 'owner-id',
      ownerOrgId: null,
      endorsementCount: 0,
      endorsedByMe: false,
      canEdit: false,
      canDelete: false,
      canWithdraw: false,
    } as Wish

    expect(toWishCardDataWithOwner(wish, 'Nadia Ali')).toMatchObject({
      ownerId: 'owner-id',
      ownerName: 'Nadia Ali',
    })
  })
})
