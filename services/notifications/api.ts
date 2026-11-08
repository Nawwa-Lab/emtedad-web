import { request } from '@/services/http'
import type { Announcement, AnnouncementInput, NotificationPage } from './types'

export const notificationApi = {
  list: () => request<NotificationPage>('/api/v1/notifications'),
  unreadCount: () => request<{ count: number }>('/api/v1/notifications/unread-count'),
  markRead: (id: string) =>
    request<{ notificationId: string; read: true }>(
      `/api/v1/notifications/${encodeURIComponent(id)}/read`,
      { method: 'PATCH' },
    ),
  announcements: () => request<Announcement[]>('/api/v1/announcements'),
  announcement: (id: string) =>
    request<Announcement>(`/api/v1/announcements/${encodeURIComponent(id)}`),
  createAnnouncement: (input: AnnouncementInput) =>
    request<Announcement>('/api/v1/announcements', { method: 'POST', body: input }),
  updateAnnouncement: (id: string, input: AnnouncementInput) =>
    request<Announcement>(`/api/v1/announcements/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: input,
    }),
}
