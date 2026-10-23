import { z } from 'zod'

export function createExchangeComplaintSchema(err: {
  exchangeRequired: string
  titleRequired: string
  detailsRequired: string
  detailsMin: string
  requestRequired: string
}) {
  return z.object({
    exchange: z.string().min(1, err.exchangeRequired),
    title: z.string().trim().min(1, err.titleRequired),
    details: z.string().trim().min(1, err.detailsRequired).min(10, err.detailsMin),
    request: z.string().trim().min(1, err.requestRequired),
  })
}

export type ExchangeComplaintFormValues = z.infer<ReturnType<typeof createExchangeComplaintSchema>>
