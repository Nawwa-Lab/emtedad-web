import { request } from '@/services/http'
import type {
  AuthMessage,
  ContextSwitchInput,
  ContextSwitchResult,
  CurrentUserProfile,
  ForgotPasswordInput,
  LoginInput,
  ResetPasswordInput,
} from './types'

const ENDPOINT_PREFIX = '/api/v1/auth'

export const authApi = {
  login: (data: LoginInput) =>
    request<AuthMessage>(`${ENDPOINT_PREFIX}/login`, { method: 'POST', body: data }),
  logout: () => request<void>(`${ENDPOINT_PREFIX}/logout`, { method: 'POST' }),
  getCurrentUser: () => request<CurrentUserProfile>('/api/v1/users/me'),
  forgotPassword: (data: ForgotPasswordInput) =>
    request<AuthMessage>(`${ENDPOINT_PREFIX}/forgot-password`, { method: 'POST', body: data }),
  resetPassword: (data: ResetPasswordInput) =>
    request<AuthMessage>(`${ENDPOINT_PREFIX}/reset-password`, { method: 'POST', body: data }),
  switchContext: (data: ContextSwitchInput) =>
    request<ContextSwitchResult>(`${ENDPOINT_PREFIX}/context-switch`, {
      method: 'PUT',
      body: data,
    }),
}
