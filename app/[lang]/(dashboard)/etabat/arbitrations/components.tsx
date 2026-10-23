import { Link } from '@/i18n/navigation'
import KeyIcon from '@/icons/key.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { arbitrationRounds } from './data'

export function ArbitrationHeading({
  backHref,
  back,
  title,
  subtitle,
}: {
  backHref: '/etabat' | `/etabat/arbitrations/${string}/result`
  back: string
  title: string
  subtitle: string
}) {
  return (
    <>
      <Link
        href={backHref}
        className="mb-4 inline-flex items-center gap-2 font-body text-[15px] font-bold text-ink hover:text-red"
      >
        <span
          className="grid size-9.5 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-surface text-xl shadow-[3px_3px_0] shadow-ink rtl:rotate-180"
          aria-hidden="true"
        >
          ›
        </span>
        {back}
      </Link>
      <div className="mb-5 flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1]">{title}</h1>
        <p className="mb-2.5 font-body text-[17px] font-medium text-soft">{subtitle}</p>
      </div>
    </>
  )
}

export function ArbitrationSection({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-surface px-7 py-6 shadow-[6px_6px_0] shadow-ink max-sm:px-4.5">
      <h2 className="flex flex-wrap items-center gap-3 font-display text-[26px]/[1.25]">
        {icon}
        {title}
      </h2>
      {description && (
        <p className="mt-2 font-body text-base/[1.95] font-medium text-soft">{description}</p>
      )}
      {children}
    </section>
  )
}

export function ArbitrationIntro({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="mb-6 flex items-start gap-4 rounded-panel border-[3px] border-ink bg-blue px-6 py-5 text-surface shadow-[6px_6px_0] shadow-ink">
      {icon}
      <p className="font-body text-[15.5px]/[1.9] font-semibold [&_strong]:font-display [&_strong]:text-lg [&_strong]:font-normal">
        {children}
      </p>
    </div>
  )
}

export function ArbitrationNote({
  children,
  warning = false,
}: {
  children: ReactNode
  warning?: boolean
}) {
  return (
    <div
      className={cn(
        'mt-4 flex items-start gap-3 rounded-card border-[2.5px] border-dashed border-ink bg-paper px-4.5 py-3.5',
        warning && 'border-red bg-tint',
      )}
    >
      <Image src={KeyIcon} alt="" className="size-7 shrink-0" />
      <p
        className={cn(
          'font-body text-[14.5px]/[1.85] font-semibold text-soft [&_strong]:text-ink',
          warning && 'text-ink',
        )}
      >
        {children}
      </p>
    </div>
  )
}

export function ArbitrationDeposit({
  title,
  rows,
  totalLabel,
  total,
  currency,
  fine,
  locale,
}: {
  title: string
  rows: { label: string; value: string }[]
  totalLabel: string
  total: number
  currency: string
  fine: ReactNode
  locale: string
}) {
  return (
    <div className="mb-5 rounded-panel border-[3px] border-ink bg-ink px-6.5 py-6 text-surface">
      <h2 className="font-display text-[22px]/[1.3] text-gold">{title}</h2>
      <div className="mt-4 flex flex-col gap-2.25">
        {rows.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-wrap items-baseline gap-2.5 font-body text-[15px] font-semibold text-surface/85"
          >
            <span className="min-w-30 flex-1">{label}</span>
            <b className="font-display text-[19px] font-normal text-surface">{value}</b>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-baseline gap-2.5 border-t-[3px] border-dashed border-surface/35 pt-4">
        <span className="min-w-30 flex-1 font-body text-base font-extrabold">{totalLabel}</span>
        <b className="font-display text-[38px]/[1] text-gold">
          {formatNumber(total, { locale })}{' '}
          <small className="text-[17px] text-surface">{currency}</small>
        </b>
      </div>
      <p className="mt-3.5 font-body text-[13.5px]/[1.85] font-semibold text-surface/70">{fine}</p>
    </div>
  )
}

export function ArbitrationLadder({
  current,
  labels,
  locale,
  currency,
}: {
  current: 'first' | 'appeal1'
  labels: Record<(typeof arbitrationRounds)[number]['key'], string>
  locale: string
  currency: string
}) {
  return (
    <div className="mt-4.5 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {arbitrationRounds.map((round) => (
        <div
          key={round.key}
          className={cn(
            'min-w-0 rounded-card border-[2.5px] border-ink bg-paper px-3.25 py-3.5 text-center',
            round.key === current && 'bg-gold shadow-[4px_4px_0] shadow-ink',
            current === 'appeal1' && round.key === 'first' && 'border-dashed opacity-55',
          )}
        >
          <span className="block font-body text-xs/[1.5] font-bold text-soft">
            {labels[round.key]}
          </span>
          <b className="mt-1 block font-display text-[25px]/[1.2]">
            {formatNumber(round.arbitrators, { locale })}
          </b>
          <span className="mt-1.5 block border-t-2 border-dashed border-ink/30 pt-1.5 font-body text-[12.5px] font-bold">
            {formatNumber(round.deposit, { locale })} {currency}
          </span>
        </div>
      ))}
    </div>
  )
}

export function ArbitrationBalanceRow({
  label,
  value,
  alert = false,
}: {
  label: string
  value: string
  alert?: boolean
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-2.5 border-b-[2.5px] border-dashed border-ink/25 py-3 last:border-0">
      <span className="min-w-35 flex-1 font-body text-[15px] font-bold text-soft">{label}</span>
      <b className={cn('font-display text-2xl font-normal', alert && 'text-red')}>{value}</b>
    </div>
  )
}

export function ArbitrationFacts({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <div className="mt-4.5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="min-w-0 rounded-card border-[2.5px] border-ink bg-paper px-4 py-3.5"
        >
          <span className="block font-body text-[12.5px] font-bold text-soft">{label}</span>
          <span className="mt-1 block font-display text-[22px]/[1.3]">{value}</span>
        </div>
      ))}
    </div>
  )
}
