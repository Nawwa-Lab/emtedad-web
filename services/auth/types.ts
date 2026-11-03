import type { components } from '@/services/generated/openapi'

// shortcut: OpenAPI omits the /users/me response schema; replace with its generated type once documented.
export type CurrentUserProfile = {
  account: {
    uuid: string
    first: string | null
    last: string | null
    role: 'org_admin' | 'team_worker' | 'emtedad_admin' | 'community_member'
    activeContext: 'org' | 'community'
    profilePhotoUrl: string | null
    org: {
      organizationId: string
      legalName: string
      coverImageUrl: string | null
    } | null
  }
}

export type LoginInput = components['schemas']['LoginDto']
export type ForgotPasswordInput = components['schemas']['ForgotPasswordDto']
export type ResetPasswordInput = components['schemas']['ResetPasswordDto']
export type ContextSwitchInput = components['schemas']['ContextSwitchDto']

// shortcut: generated OpenAPI omits reset preview, remove this local type after it is refreshed.
export type ResetPasswordPreview =
  { valid: false; reason: 'INVALID_OR_UNAVAILABLE' } | { valid: true; expiresAt: string }

export type InvitationType = 'organization' | 'member'

export type InvitationPreview =
  | { valid: false; reason: 'INVALID_OR_UNAVAILABLE' }
  | {
      valid: true
      type: InvitationType
      invitee: { email: string; fullName: string }
      organization: { id: string; name: string } | null
      expiresAt: string
    }

// shortcut: generated OpenAPI still requires email; remove these local types after it is refreshed.
export type AcceptInvitationInput = {
  token: string
  password: string
  firstName: string
  lastName: string
}

export type RegisterOrganizationInput = {
  inviteToken: string
  password: string
  firstName: string
  lastName: string
  legalName: string
  mission?: string
  description?: string
  websiteUrl?: string
  country?: string
  city?: string
  foundationDate?: string
  areasOfWork?: string[]
}

export type InvitationRegistrationResult = {
  accountId: string
  orgId: string
  role?: 'team_worker'
}

export type InviteTeamWorkerInput = components['schemas']['InviteTeamWorkerDto']
export type InviteOrganizationInput = {
  founderFullName: string
  targetEmail: string
}
export type IssuedInvitation = {
  invitationId: string
  email: string
  expiresAt: string
}

export type AuthMessage = { message: string }
export type ContextSwitchResult = { message?: string; context?: ContextSwitchInput['context'] }
