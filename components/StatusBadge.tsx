import StarIcon from '@/icons/star.svg'
import type { Badge } from '@/services/members/types'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import Image from 'next/image'
import type { HTMLAttributes } from 'react'

// ---------------------------------------------------------------------------
// Badge API value → display label (AR fallback; callers may pass a translated
// label via the `label` prop if they have an i18n handle available).
// ---------------------------------------------------------------------------
const BADGE_LABELS: Record<Badge, string> = {
  basic: 'عامر',
  pro: 'كريم',
  elite: 'أحسن عندك',
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
   * When provided, the built-in label is used automatically.
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
  const resolvedLabel = label?.trim() || (badge ? BADGE_LABELS[badge] : '-')
  const fullLabel = resolvedLabel || '-'

  // Circles are too tight for a full label, so show only the first character
  // (Array.from keeps Arabic/multi-byte characters from being cut mid-glyph).
  const displayLabel = shape === 'circle' ? Array.from(fullLabel).slice(0, 1).join('') : fullLabel

  return (
    <div className={cn('flex gap-2', statusBadgeVariants({ shape, size, className }))} {...props}>
      {shape === 'pill' && (
        <Image src={StarIcon} alt="" width={19} height={19} className="w-4.75 h-4.75 shrink-0" />
      )}
      {displayLabel}
    </div>
  )
}
