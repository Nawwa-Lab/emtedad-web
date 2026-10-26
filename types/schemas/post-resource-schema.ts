import { z } from 'zod'

export function createPostResourceSchema(err: {
  imagesRequired?: string
  imagesMax?: string
  titleRequired: string
  titleMin: string
  descriptionRequired?: string
  categoryRequired: string
  priceRequired?: string
  pricePositive?: string
  memberRequired?: string
  depositValueRequired?: string
  depositValuePositive?: string
  supervisorRequired?: string
  supervisorPriceRequired?: string
  supervisorPricePositive?: string
  specificDurationRequired?: string
}) {
  return z
    .object({
      images: z
        .array(z.any())
        .min(1, err.imagesRequired || 'Required')
        .max(6, err.imagesMax || 'Maximum 6 images allowed'),
      title: z.string().min(1, err.titleRequired).min(3, err.titleMin),
      description: z.string().min(1, err.descriptionRequired || 'Required'),
      category: z.string().min(1, err.categoryRequired),
      pricingType: z.enum(['paid', 'free']),
      price: z.number().optional(),
      duration: z.enum(['any', 'specific']),
      specificDuration: z.string().optional(),
      durationUnit: z.enum(['days', 'hours']).optional(),
      from: z.string().optional(),
      to: z.string().optional(),
      cashDeposit: z.boolean().optional(),
      depositValue: z.number().optional(),
      supervisedUse: z.boolean().optional(),
      supervisor: z.string().optional(),
      supervisorHours: z.number().optional(),
      supervisorRate: z.number().optional(),
      supervisorPrice: z.number().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.pricingType === 'paid') {
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
      if (
        data.cashDeposit &&
        (data.depositValue === undefined || isNaN(data.depositValue) || data.depositValue <= 0)
      ) {
        ctx.addIssue({
          code: 'custom',
          message: err.depositValueRequired || 'Required',
          path: ['depositValue'],
        })
      }
      if (data.supervisedUse) {
        if (!data.supervisor || data.supervisor.trim() === '') {
          ctx.addIssue({
            code: 'custom',
            message: err.supervisorRequired || 'Required',
            path: ['supervisor'],
          })
        }
        if (
          data.supervisorHours === undefined ||
          isNaN(data.supervisorHours) ||
          data.supervisorHours <= 0
        ) {
          ctx.addIssue({
            code: 'custom',
            message: err.supervisorPriceRequired || 'Required',
            path: ['supervisorHours'],
          })
        }
      }
    })
}

export type PostResourceFormValues = z.infer<ReturnType<typeof createPostResourceSchema>>
