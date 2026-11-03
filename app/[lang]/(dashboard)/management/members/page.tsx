'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Link } from '@/i18n/navigation'
import KeyIcon from '@/icons/key.svg'
import LanternIcon from '@/icons/lantern.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState, type ReactNode } from 'react'
import { members as initialMembers, type ManagedMember, type MemberStatus } from '../data'

type Filter = 'all' | MemberStatus

const filterClass =
  'h-auto px-[19px] py-[9px] text-[14.5px] shadow-[3px_3px_0] shadow-ink hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0]'
const miniButtonClass = 'h-auto px-[15px] py-1.5 text-[13px] shadow-[2px_2px_0] shadow-ink'

export default function MembersManagementPage() {
  const t = useTranslations('management.members')
  const locale = useLocale()
  const [members, setMembers] = useState(initialMembers)
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
  const visible = members.filter(
    (item) =>
      (filter === 'all' || item.status === filter) &&
      (!needle ||
        localize(item.name).toLocaleLowerCase(locale).includes(needle) ||
        item.username.toLowerCase().includes(needle)),
  )

  const toggleStatus = (id: string) => {
    setMembers((items) =>
      items.map((item) =>
        item.id !== id
          ? item
          : item.status === 'suspended'
            ? { ...item, status: item.previousStatus ?? 'community', previousStatus: undefined }
            : { ...item, previousStatus: item.status, status: 'suspended', date: '2026-11-03' },
      ),
    )
    toast.add({ title: t('mockFeedback') })
  }

  const filters = (['all', 'team', 'community', 'suspended'] as const).map((value) => ({
    value,
    label: t(`filters.${value}`),
  }))

  return (
    <div className="mx-auto -mt-0.5 max-w-[980px]">
      <header className="mb-[26px] flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1.14] text-ink max-[520px]:text-[40px]">
          {t('title')}
        </h1>
        <p className="pb-1.5 font-body text-[17px] font-medium text-soft">{t('description')}</p>
      </header>

      <section className="mb-[22px] flex flex-wrap gap-3">
        <label className="relative flex min-w-[220px] flex-1 items-center">
          <span className="sr-only">{t('searchLabel')}</span>
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('searchPlaceholder')}
            className="rounded-full bg-surface px-[22px] py-3 text-[16px]"
          />
        </label>
        <p className="w-full font-body text-[13px]/[1.7] font-semibold text-soft">
          {t('searchHint')}
        </p>
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
          <MemberRow
            key={item.id}
            item={item}
            locale={locale}
            localize={localize}
            date={date}
            onToggle={() => toggleStatus(item.id)}
          />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-12 text-center font-body font-bold text-soft">{t('empty')}</p>
      )}

      <ManagementNote icon={KeyIcon}>
        {t.rich('note', {
          strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
          organizations: (chunks) => (
            <Link
              href="/management/organizations"
              className="inline border-b-[2.5px] border-red pb-px font-extrabold text-ink hover:text-red"
            >
              {chunks}
            </Link>
          ),
        })}
      </ManagementNote>
      <ManagementNote icon={LanternIcon}>
        {t.rich('supportNote', {
          strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
          office: (chunks) => (
            <Link
              href="/office/team"
              className="inline border-b-[2.5px] border-red pb-px font-extrabold text-ink hover:text-red"
            >
              {chunks}
            </Link>
          ),
        })}
      </ManagementNote>
    </div>
  )
}

function MemberRow({
  item,
  locale,
  localize,
  date,
  onToggle,
}: {
  item: ManagedMember
  locale: string
  localize: (value: { ar: string; en: string }) => string
  date: (value: string, includeYear?: boolean) => string
  onToggle: () => void
}) {
  const t = useTranslations('management.members')
  const name = localize(item.name)
  const meta: ReactNode[] =
    item.status === 'team'
      ? [
          <span key="team">
            {t('teamPrefix')}{' '}
            <Link
              href={`/organization/${item.organizationId}`}
              className="inline border-b-[2.5px] border-red pb-px font-extrabold text-ink hover:text-red"
            >
              {localize(item.organization!)}
            </Link>
          </span>,
          t(`joined${item.gender === 'female' ? 'Female' : 'Male'}`, { date: date(item.date) }),
          t('balance', { balance: formatNumber(item.balance, { locale }) }),
        ]
      : item.status === 'community'
        ? [
            t(`community${item.gender === 'female' ? 'Female' : 'Male'}`),
            t(`joined${item.gender === 'female' ? 'Female' : 'Male'}`, { date: date(item.date) }),
            t('balance', { balance: formatNumber(item.balance, { locale }) }),
          ]
        : [
            t('suspendedPrevious', {
              previous: t(
                item.previousStatus === 'team'
                  ? 'status.team'
                  : item.gender === 'female'
                    ? 'communityFemale'
                    : 'communityMale',
              ),
            }),
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
            href={`/member/${item.id}`}
            className="inline border-b-[2.5px] border-red pb-px font-normal text-ink hover:text-red"
          >
            {name}
          </Link>
        </h2>
        <span
          className="inline-flex items-center rounded-full border-[2.5px] border-ink bg-paper px-[13px] py-[3px] font-body text-[13.5px] font-bold text-soft"
          dir="ltr"
        >
          @{item.username}
        </span>
        <span
          className={cn(
            'shrink-0 rounded-full border-[2.5px] border-ink px-[13px] py-1 font-body text-[12.5px] font-extrabold whitespace-nowrap',
            item.status === 'team'
              ? 'bg-blue text-surface'
              : item.status === 'suspended'
                ? 'bg-tint'
                : 'bg-paper',
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
          <Link href={item.status === 'suspended' ? '/etabat' : `/member/${item.id}`}>
            <Button type="button" variant="outline" className={miniButtonClass}>
              {t(`actions.${item.status === 'suspended' ? 'decision' : 'profile'}`)}
            </Button>
          </Link>
          <Button
            type="button"
            variant={item.status === 'suspended' ? 'primary' : 'outline'}
            className={miniButtonClass}
            onClick={onToggle}
          >
            {t(`actions.${item.status === 'suspended' ? 'activate' : 'suspend'}`)}
          </Button>
        </div>
      </div>
    </article>
  )
}

function ManagementNote({ icon, children }: { icon: typeof KeyIcon; children: ReactNode }) {
  return (
    <aside className="mt-4 flex items-start gap-[13px] rounded-card border-[2.5px] border-dashed border-ink bg-paper px-[18px] py-[15px]">
      <span className="grid h-[30px] w-7 shrink-0 place-items-center overflow-hidden">
        <Image src={icon} alt="" className="max-h-full max-w-full" />
      </span>
      <p className="font-body text-[14.5px]/[1.85] font-semibold text-soft">{children}</p>
    </aside>
  )
}
