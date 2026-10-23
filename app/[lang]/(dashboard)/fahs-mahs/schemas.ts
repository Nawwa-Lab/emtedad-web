import { z } from 'zod'

export const settlementSchema = (required: string) =>
  z.object({ proposal: z.string().trim().min(10, required) })
export const mediationReportSchema = (required: string) =>
  z.object({ where: z.string().trim().min(10, required), partial: z.string().trim() })
export const arbitrationDecisionSchema = (required: string) =>
  z.object({
    party: z.enum(['a', 'b']),
    reason: z.string().trim().min(10, required),
    penalty: z.enum(['0', '1', '2', '3']),
  })
