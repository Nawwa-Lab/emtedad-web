'use client'

import { gennyMyWishes, gennySuggestions } from '@/app/[lang]/(dashboard)/genny/data'
import { WishForm } from '@/components/WishForm'
import { useTranslations } from 'next-intl'
import { use } from 'react'

export default function EditWishPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const data = useTranslations('genny.data')
  const wish = gennyMyWishes.find((item) => item.id === id)

  return (
    <WishForm
      family="genny"
      mode="edit"
      suggestions={gennySuggestions}
      initialWish={
        wish
          ? {
              title: data(`wishes.${wish.copyKey}.title`),
              category: data(`categories.${wish.categoryKey}`),
              description: data(`wishes.${wish.copyKey}.description`),
              impact: data(`wishes.${wish.copyKey}.why`),
            }
          : undefined
      }
    />
  )
}
