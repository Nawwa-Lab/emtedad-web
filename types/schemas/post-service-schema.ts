import { z } from 'zod'

export function createPostServiceSchema(err: {
  titleRequired: string
  titleMin: string
  categoryRequired: string
  memberRequired: string
}) {
  return z.object({
    title: z.string().min(1, err.titleRequired).min(5, err.titleMin),
    description: z.string().optional(),
    category: z.string().min(1, err.categoryRequired),
    price: z.string().optional(),
    duration: z.enum(['any', 'specific']),
    member: z.string().min(1, err.memberRequired),
  })
}

export type PostServiceFormValues = z.infer<ReturnType<typeof createPostServiceSchema>>
