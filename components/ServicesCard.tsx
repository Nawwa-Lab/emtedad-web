'use client'
import { useRouter } from '@/i18n/navigation'
import { cva, type VariantProps } from 'class-variance-authority'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { StatusBadge, getVariantFromLabel } from './StatusBadge'
import { Button } from './ui/button'

const cardStyles = cva('card', {
  variants: {
    variant: {
      default: 'p-4 flex flex-col gap-[8px] bg-surface border border-line rounded-2xl relative',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type ServiceCardProps = VariantProps<typeof cardStyles> & {
  category: string
  title: string
  providerName: string
  providerRate?: string
  availability: string
  price: number | string
  currency: string
  request: string
  spotsLeft?: string
  ctaHref?: string
  onRequest?: () => void
  showSaveButton?: boolean
  saved?: boolean
  defaultSaved?: boolean
  onSaveChange?: (saved: boolean) => void
  showStatusBadge?: boolean
}

export function ServiceCard({
  category,
  title,
  providerName,
  providerRate,
  availability,
  price,
  currency,
  request,
  spotsLeft,
  ctaHref = '#',
  onRequest,
  variant,
  showSaveButton = false,
  saved,
  defaultSaved = false,
  onSaveChange,
  showStatusBadge = false,
}: ServiceCardProps) {
  const [internalSaved, setInternalSaved] = useState(defaultSaved)
  const isControlled = saved !== undefined
  const isSaved = isControlled ? saved : internalSaved
  const router = useRouter()

  const handleSaveClick = () => {
    const next = !isSaved
    if (!isControlled) setInternalSaved(next)
    onSaveChange?.(next)
  }

  return (
    <div className={cardStyles({ variant })}>
      {showSaveButton && (
        <Button
          onClick={handleSaveClick}
          variant="secondary"
          size="icon"
          shape="square"
          aria-pressed={isSaved}
          aria-label={isSaved ? 'Remove from saved' : 'Save'}
          className="absolute top-3.5 inset-e-3.5 "
        >
          <Heart
            size={15}
            strokeWidth={2}
            fill={isSaved ? 'currentColor' : 'none'}
            className={isSaved ? 'fill-red stroke-0' : 'text-red'}
          />
        </Button>
      )}

      <span className="self-start font-bold text-[10.5px] text-green-deep bg-green rounded-[999px] py-0.75 px-2.5 font-cairo">
        {category}
      </span>
      <h3 className="font-extrabold text-[14px] leading-[1.65] font-cairo text-ink">{title}</h3>
      <div className="flex items-center gap-1.75 font-semibold text-[11.5px] text-ink-soft leading-[1.8] font-cairo">
        {showStatusBadge && (
          <StatusBadge
            variant={getVariantFromLabel(providerRate)}
            shape="circle"
            label={providerRate}
            size="small"
          />
        )}
        <span>
          {providerName}
          {providerRate && ` · ${providerRate}`}
          {availability && ` · ${availability}`}
        </span>
      </div>
      <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-t-line-soft text-ink font-cairo">
        <span className="font-extrabold text-[15px] font-features-['tnum'] font-cairo text-ink">
          {price}
          <small className="font-display font-semibold text-[10.5px] text-gold-deep scroll-ms-0.75 ms-1">
            {currency}
          </small>
        </span>
        {spotsLeft && (
          <span className="font-semibold text-[10.5px] text-ink-soft font-cairo">{spotsLeft}</span>
        )}
        {onRequest ? (
          <Button onClick={onRequest}>{request}</Button>
        ) : (
          <Button
            size="sm"
            onClick={() => {
              router.push(`${ctaHref}`)
            }}
          >
            {request}
          </Button>
        )}
      </div>
    </div>
  )
}
