import { WishBoard } from '@/components/WishBoard'
import { shbeikWishes } from '../data'

export default function ShbeikBrowsePage() {
  return <WishBoard family="shbeik" wishes={shbeikWishes} />
}
