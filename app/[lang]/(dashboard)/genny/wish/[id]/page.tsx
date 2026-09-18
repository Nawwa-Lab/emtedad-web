'use client'

import { myWishes } from '@/app/[lang]/(dashboard)/genny/my-wishes/data'
import { WishForm } from '@/components/WishForm'
import { use } from 'react'

export default function EditWishPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const wish = myWishes.find((w) => w.id === id)

  return <WishForm mode="edit" initialWish={wish} />
}
