export type SurveyAudience = 'all' | 'orgsTeam' | 'disputed'

export const surveyWeights = [
  { key: 'organizations', share: 0.5 },
  { key: 'audience', share: 0.3 },
  { key: 'team', share: 0.2 },
] as const

export type SurveyQuestionSeed = 'q1' | 'q2' | 'q3' | 'q4' | 'q5'

export type SurveyQuestion = {
  id: number
  audience: SurveyAudience
  seed?: SurveyQuestionSeed
  text?: string
}

export const surveyQuestionSeeds: SurveyQuestion[] = [
  { id: 1, audience: 'all', seed: 'q1' },
  { id: 2, audience: 'all', seed: 'q2' },
  { id: 3, audience: 'all', seed: 'q3' },
  { id: 4, audience: 'orgsTeam', seed: 'q4' },
  { id: 5, audience: 'disputed', seed: 'q5' },
]
