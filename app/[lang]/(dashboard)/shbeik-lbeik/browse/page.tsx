import { WishBoard } from '@/components/WishBoard'
import { toCommunityWishCards, wishServerApi } from '@/services/wishes/server'

export default async function ShbeikBrowsePage() {
  const wishes = await wishServerApi.list('community')
  return <WishBoard family="shbeik" wishes={await toCommunityWishCards(wishes.items)} />
}
