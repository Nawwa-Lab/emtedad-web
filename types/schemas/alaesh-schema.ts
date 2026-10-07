import { z } from 'zod'

export function createAlaeshRequestSchema(err: {
  titleRequired: string
  titleMin: string
  descriptionRequired: string
  descriptionMin: string
  categoryRequired: string
  marketRequired: string
}) {
  return z.object({
    market: z.enum(['namliya', 'khalis'], { message: err.marketRequired }),
    title: z.string().min(1, err.titleRequired).min(3, err.titleMin),
    description: z.string().min(1, err.descriptionRequired).min(10, err.descriptionMin),
    category: z.string().min(1, err.categoryRequired),
    timeframe: z.string().optional(),
  })
}

export type AlaeshRequestFormValues = z.infer<ReturnType<typeof createAlaeshRequestSchema>>
