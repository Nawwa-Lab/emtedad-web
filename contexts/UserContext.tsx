'use client'

import { type CurrentUserProfile, useCurrentUserQuery } from '@/services/auth'
import { type ReactNode, createContext, useContext, useMemo } from 'react'

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

export function UserProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useCurrentUserQuery()
  const user = useMemo(() => toUser(data), [data])

  return <UserContext.Provider value={{ user, isLoading }}>{children}</UserContext.Provider>
}

function toUser(profile: CurrentUserProfile | undefined): User | null {
  if (!profile) return null

  return profile.account
}
