import { request } from '@/services/http'
import type {
  AuthMessage,
  AcceptInvitationInput,
  ContextSwitchInput,
  ContextSwitchResult,
  CurrentUserProfile,
  ForgotPasswordInput,
  InviteOrganizationInput,
  IssuedInvitation,
  InviteTeamWorkerInput,
  InvitationPreview,
  InvitationRegistrationResult,
  InvitationType,
  LoginInput,
  RegisterOrganizationInput,
  ResetPasswordInput,
  ResetPasswordPreview,
} from './types'

const ENDPOINT_PREFIX = '/api/v1/auth'

function parseInvitationPreview(value: unknown): InvitationPreview {
  if (!value || typeof value !== 'object') throw new Error('Invalid invitation preview response')

  const preview = value as Record<string, unknown>
  if (preview.valid === false && preview.reason === 'INVALID_OR_UNAVAILABLE') {
    return { valid: false, reason: preview.reason }
  }

  const invitee = preview.invitee as Record<string, unknown> | undefined
  const organization = preview.organization as Record<string, unknown> | null | undefined
  const validOrganization =
    (preview.type === 'organization' && organization === null) ||
    (preview.type === 'member' &&
      organization !== null &&
      typeof organization === 'object' &&
      typeof organization.id === 'string' &&
      typeof organization.name === 'string')

  if (
    preview.valid !== true ||
    (preview.type !== 'organization' && preview.type !== 'member') ||
    !invitee ||
    typeof invitee.email !== 'string' ||
    typeof invitee.fullName !== 'string' ||
    typeof preview.expiresAt !== 'string' ||
    !validOrganization
  ) {
    throw new Error('Invalid invitation preview response')
  }

  return value as InvitationPreview
}

function parseResetPasswordPreview(value: unknown): ResetPasswordPreview {
  if (!value || typeof value !== 'object') throw new Error('Invalid reset preview response')

  const preview = value as Record<string, unknown>
  if (preview.valid === false && preview.reason === 'INVALID_OR_UNAVAILABLE') {
    return { valid: false, reason: preview.reason }
  }
  if (preview.valid === true && typeof preview.expiresAt === 'string') {
    return { valid: true, expiresAt: preview.expiresAt }
  }

  throw new Error('Invalid reset preview response')
}

export const authApi = {
  login: (data: LoginInput) =>
    request<AuthMessage>(`${ENDPOINT_PREFIX}/login`, { method: 'POST', body: data }),
  logout: () => request<void>(`${ENDPOINT_PREFIX}/logout`, { method: 'POST' }),
  getCurrentUser: () => request<CurrentUserProfile>('/api/v1/users/me'),
  forgotPassword: (data: ForgotPasswordInput) =>
    request<AuthMessage>(`${ENDPOINT_PREFIX}/forgot-password`, { method: 'POST', body: data }),
  resetPassword: (data: ResetPasswordInput) =>
    request<AuthMessage>(`${ENDPOINT_PREFIX}/reset-password`, { method: 'POST', body: data }),
  previewResetPassword: (token: string) =>
    request<unknown>(`${ENDPOINT_PREFIX}/reset-password/preview`, {
      method: 'POST',
      cache: 'no-store',
      body: { token },
    }).then(parseResetPasswordPreview),
  previewInvitation: (type: InvitationType, token: string) =>
    request<unknown>('/api/v1/invitations/preview', {
      method: 'POST',
      cache: 'no-store',
      body: { type, token },
    }).then(parseInvitationPreview),
  acceptInvitation: (data: AcceptInvitationInput) =>
    request<InvitationRegistrationResult>(`${ENDPOINT_PREFIX}/accept-invite`, {
      method: 'POST',
      body: data,
    }),
  registerOrganization: (data: RegisterOrganizationInput) =>
    request<InvitationRegistrationResult>(`${ENDPOINT_PREFIX}/org-register`, {
      method: 'POST',
      body: data,
    }),
  inviteTeamWorker: (data: InviteTeamWorkerInput) =>
    request<IssuedInvitation>(`${ENDPOINT_PREFIX}/invite`, { method: 'POST', body: data }),
  inviteOrganization: (data: InviteOrganizationInput) =>
    request<{ invitationId: string; targetEmail: string; expiresAt: string }>(
      '/api/v1/invitations',
      {
        method: 'POST',
        body: data,
      },
    ).then(({ invitationId, targetEmail, expiresAt }) => ({
      invitationId,
      email: targetEmail,
      expiresAt,
    })),
  switchContext: (data: ContextSwitchInput) =>
    request<ContextSwitchResult>(`${ENDPOINT_PREFIX}/context-switch`, {
      method: 'PUT',
      body: data,
    }),
}
