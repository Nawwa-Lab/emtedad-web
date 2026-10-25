'use client'

import { shbeikMyWishes, shbeikSuggestions } from '@/app/[lang]/(dashboard)/shbeik-lbeik/data'
import { WishForm } from '@/components/WishForm'
import { useTranslations } from 'next-intl'
import { use } from 'react'

export default function EditWishPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const data = useTranslations('shbeik.data')
  const wish = shbeikMyWishes.find((item) => item.id === id)

  return (
    <WishForm
      family="shbeik"
      mode="edit"
      suggestions={shbeikSuggestions}
      initialWish={
        wish
          ? {
              title: data(`wishes.${wish.copyKey}.title`),
              category: data(`categories.${wish.categoryKey}`),
              description: data(`wishes.${wish.copyKey}.description`),
              impact: '',
            }
          : undefined
      }
    />
  )
}
