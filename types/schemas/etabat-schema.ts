import { z } from 'zod'

export function createCaseResponseSchema(err: { responseRequired: string; responseMin: string }) {
  return z.object({
    response: z.string().trim().min(1, err.responseRequired).min(10, err.responseMin),
    proposal: z.string(),
  })
}

export type CaseResponseFormValues = z.infer<ReturnType<typeof createCaseResponseSchema>>
