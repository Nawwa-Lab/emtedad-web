export type CaseKey =
  | 'workshop'
  | 'return'
  | 'seats'
  | 'reply'
  | 'scope'
  | 'ratings'
  | 'delivery'
  | 'networkAd'
  | 'fakeAccounts'
  | 'appealSeats'
  | 'exchange'

export type Assignment = {
  id: string
  caseKey: CaseKey
  status:
    | 'needsAction'
    | 'ongoing'
    | 'failed'
    | 'successful'
    | 'pendingDecision'
    | 'review'
    | 'issued'
    | 'archived'
    | 'reversed'
  role: string
  note: string
  date: string
  kind: 'mediation' | 'arbitration' | 'appeal'
  reward?: boolean
  reportDue?: boolean
  disputeValue?: number
  panelSize?: number
  remainingDays?: number
}

export const earnings = { total: 140, breakdown: [80, 40, 20] } as const

export const mediations = [
  {
    id: 'workshop',
    caseKey: 'workshop',
    status: 'needsAction',
    role: 'mediatorOne',
    note: 'workshop',
    date: '2026-09-24',
    kind: 'mediation',
  },
  {
    id: 'return',
    caseKey: 'return',
    status: 'ongoing',
    role: 'mediatorThree',
    note: 'return',
    date: '2026-10-01',
    kind: 'mediation',
  },
] satisfies Assignment[]

export const mediationListDetails = {
  workshop: {
    seatKey: 'mediatorOne',
    progressKey: 'settlementWaiting',
    progressTone: 'wait',
    parties: [
      { nameKey: 'mishkat', href: '/organization/mishkat-culture' },
      { nameKey: 'workshopStudio', href: '/organization/workshop-studio' },
    ],
  },
  return: {
    seatKey: 'mediatorThree',
    progressKey: 'noSettlement',
    progressTone: 'plain',
    parties: [
      { nameKey: 'bigNight', href: '/organization/big-night-troupe' },
      { nameKey: 'marwan', href: '/member/marwan-sobhy' },
    ],
  },
} as const

export const closedMediations = [
  {
    id: 'seats',
    caseKey: 'seats',
    status: 'failed',
    role: 'mediatorTwo',
    note: 'seats',
    date: '2026-10-04',
    kind: 'mediation',
    reportDue: true,
  },
  {
    id: 'reply',
    caseKey: 'reply',
    status: 'successful',
    role: 'mediatorOne',
    note: 'reply',
    date: '2026-09-12',
    kind: 'mediation',
    reward: true,
  },
  {
    id: 'scope-mediation',
    caseKey: 'scope',
    status: 'successful',
    role: 'mediatorThree',
    note: 'scopeMediation',
    date: '2026-08-28',
    kind: 'mediation',
    reward: true,
  },
  {
    id: 'ratings',
    caseKey: 'ratings',
    status: 'failed',
    role: 'mediatorTwo',
    note: 'ratings',
    date: '2026-08-09',
    kind: 'mediation',
  },
] satisfies Assignment[]

export const closedMediationListDetails = {
  seats: {
    seat: 2,
    seatsTotal: 3,
    detailKey: 'movedToArbitration',
    footerKey: 'failed',
    footerTone: 'failed',
  },
  reply: {
    seat: 1,
    seatsTotal: 3,
    detailKey: 'acceptedSecondSettlement',
    footerKey: 'successful',
    footerTone: 'successful',
  },
  'scope-mediation': {
    seat: 3,
    seatsTotal: 3,
    detailKey: 'acceptedFirstSettlement',
    footerKey: 'successful',
    footerTone: 'successful',
  },
  ratings: {
    seat: 2,
    seatsTotal: 3,
    detailKey: 'reportSentAugustTen',
    footerKey: 'failed',
    footerTone: 'failed',
  },
} as const

