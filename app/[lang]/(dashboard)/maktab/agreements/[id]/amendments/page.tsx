'use client'

import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import HandIcon from '@/icons/hand.svg'
import Star2Icon from '@/icons/star-2.svg'
import { cn } from 'cn'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { use, useEffect, useState } from 'react'
import { amendments, agreement } from '../data'
import { DiffBox } from '../diff-box'

type SettleState = 'accepted' | 'rejected'

const primaryButtonClass =
  'h-auto px-[26px] py-[11px] text-[16px] max-[520px]:px-5 max-[520px]:py-2.5 max-[520px]:text-[15px]'
const okButtonClass =
  'h-auto bg-gold px-[22px] py-[9px] text-[15px] font-extrabold shadow-ink shadow-[3px_3px_0] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0]'
const noButtonClass =
  'h-auto border-red bg-surface px-5 py-[9px] text-[15px] text-red hover:border-ink hover:bg-red hover:text-surface'
const ghostClass = 'h-auto px-[22px] py-2.5 text-[15px]'

export default function AmendmentsPage({
  params,
}: PageProps<'/[lang]/maktab/agreements/[id]/amendments'>) {
  const { id } = use(params)
  const t = useTranslations('agreements')
  const tm = useTranslations('messages')
  const tg = useTranslations('global')
  const [settled, setSettled] = useState<Record<string, SettleState>>({})
  const [done, setDone] = useState(false)

  const org = (key: string) => tg(`organizations.${key}`)
  const conversationHref = `/maktab/messages/${agreement.conversationId}`
  const allSettled = amendments.every((amendment) => settled[amendment.id])

  const settle = (amendmentId: string, state: SettleState) => {
    setSettled((prev) => (prev[amendmentId] ? prev : { ...prev, [amendmentId]: state }))
  }

  const settleAll = (state: SettleState) => {
    setSettled(Object.fromEntries(amendments.map((amendment) => [amendment.id, state] as const)))
  }

  // Design behavior: once every amendment is settled, swap to the empty state
  // after 700ms and scroll back to the top.
  useEffect(() => {
    if (!allSettled) return
    const timer = window.setTimeout(() => setDone(true), 700)
    return () => window.clearTimeout(timer)
  }, [allSettled])

  useEffect(() => {
    if (done) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [done])

  return (
    <div>
      <Link
        href={conversationHref}
        className="mb-4 inline-flex items-center gap-2.5 text-[15.5px] font-bold text-ink no-underline hover:text-red"
      >
        <span className="grid size-[38px] shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-surface p-[9px] text-ink shadow-[3px_3px_0]">
          <ChevronLeft className="h-full w-full rtl:rotate-180" strokeWidth={3.2} />
        </span>
        {t('backToConversation')}
      </Link>

      <Card className="mb-5 p-[24px] px-[26px] shadow-[6px_6px_0]">
        <div className="flex flex-wrap items-center gap-3.5">
          <h1 className="min-w-[250px] flex-1 font-display text-[clamp(28px,3.6vw,38px)] leading-[1.25]">
            {t('amendments.title')}
          </h1>
          <Badge color="red" effect="flat" className="shrink-0 font-extrabold">
            {t('amendments.tags.waiting')}
          </Badge>
        </div>
        <p className="mt-2 text-[15.5px]/[1.8] font-semibold text-soft">
          {t('rel.prefix')}{' '}
          <Link
            href={conversationHref}
            className="border-b-[2.5px] border-blue font-bold text-blue no-underline"
          >
            {tm('conversationTitle')}
          </Link>
          {' · '}
          {org('halaqa')} {t('rel.arrow')} {org('mishkaa')}
        </p>
        <div className="mt-[18px] flex flex-wrap items-center gap-3 border-t-[2.5px] border-dashed border-ink/26 pt-[18px] text-[15.5px] font-bold">
          <span className="grid size-10 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-red font-display text-[18px] text-surface">
            {org(agreement.proposer.org).charAt(0)}
          </span>
          <Link href={agreement.proposer.profileHref} className="text-inherit no-underline">
            {org(agreement.proposer.org)}
          </Link>
          {t('amendments.who.text')}
          <span className="ms-auto text-[14px] font-semibold text-soft">
            {t('amendments.who.when')}
          </span>
        </div>
      </Card>

      {!done && (
        <div>
          <Card
            effect="flat"
            className="mb-[22px] flex items-start gap-3.5 rounded-card bg-gold p-4 px-5"
          >
            <span className="block h-[38px] w-[34px] shrink-0">
              <Image src={Star2Icon} alt="" className="h-auto w-full" />
            </span>
            <p className="text-[15.5px]/[1.85] font-semibold">
              <b className="block font-display text-[17px]">{t('amendments.reason.title')}</b>
              {t('amendments.reason.body')}
            </p>
          </Card>

          <Card className="mb-5 px-7 py-[26px] shadow-[6px_6px_0]">
            {amendments.map((amendment, index) => {
              const state = settled[amendment.id]

              return (
                <div
                  key={amendment.id}
                  className={cn(
                    'border-b-[2.5px] border-dashed border-ink/26 py-5',
                    state && 'opacity-[0.55]',
                  )}
                >
                  <div className="mb-3 flex items-center gap-[11px] font-display text-[21px]/[1.3]">
                    <span className="grid size-[30px] shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-red text-[15px] text-surface">
                      {index + 1}
                    </span>
                    {tm(`agreement.rows.${amendment.row}`)}
                  </div>
                  <div className="grid grid-cols-2 gap-3.5 max-[700px]:grid-cols-1">
                    <DiffBox
                      tone="paper"
                      state="old"
                      label={t('diff.current')}
                      text={tm(`agreement.values.${amendment.oldValue}`)}
                    />
                    <DiffBox
                      tone="paper"
                      state="new"
                      label={t('diff.proposed')}
                      text={t(`diff.${amendment.newValue}`)}
                    />
                  </div>
                  <div className="mt-3.5 flex flex-wrap items-center gap-[11px]">
                    <span
                      className={cn(
                        'min-w-[150px] flex-1 text-[14.5px] font-bold text-soft',
                        state && 'font-display text-[18px] text-ink',
                      )}
                    >
                      {state ? t(`amendments.status.${state}`) : t('amendments.status.waiting')}
                    </span>
                    {!state && (
                      <>
                        <Button
                          variant="outline"
                          effect="flat"
                          className={okButtonClass}
                          onClick={() => settle(amendment.id, 'accepted')}
                        >
                          {t('amendments.actions.accept')}
                        </Button>
                        <Button
                          variant="outline"
                          effect="flat"
                          className={noButtonClass}
                          onClick={() => settle(amendment.id, 'rejected')}
                        >
                          {t('amendments.actions.reject')}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )
            })}

            <div className="mt-[22px] flex flex-wrap gap-3 border-t-[3px] border-dashed border-ink pt-5">
              <Button
                variant="outline"
                effect="flat"
                className={okButtonClass}
                onClick={() => settleAll('accepted')}
              >
                {t('amendments.actions.acceptAll')}
              </Button>
              <Button
                variant="outline"
                effect="flat"
                className={noButtonClass}
                onClick={() => settleAll('rejected')}
              >
                {t('amendments.actions.rejectAll')}
              </Button>
              <Link
                href={`/maktab/agreements/${id}`}
                className={cn(
                  buttonVariants({ variant: 'outline', shape: 'round', effect: 'flat' }),
                  ghostClass,
                )}
              >
                {t('amendments.actions.viewAgreement')}
              </Link>
            </div>
          </Card>
        </div>
      )}

      {done && (
        <Card effect="flat" className="border-dashed px-6 py-10 text-center">
          <span className="mx-auto mb-3.5 block w-[70px]">
            <Image src={HandIcon} alt="" className="h-auto w-full" />
          </span>
          <h3 className="font-display text-[26px]">{t('amendments.empty.title')}</h3>
          <p className="mt-2 text-[16px]/[1.9] font-medium text-soft">
            {t('amendments.empty.text')}
          </p>
          <p className="mt-4">
            <Link
              href={`/maktab/agreements/${id}`}
              className={cn(
                buttonVariants({ variant: 'primary', shape: 'round', effect: '3d' }),
                primaryButtonClass,
              )}
            >
              {t('amendments.empty.button')}
            </Link>
          </p>
        </Card>
      )}
    </div>
  )
}
