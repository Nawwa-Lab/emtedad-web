import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import type { Locale } from '@/types'
import { Link } from '@/i18n/navigation'
import { EntityCard } from '@/components/EntityCard'
import { namliyaResource, sidebar } from './data'
import Image from 'next/image'
import { Camera } from 'lucide-react'
import { RequestActionCard } from '@/components/RequestActionCard'

function ImagePlaceholder({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="w-full h-full flex items-center justify-center text-ink-soft/40">
        <Camera className="w-7 h-7" strokeWidth={1.5} />
      </div>
    )
  }
  return <Image src={src} alt={alt} fill className="object-cover" />
}

export default async function ServiceOfferPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const resource = dict.namliyaResource

  return (
    <>
      <Link
        href="/namliya/resource-offers"
        className="inline-block font-bold text-[12.5px] mb-3.5 text-green-deep font-cairo hover:underline"
      >
        {resource.backToNamliya}
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start pb-36 lg:pb-0">
        <Card className="p-4 sm:p-7 bg-surface border border-line rounded-[22px] col-span-full lg:col-span-2">
          <Badge variant="secondary">{namliyaResource.category}</Badge>
          <CardTitle>{namliyaResource.title}</CardTitle>
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-2.5 mt-4.5">
            <Card className="sm:row-span-2 aspect-video bg-sage border border-line-soft rounded-2xl grid items-center relative overflow-hidden">
              <ImagePlaceholder src="" alt="" />
            </Card>
            <Card className="aspect-video sm:aspect-16/8 opacity-85 bg-sage border border-line-soft rounded-2xl grid items-center relative overflow-hidden">
              <ImagePlaceholder src="" alt="" />
            </Card>
            <Card className="aspect-video sm:aspect-16/8 opacity-85 bg-sage border border-line-soft rounded-2xl grid items-center relative overflow-hidden">
              <ImagePlaceholder src="" alt="" />
            </Card>
          </div>
          <CardDescription className="mt-3.5">{namliyaResource.description}</CardDescription>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5.5">
            <Card className="bg-paper border border-line-soft rounded-2xl p-4">
              <CardTitle className="font-bold text-[11px] text-ink-soft">
                {namliyaResource.cards.firstCard.title}
              </CardTitle>
              <div className="font-extrabold font-cairo text-[16px] mt-1.25">
                {namliyaResource.cards.firstCard.price}
                <span className="font-display font-semibold text-[11.5px] text-gold-deep ms-0.75">
                  {' '}
                  {namliyaResource.cards.firstCard.currency}
                </span>
              </div>
            </Card>
            {namliyaResource.cards.restCards.map((card, index) => (
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
          <Card className="mt-5.5 bg-paper border border-line-soft rounded-2xl p-4.5">
            <CardTitle className="text-green-deep mb-2 text-[15px]">
              {resource.conditionsTitle}
            </CardTitle>
            <ul className="space-y-1.5">
              {resource.conditions.map((item, itemIndex) =>
                Object.values(item).map((condition, condIndex) => (
                  <li
                    key={`${itemIndex}-${condIndex}`}
                    className="font-cairo font-semibold text-[13px] leading-loose ps-5 relative text-ink-soft"
                  >
                    <span className="absolute inset-s-0 top-[0.65em] w-1.5 h-1.5 rounded-full bg-green" />
                    {condition}
                  </li>
                )),
              )}
            </ul>
          </Card>
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
            requestLabel={resource.requestLink}
            saveLabel={resource.saveToFavorites}
            note={resource.serviceRequestNote}
          />
        </aside>
      </div>
    </>
  )
}
