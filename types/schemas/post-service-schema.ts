import { z } from 'zod'

export function createPostServiceSchema(err: {
  titleRequired: string
  titleMin: string
  descriptionRequired?: string
  categoryRequired: string
  priceRequired?: string
  pricePositive?: string
  memberRequired: string
  specificDurationRequired?: string
}) {
  return z
    .object({
      title: z.string().min(1, err.titleRequired).min(5, err.titleMin),
      description: z.string().min(1, err.descriptionRequired || 'Required'),
      category: z.string().min(1, err.categoryRequired),
      price: z
        .number(err.priceRequired ? { message: err.priceRequired } : undefined)
        .positive(err.pricePositive || err.priceRequired || 'Must be a positive number'),
      duration: z.enum(['any', 'specific']),
      specificDuration: z.string().optional(),
      member: z.string().min(1, err.memberRequired),
    })
    .superRefine((data, ctx) => {
      if (
        data.duration === 'specific' &&
        (!data.specificDuration || data.specificDuration.trim() === '')
      ) {
        ctx.addIssue({
          code: 'custom',
          message: err.specificDurationRequired || 'Required',
          path: ['specificDuration'],
        })
      }
    })
}

export type PostServiceFormValues = z.infer<ReturnType<typeof createPostServiceSchema>>
