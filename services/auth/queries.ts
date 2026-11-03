'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from './api'
import { authKeys } from './keys'
import type { CurrentUserProfile } from './types'
import { notifyAuthSession } from './session-events'

export function useCurrentUserQuery() {
  return useQuery<CurrentUserProfile>({
    queryKey: authKeys.currentUser(),
    queryFn: authApi.getCurrentUser,
    enabled: false,
  })
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: () => notifyAuthSession('reconnect'),
  })
}

export function useLogoutMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.all })
      notifyAuthSession('disconnect')
    },
  })
}

export function useForgotPasswordMutation() {
  return useMutation({ mutationFn: authApi.forgotPassword })
}

export function useResetPasswordMutation() {
  return useMutation({ mutationFn: authApi.resetPassword })
}

export function useInviteTeamWorkerMutation() {
  return useMutation({ mutationFn: authApi.inviteTeamWorker })
}

export function useInviteOrganizationMutation() {
  return useMutation({ mutationFn: authApi.inviteOrganization })
}

export function useContextSwitchMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.switchContext,
    onSuccess: (result) => {
      const context = result.context
      if (!context) return

      queryClient.setQueryData<CurrentUserProfile>(authKeys.currentUser(), (profile) =>
        profile
          ? {
              ...profile,
              account: { ...profile.account, activeContext: context },
            }
          : profile,
      )
      notifyAuthSession('reconnect')
    },
  })
}
