export type OrgKey = 'halaqa' | 'mishkaa'

export type AgreementParty = {
  org: OrgKey
  tone: 'gold' | 'red'
  status: 'other' | 'you'
}

export type HistoryEvent = {
  who?: OrgKey
  key: string
}

export type HistoryVersion = {
  /** Version number; also selects the `history.v{n}.*` locale keys. */
  n: number
  tag: 'active' | 'superseded'
  /** Field keys whose before/after values are recorded for this version. */
  changes: string[]
  events: HistoryEvent[]
}

export type Amendment = {
  id: string
  /** Row label key (`messages.agreement.rows.*`). */
  row: string
  /** Current value key (`messages.agreement.values.*`). */
  oldValue: string
  /** Proposed value key (`agreements.diff.*`). */
  newValue: string
}

// Panel-22 / panel-22_1 fixtures — agreement 1 belongs to the `halqa` conversation.
export const agreement = {
  conversationId: 'halqa',
  value: 55,
  proposer: { org: 'halaqa' as OrgKey, profileHref: '/organization/halqa' },
  parties: [
    { org: 'halaqa', tone: 'gold', status: 'other' },
    { org: 'mishkaa', tone: 'red', status: 'you' },
  ] satisfies AgreementParty[],
  // [row label key, value key] — values ending in `None` render muted.
  rows: [
    ['deliverables', 'deliverables'],
    ['quantity', 'quantity'],
    ['duration', 'duration'],
    ['milestones', 'milestones'],
    ['value', 'value'],
    ['specialTerms', 'specialTerms'],
    ['supplierTerms', 'supplierTermsNone'],
    ['cashDeposit', 'cashDepositNone'],
    ['supervision', 'supervisionNone'],
  ],
  pending: {
    row: 'milestones',
    oldValue: 'milestones',
    newValue: 'milestonesProposed',
    by: 'mishkaa' satisfies OrgKey,
  },
  versions: [
    {
      n: 2,
      tag: 'active',
      changes: ['deliverables', 'value'],
      events: [{ who: 'mishkaa', key: 'e1' }, { who: 'halaqa', key: 'e2' }, { key: 'e3' }],
    },
    {
      n: 1,
      tag: 'superseded',
      changes: [],
      events: [{ who: 'mishkaa', key: 'e1' }, { who: 'halaqa', key: 'e2' }, { key: 'e3' }],
    },
  ] satisfies HistoryVersion[],
}

export const amendments: Amendment[] = [
  { id: 'amd1', row: 'milestones', oldValue: 'milestones', newValue: 'milestonesProposed' },
  { id: 'amd2', row: 'deliverables', oldValue: 'deliverables', newValue: 'deliverablesProposed' },
]
