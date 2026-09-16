'use client'

import { myWishes } from '@/app/[lang]/(dashboard)/shbeik-lbeik/my-wishes/data'
import { WishForm } from '@/components/WishForm'
import { use } from 'react'

export default function ShbeikEditWishPage({ params }: { params: Promise<{ wishId: string }> }) {
  const { wishId } = use(params)
  const wish = myWishes.find((w) => w.id === wishId)

  return <WishForm mode="edit" initialWish={wish} ns="shbeik" />
}
