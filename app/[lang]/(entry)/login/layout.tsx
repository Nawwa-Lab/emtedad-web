import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import type { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary()

  return {
    title: dict.login.metaTitle,
    description: dict.login.metaDescription,
  }
}

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
