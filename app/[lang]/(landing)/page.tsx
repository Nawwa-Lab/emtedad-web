import { LandingPage } from '@/components/landing/LandingPage'
import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary()

  return { title: dictionary.landing.metaTitle, description: dictionary.landing.metaDescription }
}

export default async function Page() {
  const dictionary = await getDictionary()

  return <LandingPage copy={dictionary.landing} />
}
