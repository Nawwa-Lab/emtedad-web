export type OfferTypeId = 'workshop' | 'course' | 'program' | 'event' | 'service' | 'resource'

export type OfferKind = 'act' | 'svc' | 'res'

export type OfferType = {
  id: OfferTypeId
  kind: OfferKind
}

export const offerTypes: OfferType[] = [
  { id: 'workshop', kind: 'act' },
  { id: 'course', kind: 'act' },
  { id: 'program', kind: 'act' },
  { id: 'event', kind: 'act' },
  { id: 'service', kind: 'svc' },
  { id: 'resource', kind: 'res' },
]

export const rateOptions = [1, 2, 3, 4, 5] as const

export const monthlyCap = {
  used: 260,
  total: 400,
  percent: 65,
}
