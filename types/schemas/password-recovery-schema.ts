import { z } from 'zod'

export function createForgotPasswordSchema(err: { emailRequired: string; emailInvalid: string }) {
  return z.object({
    email: z.email(err.emailInvalid).min(1, err.emailRequired),
  })
}

export function createResetPasswordSchema(err: {
  passwordRequired: string
  passwordMin: string
  passwordMax: string
  confirmPasswordRequired: string
  passwordMismatch: string
}) {
  return z
    .object({
      password: z
        .string()
        .min(1, err.passwordRequired)
        .min(8, err.passwordMin)
        .max(128, err.passwordMax),
      confirmPassword: z.string().min(1, err.confirmPasswordRequired),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: err.passwordMismatch,
      path: ['confirmPassword'],
    })
}

export type ForgotPasswordFormValues = z.infer<ReturnType<typeof createForgotPasswordSchema>>
export type ResetPasswordFormValues = z.infer<ReturnType<typeof createResetPasswordSchema>>
