'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'

export type MessageTagKey =
  'maybe' | 'done' | 'inProgress' | 'inProgress2' | 'done2' | 'noAgreement'

const tagStyles: Record<
  MessageTagKey,
  { color: 'gold' | 'red' | 'blue' | 'surface'; className?: string }
> = {
  maybe: { color: 'red' },
  done: { color: 'gold' },
  inProgress: { color: 'blue' },
  inProgress2: { color: 'blue' },
  done2: { color: 'gold' },
  noAgreement: { color: 'surface', className: 'border-dashed text-soft' },
}

export function TagBadge({ tag }: { tag: MessageTagKey }) {
  const t = useTranslations('messages')
  const { color, className } = tagStyles[tag]

  return (
    <Badge color={color} effect="flat" className={cn('font-extrabold', className)}>
      {t(`tags.${tag}`)}
    </Badge>
  )
}
