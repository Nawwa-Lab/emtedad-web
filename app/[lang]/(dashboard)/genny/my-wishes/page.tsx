'use client'

import { WishCard } from '@/components/WishCard'
import { myWishes } from './data'

export default function MyWishesPage() {
  return (
    <>
      {myWishes.map((wish, index) => (
        <WishCard key={index} {...wish} mode="mine" />
      ))}
    </>
  )
}
