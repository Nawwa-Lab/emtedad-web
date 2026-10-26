'use client'

import { WishForm } from '@/components/WishForm'
import { shbeikSuggestions } from '../../data'

export default function ShbeikAddWishPage() {
  return <WishForm family="shbeik" mode="create" suggestions={shbeikSuggestions} />
}
