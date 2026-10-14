import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import type { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary()

  return {
    title: dict.resetPassword.metaTitle,
    description: dict.resetPassword.metaDescription,
  }
}

export default async function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return children
}
