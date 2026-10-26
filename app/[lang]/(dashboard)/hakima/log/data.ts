export type GovernanceLogTab = 'proposals' | 'membership' | 'participation'
export type GovernanceVote = 'yes' | 'no' | 'abstain'

export const governanceCycles = [
  { id: 4, live: true },
  { id: 3, live: false },
  { id: 2, live: false },
  { id: 1, live: false },
] as const

export const governanceStats = [
  { id: 'submitted', value: 9, icon: 'circles' },
  { id: 'voting', value: 4, icon: 'wave' },
  { id: 'approved', value: 2, total: 4, icon: 'star', highlighted: true, progress: 50 },
  { id: 'participation', value: 78, suffix: 'percent', icon: 'balance', progress: 78 },
] as const

export const governanceProposals = [
  {
    id: 'credit-cap',
    category: 'protocol',
    result: 'approved',
    yes: 29140,
    no: 6200,
    absent: 10860,
    threshold: 27720,
    thresholdPercent: 60,
    vote: 'yes',
  },
  {
    id: 'required-offer',
    category: 'protocol',
    result: 'rejected',
    yes: 21300,
    no: 14800,
    absent: 10100,
    threshold: 27720,
    thresholdPercent: 60,
    vote: 'no',
  },
  {
    id: 'training-pool',
    category: 'other',
    result: 'approved',
    yes: 12400,
    no: 3100,
    absent: 30700,
    threshold: 9240,
    thresholdPercent: 20,
    vote: 'yes',
  },
  {
    id: 'digital-resources',
    category: 'other',
    result: 'below-threshold',
    yes: 7900,
    no: 2050,
    absent: 36250,
    threshold: 9240,
    thresholdPercent: 20,
    vote: 'abstain',
  },
] as const

export const membershipFacts = [
  { id: 'candidates', value: 6 },
  { id: 'joined', value: 5 },
  { id: 'removed', value: 1 },
  { id: 'support', value: 11840 },
] as const

export const membershipOrganizations = [
  { id: 'beit-el-hekaya', removed: false },
  { id: 'el-warsha', removed: false },
  { id: 'sawt-el-madina', removed: false },
  { id: 'dar-noon', removed: false },
  { id: 'el-leila-el-kebira', removed: false },
  { id: 'el-tal', removed: true },
] as const

export const participationFacts = [
  { id: 'voted', value: 4, total: 4 },
  { id: 'supported', value: 6 },
  { id: 'submitted', value: 1 },
  { id: 'reward', value: 30, currency: true },
] as const

// shortcut: only cycle 3 has source data; add per-cycle fixtures when the backend provides them.
