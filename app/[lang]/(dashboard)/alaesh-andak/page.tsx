import { redirect } from '@/i18n/navigation'

export default async function AlaeshAndakPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  redirect({
    locale: lang,
    href: '/alaesh-andak/browse',
  })
}