export const arbitrations = [
  {
    id: 'delivery',
    caseKey: 'delivery',
    status: 'pendingDecision',
    role: 'arbitratorThree',
    note: 'delivery',
    date: '2026-10-05',
    kind: 'arbitration',
    disputeValue: 500,
    panelSize: 5,
    remainingDays: 6,
  },
  {
    id: 'network-ad',
    caseKey: 'networkAd',
    status: 'review',
    role: 'arbitratorSix',
    note: 'networkAd',
    date: '2026-10-08',
    kind: 'arbitration',
    panelSize: 7,
    remainingDays: 3,
  },
  {
    id: 'return',
    caseKey: 'return',
    status: 'issued',
    role: 'arbitratorTwo',
    note: 'returnArbitration',
    date: '2026-10-02',
    kind: 'arbitration',
    reward: true,
    panelSize: 5,
    remainingDays: 2,
  },
  {
    id: 'scope',
    caseKey: 'scope',
    status: 'archived',
    role: 'arbitratorFour',
    note: 'scopeArbitration',
    date: '2026-09-14',
    kind: 'arbitration',
    panelSize: 5,
  },
] satisfies Assignment[]

export const arbitrationListDetails = {
  delivery: { seat: 3, showParties: true },
  'network-ad': { seat: 6, showParties: true },
  return: { seat: 2, showParties: true },
  scope: { seat: 4, showParties: false },
} as const

export const appeals = [
  {
    id: 'appeal-delivery',
    caseKey: 'delivery',
    status: 'pendingDecision',
    role: 'appealSeven',
    note: 'appealDelivery',
    date: '2026-10-06',
    kind: 'appeal',
    panelSize: 11,
    remainingDays: 8,
  },
  {
    id: 'appeal-fake-accounts',
    caseKey: 'fakeAccounts',
    status: 'review',
    role: 'appealNineteen',
    note: 'appealNetworkAd',
    date: '2026-10-08',
    kind: 'appeal',
    panelSize: 23,
    remainingDays: 4,
  },
  {
    id: 'appeal-seats',
    caseKey: 'appealSeats',
    status: 'reversed',
    role: 'appealThree',
    note: 'appealSeats',
    date: '2026-09-29',
    kind: 'appeal',
    reward: true,
    panelSize: 11,
  },
] satisfies Assignment[]

export const appealListDetails = {
  'appeal-delivery': { seat: 7, round: 1 },
  'appeal-fake-accounts': { seat: 19, round: 2 },
  'appeal-seats': { seat: 3, round: 1 },
} as const

export const participation = [
  arbitrations[2],
  closedMediations[0],
  appeals[2],
  arbitrations[3],
  closedMediations[1],
  closedMediations[2],
  closedMediations[3],
  {
    id: 'exchange',
    caseKey: 'exchange',
    status: 'issued',
    role: 'arbitratorOne',
    note: 'exchange',
    date: '2026-07-21',
    kind: 'arbitration',
    reward: true,
  },
] satisfies Assignment[]

export const participationListDetails = {
  return: { seat: 2, total: 5, outcomeKey: 'logMatched', tone: 'ok' },
  seats: { seat: 2, total: 3, outcomeKey: 'logMediationFailedMissing', tone: 'no' },
  'appeal-seats': {
    seat: 3,
    total: 11,
    outcomeKey: 'logMatchedReversed',
    tone: 'ok',
    appeal: true,
  },
  scope: { seat: 4, total: 5, outcomeKey: 'logDifferedDeposit', tone: 'off' },
  reply: { seat: 1, total: 3, outcomeKey: 'logMediationSucceeded', tone: 'ok' },
  'scope-mediation': {
    seat: 3,
    total: 3,
    outcomeKey: 'logMediationSucceeded',
    tone: 'ok',
  },
  ratings: { seat: 2, total: 3, outcomeKey: 'logMediationFailedReceived', tone: 'no' },
  exchange: { seat: 1, total: 5, outcomeKey: 'logMatched', tone: 'ok' },
} as const

// shortcut: submissions only update page-local mock state; replace this when the backend is ready.
export async function submitMock<T>(value: T): Promise<T> {
  return Promise.resolve(value)
}

export function withCurrency(text: string, currency: string) {
  return text.replaceAll('{currency}', currency)
}
