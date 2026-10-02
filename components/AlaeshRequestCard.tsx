'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { Button } from './ui/button'
import { cn } from 'cn'

export type AlaeshReplyStatus = 'none' | 'replies' | 'converted' | 'withdrawn'
export type AlaeshMarket = 'namliya' | 'khalis'
export type AlaeshCardMode = 'browse' | 'mine' | 'history'

interface AlaeshRequestCardProps {
  id: string
  category: string
  categoryTone?: 'gold' | 'green'
  title: string
  note?: string
  meta: string
  orgInitial?: string
  replyStatus: AlaeshReplyStatus
  replyCount?: number
  market?: AlaeshMarket
  mode?: AlaeshCardMode
}

function ReplyPill({
  status,
  count,
  repliesLabel,
  oneReplyLabel,
  noneLabel,
  convertedLabel,
  withdrawnLabel,
}: {
  status: AlaeshReplyStatus
  count?: number
  repliesLabel: string
  oneReplyLabel: string
  noneLabel: string
  convertedLabel: string
  withdrawnLabel: string
}) {
  if (status === 'none') {
    return (
      <span className="inline-block font-bold text-[12.5px] rounded-full py-1.5 px-3.75 border border-line bg-paper text-ink-soft">
        {noneLabel}
      </span>
    )
  }
  if (status === 'converted') {
    return (
      <span className="inline-block font-bold text-[12.5px] rounded-full py-1.5 px-3.75 border border-transparent bg-green text-ink">
        {convertedLabel}
      </span>
    )
  }
  if (status === 'withdrawn') {
    return (
      <span className="inline-block font-bold text-[12.5px] rounded-full py-1.5 px-3.75 border border-[rgba(196,144,124,0.6)] bg-[rgba(196,144,124,0.22)] text-brick-deep">
        {withdrawnLabel}
      </span>
    )
  }
  const label = count === 1 ? oneReplyLabel : repliesLabel
  return (
    <span className="inline-block font-bold text-[12.5px] rounded-full py-1.5 px-3.75 border border-[rgba(217,184,122,0.42)] bg-[rgba(217,184,122,0.16)] text-gold-deep">
      {label}
    </span>
  )
}

export function AlaeshRequestCard({
  id,
  category,
  categoryTone = 'gold',
  title,
  note,
  meta,
  orgInitial,
  replyStatus,
  replyCount,
  mode = 'browse',
}: AlaeshRequestCardProps) {
  const t = useTranslations('alaesh.card')

  return (
    <div className="font-cairo py-4.5 px-5 mb-2.5 bg-surface border border-line rounded-2xl">
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className={cn(
            'font-bold text-[10.5px] rounded-full py-0.75 px-2.5',
            categoryTone === 'green'
              ? 'text-green-deep bg-[rgba(63,107,78,0.12)]'
              : 'text-gold-deep bg-[rgba(217,184,122,0.2)]',
          )}
        >
          {category}
        </span>
        <h3 className="font-extrabold text-[15px]/[1.65] flex-1 min-w-55">
          {mode === 'browse' ? (
            <Link
              href={`/alaesh-andak/request/${id}`}
              className="text-ink no-underline hover:text-green-deep"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <ReplyPill
          status={replyStatus}
          count={replyCount}
          repliesLabel={t('replies', { count: replyCount ?? 0 })}
          oneReplyLabel={t('oneReply')}
          noneLabel={t('noReplies')}
          convertedLabel={t('converted')}
          withdrawnLabel={t('withdrawn')}
        />
      </div>

      <div className="font-semibold text-xs text-ink-soft mt-1.5 flex items-center gap-2 flex-wrap tabular-nums">
        {orgInitial && (
          <span className="w-5.5 h-5.5 rounded-full bg-sage border border-line-soft grid place-items-center font-display font-bold text-[9.5px] text-green-deep shrink-0">
            {orgInitial}
          </span>
        )}
        {meta}
      </div>

      {mode === 'history' ? null : (
        <div className="flex items-center gap-2.5 flex-wrap mt-3 pt-3 border-t border-line-soft">
          {note && (
            <span className="font-semibold text-xs text-ink-soft flex-1 min-w-45">{note}</span>
          )}
          {mode === 'browse' && (
            <>
              <Link
                href={`/alaesh-andak/request/${id}`}
                className="inline-block no-underline border border-green-deep text-green-deep bg-transparent rounded-full font-cairo font-bold text-[12.5px] py-2 px-4.5 hover:bg-sage"
              >
                {t('details')}
              </Link>
              <Link
                href={`/alaesh-andak/request/${id}`}
                className="inline-block no-underline bg-green text-ink border-0 rounded-full font-cairo font-extrabold text-[13px] py-2.25 px-5 hover:bg-[#b9c9ac]"
              >
                {t('iHave')}
              </Link>
            </>
          )}
          {mode === 'mine' && replyStatus === 'replies' && (
            <>
              <Link
                href={`/alaesh-andak/request/${id}`}
                className="inline-block no-underline bg-green text-ink border-0 rounded-full font-cairo font-extrabold text-[13px] py-2.25 px-5 hover:bg-[#b9c9ac]"
              >
                {t('viewReply')}
              </Link>
              <Button
                variant="destructive"
                className="text-brick-deep text-xs font-bold border-0 bg-transparent hover:underline"
                type="button"
                onClick={() => console.log('Withdraw request', id)}
              >
                {t('withdraw')}
              </Button>
            </>
          )}
          {mode === 'mine' && replyStatus === 'none' && (
            <>
              <Link
                href={`/alaesh-andak/request/create`}
                className="inline-block no-underline border border-green-deep text-green-deep bg-transparent rounded-full font-cairo font-bold text-[12.5px] py-2 px-4.5 hover:bg-sage"
              >
                {t('edit')}
              </Link>
              <Button
                variant="destructive"
                className="text-brick-deep text-xs font-bold border-0 bg-transparent hover:underline"
                type="button"
                onClick={() => console.log('Withdraw request', id)}
              >
                {t('withdraw')}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
