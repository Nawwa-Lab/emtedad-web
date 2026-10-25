import { z } from 'zod'

export function createHakimaProposalSchema(err: {
  title: string
  category: string
  proposal: string
  proposalMin: string
  reason: string
  impact: string
}) {
  return z.object({
    title: z.string().trim().min(1, err.title),
    category: z.enum(['protocol', 'membership', 'other'], { error: err.category }),
    proposal: z.string().trim().min(1, err.proposal).min(20, err.proposalMin),
    reason: z.string().trim().min(1, err.reason),
    impact: z.string().trim().min(1, err.impact),
    files: z.any().optional(),
  })
}

export type HakimaProposalFormValues = z.infer<ReturnType<typeof createHakimaProposalSchema>>

export function createAnnualReviewSchema(required: string) {
  const answer = z.enum(['1', '2', '3', '4', '5'], { error: required })

  return z.object({
    exchange: answer,
    governance: answer,
    discovery: answer,
    fairness: answer,
    retention: answer,
  })
}

export type AnnualReviewFormValues = z.infer<ReturnType<typeof createAnnualReviewSchema>>
