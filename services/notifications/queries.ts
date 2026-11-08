'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notificationApi } from './api'
import type { AnnouncementInput } from './types'

export const notificationKeys = {
  all: ['notifications'] as const,
  list: () => [...notificationKeys.all, 'list'] as const,
  count: (scope: string) => [...notificationKeys.all, 'count', scope] as const,
  announcements: () => [...notificationKeys.all, 'announcements'] as const,
  announcement: (id: string) => [...notificationKeys.all, 'announcement', id] as const,
}

export function useNotificationsQuery() {
  return useQuery({ queryKey: notificationKeys.list(), queryFn: notificationApi.list })
}

export function useUnreadCountQuery(scope: string, enabled = true) {
  return useQuery({
    queryKey: notificationKeys.count(scope),
    queryFn: notificationApi.unreadCount,
    enabled,
  })
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: notificationApi.markRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationKeys.all }),
  })
}

export function useAnnouncementsQuery() {
  return useQuery({
    queryKey: notificationKeys.announcements(),
    queryFn: notificationApi.announcements,
  })
}

export function useAnnouncementQuery(id: string) {
  return useQuery({
    queryKey: notificationKeys.announcement(id),
    queryFn: () => notificationApi.announcement(id),
  })
}

export function useSaveAnnouncement() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id?: string; input: AnnouncementInput }) =>
      id
        ? notificationApi.updateAnnouncement(id, input)
        : notificationApi.createAnnouncement(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationKeys.all }),
  })
}
