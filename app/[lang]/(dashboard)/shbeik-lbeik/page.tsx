import { redirect } from '@/i18n/navigation'

export default async function ShbeikPage({ params }: { params: { lang: string } }) {
  const { lang } = await params

  redirect({
    locale: lang,
    href: '/shbeik-lbeik/browse',
  })
}
