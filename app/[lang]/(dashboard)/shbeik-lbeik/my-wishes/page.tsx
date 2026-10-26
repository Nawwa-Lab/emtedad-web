import { WishBoard } from '@/components/WishBoard'
import { shbeikMyWishes } from '../data'

export default function ShbeikMyWishesPage() {
  return <WishBoard family="shbeik" wishes={shbeikMyWishes} mode="mine" />
}
