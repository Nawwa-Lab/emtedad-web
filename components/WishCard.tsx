'use client'

import { cn } from '@/lib/utils'
import { formatNumber } from '@/utils'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Link } from '@/i18n/navigation'

interface WishCardProps {
  id: string
  count: number
  category: string
  title: string
  description: string
  endorsers: string[]
  endorsersText: string
  isEndorsed: boolean
  mode?: 'browse' | 'mine'
  ns?: 'genny' | 'shbeik'
}

export function WishCard({
  id,
  count,
  category,
  title,
  description,
  endorsers,
  endorsersText,
  isEndorsed,
  mode = 'browse',
  ns = 'genny',
}: WishCardProps) {
  const locale = useLocale()
  const t = useTranslations(`${ns}.browse.wishCard`)
  const [isEndorsedState, setIsEndorsedState] = useState(isEndorsed)
  const [countState, SetCountState] = useState(count)

  return (
    <div className="font-cairo py-5 px-5.5 mb-3 flex items-start gap-5 flex-wrap bg-surface border border-line rounded-2xl">
      <div className="font-cairo shrink-0 w-21.5 text-center bg-paper border border-line-soft rounded-2xl py-3.5 px-2">
        <b className="block font-extrabold text-2xl">{formatNumber(countState, { locale })}</b>
        <span className="block text-[10px]/[1.6] font-bold text-ink-soft mt-0.5">
          {countState === 0 ? t('zeroEndorsements') : t('endorsingOrgs')}
        </span>
      </div>
      <div className="flex-1 min-w-65">
        <span className="inline-block font-cairo font-bold text-xs py-0.75 px-2.5 text-green-deep bg-[rgba(63,107,78,0.12)] rounded-full">
          {category}
        </span>
        <h3 className="font-extrabold text-base/[1.6] ">{title}</h3>
        <p className="font-semibold text-xs/[1.9] text-ink-soft mt-1.5">{description}</p>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <div className="flex">
            {endorsers.map((initial, index) => (
              <Avatar
                size="sm"
                key={index}
                className="text-green-deep border-2 border-surface bg-sage w-16 h-16 sm:w-23 sm:h-23 -ms-1.75 shrink-0"
              >
                <AvatarImage src="https://github.com/shadcn.pngg" />
                <AvatarFallback className="font-bold text-[24px] sm:text-[34px]">
                  {initial.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className="font-semibold text-xs text-ink-soft">{endorsersText}</p>
        </div>
      </div>
      {mode === 'browse' ? (
        <div className="shrink-0 flex flex-col items-end gap-2 ">
          <Button
            className={cn(
              'bg-green text-ink inline-flex items-center gap-1.5 rounded-full font-extrabold text-xs',
              isEndorsedState && 'cursor-default',
            )}
            onClick={() => {
              if (isEndorsedState) return
              setIsEndorsedState(true)
              SetCountState((prevCount) => prevCount + 1)
            }}
          >
            {isEndorsedState ? t('endorsed') : t('endorse')}
          </Button>
          {isEndorsedState && (
            <Button
              variant="destructive"
              className="text-brick-deep text-xs font-bold border-0 bg-none"
              type="button"
              onClick={() => {
                setIsEndorsedState(false)
                SetCountState((prevCount) => prevCount - 1)
              }}
            >
              {t('unendorse')}
            </Button>
          )}
        </div>
      ) : (
        <div className="w-full flex items-center gap-2.5 flex-wrap mt-3 pt-3 border-t border-line-soft">
          <span className="flex-1 min-w-45 font-semibold text-xs text-ink-soft">
            {isEndorsedState ? t('fixedNote') : t('editableNote')}
          </span>
          {!isEndorsedState && (
            <>
              <Link
                href={`/genny/add-wish/${id}`}
                className="inline-block border border-green-deep text-green-deep bg-transparent rounded-full font-cairo font-bold text-xs py-2 px-4.5"
              >
                {t('edit')}
              </Link>
              <Button
                variant="destructive"
                className="text-brick-deep text-xs font-bold border-0 bg-none"
                type="button"
                onClick={() => {
                  console.log('Withdraw Wish ', id)
                }}
              >
                {t('withdraw')}
              </Button>
              <Button
                variant="destructive"
                className="text-brick-deep text-xs font-bold border-0 bg-none"
                type="button"
                onClick={() => {
                  console.log('Remove Wish ', id)
                }}
              >
                {t('delete')}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
