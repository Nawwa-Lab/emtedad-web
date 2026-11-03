'use client'

import { type CurrentUserProfile, useCurrentUserQuery } from '@/services/auth'
import { useSessionStream } from '@/services/auth/session-stream'
import { Loader } from '@/components/ui/loader'
import { type ReactNode, createContext, useCallback, useContext, useMemo } from 'react'

export type Role = CurrentUserProfile['account']['role']
export type ActiveContext = CurrentUserProfile['account']['activeContext']
export type User = CurrentUserProfile['account']

export const canSwitchContext = (role: Role) => role === 'org_admin' || role === 'team_worker'

interface UserContextValue {
  user: User | null
  isLoading: boolean
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

  if (isLoading) {
    return (
      <UserContext.Provider value={{ user, isLoading }}>
        <Loader description={loaderDescription} />
      </UserContext.Provider>
    )
  }

  return <UserContext.Provider value={{ user, isLoading }}>{children}</UserContext.Provider>
}

function toUser(profile: CurrentUserProfile | undefined): User | null {
  if (!profile) return null

  return profile.account
}
