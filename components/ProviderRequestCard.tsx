'use client'
import { useState, type ReactNode } from 'react'
import { Heart } from 'lucide-react'
import { StatusBadge } from '@/components/StatusBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { cn } from 'cn'
import { Toggle } from './ui/toggle'
import { Dialog, DialogTrigger } from './ui/dialog'
import { SatisfactionIndex } from './Satisfaction Index'

type ProviderInfo = {
  name: string
  initial?: string
  imageSrc?: string
  profileHref?: string
  profileLabel?: string
}

type SatisfactionInfo = {
  title: string
  subtitle?: string
  badge: string
  href?: string
  /** Dialog opened by the badge. Defaults to <SatisfactionIndex />. Pass null for a plain badge. */
  dialog?: ReactNode
}

type MemberInfo = {
  name: string
  role?: string
  initial?: string
  imageSrc?: string
  href: string
  badge?: string
}

type RequestAction = {
  label: string
  href?: string
}

type SaveAction = {
  label: string
  defaultSaved?: boolean
}

interface ProviderRequestCardProps {
  provider?: ProviderInfo
  satisfaction?: SatisfactionInfo
  member?: MemberInfo
  request?: RequestAction
  save?: SaveAction
  className?: string
}

const firstLetter = (text: string) => Array.from(text.trim())[0] ?? '-'

// px is smaller on phones, and min-w is lower so two buttons can share a row on ~360px screens
const requestStyles =
  'flex-1 text-center min-w-32 sm:min-w-37.5 text-[16px] sm:text-[17px] py-3.25 px-4 sm:px-6 bg-red text-surface border-[2.5px] border-ink rounded-[999px] font-body font-extrabold cursor-pointer shadow-ink shadow-[4px_4px_0] inline-block transition-[transform,box-shadow] duration-100 hover:translate-[1px_1px] hover:shadow-[2px_2px_0] active:shadow-none active:translate-[4px_4px]'

const rowStyles =
  'flex items-center gap-3 sm:gap-3.5 mb-4 py-3.5 px-0 border-t-[2.5px] border-dashed border-soft first:border-t-0 first:pt-0'

export function ProviderRequestCard({
  provider,
  satisfaction,
  member,
  request,
  save,
  className,
}: ProviderRequestCardProps) {
  const [saved, setSaved] = useState(save?.defaultSaved ?? false)
  const hasActions = Boolean(request || save)

  return (
    <Card className={cn('min-w-0', className)}>
      {/* Provider header */}
      {provider && (
        <div className="flex items-center gap-3 sm:gap-3.5 mb-4">
          <Avatar className="size-13 sm:size-15 shrink-0 rounded-2xl bg-gold">
            {provider.imageSrc && <AvatarImage src={provider.imageSrc} alt="" />}
            <AvatarFallback className="text-[22px] sm:text-[26px] font-display grid place-items-center text-ink">
              {provider.initial ?? firstLetter(provider.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="font-display text-[21px] sm:text-[24px] leading-[1.2] wrap-break-word">
              {provider.name}
            </div>
            {provider.profileHref && provider.profileLabel && (
              <Link
                href={provider.profileHref}
                className="inline-block font-bold text-[14px] text-blue border-b-[2.5px] border-blue"
              >
                {provider.profileLabel}
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Satisfaction row */}
      {satisfaction && (
        <div className={rowStyles}>
          <div className="min-w-0 flex-1">
            {satisfaction.href ? (
              <Link
                href={satisfaction.href}
                className="font-display text-[18px] sm:text-[20px] leading-tight wrap-break-word"
              >
                {satisfaction.title}
              </Link>
            ) : (
              <div className="font-display text-[18px] sm:text-[20px] leading-tight wrap-break-word">
                {satisfaction.title}
              </div>
            )}
            {satisfaction.subtitle && (
              <p className="font-semibold font-body text-[13px] sm:text-[14px] text-soft wrap-break-word">
                {satisfaction.subtitle}
              </p>
            )}
          </div>

          {satisfaction.dialog === null ? (
            <StatusBadge label={satisfaction.badge} shape="pill" className="text-blue! shrink-0" />
          ) : (
            <Dialog>
              <DialogTrigger className="shrink-0 cursor-pointer">
                <StatusBadge label={satisfaction.badge} shape="pill" className="text-blue!" />
              </DialogTrigger>
              {satisfaction.dialog ?? <SatisfactionIndex />}
            </Dialog>
          )}
        </div>
      )}

      {/* Member row */}
      {member && (
        <div className={rowStyles}>
          <Avatar className="size-11 sm:size-12 shrink-0 rounded-[50%] bg-blue">
            {member.imageSrc && <AvatarImage src={member.imageSrc} alt="" />}
            <AvatarFallback className="text-[19px] sm:text-[21px] font-display grid place-items-center text-surface">
              {member.initial ?? firstLetter(member.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <Link
              href={member.href}
              className="font-display text-[18px] sm:text-[20px] leading-tight hover:text-blue cursor-pointer wrap-break-word"
            >
              {member.name}
            </Link>
            {member.role && (
              <p className="font-semibold font-body text-[13px] sm:text-[14px] text-soft wrap-break-word">
                {member.role}
              </p>
            )}
          </div>
          {member.badge && (
            <StatusBadge label={member.badge} shape="pill" className="text-ink! shrink-0" />
          )}
        </div>
      )}

      {/* Actions: flex-wrap so the buttons stack when there isn't room for both */}
      {hasActions && (
        <div className="flex flex-wrap font-body gap-3 mt-5 pt-5 border-t-[2.5px] border-dashed border-soft first:mt-0 first:border-t-0 first:pt-0">
          {request && (
            <Link href={request.href ?? '#'} className={requestStyles}>
              {request.label}
            </Link>
          )}

          {save && (
            <Toggle
              pressed={saved}
              onPressedChange={setSaved}
              aria-label={save.label}
              className={cn(
                'flex-1 min-w-32 sm:min-w-37.5 h-auto py-3.25 px-4 sm:px-6 text-[16px] sm:text-[17px] font-extrabold font-body',
                saved ? 'bg-red text-white hover:bg-red hover:text-white' : 'hover:bg-gold',
              )}
            >
              {save.label}
              <Heart className={cn('size-5', saved && 'fill-current')} />
            </Toggle>
          )}
        </div>
      )}
    </Card>
  )
}
