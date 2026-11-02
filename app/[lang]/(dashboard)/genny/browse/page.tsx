import { WishBoard } from '@/components/WishBoard'
import { wishServerApi } from '@/services/wishes/server'
import { toWishCardData } from '@/services/wishes/types'

export default async function GennyBrowsePage() {
  const wishes = await wishServerApi.list('network')

  return <WishBoard family="genny" wishes={wishes.items.map(toWishCardData)} />
}
