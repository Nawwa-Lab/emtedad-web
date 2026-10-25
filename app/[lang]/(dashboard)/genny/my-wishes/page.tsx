import { WishBoard } from '@/components/WishBoard'
import { gennyMyWishes } from '../data'

export default function MyWishesPage() {
  return <WishBoard family="genny" wishes={gennyMyWishes} mode="mine" />
}
