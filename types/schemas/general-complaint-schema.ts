import { z } from 'zod'

export function createGeneralComplaintSchema(err: {
  kindRequired: string
  targetRequired: string
  titleRequired: string
  detailsRequired: string
  detailsMin: string
  requestRequired: string
}) {
  return z.object({
    kind: z.string().min(1, err.kindRequired),
    target: z.string().trim().min(1, err.targetRequired),
    title: z.string().trim().min(1, err.titleRequired),
    details: z.string().trim().min(1, err.detailsRequired).min(10, err.detailsMin),
    request: z.string().trim().min(1, err.requestRequired),
  })
}

export type GeneralComplaintFormValues = z.infer<ReturnType<typeof createGeneralComplaintSchema>>
