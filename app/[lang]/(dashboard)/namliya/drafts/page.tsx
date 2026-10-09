import { SubLinks } from '@/components/SubLinks'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { cardContent } from './data'

export default function DraftsPage() {
  const t = useTranslations('namliyaDrafts')

  return (
    <>
      <h1 className="font-display font-bold text-[26px] leading-normal">{t('title')}</h1>
      <p className=" font-cairo font-semibold text-[13.5px] text-ink-soft mt-1">
        {t('description')}
      </p>
      <div className="mt-4 mb-1.5 mx-0">
        <SubLinks
          links={[
            { href: '/namliya/service-offers', label: t('link1') },
            { href: '/namliya/my-requests', label: t('link2') },
            { href: '/namliya/my-asks', label: t('link3') },
            { href: '/namliya/drafts', label: t('link4') },
          ]}
        />
      </div>
      <div className="mt-5.5">
        {cardContent.map((card, index) => (
          <Card key={index} className="px-5 py-4.5 mb-2.5">
            <CardHeader className="flex items-center gap-3 flex-wrap">
              <Badge color="red" size="sm">
                {card.badge}
              </Badge>
              <CardTitle className="text-[15px] leading-[1.65] min-w-55 flex-1 text-ink">
                {card.title}
              </CardTitle>
              <Badge color="gold">{t('pending')}</Badge>
            </CardHeader>
            <CardDescription className="font-semibold text-[12px] text-ink-soft mt-1.5">
              {card.description}
            </CardDescription>
            <CardAction className="flex items-center gap-2.5 flex-wrap mt-3 pt-3 border-t border-line-soft">
              <span className="font-semibold font-cairo text-[12px] text-ink-soft flex-1 min-w-45">
                {card.note}
              </span>
              <Link
                href=""
                className="inline-block no-underline border border-green-deep text-green-deep bg-transparent rounded-full font-cairo font-bold text-[12.5px] px-4.5 py-2 cursor-pointer hover:bg-green"
              >
                {t('link5')}
              </Link>
              <Link
                href="/namliya/service-offers/create"
                className="inline-block no-underline border border-green-deep text-green-deep bg-transparent rounded-full font-cairo font-bold text-[12.5px] px-4.5 py-2 cursor-pointer hover:bg-green"
              >
                {t('link6')}
              </Link>
              <Button>{t('postButton')}</Button>
              <Button variant="link">{t('deleteButton')}</Button>
            </CardAction>
          </Card>
        ))}
      </div>
    </>
  )
}
