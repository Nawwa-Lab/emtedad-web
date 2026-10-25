'use client'

import { WishForm } from '@/components/WishForm'
import { gennySuggestions } from '../../data'

export default function CreateWishPage() {
  return <WishForm family="genny" mode="create" suggestions={gennySuggestions} />
}
