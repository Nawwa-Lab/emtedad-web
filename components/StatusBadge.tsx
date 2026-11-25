import StarIcon from '@/icons/star.svg'
import type { Badge } from '@/services/members/types'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import Image from 'next/image'
import type { HTMLAttributes } from 'react'

// Background/border treatment for each badge seal as drawn in the designs:
// basic = dashed outline, pro = surface, elite = gold.
const BADGE_SEAL_CLASSES: Record<Badge, string> = {
  basic: 'border-dashed bg-transparent text-soft',
  pro: 'bg-surface',
  elite: 'bg-gold',
}

const statusBadgeVariants = cva(
  'rounded-full inline-flex items-center justify-center font-display shrink-0 whitespace-nowrap bg-gold border-2 border-ink text-ink',
  {
    variants: {
      shape: {
        circle: 'text-ink ratio-1',
        pill: 'ratio-1.5',
      },
      size: {
        default: 'text-[14px] w-13',
        small: 'text-[9px] w-5',
        lg: 'text-[26px] w-26',
      },
    },
    compoundVariants: [
      { shape: 'circle', size: 'default', class: 'w-13 h-13 font-bold text-[14px]' },
      {
        shape: 'pill',
        size: 'default',
        class: 'w-auto h-auto gap-1.5 py-[3px] ps-[13px] pe-2 font-normal text-[15px]',
      },
      { shape: 'circle', size: 'small', class: 'w-5 h-5 font-bold text-[9px]' },
      { shape: 'pill', size: 'small', class: 'gap-1 py-0.5 px-2 font-semibold text-[9px]' },
    ],
    defaultVariants: {
      shape: 'circle',
      size: 'default',
    },
  },
)

interface StatusBadgeProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof statusBadgeVariants> {
  /**
   * Raw API badge value (`'basic' | 'pro' | 'elite'`).
   * When provided, the badge value and seal background are used automatically.
   * Pass `label` as well to override with a translated string.
   */
  badge?: Badge
  /**
   * Explicit display label. Takes priority over `badge` when both are set,
   * so you can pass a translated string from `useTranslations`/`getTranslations`.
   */
  label?: string | null
}

export function StatusBadge({
  shape = 'circle',
  size = 'default',
  badge,
  label,
  className,
  ...props
}: StatusBadgeProps) {
  const resolvedLabel = label?.trim() || badge || '-'
  const fullLabel = resolvedLabel || '-'

  // Circles are too tight for a full label, so show only the first character
  // (Array.from keeps Arabic/multi-byte characters from being cut mid-glyph).
  const displayLabel = shape === 'circle' ? Array.from(fullLabel).slice(0, 1).join('') : fullLabel

  return (
    <div
      className={cn(
        'flex gap-2',
        statusBadgeVariants({ shape, size }),
        badge && BADGE_SEAL_CLASSES[badge],
        className,
      )}
      {...props}
    >
      {shape === 'pill' && (
        <Image src={StarIcon} alt="" width={19} height={19} className="w-4.75 h-4.75 shrink-0" />
      )}
      {displayLabel}
    </div>
  )
}
