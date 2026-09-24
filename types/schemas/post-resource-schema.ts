import { z } from 'zod'

export function createPostResourceSchema(err: {
  titleRequired: string
  titleMin: string
  categoryRequired: string
  memberRequired: string
}) {
  return z.object({
    title: z.string().min(1, err.titleRequired).min(3, err.titleMin),
    description: z.string().optional(),
    category: z.string().min(1, err.categoryRequired),
    price: z.string().optional(),
    duration: z.enum(['any', 'specific']),
    cashDeposit: z.boolean().optional(),
    depositValue: z.string().optional(),
    supervisedUse: z.boolean().optional(),
    supervisor: z.string().optional(),
    supervisorPrice: z.string().optional(),
  })
}

export type PostResourceFormValues = z.infer<ReturnType<typeof createPostResourceSchema>>
