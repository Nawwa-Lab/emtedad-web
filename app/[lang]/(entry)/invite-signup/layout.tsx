import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import type { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary()

  return {
    title: dict.inviteSignup.metaTitle,
    description: dict.inviteSignup.metaDescription,
  }
}

export default async function InviteSignupLayout({ children }: { children: React.ReactNode }) {
  return children
}
