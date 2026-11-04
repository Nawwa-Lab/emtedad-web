'use client'
import { useRouter, usePathname } from '@/i18n/navigation'
import { cva, type VariantProps } from 'class-variance-authority'
import { MoveDiagonal2, Heart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { StatusBadge } from './StatusBadge'
import { Button } from './ui/button'
import { Toggle } from './ui/toggle'
import { Badge } from './ui/badge'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Card } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { CardDetails, type ServiceDetail } from './CardDetail'
import ExpandIcon from '@/icons/expand.svg'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'

const cardStyles = cva('card', {
  variants: {
    variant: {
      default:
        'p-4 flex flex-col gap-[8px] bg-surface border-[3px] border-ink rounded-2xl relative mb-[8px]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const browseCardClass =
  'p-6! gap-0 min-h-75 rounded-panel shadow-[6px_6px_0_#1A1714] mb-0 hover:-translate-x-0.5 hover:-translate-y-1 hover:rotate-[-0.3deg] hover:shadow-[9px_11px_0_#1A1714]'

export type ServiceCardAction = {
  label: string
  variant?: 'primary' | 'outline'
  onClick?: () => void
}

type ServiceCardProps = VariantProps<typeof cardStyles> & {
  category: string
  title: string
  desc: string
  providerName: string
  providerRate?: string
  price: number | string
  spotsLeft?: string
  ctaHref?: string
  onRequest?: () => void
  showSaveButton?: boolean
  saved?: boolean
  defaultSaved?: boolean
  onSaveChange?: (saved: boolean) => void
  showStatusBadge?: boolean
  badgeVariant?: 'blue' | 'gold'
  animated?: boolean
  detail?: ServiceDetail
  actionLabel?: string
  hideCurrency?: boolean
  hidePriceNote?: boolean
  /** Panel-32 browse layout: price foot + separate acts row under the card. */
  actions?: ServiceCardAction[]
  expandAriaLabel?: string
}

export function ServiceCard({
  category,
  title,
  desc,
  providerName,
  providerRate,
  price,
  spotsLeft,
  ctaHref = '#',
  onRequest,
  variant,
  showSaveButton = false,
  saved,
  defaultSaved = false,
  onSaveChange,
  showStatusBadge = false,
  badgeVariant,
  animated = true,
  detail,
  actionLabel,
  hideCurrency = false,
  hidePriceNote = false,
  actions,
  expandAriaLabel = 'Expand',
}: ServiceCardProps) {
  const [internalSaved, setInternalSaved] = useState(defaultSaved)
  const isControlled = saved !== undefined
  const isSaved = isControlled ? saved : internalSaved
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('namliyaBrowse')
  const browse = Boolean(actions?.length)

  const resolvedBadgeVariant =
    badgeVariant ?? (pathname.startsWith('/namliya/service-offers') ? 'blue' : 'gold')

  const providerBadgeClassName = pathname.startsWith('/khalli-khales') ? 'text-soft' : undefined

  const handleSaveClick = () => {
    const next = !isSaved
    if (!isControlled) setInternalSaved(next)
    onSaveChange?.(next)
  }
  const providerInitial = Array.from(providerName.trim())[0] ?? '-'

  return (
    <Card animated={animated} className={cn(cardStyles({ variant }), browse && browseCardClass)}>
      {browse ? (
        <div className="absolute top-3.5 inset-e-3.5 z-10">
          <Dialog>
            <DialogTrigger
              render={
                <button
                  type="button"
                  aria-label={expandAriaLabel}
                  className="grid size-10.5 place-items-center rounded-[12px] border-[2.5px] border-ink bg-paper shadow-[3px_3px_0_#1A1714] transition hover:translate-x-px hover:translate-y-px hover:bg-gold hover:shadow-[1px_1px_0_#1A1714] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue"
                >
                  <Image src={ExpandIcon} alt="" className="size-5" />
                </button>
              }
            />
            <CardDetails detail={detail} badgeVariant={resolvedBadgeVariant} />
          </Dialog>
        </div>
      ) : (
        <div className="absolute top-3.5 inset-e-3.5 flex items-center gap-2">
          {showSaveButton && (
            <>
              <Toggle
                size="icon"
                shape="square"
                onClick={handleSaveClick}
                aria-pressed={isSaved}
                aria-label={isSaved ? 'Remove from saved' : 'Save'}
                className="group bg-paper hover:bg-gold"
              >
                <Heart
                  size={15}
                  strokeWidth={2}
                  fill={isSaved ? 'currentColor' : 'none'}
                  className={
                    isSaved ? 'fill-paper text-red' : 'fill-paper text-red group-hover:fill-gold'
                  }
                />
              </Toggle>
            </>
          )}

          <Dialog>
            <DialogTrigger
              render={
                <Button
                  size="icon"
                  variant="outline"
                  shape="square"
                  className="group bg-paper hover:bg-gold border-ink"
                >
                  <MoveDiagonal2
                    size={15}
                    strokeWidth={2}
                    className="fill-paper text-black group-hover:fill-gold"
                  />
                </Button>
              }
            />
            <CardDetails detail={detail} badgeVariant={resolvedBadgeVariant} />
          </Dialog>
        </div>
      )}
      <Badge
        color={resolvedBadgeVariant}
        effect="flat"
        className={cn(
          'self-start font-bold text-[13px] rounded-[999px] font-body',
          browse ? 'mb-3.5 py-1.25 px-3.75' : 'py-1.25 px-3.75',
        )}
      >
        {category}
      </Badge>
      <h3 className="font-normal text-[28px] leading-[1.3] font-display text-ink">{title}</h3>
      <p className="font-medium font-body text-[16px] text-soft leading-[1.85] mt-2.5 line-clamp-2">
        {desc}
      </p>
      {browse ? (
        <div className="mt-3 flex flex-wrap items-center gap-2.25 font-body text-[14.5px] font-semibold text-soft">
          <Avatar
            size="sm"
            shape="round"
            effect="flat"
            color="paper"
            className="size-7.5 border-[2.5px]"
          >
            <AvatarImage src="#" />
            <AvatarFallback className="text-[14px]">{providerInitial}</AvatarFallback>
          </Avatar>
          <span className="font-extrabold text-ink">{providerName}</span>
          {providerRate && (
            <>
              <span aria-hidden="true" className="text-soft">
                ·
              </span>
              <StatusBadge
                shape="pill"
                label={providerRate}
                size="default"
                className={providerBadgeClassName}
              />
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-1.75 font-semibold text-[11.5px] text-ink-soft leading-[1.8] font-body">
          {showStatusBadge && (
            <Avatar size="sm" shape="round" effect="flat" className="size-6 border-2 bg-paper">
              <AvatarImage src="#" />
              <AvatarFallback className="text-[11px]">{providerInitial}</AvatarFallback>
            </Avatar>
          )}
          <span className="font-body font-bold text-[13px] text-soft">{providerName}</span>
          <StatusBadge
            shape="pill"
            label={providerRate}
            size="default"
            className={providerBadgeClassName}
          />
        </div>
      )}
      <div
        className={cn(
          'flex items-center border-t-[2.5px] border-dashed border-ink text-ink font-body',
          browse ? 'mt-3.5 gap-2.5 pt-3.75' : 'justify-between mt-auto pt-2.5',
        )}
      >
        <span
          className={cn(
            'min-w-0',
            browse ? 'flex flex-1 flex-wrap items-baseline gap-x-2.5 gap-y-1' : 'block flex-1',
          )}
        >
          <span
            className={
              browse
                ? `font-display leading-none font-feature-['tnum'] ${hideCurrency && hidePriceNote ? 'text-[26px]' : 'text-[34px]'}`
                : "font-extrabold text-[34px] font-features-['tnum'] font-body text-ink"
            }
          >
            {price}
            {!hideCurrency && (
              <small
                className={
                  browse
                    ? 'font-display font-semibold text-[16px] text-red ms-1.25'
                    : 'font-display font-semibold text-[16px] text-red scroll-ms-0.75 ms-1.25'
                }
              >
                {t('currency')}
              </small>
            )}
          </span>
          {!hidePriceNote && (
            <span
              className={
                browse
                  ? 'font-body text-[18px] text-ink'
                  : 'block font-semibold text-[12.5px] text-soft leading-[1.6] mt-1.25'
              }
            >
              {t('vatNote')}
            </span>
          )}
        </span>
        {!browse && spotsLeft && (
          <span className="font-semibold text-[10.5px] text-ink-soft font-body">{spotsLeft}</span>
        )}
        {!browse &&
          (onRequest ? (
            <Button onClick={onRequest}>{actionLabel ?? t('request')}</Button>
          ) : (
            <Button
              size="default"
              onClick={() => {
                router.push(`${ctaHref}`)
              }}
            >
              {actionLabel ?? t('request')}
            </Button>
          ))}
      </div>
      {browse && actions && actions.length > 0 && (
        <div className="mt-3.5 flex flex-wrap gap-2.25">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant ?? 'outline'}
              size="sm"
              effect={action.variant === 'primary' ? '3d' : 'flat'}
              className={cn(
                'h-auto py-2',
                action.variant === 'primary' ? 'px-4.5 text-[14.5px]' : 'px-4 text-[14px]',
              )}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </Card>
  )
}
