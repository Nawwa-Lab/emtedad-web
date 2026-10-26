'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Link } from '@/i18n/navigation'
import StarIcon from '@/icons/star.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

export type WishFamily = 'genny' | 'shbeik'

export type WishSupporter = {
  key: string
  type: 'organization' | 'member'
  badge?: 'amer' | 'kareem'
}

export interface WishCardData {
  id: string
  copyKey: string
  categoryKey: string
  count: number
  isEndorsed: boolean
  createdRank: number
  authorKey?: string
  supporters: WishSupporter[]
}

export type WishSuggestion = Omit<WishCardData, 'createdRank' | 'supporters'>

export function WishCard({
  wish,
  family,
  mode = 'browse',
}: {
  wish: WishCardData
  family: WishFamily
  mode?: 'browse' | 'mine'
}) {
  const locale = useLocale()
  const t = useTranslations(`${family}.browse`)
  const data = useTranslations(`${family}.data`)
  const [isEndorsed, setIsEndorsed] = useState(wish.isEndorsed)
  const [count, setCount] = useState(wish.count)
  const [removed, setRemoved] = useState(false)
  const route = family === 'genny' ? 'genny' : 'shbeik-lbeik'

  if (removed) return null

  const toggleEndorsement = () => {
    setCount((current) => current + (isEndorsed ? -1 : 1))
    setIsEndorsed((current) => !current)
  }

  return (
    <article className="flex flex-col rounded-panel border-[3px] border-ink bg-surface px-6.5 py-6 shadow-[6px_6px_0] shadow-ink">
      <span className="mb-3 w-fit font-body text-lg">{data(`categories.${wish.categoryKey}`)}</span>
      <h2 className="font-display text-[27px]/[1.3]">{data(`wishes.${wish.copyKey}.title`)}</h2>
      <p className="mt-2.5 font-body text-base/[1.9] font-medium text-soft">
        {data(`wishes.${wish.copyKey}.description`)}
      </p>

      {family === 'genny' ? (
        <div className="mt-3.5 rounded-card border-[2.5px] border-ink bg-paper px-4 py-3.5">
          <b className="mb-1 block font-display text-base">{t('whyTitle')}</b>
          <p className="font-body text-[15px]/[1.85] font-medium text-soft">
            {data(`wishes.${wish.copyKey}.why`)}
          </p>
        </div>
      ) : (
        <p className="mt-3 flex items-center gap-2 font-body text-[13.5px] font-semibold text-soft">
          <span className="grid size-7 place-items-center rounded-full border-2 border-ink bg-gold font-extrabold text-ink">
            {data(`authors.${wish.authorKey}.initial`)}
          </span>
          <Link
            href={`/member/${wish.authorKey}`}
            className="font-extrabold text-ink hover:underline"
          >
            {data(`authors.${wish.authorKey}.name`)}
          </Link>
          · {data(`wishes.${wish.copyKey}.createdAt`)}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-3 border-t-[2.5px] border-dashed border-ink/30 pt-4">
        <SupportersDialog family={family} wish={wish} count={count} mode={mode}>
          <button
            type="button"
            disabled={count === 0}
            className="inline-flex items-center gap-2.5 rounded-full border-[2.5px] border-ink bg-gold py-2 pe-2.5 ps-4.5 font-body text-[15px] font-extrabold shadow-[3px_3px_0] shadow-ink transition hover:translate-[1px_1px] hover:shadow-[1px_1px_0] disabled:cursor-default disabled:border-dashed disabled:bg-surface disabled:text-soft disabled:shadow-none"
          >
            <b
              className={cn(
                'grid h-8 min-w-8 place-items-center rounded-full px-2 font-display text-lg font-normal text-surface',
                count ? 'bg-ink' : 'bg-soft',
              )}
            >
              {formatNumber(count, { locale })}
            </b>
            {count ? t('supportCount') : t('zeroEndorsements')}
          </button>
        </SupportersDialog>

        {mode === 'browse' ? (
          <>
            <Button
              type="button"
              variant="outline"
              aria-pressed={isEndorsed}
              className={cn(
                'ms-auto h-auto px-5.5 py-2.25 text-[15px] shadow-[3px_3px_0]',
                isEndorsed && 'bg-red text-surface hover:bg-red',
              )}
              onClick={toggleEndorsement}
            >
              {isEndorsed ? t('removeEndorsement') : t('endorse')}
            </Button>
            {family === 'genny' && (
              <span className="mt-2.5 w-full font-body text-[13.5px] font-semibold text-soft">
                {data(`wishes.${wish.copyKey}.createdAt`)}
              </span>
            )}
          </>
        ) : (
          <>
            <span className="ms-auto font-body text-[13.5px] font-semibold text-soft">
              {data(`wishes.${wish.copyKey}.createdAt`)}
            </span>
            <div className="mt-3.5 flex w-full flex-wrap items-center gap-2.5">
              {count > 0 ? (
                <>
                  <Button type="button" variant="outline" size="sm" effect="flat" disabled>
                    {t('edit')}
                  </Button>
                  <Button type="button" variant="destructive" size="sm" effect="flat" disabled>
                    {t('delete')}
                  </Button>
                  <p className="mt-2 w-full font-body text-[13.5px]/[1.8] font-semibold text-soft">
                    {t.rich('lockedNote', { strong: (chunks) => <b>{chunks}</b> })}
                  </p>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    effect="flat"
                    onClick={() => setRemoved(true)}
                  >
                    {t('withdraw')}
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href={`/${route}/wish/${wish.id}`}
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'sm', effect: 'flat' }),
                    )}
                  >
                    {t('edit')}
                  </Link>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    effect="flat"
                    onClick={() => setRemoved(true)}
                  >
                    {t('delete')}
                  </Button>
                  <p className="mt-2 w-full font-body text-[13.5px]/[1.8] font-semibold text-soft">
                    {t('editableNote')}
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </article>
  )
}

function SupportersDialog({
  family,
  wish,
  count,
  mode,
  children,
}: {
  family: WishFamily
  wish: WishCardData
  count: number
  mode: 'browse' | 'mine'
  children: React.ReactElement
}) {
  const t = useTranslations(`${family}.browse`)
  const global = useTranslations('global')

  if (!count) return children

  return (
    <Dialog>
      <DialogTrigger render={children} />
      <DialogContent
        closeLabel={t('close')}
        overlayClassName="bg-ink/55"
        className="top-10 w-[min(520px,calc(100vw-40px))] -translate-y-0 px-7! py-7.5! sm:w-[min(520px,calc(100vw-40px))]!"
      >
        <DialogTitle className="text-[26px]/[1.3]">{t('supportersTitle')}</DialogTitle>
        <DialogDescription className="mt-2 mb-0 text-[15px]/[1.9]">
          {t(mode === 'mine' ? 'supportersDescriptionMine' : 'supportersDescription')}
        </DialogDescription>
        <div className="mt-4">
          {wish.supporters.map((supporter) => {
            const name = global(
              supporter.type === 'organization'
                ? `organizations.${supporter.key}`
                : `people.${supporter.key}`,
            )
            return (
              <div
                key={supporter.key}
                className="flex items-center gap-3 border-b-[2.5px] border-dashed border-ink/25 py-3.25 last:border-b-0"
              >
                <span className="grid size-10.5 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-gold font-display text-[19px] shadow-[2px_2px_0] shadow-ink">
                  {name.charAt(0)}
                </span>
                <p className="min-w-0 flex-1">
                  <Link
                    href={`/${supporter.type === 'organization' ? 'organization' : 'member'}/${supporter.key}`}
                    className="block font-display text-[19px]/[1.25] hover:underline"
                  >
                    {name}
                  </Link>
                  <small className="block text-xs font-semibold text-soft">
                    {t(supporter.type === 'organization' ? 'organizationRole' : 'memberRole')}
                  </small>
                </p>
                {supporter.badge && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-gold py-0.75 pe-2 ps-3.25 font-display text-[15px]">
                    <Image src={StarIcon} alt="" className="size-4.75" />
                    {global(`badges.${supporter.badge}`)}
                  </span>
                )}
              </div>
            )
          })}
        </div>
        <div className="mt-4.5 flex border-t-[3px] border-dashed border-ink pt-4">
          <DialogClose render={<Button variant="outline" effect="flat" />}>
            {t('closeAction')}
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
