import { WishBoard } from '@/components/WishBoard'
import { wishServerApi } from '@/services/wishes/server'
import { toWishCardData } from '@/services/wishes/types'

export default async function MyWishesPage() {
  const wishes = await wishServerApi.mine('network')
  return <WishBoard family="genny" wishes={wishes.map(toWishCardData)} mode="mine" />
}
