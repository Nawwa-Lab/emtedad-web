import type { components } from '@/services/generated/openapi'

// shortcut: OpenAPI omits the /users/me response schema; replace with its generated type once documented.
export type CurrentUserProfile = {
  account: {
    uuid: string
    first: string | null
    last: string | null
    role: 'org_admin' | 'team_worker' | 'emtedad_admin' | 'community_member'
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

export type AuthMessage = { message: string }
export type ContextSwitchResult = { message?: string; context?: ContextSwitchInput['context'] }
