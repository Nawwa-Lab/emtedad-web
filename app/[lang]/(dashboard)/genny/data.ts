import type { WishCardData, WishSuggestion, WishSupporter } from '@/components/WishCard'

const organizations = [
  { key: 'sawt', type: 'organization', badge: 'amer' },
  { key: 'halaqa', type: 'organization', badge: 'amer' },
  { key: 'melha', type: 'organization', badge: 'amer' },
  { key: 'daw', type: 'organization', badge: 'kareem' },
  { key: 'mishkaa', type: 'organization', badge: 'amer' },
] as const

const myOrganizations: WishSupporter[] = [
  ...organizations.slice(0, 4),
  { key: 'taif', type: 'organization', badge: 'amer' },
]

export const gennyWishes: WishCardData[] = [
  {
    id: 'legal-aid',
    copyKey: 'legalAid',
    categoryKey: 'legalAid',
    count: 12,
    isEndorsed: true,
    createdRank: 2,
    supporters: [...organizations],
  },
  {
    id: 'community-health',
    copyKey: 'communityHealth',
    categoryKey: 'health',
    count: 9,
    isEndorsed: false,
    createdRank: 3,
    supporters: [...organizations],
  },
  {
    id: 'printer-publisher',
    copyKey: 'printerPublisher',
    categoryKey: 'production',
    count: 15,
    isEndorsed: false,
    createdRank: 1,
    supporters: [...organizations],
  },
  {
    id: 'transport-logistics',
    copyKey: 'transportLogistics',
    categoryKey: 'transport',
    count: 6,
    isEndorsed: false,
    createdRank: 4,
    supporters: [...organizations],
  },
  {
    id: 'cultural-management',
    copyKey: 'culturalManagement',
    categoryKey: 'training',
    count: 4,
    isEndorsed: false,
    createdRank: 5,
    supporters: [...organizations],
  },
  {
    id: 'rehearsal-space',
    copyKey: 'rehearsalSpace',
    categoryKey: 'spaces',
    count: 0,
    isEndorsed: false,
    createdRank: 6,
    supporters: [...organizations],
  },
]

export const gennyMyWishes = gennyWishes
  .filter((wish) =>
    ['printer-publisher', 'transport-logistics', 'rehearsal-space'].includes(wish.id),
  )
  .map((wish) => ({ ...wish, supporters: wish.count ? myOrganizations : [] }))

export const gennySuggestions: WishSuggestion[] = [
  {
    id: 'legal-aid',
    copyKey: 'legalAid',
    categoryKey: 'legalAid',
    count: 12,
    isEndorsed: false,
  },
  {
    id: 'personal-legal-advice',
    copyKey: 'personalLegalAdvice',
    categoryKey: 'legalAid',
    count: 3,
    isEndorsed: false,
  },
]
