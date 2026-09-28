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
  memberRequired: string
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
        .max(5, err.imagesMax || 'Maximum 5 images allowed'),
      title: z.string().min(1, err.titleRequired).min(3, err.titleMin),
      description: z.string().min(1, err.descriptionRequired || 'Required'),
      category: z.string().min(1, err.categoryRequired),
      price: z
        .number(err.priceRequired ? { message: err.priceRequired } : undefined)
        .positive(err.pricePositive || err.priceRequired || 'Must be a positive number'),
      duration: z.enum(['any', 'specific']),
      specificDuration: z.string().optional(),
      cashDeposit: z.boolean().optional(),
      depositValue: z
        .number(
          err.depositValuePositive || err.depositValueRequired
            ? { message: err.depositValuePositive || err.depositValueRequired }
            : undefined,
        )
        .positive(
          err.depositValuePositive || err.depositValueRequired || 'Must be a positive number',
        )
        .optional(),
      supervisedUse: z.boolean().optional(),
      supervisor: z.string().optional(),
      supervisorPrice: z
        .number(
          err.supervisorPricePositive || err.supervisorPriceRequired
            ? { message: err.supervisorPricePositive || err.supervisorPriceRequired }
            : undefined,
        )
        .positive(
          err.supervisorPricePositive || err.supervisorPriceRequired || 'Must be a positive number',
        )
        .optional(),
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
      if (data.cashDeposit && (data.depositValue === undefined || isNaN(data.depositValue))) {
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
        if (data.supervisorPrice === undefined || isNaN(data.supervisorPrice)) {
          ctx.addIssue({
            code: 'custom',
            message: err.supervisorPriceRequired || 'Required',
            path: ['supervisorPrice'],
          })
        }
      }
    })
}

export type PostResourceFormValues = z.infer<ReturnType<typeof createPostResourceSchema>>
