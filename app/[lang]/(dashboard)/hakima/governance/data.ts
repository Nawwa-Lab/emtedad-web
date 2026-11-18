export type GovernanceTab = 'cyc' | 'vote' | 'srv' | 'res'

export const governanceTabs = ['cyc', 'vote', 'srv', 'res'] as const

export const teamTokens = 4620

export const cyclePhases = [
  { key: 'submission', state: 'done' },
  { key: 'support', state: 'now' },
  { key: 'voting', state: 'idle' },
  { key: 'decision', state: 'idle' },
] as const

export const teamVoteProposals = [
  {
    id: 'small-business-cap',
    rowKey: 'creditCap',
    category: 'protocol',
    thresholdPercent: 60,
    supported: false,
    qualified: false,
  },
  {
    id: 'digital-resources',
    rowKey: 'digitalResources',
    category: 'other',
    thresholdPercent: 20,
    supported: true,
    qualified: true,
  },
] as const

export const draftSurveyDaysLeft = 6

export const pastSurvey = { answered: 42, members: 48, index: 81 } as const

export const closedCycles = [
  { key: 'cycle3', submitted: 9, voting: 4, approved: 2, participation: 78 },
  { key: 'cycle2', submitted: 7, voting: 3, approved: 3, participation: 71 },
] as const
