'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import KeyIcon from '@/icons/key.svg'
import { Link } from '@/i18n/navigation'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState, type ReactNode } from 'react'
import {
  organizations as initialOrganizations,
  type ManagedOrganization,
  type OrganizationStatus,
} from '../data'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type Filter = 'all' | OrganizationStatus

const filterClass =
  'h-auto px-[19px] py-[9px] text-[14.5px] shadow-[3px_3px_0] shadow-ink hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0]'
const miniButtonClass = 'h-auto px-[15px] py-1.5 text-[13px] shadow-[2px_2px_0] shadow-ink'

export default function OrganizationsManagementPage() {
  const t = useTranslations('management.organizations')
  const locale = useLocale()
  const [organizations, setOrganizations] = useState(initialOrganizations)
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const localize = (value: { ar: string; en: string }) =>
    locale.startsWith('ar') ? value.ar : value.en
  const date = (value: string, includeYear = true) =>
    new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: includeYear ? 'numeric' : undefined,
    }).format(new Date(value))

  const needle = query.trim().toLocaleLowerCase(locale)
  const visible = organizations.filter(
    (item) =>
      (filter === 'all' || item.status === filter) &&
      (!needle ||
        localize(item.name).toLocaleLowerCase(locale).includes(needle) ||
        item.email.toLowerCase().includes(needle)),
  )

  const updateStatus = (id: string, status: OrganizationStatus) => {
    setOrganizations((items) =>
      items.map((item) => (item.id === id ? { ...item, status, date: '2026-11-03' } : item)),
    )
    toast.add({ title: t('mockFeedback') })
  }

  const filters = (['all', 'invited', 'active', 'suspended'] as const).map((value) => ({
    value,
    label: t(`filters.${value}`),
  }))
  const steps = t.raw('steps') as Array<{ title: string; description: string }>

  return (
    <div className="mx-auto -mt-0.5 max-w-[980px]">
      <header className="mb-[26px] flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1.14] text-ink max-[520px]:text-[40px]">
          {t('title')}
        </h1>
        <p className="pb-1.5 font-body text-[17px] font-medium text-soft">{t('description')}</p>
      </header>

      <section className="mb-[26px] rounded-panel border-[3px] border-ink bg-blue px-7 py-6 text-surface shadow-[6px_6px_0] shadow-ink">
        <h2 className="flex items-center gap-[13px] font-display text-[24px]/[1.3]">
          <span className="grid h-[34px] w-8 shrink-0 place-items-center overflow-hidden">
            <Image src={KeyIcon} alt="" className="max-h-full max-w-full" />
          </span>
          {t('flowTitle')}
        </h2>
        <p className="mt-2.5 font-body text-[15px]/[1.9] font-semibold">
          {t.rich('flowDescription', {
            strong: (chunks) => <strong className="font-extrabold">{chunks}</strong>,
          })}
        </p>
        <ol className="mt-[22px] grid grid-cols-4 gap-3.5 max-[860px]:grid-cols-2 max-[480px]:grid-cols-1">
          {steps.map((step, index) => {
            const active = index === 2
            return (
              <li
                key={step.title}
                className={cn(
                  'min-w-0 rounded-card border-[2.5px] px-4 py-[15px]',
                  active
                    ? 'border-ink bg-gold text-ink shadow-[4px_4px_0] shadow-ink'
                    : 'border-surface/40 bg-surface/10 opacity-60',
                )}
              >
                <span
                  className={cn(
                    'mb-2.5 grid size-[26px] place-items-center rounded-full font-display text-[14px]/[1]',
                    active ? 'bg-ink text-surface' : 'bg-surface text-ink',
                  )}
                >
                  {formatNumber(index + 1, { locale })}
                </span>
                <strong className="block font-display text-[17px]/[1.3] font-normal">
                  {step.title}
                </strong>
                <p className="mt-1.5 font-body text-[12.5px]/[1.7] font-semibold opacity-85">
                  {step.description}
                </p>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="mb-[22px] flex flex-wrap gap-3">
        <label className="flex min-w-[200px] flex-1">
          <span className="sr-only">{t('searchLabel')}</span>
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('searchPlaceholder')}
            className="rounded-full bg-surface px-[22px] py-3 text-[16px]"
          />
        </label>
        <Link href="/management/organizations/invite">
          <Button className="h-auto px-[26px] py-[11px] text-[16px]">{t('inviteCta')}</Button>
        </Link>
      </section>

      <ToggleGroup
        role="tablist"
        aria-label={t('searchLabel')}
        className="mb-[26px] flex flex-wrap gap-2.5"
        onValueChange={(value) => setFilter(value[0] as Filter)}
      >
        {filters.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            type="button"
            role="tab"
            variant="outline"
            aria-selected={filter === option.value}
            className={cn(
              filterClass,
              filter === option.value && 'bg-ink text-surface hover:bg-ink',
            )}
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div>
        {visible.map((item) => (
          <OrganizationRow
            key={item.id}
            item={item}
            locale={locale}
            localize={localize}
            date={date}
            onResend={() => toast.add({ title: t('mockFeedback') })}
            onWithdraw={() => {
              setOrganizations((items) => items.filter(({ id }) => id !== item.id))
              toast.add({ title: t('mockFeedback') })
            }}
            onToggle={() =>
              updateStatus(item.id, item.status === 'suspended' ? 'active' : 'suspended')
            }
          />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-12 text-center font-body font-bold text-soft">{t('empty')}</p>
      )}

      <aside className="mt-4 flex items-start gap-[13px] rounded-card border-[2.5px] border-dashed border-ink bg-paper px-[18px] py-[15px]">
        <span className="grid h-[30px] w-7 shrink-0 place-items-center overflow-hidden">
          <Image src={KeyIcon} alt="" className="max-h-full max-w-full" />
        </span>
        <p className="font-body text-[14.5px]/[1.85] font-semibold text-soft">
          {t.rich('note', {
            strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
          })}
        </p>
      </aside>
    </div>
  )
}

function OrganizationRow({
  item,
  locale,
  localize,
  date,
  onResend,
  onWithdraw,
  onToggle,
}: {
  item: ManagedOrganization
  locale: string
  localize: (value: { ar: string; en: string }) => string
  date: (value: string, includeYear?: boolean) => string
  onResend: () => void
  onWithdraw: () => void
  onToggle: () => void
}) {
  const t = useTranslations('management.organizations')
  const name = localize(item.name)
  const meta: ReactNode[] =
    item.status === 'invited'
      ? [t('invitationSent', { date: date(item.date, false) }), t('invitationExpires')]
      : item.status === 'active'
        ? [
            t('joined', { date: date(item.date) }),
            t('teamMembers', { count: formatNumber(item.members ?? 0, { locale }) }),
            item.hasOpenCase
              ? t('openCase')
              : t('hakimaTokens', { count: formatNumber(item.tokens ?? 0, { locale }) }),
          ]
        : [
            t('suspendedAt', { date: date(item.date, false) }),
            t('reason', { reason: t('reasons.arbitration') }),
          ]

  return (
    <article className="mb-4 rounded-panel border-[3px] border-ink bg-surface px-[22px] py-5 shadow-[5px_5px_0] shadow-ink transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-[3px] hover:shadow-[8px_9px_0]">
      <div className="flex flex-wrap items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-gold font-display text-[18px]/[1]">
          {name.charAt(0)}
        </span>
        <h2 className="min-w-[170px] flex-1 font-display text-[22px]/[1.3]">
          <Link
            href={`/organization/${item.id}`}
            className="inline border-b-[2.5px] border-red pb-px font-normal text-ink hover:text-red"
          >
            {name}
          </Link>
        </h2>
        <span
          className={cn(
            'shrink-0 rounded-full border-[2.5px] border-ink px-[13px] py-1 font-body text-[12.5px] font-extrabold whitespace-nowrap',
            item.status === 'invited'
              ? 'bg-gold'
              : item.status === 'active'
                ? 'bg-[#9cc49b]'
                : 'bg-tint',
          )}
        >
          {t(`status.${item.status}`)}
        </span>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-2.5 font-body text-[14px] font-semibold text-soft">
        {meta.map((part, index) => (
          <span key={index} className="contents">
            {index > 0 && <span className="block h-[22px] w-[3px] shrink-0 rounded-sm bg-ink/20" />}
            {typeof part === 'string' ? <span>{part}</span> : part}
          </span>
        ))}
      </div>

      <div className="mt-[15px] flex flex-wrap items-center gap-3 border-t-[2.5px] border-dashed border-ink/30 pt-3.5">
        <div className="ms-auto flex flex-wrap gap-2.5">
          {item.status === 'invited' && (
            <>
              <Button
                type="button"
                variant="outline"
                className={miniButtonClass}
                onClick={onResend}
              >
                {t('actions.resend')}
              </Button>
              <Button
                type="button"
                variant="outline"
                className={miniButtonClass}
                onClick={onWithdraw}
              >
                {t('actions.withdraw')}
              </Button>
            </>
          )}
          {item.status === 'active' && (
            <>
              <Link href={`/organization/${item.id}`}>
                <Button type="button" variant="outline" className={miniButtonClass}>
                  {t('actions.profile')}
                </Button>
              </Link>
              <Button
                type="button"
                variant="outline"
                className={miniButtonClass}
                onClick={onToggle}
              >
                {t('actions.suspend')}
              </Button>
            </>
          )}
          {item.status === 'suspended' && (
            <>
              <Link href="/etabat">
                <Button type="button" variant="outline" className={miniButtonClass}>
                  {t('actions.decision')}
                </Button>
              </Link>
              <Button type="button" className={miniButtonClass} onClick={onToggle}>
                {t('actions.activate')}
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
