'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from '@/i18n/navigation'
import { cn } from 'cn'
import type { ReactNode } from 'react'

export function ManagementHeader({ title, description }: { title: string; description: string }) {
  return (
    <header className="mb-6 flex flex-wrap items-end gap-5">
      <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1.14] text-ink">{title}</h1>
      <p className="pb-2 font-body text-[17px] font-medium text-soft">{description}</p>
    </header>
  )
}

export function DirectoryControls<T extends string>({
  label,
  placeholder,
  query,
  onQueryChange,
  selected,
  onSelectedChange,
  options,
  action,
  hint,
}: {
  label: string
  placeholder: string
  query: string
  onQueryChange: (value: string) => void
  selected: T
  onSelectedChange: (value: T) => void
  options: readonly { value: T; label: string }[]
  action?: ReactNode
  hint?: string
}) {
  return (
    <section className="mb-6">
      <div className="flex flex-wrap gap-3">
        <label className="min-w-64 flex-1">
          <span className="sr-only">{label}</span>
          <Input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={placeholder}
          />
        </label>
        {action}
      </div>
      {hint && <p className="mt-2 font-body text-sm font-semibold text-soft">{hint}</p>}
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((option) => (
          <Button
            key={option.value}
            type="button"
            size="sm"
            effect="flat"
            variant="outline"
            aria-pressed={selected === option.value}
            onClick={() => onSelectedChange(option.value)}
            className={cn(selected === option.value && 'bg-ink text-surface hover:bg-ink')}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </section>
  )
}

export function DirectoryCard({
  title,
  subtitle,
  status,
  statusColor,
  meta,
  profileHref,
  profileLabel,
  children,
}: {
  title: string
  subtitle: string
  status: string
  statusColor: 'red' | 'blue' | 'gold' | 'tint'
  meta: string
  profileHref?: string
  profileLabel?: string
  children: ReactNode
}) {
  return (
    <article className="mb-4 rounded-panel border-[3px] border-ink bg-surface p-5 shadow-[5px_5px_0] shadow-ink">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-[27px]/[1.2]">{title}</h2>
          <p className="mt-1 font-body text-sm font-bold text-soft" dir="ltr">
            {subtitle}
          </p>
        </div>
        <Badge color={statusColor} effect="flat">
          {status}
        </Badge>
      </div>
      <p className="mt-4 border-t-2 border-dashed border-ink/20 pt-4 font-body text-[15px] font-semibold text-soft">
        {meta}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {profileHref && profileLabel && (
          <Link href={profileHref}>
            <Button type="button" size="sm" variant="outline">
              {profileLabel}
            </Button>
          </Link>
        )}
        {children}
      </div>
    </article>
  )
}
