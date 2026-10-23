'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Link, usePathname } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import DNAIcon from '@/icons/dna.svg'
import KeyIcon from '@/icons/key.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { withCurrency, type Assignment } from './data'
import { useInvitations } from './invitations/data'

const links = [
  ['/fahs-mahs/invitations', 'invitations'],
  ['/fahs-mahs/my-mediations', 'myMediations'],
  ['/fahs-mahs/closed-mediations', 'closedMediations'],
  ['/fahs-mahs/my-arbitrations', 'myArbitrations'],
  ['/fahs-mahs/appeals', 'appeals'],
  ['/fahs-mahs/participation-log', 'log'],
] as const

export function FahsHeader({
  title,
  subtitle,
  back = false,
}: {
  title: string
  subtitle: string
  back?: boolean
}) {
  const t = useTranslations('fahsMahs')
  return (
    <header className="mb-[26px]">
      {back && (
        <Link
          href="/fahs-mahs"
          className="mb-4 inline-flex items-center gap-2 font-body text-[15px] font-bold text-ink hover:text-red"
        >
          <Button
            className={cn(
              buttonVariants({ variant: 'outline', size: 'icon', shape: 'round' }),
              'grid bg-surface',
            )}
          >
            <span className=" rtl:rotate-180">›</span>
          </Button>
          {t('back')}
        </Link>
      )}
      <div className="flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1.14] text-ink max-[520px]:text-[40px]">
          {title}
        </h1>
        <p className="pb-[6px] font-body text-[17px] font-medium text-soft">{subtitle}</p>
      </div>
    </header>
  )
}

export function FahsNav() {
  const t = useTranslations('fahsMahs.nav')
  const locale = useLocale()
  const pathname = usePathname()
  const { remaining } = useInvitations()
  return (
    <nav aria-label={t('label')} className="mb-[26px] flex flex-wrap gap-2.5">
      {links.map(([href, key]) => (
        <Link
          key={href}
          href={href}
          aria-current={pathname === href ? 'page' : undefined}
          className={cn(
            'inline-flex items-center gap-[9px] rounded-full border-[2.5px] border-ink px-[19px] py-[9px] font-body text-[14.5px] font-extrabold shadow-[3px_3px_0] shadow-ink transition-[transform,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0]',
            pathname === href ? 'bg-ink text-surface' : 'bg-surface text-ink hover:bg-gold',
          )}
        >
          {t(key)}
          {key === 'invitations' && remaining.length > 0 && (
            <span className="grid h-[23px] min-w-[23px] place-items-center rounded-full bg-red px-1.5 font-display text-[13px]/[1] text-surface">
              {formatNumber(remaining.length, { locale })}
            </span>
          )}
        </Link>
      ))}
    </nav>
  )
}

export function FahsSection({
  title,
  icon,
  children,
  className,
}: {
  title: string
  icon?: typeof DNAIcon
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'mb-5 rounded-panel border-[3px] border-ink bg-surface px-6 py-6 shadow-[6px_6px_0] shadow-ink max-sm:px-4',
        className,
      )}
    >
      <h2 className="mb-3 flex items-center gap-3 font-display text-[27px]/[1.25] text-ink">
        {icon && <Image src={icon} alt="" className="size-10 shrink-0" />}
        {title}
      </h2>
      {children}
    </section>
  )
}

export function FahsNote({
  children,
  warning = false,
  blue = false,
  icon = KeyIcon,
}: {
  children: ReactNode
  warning?: boolean
  blue?: boolean
  icon?: typeof KeyIcon
}) {
  return (
    <div
      className={cn(
        'mb-6 flex gap-3 rounded-card border-[2.5px] border-dashed border-ink bg-paper px-5 py-4 font-body text-[15px]/[1.85] font-semibold',
        warning && 'border-red bg-tint',
        blue && 'border-ink bg-blue text-surface',
      )}
    >
      <Image src={icon} alt="" className="size-7 shrink-0" />
      <p>{children}</p>
    </div>
  )
}

export function AssignmentCard({ item, action }: { item: Assignment; action?: string }) {
  const t = useTranslations('fahsMahs')
  const global = useTranslations('global')
  const locale = useLocale()
  const titles = t.raw('cases') as Record<string, string>
  const notes = t.raw('notes') as Record<string, string>
  const status = t.raw('status') as Record<string, string>
  const roles = t.raw('meta') as Record<string, string>
  const href =
    item.kind === 'mediation'
      ? `/fahs-mahs/mediations/${item.id}`
      : `/fahs-mahs/arbitrations/${item.id}`
  const icon = item.kind === 'mediation' ? DNAIcon : BalanceIcon
  return (
    <article className="mb-4 rounded-panel border-[3px] border-ink bg-surface px-5 py-5 shadow-[5px_5px_0] shadow-ink">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <Image src={icon} alt="" className="size-11 shrink-0" />
          <div>
            <h2 className="font-display text-[24px]/[1.25]">{titles[item.caseKey]}</h2>
            <p className="mt-1 font-body text-sm font-semibold text-soft">
              {roles[item.role]} ·{' '}
              {new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
                day: 'numeric',
                month: 'long',
              }).format(new Date(`${item.date}T12:00:00`))}
            </p>
          </div>
        </div>
        <span
          className={cn(
            'rounded-full border-2 border-ink px-3 py-1 font-body text-xs font-extrabold',
            item.status === 'failed' || item.status === 'pendingDecision' || item.reportDue
              ? 'bg-red text-surface'
              : item.status === 'successful' || item.reward
                ? 'bg-gold'
                : 'bg-paper',
          )}
        >
          {status[item.status]}
        </span>
      </div>
      {item.kind !== 'mediation' && (
        <div className="mt-4 flex flex-wrap gap-2">
          {(['partyA', 'partyB'] as const).map((key) => (
            <span
              key={key}
              className="rounded-full border-2 border-ink bg-paper px-3 py-1 font-body text-xs font-bold"
            >
              ؟ {t(`arbitration.${key}`)} · {t('invitations.hidden')}
            </span>
          ))}
        </div>
      )}
      <p className="my-4 font-body text-[15px]/[1.8] font-medium text-soft">
        {withCurrency(notes[item.note], global('currency'))}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-body text-xs font-bold text-soft">
          {item.kind === 'mediation' ? t('lists.mediation') : t('lists.arbitration')} ·{' '}
          {item.kind !== 'mediation'
            ? roles.anonymous
            : item.reportDue
              ? roles.missingReport
              : item.reward
                ? withCurrency(status.reward, global('currency'))
                : ''}
        </span>
        <Link
          href={href}
          className="inline-flex min-h-10 items-center rounded-full border-[2.5px] border-ink bg-gold px-4 font-body text-sm font-extrabold text-ink shadow-[3px_3px_0] shadow-ink hover:translate-y-px"
        >
          {action ?? t('lists.open')}
        </Link>
      </div>
    </article>
  )
}

export function WorkspaceBack({
  href,
  label,
}: {
  href: '/fahs-mahs/my-mediations' | '/fahs-mahs/my-arbitrations' | '/fahs-mahs/appeals'
  label: string
}) {
  return (
    <Link
      href={href}
      className="mb-4 inline-flex items-center gap-2 font-body text-[15px] font-bold text-ink hover:text-red"
    >
      <span className="grid size-9.5 place-items-center rounded-full border-[2.5px] border-ink bg-surface text-xl shadow-[3px_3px_0] shadow-ink rtl:rotate-180">
        ›
      </span>
      {label}
    </Link>
  )
}
