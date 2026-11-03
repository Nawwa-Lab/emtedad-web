import { z } from 'zod'

export function createInviteIssuanceSchema(err: {
  nameRequired: string
  nameMax: string
  emailRequired: string
  emailInvalid: string
}) {
  return z.object({
    name: z.string().trim().min(1, err.nameRequired).max(255, err.nameMax),
    email: z.string().trim().min(1, err.emailRequired).pipe(z.email(err.emailInvalid)),
  })
}

export type InviteIssuanceValues = z.infer<ReturnType<typeof createInviteIssuanceSchema>>
