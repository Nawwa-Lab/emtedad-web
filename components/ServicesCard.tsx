'use client'
import { useRouter, usePathname } from '@/i18n/navigation'
import { cva, type VariantProps } from 'class-variance-authority'
import { MoveDiagonal2, Heart } from 'lucide-react'
import { useState } from 'react'
import { StatusBadge } from './StatusBadge'
import { Button } from './ui/button'
import { Toggle } from './ui/toggle'
import { Badge } from './ui/badge'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Card } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { CardDetails, type ServiceDetail } from './CardDetail'
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
}: ServiceCardProps) {
  const [internalSaved, setInternalSaved] = useState(defaultSaved)
  const isControlled = saved !== undefined
  const isSaved = isControlled ? saved : internalSaved
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('namliyaBrowse')

  const resolvedBadgeVariant =
    badgeVariant ?? (pathname.startsWith('/namliya/service-offers') ? 'blue' : 'gold')

  const handleSaveClick = () => {
    const next = !isSaved
    if (!isControlled) setInternalSaved(next)
    onSaveChange?.(next)
  }
  const providerInitial = Array.from(providerName.trim())[0] ?? '-'

  return (
    <Card animated={animated} className={cardStyles({ variant })}>
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
      <Badge
        color={resolvedBadgeVariant}
        effect="flat"
        className="self-start font-bold text-[13px] rounded-[999px] py-1.25 px-3.75 font-body"
      >
        {category}
      </Badge>
      <h3 className="font-normal text-[28px] leading-[1.3] font-display text-ink">{title}</h3>
      <p className="font-medium font-body text-[16px] text-soft leading-[1.85] mt-2.5 line-clamp-2">
        {desc}
      </p>
      <div className="flex items-center gap-1.75 font-semibold text-[11.5px] text-ink-soft leading-[1.8] font-body">
        {showStatusBadge && (
          <Avatar size="sm" shape="round" effect="flat" className="size-6 border-2 bg-paper">
            <AvatarImage src="#" />
            <AvatarFallback className="text-[11px]">{providerInitial}</AvatarFallback>
          </Avatar>
        )}
        <span className="font-body font-bold text-[13px] text-soft">{providerName}</span>
        <StatusBadge shape="pill" label={providerRate} size="default" />
      </div>
      <div className="flex items-center justify-between mt-auto pt-2.5 border-t-[2.5px] border-dashed border-ink text-ink font-body">
        <span className="flex-1 min-w-0 block">
          <span className="font-extrabold text-[34px] font-features-['tnum'] font-body text-ink">
            {price}
            <small className="font-display font-semibold text-[16px] text-red scroll-ms-0.75 ms-1.25">
              {t('currency')}
            </small>
          </span>
          <span className="block font-semibold text-[12.5px] text-soft leading-[1.6] mt-1.25">
            {t('vatNote')}
          </span>
        </span>
        {spotsLeft && (
          <span className="font-semibold text-[10.5px] text-ink-soft font-body">{spotsLeft}</span>
        )}
        {onRequest ? (
          <Button onClick={onRequest}>{t('request')}</Button>
        ) : (
          <Button
            size="default"
            onClick={() => {
              router.push(`${ctaHref}`)
            }}
          >
            {t('request')}
          </Button>
        )}
      </div>
    </Card>
  )
}
