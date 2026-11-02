import { WishBoard } from '@/components/WishBoard'
import { toCommunityWishCards, wishServerApi } from '@/services/wishes/server'

export default async function ShbeikMyWishesPage() {
  const wishes = await wishServerApi.mine('community')
  return <WishBoard family="shbeik" wishes={await toCommunityWishCards(wishes)} mode="mine" />
}
