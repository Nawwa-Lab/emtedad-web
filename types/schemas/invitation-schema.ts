import { z } from 'zod'

type AccountErrors = {
  required: string
  nameMax: string
  passwordMin: string
  passwordMax: string
  passwordMismatch: string
  consentRequired: string
}

const accountFields = (err: AccountErrors) => ({
  firstName: z.string().trim().min(1, err.required).max(100, err.nameMax),
  lastName: z.string().trim().min(1, err.required).max(100, err.nameMax),
  password: z.string().min(8, err.passwordMin).max(128, err.passwordMax),
  confirmPassword: z.string().min(1, err.required),
  acceptTerms: z.boolean().refine(Boolean, err.consentRequired),
})

export function createMemberInvitationSchema(err: AccountErrors) {
  return z.object(accountFields(err)).refine(
    ({ password, confirmPassword }) => {
      return password === confirmPassword
    },
    {
      message: err.passwordMismatch,
      path: ['confirmPassword'],
    },
  )
}

export function createOrganizationInvitationSchema(err: AccountErrors & { legalNameMax: string }) {
  return z
    .object({
      ...accountFields(err),
      legalName: z.string().trim().min(1, err.required).max(255, err.legalNameMax),
      mission: z.string(),
      description: z.string(),
      websiteUrl: z.string().max(255, err.nameMax),
      country: z.string().max(100, err.nameMax),
      city: z.string().max(100, err.nameMax),
      foundationDate: z.string(),
      areasOfWork: z.array(z.string()),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: err.passwordMismatch,
      path: ['confirmPassword'],
    })
}

export function splitInviteeName(fullName: string) {
  const [firstName = '', ...rest] = fullName.trim().split(/\s+/).filter(Boolean)
  return { firstName, lastName: rest.join(' ') }
}

export type MemberInvitationValues = z.infer<ReturnType<typeof createMemberInvitationSchema>>
export type OrganizationInvitationValues = z.infer<
  ReturnType<typeof createOrganizationInvitationSchema>
>
