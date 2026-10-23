import { z } from 'zod'

export function createCaseResponseSchema(err: { responseRequired: string; responseMin: string }) {
  return z.object({
    response: z.string().trim().min(1, err.responseRequired).min(10, err.responseMin),
    proposal: z.string(),
  })
}

export type CaseResponseFormValues = z.infer<ReturnType<typeof createCaseResponseSchema>>

export function createArbitrationStartSchema(err: { consentRequired: string }) {
  return z.object({
    loanConsent: z.boolean().refine(Boolean, err.consentRequired),
    bindingConsent: z.boolean().refine(Boolean, err.consentRequired),
  })
}

export type ArbitrationStartFormValues = z.infer<ReturnType<typeof createArbitrationStartSchema>>

export function createArbitrationAppealSchema(err: {
  consentRequired: string
  reasonRequired: string
  reasonMin: string
}) {
  return createArbitrationStartSchema(err).extend({
    reason: z.string().trim().min(1, err.reasonRequired).min(10, err.reasonMin),
  })
}

export type ArbitrationAppealFormValues = z.infer<ReturnType<typeof createArbitrationAppealSchema>>
