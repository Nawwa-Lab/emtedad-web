import { z } from 'zod'

export function createAlaeshRequestSchema(err: {
  titleRequired: string
  titleMin: string
  descriptionRequired: string
  descriptionMin: string
  categoryRequired: string
  marketRequired: string
  timeframeRequired: string
  positiveNumber: string
}) {
  return z
    .object({
      kind: z.enum(['human', 'resource']),
      title: z.string().trim().min(1, err.titleRequired).min(3, err.titleMin),
      description: z.string().trim().min(1, err.descriptionRequired).min(10, err.descriptionMin),
      category: z.string().trim().min(1, err.categoryRequired).max(14),
      market: z.enum(['namliya', 'khalis'], { message: err.marketRequired }),
      timeframeMode: z.enum(['open', 'fixed']),
      timeframeFrom: z.string(),
      timeframeTo: z.string(),
      hours: z.number().int().min(1, err.positiveNumber),
      rate: z.number().int().min(1).max(5),
      resourceValue: z.number().int().min(0, err.positiveNumber),
    })
    .superRefine((values, context) => {
      if (values.timeframeMode !== 'fixed') return

      if (!values.timeframeFrom.trim()) {
        context.addIssue({
          code: 'custom',
          path: ['timeframeFrom'],
          message: err.timeframeRequired,
        })
      }
      if (!values.timeframeTo.trim()) {
        context.addIssue({
          code: 'custom',
          path: ['timeframeTo'],
          message: err.timeframeRequired,
        })
      }
    })
}

export type AlaeshRequestFormValues = z.infer<ReturnType<typeof createAlaeshRequestSchema>>
