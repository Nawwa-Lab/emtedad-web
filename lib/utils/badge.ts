import type { Badge } from '@/services/members/types'

/**
 * Maps an API Badge value to the corresponding i18n key in `global.badges.*`.
 *
 * Usage (server):
 *   const global = await getTranslations('global')
 *   <StatusBadge label={global(`badges.${badgeKey(member.badge)}`)} shape="pill" />
 *
 * Usage (client):
 *   const global = useTranslations('global')
 *   <StatusBadge label={global(`badges.${badgeKey(review.badge)}`)} shape="pill" />
 */
export function badgeKey(badge: Badge): 'amer' | 'kareem' | 'elite' {
  if (badge === 'elite') return 'elite'
  if (badge === 'pro') return 'kareem'
  return 'amer'
}

/**
 * Background/border treatment for the badge seal as drawn in the designs:
 * basic = gold, pro = surface, elite = dashed outline.
 */
export function badgeSealClass(badge: Badge): string {
  if (badge === 'elite') return 'border-dashed bg-transparent text-soft'
  if (badge === 'pro') return 'bg-surface'
  return 'bg-gold'
}
