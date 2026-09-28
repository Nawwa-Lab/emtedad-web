import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import type { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary()

  return {
    title: dict.passwordReset.metaTitle,
    description: dict.passwordReset.metaDescription,
  }
}

export default async function PasswordResetLayout({ children }: { children: React.ReactNode }) {
  return children
}
