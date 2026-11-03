import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()

  return {
    title: dict.inviteSignup.metaTitle,
    description: dict.inviteSignup.metaDescription,
    referrer: 'no-referrer',
  }
}

export default function InvitationLayout({ children }: { children: React.ReactNode }) {
  return children
}
