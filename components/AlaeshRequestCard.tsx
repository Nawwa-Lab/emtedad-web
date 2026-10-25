'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Link } from '@/i18n/navigation'
import StarIcon from '@/icons/star.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { Maximize2 } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

export type AlaeshMarket = 'namliya' | 'khalis' | 'public'
export type AlaeshReplyStatus = 'open' | 'converted' | 'withdrawn'

export type AlaeshRequestCardData = {
  id: string
  market: AlaeshMarket
  provider: string
  providerKind: 'organization' | 'member'
  badge?: 'amer' | 'kareem'
  replies: number
  value: number
  taxPercent: number
  state: AlaeshReplyStatus
}

type CardMode = 'browse' | 'mine'

function getProviderName(
  global: ReturnType<typeof useTranslations<'global'>>,
  request: AlaeshRequestCardData,
) {
  return global(
    request.providerKind === 'organization'
      ? `organizations.${request.provider}`
      : `members.${request.provider}`,
  )
}

export function AlaeshRequestCard({
  request,
  mode,
  onExpand,
  onMockAction,
}: {
  request: AlaeshRequestCardData
  mode: CardMode
  onExpand: (request: AlaeshRequestCardData) => void
  onMockAction?: (action: string) => void
}) {
  const t = useTranslations('alaesh')
  const global = useTranslations('global')
  const locale = useLocale()
  const n = (value: number) => formatNumber(value, { locale })
  const provider = getProviderName(global, request)
  const detailHref = `/alaesh-andak/request/${request.id}`

  return (
    <article className="relative flex min-h-0 flex-col rounded-panel border-[3px] border-ink bg-surface p-6 shadow-[6px_6px_0] shadow-ink transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-1 hover:-rotate-[0.3deg] hover:shadow-[9px_11px_0] max-[520px]:p-5">
      <button
        type="button"
        onClick={() => onExpand(request)}
        aria-label={t('actions.expand')}
        className="absolute top-3.5 inset-e-3.5 z-10 grid size-10.5 place-items-center rounded-field border-[2.5px] border-ink bg-paper shadow-[3px_3px_0] shadow-ink hover:translate-x-px hover:translate-y-px hover:bg-gold hover:shadow-[1px_1px_0] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue"
      >
        <Maximize2 className="size-5" strokeWidth={2.6} />
      </button>

      <span className="mb-3.5 w-fit rounded-full border-[2.5px] border-ink bg-blue px-[15px] py-1.25 font-body text-[13px] font-bold text-surface">
        {t(`requests.${request.id}.category`)}
      </span>
      <h2 className="pe-11 font-display text-[28px]/[1.3] max-[520px]:text-2xl">
        {t(`requests.${request.id}.title`)}
      </h2>
      <p className="mt-2.5 line-clamp-2 font-body text-base/[1.85] font-medium text-soft">
        {t(`requests.${request.id}.description`)}
      </p>

      <div className="mt-auto flex flex-col gap-2.25 border-t-[2.5px] border-dashed border-ink/30 pt-4 font-body text-[14.5px] font-semibold text-soft">
        {mode === 'browse' ? (
          <span className="flex flex-wrap items-center gap-2">
            <span className="grid size-6.5 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper font-display text-xs/[1] text-ink">
              {provider.charAt(0)}
            </span>
            <strong className="font-extrabold text-ink">{provider}</strong>
            {request.badge && (
              <span className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-gold px-2.5 py-0.5 text-xs font-extrabold text-ink">
                <Image src={StarIcon} alt="" className="size-4" />
                {global(`badges.${request.badge}`)}
              </span>
            )}
          </span>
        ) : (
          <span>{t(`requests.${request.id}.ownerPublished`)}</span>
        )}
        {mode === 'browse' ? (
          <span>
            {t(`requests.${request.id}.published`)} ·{' '}
            <strong className="font-extrabold text-ink">
              {request.replies
                ? t('card.replySummary', { count: n(request.replies) })
                : t('card.noReplies')}
            </strong>
          </span>
        ) : (
          <span
            className={cn(
              'w-fit rounded-full border-[2.5px] border-ink px-3 py-0.75 text-[13.5px] font-extrabold text-ink',
              request.state === 'withdrawn' ? 'border-dashed bg-surface text-soft' : 'bg-gold',
            )}
          >
            {request.state === 'converted'
              ? t(`requests.${request.id}.converted`)
              : request.state === 'withdrawn'
                ? t(`requests.${request.id}.withdrawn`)
                : request.replies
                  ? t('card.replySummary', { count: n(request.replies) })
                  : t('card.noReplies')}
          </span>
        )}
        <span>
          {mode === 'mine' && request.state !== 'open'
            ? t(`requests.${request.id}.historyDetail`)
            : t(`requests.${request.id}.timeframe`)}
        </span>
      </div>

      <div className="mt-3.5 flex items-end border-t-[2.5px] border-dashed border-ink pt-3.75">
        <span className="me-auto font-display text-[36px]/[1] flex gap-2 items-center">
          <span>{n(request.value)}</span>
          <small className="text-base text-red">{global('currency')}</small>
          <span className="mt-1 block font-body text-[16px] font-bold text-soft">
            {t('card.tax', { percent: n(request.taxPercent) })}
          </span>
        </span>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2.25">
        {mode === 'browse' ? (
          <>
            <Link href={detailHref} className={buttonVariants({ size: 'sm' })}>
              {t('actions.iHave')}
            </Link>
            <Link
              href={detailHref}
              className={buttonVariants({ variant: 'outline', size: 'sm', effect: 'flat' })}
            >
              {t('actions.viewRequest')}
            </Link>
          </>
        ) : request.state === 'converted' ? (
          <>
            <Button
              size="sm"
              variant="outline"
              effect="flat"
              onClick={() => onMockAction?.('exchange')}
            >
              {t('actions.viewExchange')}
            </Button>
            <Button
              size="sm"
              variant="outline"
              effect="flat"
              onClick={() => onMockAction?.('agreement')}
            >
              {t('actions.viewAgreement')}
            </Button>
          </>
        ) : request.state === 'withdrawn' ? (
          <Link
            href="/alaesh-andak/request/create"
            className={buttonVariants({ variant: 'outline', size: 'sm', effect: 'flat' })}
          >
            {t('actions.republish')}
          </Link>
        ) : (
          <>
            {request.replies > 0 && (
              <Button size="sm" onClick={() => onMockAction?.('replies')}>
                {t('actions.viewReplies')}
              </Button>
            )}
            <Link
              href="/alaesh-andak/request/create"
              className={buttonVariants({ variant: 'outline', size: 'sm', effect: 'flat' })}
            >
              {t('actions.edit')}
            </Link>
            {request.replies === 0 && (
              <Button
                size="sm"
                variant="outline"
                effect="flat"
                onClick={() => onMockAction?.('increase')}
              >
                {t('actions.increaseValue')}
              </Button>
            )}
            <Button
              size="sm"
              variant="destructive"
              effect="flat"
              onClick={() => onMockAction?.('withdraw')}
            >
              {t('actions.withdraw')}
            </Button>
          </>
        )}
      </div>
    </article>
  )
}

