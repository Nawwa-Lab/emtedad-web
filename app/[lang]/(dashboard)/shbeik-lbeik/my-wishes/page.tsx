'use client'

import { WishCard } from '@/components/WishCard'
import { myWishes } from './data'

export default function ShbeikMyWishesPage() {
  return (
    <>
      {myWishes.map((wish, index) => (
        <WishCard key={index} ns="shbeik" {...wish} mode="mine" />
      ))}
    </>
  )
}
