'use client'

import type { OrganizationListing } from '@/app/[lang]/(dashboard)/organization/[id]/data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import ExpandIcon from '@/icons/expand.svg'
import StarIcon from '@/icons/star.svg'
import { formatNumber } from '@/lib/utils/formatter'
import { cn } from 'cn'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function OrganizationOfferCard({
  listing,
  showAction = true,
}: {
  listing: OrganizationListing
  showAction?: boolean
}) {
  const locale = useLocale()
  const t = useTranslations('organizationProfile')
  const global = useTranslations('global')
  const resource = listing.kind === 'resource'
  const actionLabel = listing.kind === 'request' ? t('haveIt') : t('request')

  return (
    <Dialog>
      <Card className="relative flex min-h-75 flex-col rounded-panel border-3 border-ink p-6 shadow-[6px_6px_0_#1A1714] transition hover:-translate-x-0.5 hover:-translate-y-1 hover:rotate-[-0.3deg] hover:shadow-[9px_11px_0_#1A1714]">
        <DialogTrigger
          render={
            <button
              type="button"
              aria-label={t('details.expand')}
              className="absolute end-3.5 top-3.5 z-10 grid size-10.5 place-items-center rounded-[12px] border-[2.5px] border-ink bg-paper shadow-[3px_3px_0_#1A1714] transition hover:translate-x-px hover:translate-y-px hover:bg-gold hover:shadow-[1px_1px_0_#1A1714] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              <Image src={ExpandIcon} alt="" className="size-5" />
            </button>
          }
        />
        <span
          className={`w-fit rounded-full border-[2.5px] border-ink px-4 py-1 font-body text-[13px] font-bold ${resource ? 'bg-gold text-ink' : 'bg-blue text-surface'}`}
        >
          {listing.category}
        </span>
        <CardTitle className="mt-4 text-[28px] leading-[1.3]">{listing.title}</CardTitle>
        <CardDescription className="mb-0 mt-2 line-clamp-2 text-base leading-[1.85]">
          {listing.description}
        </CardDescription>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 font-body text-sm font-semibold text-soft">
          <Avatar color="paper" size="sm" effect="flat">
            <AvatarImage src={listing.ownerAvatarUrl} alt={listing.owner} />
            <AvatarFallback>{listing.owner.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{listing.owner}</span>
          {listing.note && <span>· {listing.note}</span>}
          {listing.rating && <OfferRatingBadge label={listing.rating} />}
        </div>
        <CardContent className="mt-3 flex items-end justify-between gap-3 border-t-[2.5px] border-dashed border-ink px-0 pt-4">
          <div className="flex flex-col gap-1.25">
            <span className="flex flex-row items-end gap-1">
              <span className="font-display text-[34px] leading-none">
                {formatNumber(listing.price, { locale })}
              </span>
              <small className="font-display text-[16px] text-red">{global('currency')}</small>
            </span>
            <span className="font-body text-soft text-[12.5px]/[1.6] font-semibold">
              {t('vat')}
            </span>
          </div>
          {showAction && <DialogTrigger render={<Button size="sm">{actionLabel}</Button>} />}
        </CardContent>
      </Card>

      <DialogContent
        showCloseButton={false}
        overlayClassName="z-[100] bg-[rgba(26,23,20,0.55)] p-3 sm:p-5"
        className="fixed top-4 z-[100] max-h-[calc(100vh-32px)] w-[calc(100vw-24px)] -translate-x-1/2 translate-y-0 rounded-panel px-5 pb-6 pt-6.5 shadow-[10px_10px_0_#1A1714] ring-0 duration-[280ms] ease-[cubic-bezier(0.2,1.3,0.4,1)] sm:top-8 sm:max-h-[calc(100vh-64px)] sm:w-[min(760px,calc(100vw-40px))] sm:px-8 sm:pb-7.5 sm:pt-8.5 data-open:slide-in-from-bottom-[22px] data-open:zoom-in-[.97]"
      >
        <DialogClose
          aria-label={t('details.close')}
          className="absolute end-4 top-4 z-10 grid size-11.5 place-items-center rounded-full border-[2.5px] border-ink bg-red font-body text-xl font-extrabold text-surface shadow-[3px_3px_0_#1A1714] transition hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_#1A1714] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue"
        >
          ✕
        </DialogClose>
        <span className="mb-3 inline-block rounded-full border-[2.5px] border-ink bg-blue px-3.75 py-1.25 font-body text-[13px] font-bold text-surface">
          {listing.category} ·{' '}
          {resource ? t('details.materialResource') : t('details.humanService')}
        </span>
        <DialogTitle className="pe-14 text-[clamp(30px,4vw,40px)] leading-[1.25]">
          {listing.title}
        </DialogTitle>
        <DialogDescription className="mb-0 mt-3.5 text-[17px] leading-8">
          {listing.details?.description ?? listing.description}
        </DialogDescription>
        <div className="mt-5.5 grid gap-3.5 min-[901px]:grid-cols-3">
          <DetailFact
            label={t('details.value')}
            value={`${formatNumber(listing.price, { locale })} ${global('currency')}`}
          />
          {listing.details?.facts.map(([label, value]) => (
            <DetailFact key={label} label={label} value={value} />
          ))}
        </div>
        {listing.details && (
          <section className="mt-6">
            <h3 className="mb-2 font-display text-[22px] text-red">
              {listing.details.sectionTitle}
            </h3>
            <ul className="font-body text-base font-medium leading-[1.95] text-soft">
              {listing.details.items.map((item) => (
                <li
                  key={item}
                  className="relative mb-1.5 ps-5.5 before:absolute before:start-0.5 before:top-3 before:size-2.25 before:rounded-full before:border-2 before:border-ink before:bg-gold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="mt-6">
          <h3 className="mb-2 font-display text-[22px] text-red">{t('details.provider')}</h3>
          <div className="mt-1 flex items-center gap-3.5 rounded-card border-[2.5px] border-ink bg-paper px-4.5 py-3.5">
            <Avatar color="gold" effect="flat" className="size-12 shadow-[2px_2px_0_#1A1714]">
              <AvatarFallback className="text-[21px]">
                {global('organizations.sawt').charAt(0)}
              </AvatarFallback>
            </Avatar>
            <strong className="flex-1 font-display text-[22px] leading-none">
              {global('organizations.sawt')}
            </strong>
            <OfferRatingBadge label={global('badges.amer')} />
          </div>
        </section>
        <div className="mt-6.5 flex flex-wrap gap-3 border-t-3 border-dashed border-ink pt-5">
          {showAction && (
            <Button className="h-auto px-[26px] py-[11px]">
              {listing.kind === 'request' ? actionLabel : t('details.requestService')}
            </Button>
          )}
          <Button variant="outline" effect="flat" className="h-auto px-5.5 py-2.5 text-[15px]">
            {t('details.save')}
          </Button>
          <DialogClose
            render={
              <Button
                variant="outline"
                effect="flat"
                className="h-auto px-5.5 py-2.5 text-[15px]"
              />
            }
          >
            {t('details.close')}
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function DetailFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card border-[2.5px] border-ink bg-paper p-4">
      <p className="font-body text-[13px] font-bold text-soft">{label}</p>
      <p className="mt-1 font-display text-[22px] leading-[1.3]">{value}</p>
    </div>
  )
}

function OfferRatingBadge({ label }: { label: string }) {
  const isTopRating = label === 'عامر' || label === 'Amer'
  const isLowestRating = label === 'أحسن عندك' || label === 'Fair'

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border-2 border-ink py-0.75 ps-2 pe-[13px] font-display text-[15px]',
        isTopRating && 'bg-gold',
        isLowestRating && 'border-dashed text-soft',
      )}
    >
      <Image src={StarIcon} alt="" className="size-4.75" />
      {label}
    </span>
  )
}
