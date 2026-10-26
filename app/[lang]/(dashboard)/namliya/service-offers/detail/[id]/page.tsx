import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { Link } from '@/i18n/navigation'
import { namliyaService } from './data'
import { ChevronLeft } from 'lucide-react'
import { ProviderRequestCard } from '@/components/ProviderRequestCard'

export default async function ServiceOfferPage() {
  const dict = await getDictionary()
  const service = dict.namliyaService

  return (
    <>
      <Link
        href="/namliya/service-offers"
        className="inline-flex items-center gap-2.5 font-bold text-[15.5px] mb-4 text-ink font-body"
      >
        <span className="size-9.5 shrink-0 rounded-full border-[2.5px] border-ink bg-surface shadow-[3px_3px_0] shadow-ink grid place-items-center p-2.25 text-ink">
          <ChevronLeft className="w-full h-full rtl:rotate-180" />
        </span>
        <span className="hover:text-red">{service.backToNamliya}</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start pb-36 lg:pb-0">
        <Card className="p-4 sm:p-7 bg-surface border-[3px] border-ink rounded-panel col-span-full lg:col-span-2">
          <div className="flex items-center gap-3.25 flex-wrap mb-3.5">
            <span>{namliyaService.category}</span>
            <Badge color="surface" effect="flat" className="border-ink border-dashed text-soft">
              {namliyaService.service}
            </Badge>
          </div>
          <CardTitle>{namliyaService.title}</CardTitle>
          <CardDescription className="mt-3">{namliyaService.description}</CardDescription>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5.5">
            <Card
              effect="flat"
              className="bg-gold border-[2.5px] border-ink rounded-2xl py-4 px-4.5"
            >
              <CardTitle className=" block font-bold font-cairo text-[13px] text-soft">
                {namliyaService.cards.firstCard.title}
              </CardTitle>
              <div className="font-extrabold font-display text-[23px] mt-1.25 leading-[1.3]">
                {namliyaService.cards.firstCard.price}
                <span className="ms-0.75">{namliyaService.cards.firstCard.currency}</span>
              </div>
            </Card>
            {namliyaService.cards.restCards.map((card, index) => (
              <Card
                effect="flat"
                className="bg-paper border-[2.5px] border-ink rounded-2xl py-4 px-4.5 "
                key={index}
              >
                <CardTitle className=" block font-bold font-cairo text-[13px] text-soft">
                  {card.header}
                </CardTitle>
                <div className="font-extrabold font-display text-[23px] mt-1.25 leading-[1.3]">
                  {card.description}
                </div>
              </Card>
            ))}
          </CardContent>
          <div className="mt-6">
            <h3 className="font-display text-[22px] text-red mb-2">{namliyaService.info}</h3>
            <ul className="space-y-1.5">
              {namliyaService.data.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 font-medium font-cairo text-[16px] text-soft leading-[1.95]"
                >
                  <span className="size-2.5 shrink-0 rounded-full border-2 border-ink bg-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="font-display text-[22px] text-red mb-2">{namliyaService.info2}</h3>
            <ul className="space-y-1.5">
              {namliyaService.data2.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 font-medium font-cairo text-[16px] text-soft leading-[1.95]"
                >
                  <span className="size-2.5 shrink-0 rounded-full border-2 border-ink bg-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <aside className="w-full lg:col-span-1">
          <div className="mb-5.5">
            <Card className="bg-red text-surface py-6 px-6.5 mb-5.5 text-center">
              <CardTitle className="text-[15px] font-bold text-white font-cairo">
                {service.valueLabel}
              </CardTitle>
              <CardContent>
                <div className="font-extrabold font-display text-[62px] mt-1 leading-[1.05]">
                  {namliyaService.cards.firstCard.price}
                  <span className="ms-1.5 text-[22px] text-gold ">
                    {namliyaService.cards.firstCard.currency}
                  </span>
                </div>
                <p className="font-semibold text-[12.5px] leading-[1.6] mt-1.25">
                  {service.taxNote}
                </p>
                <p className="font-semibold text-[14.5px] leading-[1.8] mt-2">
                  {service.paymentNote}
                </p>
              </CardContent>
            </Card>
          </div>
          <ProviderRequestCard
            provider={{
              name: 'صوت وصورة',
              profileHref: '/organization/123',
              profileLabel: service.profileLabel,
            }}
            satisfaction={{
              title: service.satisfactionIndex,
              subtitle: 'قيّمها ٤٨ عضوًا',
              badge: 'عامر',
            }}
            member={{
              name: 'كريم فوزي',
              href: '/member/123',
              role: 'العضو المنفِّذ · مصوّر ومدير إنتاج',
              badge: 'عامر',
            }}
            request={{ label: service.requestLink, href: '/request' }}
            save={{ label: service.saveToFavorites }}
          />
        </aside>
      </div>
    </>
  )
}
