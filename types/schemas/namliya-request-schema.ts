import { z } from 'zod'

export function createNamliyaRequestSchema(err: { durationRequired: string }) {
  return z.object({
    unit: z.enum(['hours', 'days']),
    duration: z.string().trim().min(1, err.durationRequired),
    preferredDate: z.string().optional(),
    alternativeDate: z.string().optional(),
    notes: z.string().optional(),
  })
}

export type NamliyaRequestFormValues = z.infer<ReturnType<typeof createNamliyaRequestSchema>>
