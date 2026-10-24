export type ProposalCategory = 'protocol' | 'membership' | 'other'
export type ProposalStatus = 'support' | 'voting' | 'done'

export type Proposal = {
  id: string
  category: ProposalCategory
  status: ProposalStatus
  threshold: number
  thresholdPercent: number
  thresholdMarker?: number
  support: number
  remainingDays?: number
  supporters?: number
  supportedByUser?: boolean
  vote?: 'yes' | 'no'
  result?: 'passed' | 'failed'
}

export const networkTokens = 46200
export const organizationTokens = 1485
export const participationReward = 30
export const supportThreshold = 2310

export const proposals = {
  'small-business-cap': {
    id: 'small-business-cap',
    category: 'protocol',
    status: 'voting',
    threshold: 27720,
    thresholdPercent: 60,
    support: 18340,
    remainingDays: 3,
    vote: 'yes',
  },
  'shorter-decay': {
    id: 'shorter-decay',
    category: 'protocol',
    status: 'support',
    threshold: supportThreshold,
    thresholdPercent: 5,
    support: 3180,
    thresholdMarker: 73,
    remainingDays: 4,
    supporters: 7,
    supportedByUser: true,
  },
  'membership-list': {
    id: 'membership-list',
    category: 'membership',
    status: 'voting',
    threshold: 9240,
    thresholdPercent: 20,
    support: 11020,
    thresholdMarker: 84,
    remainingDays: 3,
  },
  'add-margin': {
    id: 'add-margin',
    category: 'membership',
    status: 'support',
    threshold: supportThreshold,
    thresholdPercent: 5,
    support: 1840,
    remainingDays: 4,
    supporters: 4,
  },
  'remove-candidate': {
    id: 'remove-candidate',
    category: 'membership',
    status: 'support',
    threshold: supportThreshold,
    thresholdPercent: 5,
    support: 2560,
    thresholdMarker: 90,
    remainingDays: 4,
    supporters: 5,
    supportedByUser: true,
  },
  'rotating-meeting': {
    id: 'rotating-meeting',
    category: 'other',
    status: 'voting',
    threshold: 9240,
    thresholdPercent: 20,
    support: 9880,
    thresholdMarker: 94,
    remainingDays: 3,
    vote: 'yes',
  },
  'digital-resources': {
    id: 'digital-resources',
    category: 'other',
    status: 'done',
    threshold: 9240,
    thresholdPercent: 20,
    support: 12440,
    thresholdMarker: 74,
    result: 'passed',
  },
  'direct-transfer': {
    id: 'direct-transfer',
    category: 'other',
    status: 'support',
    threshold: supportThreshold,
    thresholdPercent: 5,
    support: 1420,
    remainingDays: 4,
    supporters: 3,
  },
  'lower-protocol-threshold': {
    id: 'lower-protocol-threshold',
    category: 'protocol',
    status: 'support',
    threshold: supportThreshold,
    thresholdPercent: 5,
    support: 940,
    remainingDays: 4,
    supporters: 2,
  },
  'activity-cap': {
    id: 'activity-cap',
    category: 'protocol',
    status: 'voting',
    threshold: 27720,
    thresholdPercent: 60,
    support: 14880,
    remainingDays: 3,
  },
  'shorter-cycle': {
    id: 'shorter-cycle',
    category: 'protocol',
    status: 'done',
    threshold: 27720,
    thresholdPercent: 60,
    support: 19100,
    result: 'failed',
  },
} as const satisfies Record<string, Proposal>

export type ProposalId = keyof typeof proposals

export const browseGroups = [
  { category: 'protocol', ids: ['small-business-cap', 'shorter-decay'] },
  { category: 'membership', ids: ['membership-list', 'add-margin', 'remove-candidate'] },
  { category: 'other', ids: ['rotating-meeting', 'digital-resources'] },
] as const

export const supportProposalIds = [
  'shorter-decay',
  'remove-candidate',
  'add-margin',
  'direct-transfer',
  'lower-protocol-threshold',
] as const

export const votingProposalIds = [
  'small-business-cap',
  'activity-cap',
  'membership-list',
  'rotating-meeting',
] as const

export const myProposalIds = [
  'direct-transfer',
  'activity-cap',
  'digital-resources',
  'shorter-cycle',
] as const

export const proposalCommentOrganizationIds = ['sawt-we-sora', 'halqa', 'milha', 'daw'] as const

// shortcut: local fixtures stand in for the governance API until backend integration.
export async function submitProposal<T>(value: T): Promise<T> {
  return Promise.resolve(value)
}
