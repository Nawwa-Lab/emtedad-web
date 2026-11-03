export const AUTH_SESSION_EVENT = 'emtedad:auth-session'

export type AuthSessionAction = 'reconnect' | 'disconnect'

export function notifyAuthSession(action: AuthSessionAction) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<AuthSessionAction>(AUTH_SESSION_EVENT, { detail: action }))
}
