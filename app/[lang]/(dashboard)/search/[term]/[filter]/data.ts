export const searchFilters = [
  'all',
  'offers',
  'requests',
  'organizations',
  'members',
  'proposals',
] as const

export type SearchFilter = (typeof searchFilters)[number]
type ResultType = Exclude<SearchFilter, 'all'>
type SearchFact = 'value' | 'availability' | 'delivery' | 'duration' | 'reviews' | 'deposit'
type SearchSection = 'deliverables' | 'specialTerms' | 'usageTerms'
type Provider = 'sawt-w-soura' | 'mishkaa' | 'halaqa' | 'beit-el-hekaya' | 'dar-noon'

type SearchResultBase = {
  id: string
  type: ResultType
  category:
    'production' | 'design' | 'equipment' | 'request' | 'organization' | 'member' | 'proposal'
  keywords: readonly string[]
}

export type SearchOffer = SearchResultBase & {
  type: 'offers'
  kind: 'service' | 'resource'
  provider: Provider
  rating: 'amer' | 'kareem'
  price: number
  taxPercent: number
  href: string
  factKeys?: readonly SearchFact[]
  sections?: readonly { key: SearchSection; items: readonly string[] }[]
}

export type SearchRequest = SearchResultBase & {
  type: 'requests'
  provider: Provider
  ageDays: number
  responses: number
  href: string
}

export type SearchOrganization = SearchResultBase & {
  type: 'organizations'
  provider: Provider
  rating: 'amer' | 'kareem'
  href: string
}

export type SearchMember = SearchResultBase & {
  type: 'members'
  member: 'omar' | 'sara' | 'karim'
  provider: Provider
  rating: 'amer' | 'kareem'
  href: string
}

export type SearchProposal = SearchResultBase & {
  type: 'proposals'
  support: number
  href: string
}

export type SearchResult =
  SearchOffer | SearchRequest | SearchOrganization | SearchMember | SearchProposal

