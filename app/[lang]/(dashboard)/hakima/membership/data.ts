export type MembershipVote = 'yes' | 'no'

export type CandidateId = 'margin' | 'awn' | 'law-culture' | 'mahrousa'

export type Candidate = {
  id: CandidateId
  initial: string
  warning?: boolean
  files: Array<{ id: string; size: number; unit: 'mb' | 'kb' }>
}

export const membershipVote = {
  threshold: 9240,
  thresholdPercent: 20,
  networkTokens: 46200,
  support: 11020,
  organizationTokens: 1485,
} as const

export const candidates: Candidate[] = [
  {
    id: 'margin',
    initial: 'ه',
    warning: true,
    files: [
      { id: 'application', size: 2.1, unit: 'mb' },
      { id: 'portfolio', size: 8.4, unit: 'mb' },
    ],
  },
  {
    id: 'awn',
    initial: 'ع',
    files: [
      { id: 'application', size: 1.7, unit: 'mb' },
      { id: 'recommendation', size: 340, unit: 'kb' },
    ],
  },
  {
    id: 'law-culture',
    initial: 'ق',
    files: [{ id: 'application', size: 1.4, unit: 'mb' }],
  },
  {
    id: 'mahrousa',
    initial: 'ن',
    files: [{ id: 'application', size: 980, unit: 'kb' }],
  },
]

// shortcut: membership voting stays local until the governance API is available.
export async function submitMembershipVote(vote: MembershipVote) {
  return Promise.resolve(vote)
}
