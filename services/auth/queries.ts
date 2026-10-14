'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from './api'
import { authKeys } from './keys'

export function useCurrentUserQuery() {
  return useQuery({ queryKey: authKeys.currentUser(), queryFn: authApi.getCurrentUser })
}

export function useLoginMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: authKeys.currentUser() }),
  })
}

export function useLogoutMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => queryClient.removeQueries({ queryKey: authKeys.all }),
  })
}

export function useForgotPasswordMutation() {
  return useMutation({ mutationFn: authApi.forgotPassword })
}

export function useResetPasswordMutation() {
  return useMutation({ mutationFn: authApi.resetPassword })
}

export function useContextSwitchMutation() {
  return useMutation({ mutationFn: authApi.switchContext })
}