export const searchResults: SearchResult[] = [
  {
    id: 'video',
    type: 'offers',
    category: 'production',
    keywords: ['تصميم تصوير فيديو فعاليات', 'design video production events'],
    kind: 'service',
    provider: 'sawt-w-soura',
    rating: 'amer',
    price: 35,
    taxPercent: 14,
    factKeys: ['value', 'availability', 'delivery'],
    sections: [
      { key: 'deliverables', items: ['raw', 'summary', 'audio'] },
      { key: 'specialTerms', items: ['arrival', 'power'] },
    ],
    href: '/namliya/service-offers/detail/video',
  },
  {
    id: 'event-identity',
    type: 'offers',
    category: 'design',
    keywords: ['تصميم هوية مطبوعات فعاليات', 'design identity print events'],
    kind: 'service',
    provider: 'mishkaa',
    rating: 'amer',
    price: 40,
    taxPercent: 14,
    factKeys: ['value', 'duration', 'reviews'],
    sections: [{ key: 'deliverables', items: ['poster', 'social', 'sourceFiles'] }],
    href: '/namliya/service-offers/detail/event-identity',
  },
  {
    id: 'educational-print',
    type: 'offers',
    category: 'design',
    keywords: ['تصميم أدلة مطبوعات تعليمية', 'design educational guides print'],
    kind: 'service',
    provider: 'halaqa',
    rating: 'kareem',
    price: 55,
    taxPercent: 14,
    factKeys: ['value', 'availability', 'duration'],
    sections: [{ key: 'deliverables', items: ['guide', 'digital', 'illustrations'] }],
    href: '/namliya/service-offers/detail/educational-print',
  },
  {
    id: 'cinema-camera',
    type: 'offers',
    category: 'equipment',
    keywords: ['تصميم تصوير كاميرا معدات', 'design filming cinema camera equipment'],
    kind: 'resource',
    provider: 'sawt-w-soura',
    rating: 'amer',
    price: 30,
    taxPercent: 14,
    factKeys: ['value', 'availability', 'deposit'],
    sections: [{ key: 'usageTerms', items: ['supervision', 'return', 'damage'] }],
    href: '/namliya/resource-offers/detail/cinema-camera',
  },
  {
    id: 'social-campaign',
    type: 'offers',
    category: 'design',
    keywords: ['تصميم سوشيال حملة توعية', 'design social campaign'],
    kind: 'service',
    provider: 'mishkaa',
    rating: 'amer',
    price: 28,
    taxPercent: 14,
    href: '/namliya/service-offers/detail/social-campaign',
  },
  {
    id: 'annual-report',
    type: 'offers',
    category: 'design',
    keywords: ['تصميم تقرير سنوي بيانات', 'design annual report data'],
    kind: 'service',
    provider: 'dar-noon',
    rating: 'kareem',
    price: 65,
    taxPercent: 14,
    href: '/namliya/service-offers/detail/annual-report',
  },
  {
    id: 'podcast-cover',
    type: 'offers',
    category: 'production',
    keywords: ['تصميم غلاف بودكاست صوت', 'design podcast cover audio'],
    kind: 'service',
    provider: 'beit-el-hekaya',
    rating: 'kareem',
    price: 22,
    taxPercent: 14,
    href: '/namliya/service-offers/detail/podcast-cover',
  },
  {
    id: 'exhibition-kit',
    type: 'offers',
    category: 'equipment',
    keywords: ['تصميم معرض ستاندات معدات', 'design exhibition display equipment'],
    kind: 'resource',
    provider: 'halaqa',
    rating: 'amer',
    price: 45,
    taxPercent: 14,
    href: '/namliya/resource-offers/detail/exhibition-kit',
  },
  {
    id: 'motion-request',
    type: 'requests',
    category: 'request',
    keywords: ['تصميم موشن جرافيك حملة', 'design motion graphics campaign'],
    provider: 'mishkaa',
    ageDays: 3,
    responses: 2,
    href: '/alaesh-andak/request/motion-request',
  },
  {
    id: 'report-request',
    type: 'requests',
    category: 'request',
    keywords: ['تصميم تقرير أثر سنوي', 'design impact annual report'],
    provider: 'beit-el-hekaya',
    ageDays: 1,
    responses: 4,
    href: '/alaesh-andak/request/report-request',
  },
  {
    id: 'signage-request',
    type: 'requests',
    category: 'request',
    keywords: ['تصميم لافتات معرض', 'design exhibition signage'],
    provider: 'dar-noon',
    ageDays: 5,
    responses: 1,
    href: '/alaesh-andak/request/signage-request',
  },
  {
    id: 'halaqa-org',
    type: 'organizations',
    category: 'organization',
    keywords: ['تصميم تعليم مطبوعات حلقة', 'design education print halaqa'],
    provider: 'halaqa',
    rating: 'amer',
    href: '/organization/halaqa',
  },
  {
    id: 'sawt-org',
    type: 'organizations',
    category: 'organization',
    keywords: ['تصميم تصوير إنتاج صوت وصورة', 'design filming production sawt soura'],
    provider: 'sawt-w-soura',
    rating: 'amer',
    href: '/organization/sawt-w-soura',
  },
  {
    id: 'omar-member',
    type: 'members',
    category: 'member',
    keywords: ['تصميم بصري عمر السيد', 'visual design omar elsayed'],
    member: 'omar',
    provider: 'mishkaa',
    rating: 'kareem',
    href: '/member/omar-elsayed',
  },
  {
    id: 'sara-member',
    type: 'members',
    category: 'member',
    keywords: ['تصميم سوشيال سارة حسن', 'social design sara hassan'],
    member: 'sara',
    provider: 'halaqa',
    rating: 'amer',
    href: '/member/sara-hassan',
  },
  {
    id: 'karim-member',
    type: 'members',
    category: 'member',
    keywords: ['تصميم موشن كريم فوزي', 'motion design karim fawzy'],
    member: 'karim',
    provider: 'sawt-w-soura',
    rating: 'amer',
    href: '/member/karim-fawzy',
  },
  {
    id: 'visual-library-proposal',
    type: 'proposals',
    category: 'proposal',
    keywords: ['تصميم مكتبة بصرية مشتركة مقترح', 'design shared visual library proposal'],
    support: 11,
    href: '/hakima/proposals/visual-library',
  },
]

export function isSearchFilter(value: string): value is SearchFilter {
  return searchFilters.includes(value as SearchFilter)
}

export function searchMockResults(term: string) {
  const words = term.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return []

  return searchResults.filter((result) => {
    const index = result.keywords.join(' ').toLocaleLowerCase()
    return words.every((word) => index.includes(word))
  })
}

export function countSearchResults(results: SearchResult[]) {
  return searchFilters.reduce<Record<SearchFilter, number>>(
    (counts, filter) => {
      counts[filter] =
        filter === 'all' ? results.length : results.filter((item) => item.type === filter).length
      return counts
    },
    { all: 0, offers: 0, requests: 0, organizations: 0, members: 0, proposals: 0 },
  )
}

// shortcut: search stays client-side until the backend search index is available.
