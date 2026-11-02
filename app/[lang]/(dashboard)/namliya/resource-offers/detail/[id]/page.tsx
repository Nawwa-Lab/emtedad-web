'use client'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { namliyaResource } from './data'
import { ChevronLeft } from 'lucide-react'
import { ProviderRequestCard } from '@/components/ProviderRequestCard'
import Image from 'next/image'
import hand from '@/icons/hand.svg'
import circles from '@/icons/circles.svg'
import gate from '@/icons/gate.svg'
import star2 from '@/icons/star-2.svg'
import target from '@/icons/target.svg'
import orgCover from '@/icons/org-cover.svg'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

const images = [
  { src: target, alt: target },
  { src: star2, alt: star2 },
  { src: gate, alt: gate },
  { src: circles, alt: circles },
]

export default function ServiceOfferPage() {
  const t = useTranslations('namliyaResource')
  const [active, setActive] = useState(0)

  return (
    <>
      <Link
        href="/namliya/resource-offers"
        className="inline-flex items-center gap-2.5 font-bold text-[15.5px] mb-4 text-ink font-body"
      >
        <span className="size-9.5 shrink-0 rounded-full border-[2.5px] border-ink bg-surface shadow-[3px_3px_0] shadow-ink grid place-items-center p-2.25 text-ink">
          <ChevronLeft className="w-full h-full rtl:rotate-180" />
        </span>
        <span className="hover:text-red">{t('backToNamliya')}</span>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start pb-36 lg:pb-0">
        <div className="col-span-full lg:col-span-2 space-y-6">
          <div>
            <Card
              effect="flat"
              className="relative aspect-16/10 overflow-hidden rounded-3xl border-2 border-black bg-[#ece2cb] shadow-[4px_4px_0_0_#000] p-0 mb-4"
            >
              {/* Background SVG mesh */}
              <Image
                src={orgCover}
                alt=""
                priority
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none brightness-0 opacity-20"
              />

              {/* Centered resource image */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <Image
                  key={active}
                  src={images[active].src}
                  alt={images[active].alt}
                  width={96}
                  height={96}
                  className="size-20 sm:size-24 md:size-26 object-contain animate-in fade-in duration-200"
                  priority
                />
              </div>

              {/* Counter pill */}
              <span className="absolute bottom-4 right-4 rounded-full border-2 border-black bg-[#f6f1e3] px-4 py-1.5 font-bold font-cairo text-[13.5px] text-ink shadow-sm">
                {t('resourcePhoto')} {(active + 1).toLocaleString('ar-EG')} {t('from')}{' '}
                {images.length.toLocaleString('ar-EG')}
              </span>
            </Card>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={img.alt}
                  aria-pressed={i === active}
                  className={`relative aspect-square rounded-2xl border-2 bg-paper transition-all cursor-pointer
                  ${
                    i === active
                      ? 'border-[#d9482b] shadow-none'
                      : 'border-black shadow-[4px_4px_0_0_#000] hover:-translate-y-0.5'
                  }`}
                >
                  <span className="absolute inset-[35%]">
                    <Image src={img.src} alt={img.alt} fill className="object-contain opacity-75" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Card className="p-4 sm:p-7 bg-surface border-[3px] border-ink rounded-panel">
            <div className="flex items-center gap-3.25 flex-wrap mb-3.5">
              <span>{namliyaResource.category}</span>
              <Badge color="surface" effect="flat" className="border-ink border-dashed text-soft">
                {namliyaResource.resource}
              </Badge>
            </div>
            <CardTitle>{namliyaResource.title}</CardTitle>
            <CardDescription className="mt-3">{namliyaResource.description}</CardDescription>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5.5">
              <Card
                effect="flat"
                className="bg-gold border-[2.5px] border-ink rounded-2xl py-4 px-4.5"
              >
                <CardTitle className=" block font-bold font-cairo text-[13px] text-soft">
                  {namliyaResource.cards.firstCard.title}
                </CardTitle>
                <div className="font-extrabold font-display text-[23px] mt-1.25 leading-[1.3]">
                  {namliyaResource.cards.firstCard.price}
                  <span className="ms-0.75">{namliyaResource.cards.firstCard.currency}</span>
                </div>
              </Card>
              {namliyaResource.cards.restCards.map((card, index) => (
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
              <h3 className="font-display text-[22px] text-red mb-2">{namliyaResource.info}</h3>
              <ul className="space-y-1.5">
                {namliyaResource.data.map((item) => (
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
        </div>

        <aside className="w-full lg:col-span-1">
          <div className="mb-5.5">
            <Card className="bg-red text-surface py-6 px-6.5 mb-5.5 text-center">
              <CardTitle className="text-[15px] font-bold text-white font-cairo">
                {t('valueLabel')}
              </CardTitle>
              <CardContent>
                <div className="font-extrabold font-display text-[62px] mt-1 leading-[1.05]">
                  {namliyaResource.cards.firstCard.price}
                  <span className="ms-1.5 text-[22px] text-gold ">
                    {namliyaResource.cards.firstCard.currency}
                  </span>
                </div>
                <p className="font-semibold text-[12.5px] leading-[1.6] mt-1.25">{t('taxNote')}</p>
                <p className="font-semibold text-[14.5px] leading-[1.8] mt-2">{t('paymentNote')}</p>
              </CardContent>
            </Card>
          </div>
          <ProviderRequestCard
            provider={{
              name: 'صوت وصورة',
              profileHref: '/organization/123',
              profileLabel: t('profileLabel'),
            }}
            satisfaction={{
              title: t('satisfactionIndex'),
              subtitle: 'قيّمها ٤٨ عضوًا',
              badge: 'عامر',
            }}
            member={{
              name: 'كريم فوزي',
              href: '/member/123',
              role: 'المشرف على المورد · ١٠ شهمهم',
              badge: 'عامر',
            }}
            request={{ label: t('requestLink'), href: '/request' }}
            save={{ label: t('saveToFavorites') }}
          />
          <Card className="py-7 px-7.5 mb-5.5 mt-5">
            <h2 className="font-display text-[22px] flex items-center gap-2.75">
              <Image src={hand} alt="hand" width={32} height={32} />
              {t('securityDeposit')}
            </h2>
            <p className="font-medium text-[16px] font-body text-soft leading-[1.95] mt-2.5">
              {t('securityDepositNote')}
            </p>
          </Card>
        </aside>
      </div>
    </>
  )
}
