import type { WishCardData, WishSuggestion } from '@/components/WishCard'

const members = [
  { key: 'marwan', type: 'member' },
  { key: 'hala', type: 'member' },
  { key: 'rania', type: 'member' },
  { key: 'doaa', type: 'member' },
] as const

export const shbeikWishes: WishCardData[] = [
  {
    id: 'mobile-photography',
    copyKey: 'mobilePhotography',
    categoryKey: 'workshops',
    count: 34,
    isEndorsed: true,
    createdRank: 1,
    authorKey: 'nadia',
    supporters: [...members],
  },
  {
    id: 'oud-course',
    copyKey: 'oudCourse',
    categoryKey: 'music',
    count: 28,
    isEndorsed: false,
    createdRank: 2,
    authorKey: 'tarekSelim',
    supporters: [...members],
  },
  {
    id: 'personal-archives',
    copyKey: 'personalArchives',
    categoryKey: 'archives',
    count: 22,
    isEndorsed: false,
    createdRank: 5,
    authorKey: 'kamal',
    supporters: [...members],
  },
  {
    id: 'reading-group',
    copyKey: 'readingGroup',
    categoryKey: 'writing',
    count: 19,
    isEndorsed: false,
    createdRank: 4,
    authorKey: 'dina',
    supporters: [...members],
  },
  {
    id: 'evening-acting',
    copyKey: 'eveningActing',
    categoryKey: 'theatre',
    count: 11,
    isEndorsed: false,
    createdRank: 3,
    authorKey: 'sanaa',
    supporters: [...members],
  },
  {
    id: 'outdoor-music',
    copyKey: 'outdoorMusic',
    categoryKey: 'events',
    count: 0,
    isEndorsed: false,
    createdRank: 6,
    authorKey: 'youssef',
    supporters: [...members],
  },
]

export const shbeikMyWishes = shbeikWishes.filter((wish) =>
  ['mobile-photography', 'outdoor-music'].includes(wish.id),
)

export const shbeikSuggestions: WishSuggestion[] = [
  {
    id: 'mobile-photography',
    copyKey: 'mobilePhotography',
    categoryKey: 'workshops',
    count: 34,
    isEndorsed: true,
    authorKey: 'nadia',
  },
  {
    id: 'documentary-photography',
    copyKey: 'documentaryPhotography',
    categoryKey: 'workshops',
    count: 17,
    isEndorsed: false,
    authorKey: 'marwan',
  },
]
