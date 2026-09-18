import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import type { Locale } from '@/types'
import { Link } from '@/i18n/navigation'
import { EntityCard } from '@/components/EntityCard'
import { namliyaService, sidebar } from './data'
import { RequestActionCard } from '@/components/RequestActionCard'

export default async function ServiceOfferPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const service = dict.namliyaService

  return (
    <>
      <Link
        href="/namliya/service-offers"
        className="inline-block font-bold text-[12.5px] mb-3.5 text-green-deep font-cairo hover:underline"
      >
        {service.backToNamliya}
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start pb-36 lg:pb-0">
        <Card className="p-4 sm:p-7 bg-surface border border-line rounded-[22px] col-span-full lg:col-span-2">
          <Badge variant="default">{namliyaService.category}</Badge>
          <CardTitle>{namliyaService.title}</CardTitle>
          <CardDescription className="mt-3.5">{namliyaService.description}</CardDescription>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5.5">
            <Card className="bg-paper border border-line-soft rounded-2xl p-4">
              <CardTitle className="font-bold text-[11px] text-ink-soft">
                {namliyaService.cards.firstCard.title}
              </CardTitle>
              <div className="font-extrabold font-cairo text-[16px] mt-1.25">
                {namliyaService.cards.firstCard.price}
                <span className="font-display font-semibold text-[11.5px] text-gold-deep ms-0.75">
                  {' '}
                  {namliyaService.cards.firstCard.currency}
                </span>
              </div>
            </Card>
            {namliyaService.cards.restCards.map((card, index) => (
              <Card className="bg-paper border border-line-soft rounded-2xl p-4" key={index}>
                <CardTitle className="font-bold font-cairo text-[11px] text-ink-soft">
                  {card.header}
                </CardTitle>
                <div className="font-extrabold font-cairo text-[16px] mt-1.25">
                  {card.description}
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        <aside className="w-full lg:col-span-1">
          <div className="mb-4">
            {sidebar.map((item) => (
              <EntityCard
                key={item.id}
                title={item.title}
                entity={item.name}
                entityFirstLetter={item.name.charAt(0)}
                viewProfileHref="#"
                viewProfileLabel={item.viewProfileLabel}
                viewProfileBadge={item.viewProfileBadge}
                className="mb-4"
              />
            ))}
          </div>
          <RequestActionCard
            requestLabel={service.requestLink}
            saveLabel={service.saveToFavorites}
            note={service.serviceRequestNote}
          />
        </aside>
      </div>
    </>
  )
}
