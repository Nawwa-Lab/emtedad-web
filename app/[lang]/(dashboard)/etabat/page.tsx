'use client'

import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Link } from '@/i18n/navigation'
import EtabatIcon from '@/icons/hand.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { etabatCases } from './data'

type RoleFilter = 'all' | 'claimant' | 'respondent'
type StatusFilter = 'all' | 'open' | 'closed'

export default function EtabatHomePage() {
  const t = useTranslations('etabat.home')
  const global = useTranslations('global')
  const locale = useLocale()
  const [role, setRole] = useState<RoleFilter>('all')
  const [status, setStatus] = useState<StatusFilter>('all')

  const cases = etabatCases.filter(
    (item) =>
      (role === 'all' || item.role === role) &&
      (status === 'all' || item.open === (status === 'open')),
  )

  return (
    <div className="mx-auto max-w-245">
      <div className="mb-2 flex flex-row flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1] font-normal max-[520px]:text-[40px]">
          {t('title')}
        </h1>
        <p className="mb-2.5 font-body text-[17px] font-medium text-soft">{t('description')}</p>
      </div>
      <div className="mb-6 flex items-start gap-4 rounded-panel border-[3px] border-ink bg-blue px-6 py-5 text-surface shadow-[6px_6px_0] shadow-ink">
        <Image src={EtabatIcon} alt="" className="mt-0.5 size-8.5 shrink-0" />
        <p className="font-body text-[15.5px] font-semibold leading-[1.9]">
          {t.rich('privacyNote', {
            strong: (chunks) => (
              <strong className="font-display text-lg font-normal">{chunks}</strong>
            ),
            fahs: (chunks) => (
              <span className="border-b-[2.5px] border-gold font-extrabold text-gold">
                {chunks}
              </span>
            ),
          })}
        </p>
      </div>

      <div className="mb-3 flex flex-wrap gap-3">
        <Link
          href="/etabat/complaints/exchange/create"
          className="inline-flex items-center justify-center rounded-full border-[2.5px] border-ink bg-red px-6.5 py-2.75 font-body text-base font-extrabold text-surface shadow-[4px_4px_0] shadow-ink transition-transform hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0]"
        >
          {t('actions.exchangeComplaint')}
        </Link>
        <Link
          href="/etabat/complaints/general/create"
          className="inline-flex items-center justify-center rounded-full border-[2.5px] border-ink bg-surface px-5.5 py-2.5 font-body text-[15px] font-bold text-ink hover:bg-gold"
        >
          {t('actions.generalComplaint')}
        </Link>
      </div>

      <div className="mb-3 flex flex-wrap gap-2" aria-label={t('filters.roleLabel')}>
        <ToggleGroup
          value={[role]}
          onValueChange={(value) => value[0] && setRole(value[0] as RoleFilter)}
        >
          {(['all', 'claimant', 'respondent'] as const).map((value) => (
            <ToggleGroupItem key={value} value={value}>
              {t(`filters.roles.${value}`)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="mb-5 flex flex-wrap gap-2" aria-label={t('filters.statusLabel')}>
        <ToggleGroup
          value={[status]}
          onValueChange={(value) => value[0] && setStatus(value[0] as StatusFilter)}
        >
          {(['all', 'open', 'closed'] as const).map((value) => (
            <ToggleGroupItem key={value} value={value} size="sm">
              {t(`filters.status.${value}`)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="grid gap-5">
        {cases.map((item) => (
          <Link
            key={item.id}
            href={`/etabat/cases/${item.id}`}
            className="block rounded-panel border-[3px] border-ink bg-surface p-5 text-ink shadow-[6px_6px_0] shadow-ink transition-transform hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[9px_11px_0]"
          >
            <div className="mb-3 flex flex-wrap items-start gap-2">
              <h2 className="me-auto font-display text-[28px]/[1.3]">{item.title}</h2>
              <Badge color={item.role === 'claimant' ? 'gold' : 'tint'} effect="flat">
                {t(`roles.${item.role}`)}
              </Badge>
              <Badge className="font-display" color="paper" effect="flat">
                {t('caseNumber', { id: formatNumber(item.id, { locale }) })}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pb-4 font-body text-sm font-semibold text-soft">
              <span>
                {t('opponent')}{' '}
                <Link
                  href="#"
                  className={cn(
                    buttonVariants({ variant: 'link', effect: 'flat' }),
                    'bg-transparent text-ink hover:text-red decoration-red underline decoration-2 underline-offset-5',
                  )}
                >
                  {item.opponent}
                </Link>
              </span>{' '}
              |
              {item.amount ? (
                <span>
                  {t.rich('amount', {
                    value: formatNumber(item.amount, { locale }),
                    currencyValue: global('currency'),
                    currency: (chunks) => <span className="">{chunks}</span>,
                  })}
                </span>
              ) : (
                <span>{t('noAmount')}</span>
              )}
              |<span>{item.open ? t('filedDate', { date: item.date }) : item.date}</span>
              {item.deadline && (
                <Badge color="red" effect="flat">
                  {item.deadline}
                </Badge>
              )}
            </div>
            <div className="mt-4">
              <Badge color={item.open ? 'blue' : 'surface'} effect="flat" className="w-fit">
                {t(`states.${item.status}`)}
              </Badge>
              <div className="mt-3 flex items-start" aria-label={t('progressLabel')}>
                {(['filed', 'response', 'mediation', 'arbitration', 'closed'] as const).map(
                  (step, index) => {
                    const progress = progressFor(item.status)
                    const isReached = index <= progress
                    const isCurrent = index === progress

                    return (
                      <span
                        key={step}
                        className={cn(
                          'relative flex font-body min-w-0 flex-1 flex-col items-center gap-1.5 text-center text-xs font-bold leading-snug text-soft after:absolute after:top-1.75 after:inset-s-1/2 after:z-0 after:h-0.75 after:w-full after:bg-ink/20 last:after:hidden',
                          isReached && 'text-ink after:bg-ink',
                          isCurrent && ' after:bg-ink/20',
                        )}
                      >
                        <i
                          className={cn(
                            'z-10 size-4.25 rounded-full border-[2.5px] border-ink bg-surface',
                            isReached && 'bg-ink',
                            isCurrent && 'scale-125 bg-red',
                          )}
                        />
                        <span>{t(`steps.${step}`)}</span>
                      </span>
                    )
                  },
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!cases.length ? (
        <EmptyState
          icon={EtabatIcon}
          title={t('empty')}
          description={t('emptyDescription')}
          className="mt-6"
          action={
            <Button
              type="button"
              onClick={() => {
                setRole('all')
                setStatus('all')
              }}
            >
              {t('emptyAction')}
            </Button>
          }
        />
      ) : null}
    </div>
  )
}

function progressFor(status: (typeof etabatCases)[number]['status']) {
  return { mediation: 2, arbitration: 3, decision: 3, closed: 4 }[status]
}
