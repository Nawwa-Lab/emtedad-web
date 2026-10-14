import { z } from 'zod'

export function createLoginSchema(err: {
  emailRequired: string
  emailInvalid: string
  passwordRequired: string
}) {
  return z.object({
    email: z.email(err.emailInvalid).min(1, err.emailRequired),
    password: z.string().min(1, err.passwordRequired),
  })
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>