export function AlaeshRequestDialog({
  request,
  mode,
  onOpenChange,
  onPrimaryAction,
  onSecondaryAction,
}: {
  request: AlaeshRequestCardData | null
  mode: CardMode
  onOpenChange: (open: boolean) => void
  onPrimaryAction: () => void
  onSecondaryAction?: () => void
}) {
  const t = useTranslations('alaesh')
  const global = useTranslations('global')
  const dialog = useTranslations('dialog')
  const locale = useLocale()
  const n = (value: number) => formatNumber(value, { locale })

  if (!request) return null

  const provider = getProviderName(global, request)
  const requirements = t.raw(`requests.${request.id}.requirements`) as string[]
  const responders = t.raw('dialog.respondersList') as string[]
  const valueFact = [t('dialog.value'), `${n(request.value)} ${global('currency')}`]
  const timeframeFact = [t('dialog.timeframe'), t(`requests.${request.id}.timeframeShort`)]
  const repliesFact = [
    t('dialog.replies'),
    mode === 'browse'
      ? t('dialog.repliesUntilNow', { count: n(request.replies) })
      : n(request.replies),
  ]
  const facts =
    mode === 'browse'
      ? [valueFact, timeframeFact, repliesFact]
      : [valueFact, repliesFact, timeframeFact]

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent closeLabel={dialog('close')} className="sm:w-[min(760px,94vw)]">
        <span className="mb-3 w-fit rounded-full border-[2.5px] border-ink bg-blue px-[15px] py-1.25 font-body text-[13px] font-bold text-surface">
          {t(`requests.${request.id}.category`)} · {t(`markets.${request.market}`)}
        </span>
        <DialogTitle>{t(`requests.${request.id}.title`)}</DialogTitle>
        <DialogDescription>
          {mode === 'mine'
            ? t('dialog.ownerBody', {
                count: n(request.replies),
                market: t(`markets.${request.market}Short`),
              })
            : t(`requests.${request.id}.dialogDescription`)}
        </DialogDescription>

        <div className="grid gap-3.5 min-[601px]:grid-cols-3">
          {facts.map(([label, value], index) => (
            <div
              key={label}
              className={cn(
                'rounded-card border-[2.5px] border-ink bg-paper p-4',
                index === 0 && 'bg-gold',
              )}
            >
              <span className="block font-body text-[13px] font-bold text-soft">{label}</span>
              <strong className="mt-1 block font-display text-[22px]/[1.3] font-normal">
                {value}
              </strong>
            </div>
          ))}
        </div>

        <section className="mt-6">
          <h3 className="font-display text-[22px] text-red">
            {mode === 'mine' ? t('dialog.responders') : t('dialog.requested')}
          </h3>
          <ul className="mt-2">
            {(mode === 'mine' ? responders.slice(0, request.replies) : requirements).map((item) => (
              <li
                key={item}
                className="relative mb-1.5 ps-5.5 font-body text-base/[1.95] font-medium text-soft before:absolute before:top-3 before:start-0.5 before:size-2.25 before:rounded-full before:border-2 before:border-ink before:bg-gold"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h3 className="font-display text-[22px] text-red">{t('dialog.provider')}</h3>
          <div className="mt-2 flex items-center gap-3 rounded-card border-[2.5px] border-ink bg-paper px-4.5 py-3.5">
            <span className="grid size-12 place-items-center rounded-field border-[2.5px] border-ink bg-gold font-display text-xl shadow-[2px_2px_0] shadow-ink">
              {provider.charAt(0)}
            </span>
            <strong className="flex-1 font-display text-[22px] font-normal">{provider}</strong>
            {request.badge && (
              <span className="inline-flex items-center gap-1 rounded-full border-[2.5px] border-ink bg-gold px-2.5 py-0.5 text-xs font-extrabold">
                <Image src={StarIcon} alt="" className="size-4" />
                {global(`badges.${request.badge}`)}
              </span>
            )}
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-3 border-t-[3px] border-dashed border-ink pt-5">
          {(mode === 'browse' || request.state === 'open') && (
            <Button onClick={onPrimaryAction}>
              {mode === 'mine' ? t('actions.chooseProvider') : t('actions.iHave')}
            </Button>
          )}
          {mode === 'browse' && (
            <Button variant="outline" effect="flat" onClick={onSecondaryAction}>
              {t('actions.askQuestion')}
            </Button>
          )}
          <DialogClose render={<Button variant="outline" effect="flat" />}>
            {t('actions.close')}
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
