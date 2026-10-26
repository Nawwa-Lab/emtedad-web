import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import type { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary()

  return {
    title: dict.forgetPassword.metaTitle,
    description: dict.forgetPassword.metaDescription,
  }
}

export default async function ForgetPasswordLayout({ children }: { children: React.ReactNode }) {
  return children
}
