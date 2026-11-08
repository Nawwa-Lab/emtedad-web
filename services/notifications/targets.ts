import type { Role } from '@/contexts/UserContext'

import type { NotificationItem } from './types'

/**
 * Page a notification card opens: the backend `actionUrl` wins when set,
 * otherwise the target is derived from the notification type.
 */
export function notificationTarget(item: NotificationItem, role?: Role): string | null {
  if (item.actionUrl) return item.actionUrl

  switch (item.type) {
    case 'announcement': {
      if (role === 'emtedad_admin') return '/announcements'
      const announcementId = item.data?.announcementId
      return typeof announcementId === 'string' && announcementId
        ? `/announcements/${announcementId}`
        : null
    }
    case 'exchange.request.created':
    case 'exchange.completed':
      return '/namliya/my-offers'
  }
}
