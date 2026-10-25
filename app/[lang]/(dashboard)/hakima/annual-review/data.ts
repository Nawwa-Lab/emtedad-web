import type { AnnualReviewFormValues } from '@/types/schemas'

export const annualReviewQuestions = [
  'exchange',
  'governance',
  'discovery',
  'fairness',
  'retention',
] as const
export const annualReviewScale = ['1', '2', '3', '4', '5'] as const

export const annualReview = {
  year: 2026,
  closesDay: 30,
  questions: 5,
  reward: 30,
  organizations: 19,
  audienceWeight: 30,
  organizationsWeight: 50,
  teamsWeight: 20,
  rewardsPool: 36800,
  exchangeVolume: 184000,
  poolPercent: 20,
  organizationTokens: 1485,
  networkTokens: 46200,
  tokenPercent: 3.2,
  poolShare: 1183,
  completedCycles: 3,
  totalCycles: 4,
  cycleReward: 30,
  surveyReward: 30,
  expectedTotal: 1243,
} as const

export const annualReviewDefaults = {
  exchange: '4',
  governance: '4',
} satisfies Partial<AnnualReviewFormValues>

// shortcut: survey persistence stays local until the annual-review API is available.
export async function saveAnnualReview(value: Partial<AnnualReviewFormValues>) {
  return Promise.resolve(value)
}

export async function submitAnnualReview(value: AnnualReviewFormValues) {
  return Promise.resolve(value)
}
