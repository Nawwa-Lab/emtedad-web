export type AlaeshMarket = 'namliya' | 'khalis' | 'public'
export type AlaeshRequestState = 'open' | 'converted' | 'withdrawn'

export type AlaeshRequest = {
  id: string
  market: AlaeshMarket
  provider: 'sawt' | 'halaqa' | 'melha' | 'daw' | 'mishkaa' | 'tarek' | 'salma'
  providerKind: 'organization' | 'member'
  badge?: 'amer' | 'kareem'
  replies: number
  value: number
  taxPercent: number
  state: AlaeshRequestState
}

export const browseRequests: AlaeshRequest[] = [
  {
    id: 'motion',
    market: 'namliya',
    provider: 'sawt',
    providerKind: 'organization',
    badge: 'amer',
    replies: 3,
    value: 40,
    taxPercent: 14,
    state: 'open',
  },
  {
    id: 'translation',
    market: 'namliya',
    provider: 'halaqa',
    providerKind: 'organization',
    badge: 'amer',
    replies: 1,
    value: 35,
    taxPercent: 14,
    state: 'open',
  },
  {
    id: 'storage',
    market: 'namliya',
    provider: 'melha',
    providerKind: 'organization',
    badge: 'amer',
    replies: 0,
    value: 20,
    taxPercent: 14,
    state: 'open',
  },
  {
    id: 'sound-event',
    market: 'namliya',
    provider: 'daw',
    providerKind: 'organization',
    badge: 'kareem',
    replies: 2,
    value: 25,
    taxPercent: 14,
    state: 'open',
  },
  {
    id: 'photographer',
    market: 'khalis',
    provider: 'mishkaa',
    providerKind: 'organization',
    badge: 'amer',
    replies: 5,
    value: 22,
    taxPercent: 14,
    state: 'open',
  },
  {
    id: 'writer',
    market: 'khalis',
    provider: 'sawt',
    providerKind: 'organization',
    badge: 'amer',
    replies: 4,
    value: 18,
    taxPercent: 14,
    state: 'open',
  },
  {
    id: 'network',
    market: 'khalis',
    provider: 'halaqa',
    providerKind: 'organization',
    badge: 'amer',
    replies: 1,
    value: 15,
    taxPercent: 14,
    state: 'open',
  },
  {
    id: 'oud',
    market: 'public',
    provider: 'tarek',
    providerKind: 'member',
    replies: 2,
    value: 25,
    taxPercent: 14,
    state: 'open',
  },
  {
    id: 'nutrition',
    market: 'public',
    provider: 'salma',
    providerKind: 'member',
    replies: 0,
    value: 15,
    taxPercent: 14,
    state: 'open',
  },
]

export const myRequests: AlaeshRequest[] = [
  browseRequests[0],
  browseRequests[2],
  browseRequests[4],
  browseRequests[5],
  { ...browseRequests[1], state: 'converted' },
  { ...browseRequests[6], state: 'converted' },
  {
    id: 'sound-workshop',
    market: 'namliya',
    provider: 'mishkaa',
    providerKind: 'organization',
    replies: 0,
    value: 25,
    taxPercent: 14,
    state: 'withdrawn',
  },
]

export function findAlaeshRequest(id: string) {
  return [...browseRequests, ...myRequests].find((request) => request.id === id)
}

export function calculateRequestValue(
  kind: 'human' | 'resource',
  hours: number,
  rate: number,
  resourceValue: number,
) {
  return kind === 'human' ? hours * rate : resourceValue
}

// shortcut: fixtures remain local until the backend request board is available.
