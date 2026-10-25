import { WishBoard } from '@/components/WishBoard'
import { gennyWishes } from '../data'

export default function GennyBrowsePage() {
  return <WishBoard family="genny" wishes={gennyWishes} />
}
