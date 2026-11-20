'use client'

import { StatusBadge } from '@/components/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import StarIcon from '@/icons/star.svg'
import { badgeKey, badgeSealClass } from '@/lib/utils/badge'
import { formatNumber } from '@/lib/utils/formatter'
import type { Badge, BadgeCounts, Satisfaction } from '@/services/members/types'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

const BADGE_ORDER: Badge[] = ['basic', 'pro', 'elite']

export function MemberSatisfactionDialog({ satisfaction }: { satisfaction: Satisfaction }) {
  const t = useTranslations('memberProfile')
  const global = useTranslations('global')
  const locale = useLocale()

  const badgeLabel = (badge: Badge) => global(`badges.${badgeKey(badge)}`)

  const renderSide = (title: string, weight: string, subtitle: string, counts: BadgeCounts) => (
    <div className="mt-5.5">
      <h3 className="flex items-baseline gap-2.5 font-display text-[21px] leading-tight">
        {title}
        <span className="rounded-full bg-ink px-2.75 py-0.75 font-body text-[13px] font-extrabold text-surface">
          {weight}
        </span>
      </h3>
      <p className="mt-1 font-body text-sm font-semibold text-soft">{subtitle}</p>
      <div>
        {BADGE_ORDER.map((badge) => (
          <div
            key={badge}
            className="flex items-center border-b-[2.5px] border-dashed border-ink/26 py-2.75 last:border-0"
          >
            <StatusBadge
              label={badgeLabel(badge)}
              shape="pill"
              className={`text-[17px] py-1 ps-3.5 pe-2.5 [&_img]:size-[21px] ${badgeSealClass(badge)}`}
            />
            <span className="mx-3.5 mb-2 min-w-6 flex-1 border-b-4 border-dotted border-ink/32" />
            <strong className="min-w-11 text-start font-display text-[26px] leading-none">
              {formatNumber(counts[badge], { locale })}
            </strong>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <StatusBadge
          label={badgeLabel(satisfaction.overallIndex)}
          shape="pill"
          className="gap-2.25 border-3 ps-2 pe-4.5 py-1.5 text-[20px] shadow-[3px_3px_0_#1A1714] transition-[transform,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_#1A1714] [&_img]:size-[27px]"
        />
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        closeLabel={t('close')}
        overlayClassName="bg-[rgba(26,23,20,0.55)]"
        className="duration-[260ms] ease-[cubic-bezier(0.2,1.3,0.4,1)] data-open:zoom-in-[.97] data-open:slide-in-from-bottom-[20px]"
      >
        <DialogClose
          aria-label={t('close')}
          className="absolute end-4 top-4 z-10 grid size-11.5 place-items-center rounded-full border-[2.5px] border-ink bg-red font-body text-xl font-extrabold text-surface shadow-[3px_3px_0_#1A1714] transition hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_#1A1714] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue"
        >
          ✕
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-[29px] leading-tight">{t('satisfactionTitle')}</DialogTitle>
        </DialogHeader>

        <div className="mt-4.5 flex flex-wrap items-center gap-4 rounded-card border-3 border-ink bg-gold px-5.5 py-4.5">
          <span className="inline-flex items-center gap-2.5 font-display text-[30px] leading-none">
            <Image src={StarIcon} alt="" className="size-8.5" />
            {badgeLabel(satisfaction.overallIndex)}
          </span>
          <p className="min-w-48 flex-1 font-body text-[14.5px] font-semibold leading-[1.85]">
            {t.rich('satisfactionSummary', {
              count: formatNumber(satisfaction.uniqueEvaluatorCount, { locale }),
              providerWeight: t('providerWeight'),
              recipientWeight: t('recipientWeight'),
              b: (chunks) => <b className="font-extrabold">{chunks}</b>,
            })}
          </p>
        </div>

        {renderSide(
          t('asProvider'),
          t('providerWeight'),
          t('providerEvaluators', {
            count: formatNumber(satisfaction.provider.evaluationCount, { locale }),
          }),
          satisfaction.provider.counts,
        )}
        {renderSide(
          t('asRecipient'),
          t('recipientWeight'),
          t('recipientEvaluators', {
            count: formatNumber(satisfaction.recipient.evaluationCount, { locale }),
          }),
          satisfaction.recipient.counts,
        )}

        <p className="mt-5 rounded-card border-[2.5px] border-dashed border-ink bg-paper px-4.5 py-3.5 font-body text-[14.5px] font-medium leading-[1.9] text-soft">
          <b className="font-extrabold text-ink">{t('weightsNoteTitle')}</b> {t('weightsNoteBody')}
        </p>

        <div className="mt-5 flex flex-wrap gap-3 border-t-3 border-dashed border-ink pt-4.5">
          <DialogClose render={<Button render={<a href="#reviews" />} />}>
            {t('viewWrittenReviews')}
          </DialogClose>
          <DialogClose render={<Button variant="outline" effect="flat" />}>
            {t('close')}
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
