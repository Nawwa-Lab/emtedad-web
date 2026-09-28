import { RouteHeader } from '@/components/RouteHeader'
import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { Link } from '@/i18n/navigation'
import { pick } from 'lodash'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { SubLinks } from '../../../../components/SubLinks'

function MakeWishButton({ text }: { text: string }) {
  return (
    <Link
      href="/shbeik-lbeik/wish/create"
      className="bg-green font-cairo border-transparent text-ink inline-block rounded-[999px] font-bold text-[11.5px] sm:text-[12px] py-1.5 sm:py-1.75 px-3 sm:px-3.75"
    >
      {text}
    </Link>
  )
}

export default async function ShbeikLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()
  const dict = await getDictionary()
  const shbeik = dict.shbeik

  return (
    <NextIntlClientProvider messages={pick(messages, ['shbeik'])}>
      <RouteHeader
        routes={[
          {
            path: '/shbeik-lbeik/browse',
            config: {
              title: shbeik.browse.title,
              description: shbeik.browse.description,
              action: <MakeWishButton text={shbeik.browse.chips.addNew} />,
            },
          },
          {
            path: '/shbeik-lbeik/my-wishes',
            config: {
              title: shbeik.myWishes.title,
              description: shbeik.myWishes.description,
              action: <MakeWishButton text={shbeik.myWishes.chips.addNew} />,
            },
          },
        ]}
      >
        <SubLinks
          className="mt-4 mb-1.5"
          links={[
            { href: '/shbeik-lbeik/browse', label: shbeik.browse.chips.browse },
            { href: '/shbeik-lbeik/my-wishes', label: shbeik.browse.chips.myWishes },
          ]}
        />
      </RouteHeader>

      {children}
    </NextIntlClientProvider>
  )
}
