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
  serviceHoursRequired?: string
  hourlyRateRequired?: string
}) {
  return z
    .object({
      title: z.string().min(1, err.titleRequired).min(5, err.titleMin),
      description: z.string().min(1, err.descriptionRequired || 'Required'),
      category: z.string().min(1, err.categoryRequired),
      pricingType: z.enum(['paid', 'free']),
      serviceHours: z.string().optional(),
      hourlyRate: z.number().optional(),
      price: z.number().optional(),
      duration: z.enum(['any', 'specific']),
      specificDuration: z.string().optional(),
      durationUnit: z.string().optional(),
      from: z.string().optional(),
      to: z.string().optional(),
      member: z.string().min(1, err.memberRequired),
    })
    .superRefine((data, ctx) => {
      if (data.pricingType === 'paid') {
        if (!data.serviceHours || data.serviceHours.trim() === '') {
          ctx.addIssue({
            code: 'custom',
            message: err.serviceHoursRequired || 'Required',
            path: ['serviceHours'],
          })
        }
        if (data.hourlyRate === undefined || data.hourlyRate < 1 || data.hourlyRate > 5) {
          ctx.addIssue({
            code: 'custom',
            message: err.hourlyRateRequired || 'Required',
            path: ['hourlyRate'],
          })
        }
        if (data.price === undefined || isNaN(data.price) || data.price <= 0) {
          ctx.addIssue({
            code: 'custom',
            message: err.pricePositive || err.priceRequired || 'Must be a positive number',
            path: ['price'],
          })
        }
      }
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
