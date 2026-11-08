'use client'

import { type CurrentUserProfile, useCurrentUserQuery } from '@/services/auth'
import { useSessionStream } from '@/services/auth/session-stream'
import { useUnreadCountQuery } from '@/services/notifications'
import { Loader } from '@/components/ui/loader'
import { type ReactNode, createContext, useCallback, useContext, useMemo } from 'react'

export type Role = CurrentUserProfile['account']['role']
export type ActiveContext = CurrentUserProfile['account']['activeContext']
export type User = CurrentUserProfile['account']

export const canSwitchContext = (role: Role) => role === 'org_admin' || role === 'team_worker'

interface UserContextValue {
  user: User | null
  isLoading: boolean
  unreadNotificationsCount: number
}

const UserContext = createContext<UserContextValue | null>(null)

export function useUser(): UserContextValue {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export function UserProvider({
  children,
  loaderDescription,
  locale,
  sessionWsUrl,
}: {
  children: ReactNode
  loaderDescription: string
  locale: string
  sessionWsUrl: string
}) {
  const { data } = useCurrentUserQuery()
  const handleSessionEnded = useCallback(
    () => window.location.replace(`/${locale}/login`),
    [locale],
  )
  const { isLoading } = useSessionStream(sessionWsUrl, handleSessionEnded)
  const user = useMemo(() => toUser(data), [data])
  const notificationScope = user
    ? [user.uuid, user.role, user.activeContext, user.org?.organizationId ?? 'none'].join(':')
    : 'anonymous'
  const { data: unreadNotifications } = useUnreadCountQuery(
    notificationScope,
    Boolean(user) && !isLoading,
  )
  const value = useMemo(
    () => ({
      user,
      isLoading,
      unreadNotificationsCount: user ? (unreadNotifications?.count ?? 0) : 0,
    }),
    [isLoading, unreadNotifications?.count, user],
  )

  if (isLoading) {
    return (
      <UserContext.Provider value={value}>
        <Loader description={loaderDescription} />
      </UserContext.Provider>
    )
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function toUser(profile: CurrentUserProfile | undefined): User | null {
  if (!profile) return null

  return profile.account
}
