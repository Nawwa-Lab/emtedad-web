import { z } from 'zod'

const tagPattern =
  /^[\p{L}\p{M}\p{N}]+(?:[-'’][\p{L}\p{M}\p{N}]+)*(?: [\p{L}\p{M}\p{N}]+(?:[-'’][\p{L}\p{M}\p{N}]+)*)?$/u

const normalizeTag = (value: string) => value.trim().replace(/\s+/g, ' ')

export function createWishSchema(err: {
  queryRequired: string
  titleRequired: string
  titleMin: string
  descriptionRequired: string
  descriptionMin: string
  categoryRequired: string
  categoryMax: string
  categoryWords: string
  impactRequired: string
  impactMin: string
  requireImpact: boolean
}) {
  return z.object({
    query: z.string().min(1, err.queryRequired),
    title: z.string().min(1, err.titleRequired).min(3, err.titleMin),
    description: z.string().min(1, err.descriptionRequired).min(10, err.descriptionMin),
    category: z
      .array(
        z
          .string()
          .transform(normalizeTag)
          .pipe(z.string().max(50, err.categoryMax).regex(tagPattern, err.categoryWords)),
      )
      .min(1, err.categoryRequired)
      .max(2, err.categoryMax),
    impact: err.requireImpact
      ? z.string().min(1, err.impactRequired).min(10, err.impactMin)
      : z.string(),
  })
}

export function searchWishSchema(err?: { queryRequired: string }) {
  return z.object({
    query: z.string().min(1, err?.queryRequired || 'Search query is required'),
  })
}

export type WishFormValues = z.infer<ReturnType<typeof createWishSchema>>
export type SearchWishValues = z.infer<ReturnType<typeof searchWishSchema>>
