import { describe, expect, it } from 'vitest'

import { notificationTarget } from './targets'
import type { NotificationItem } from './types'

function item(overrides: Partial<NotificationItem>): NotificationItem {
  return {
    notificationId: 'notification-id',
    type: 'exchange.completed',
    title: null,
    body: null,
    data: {},
    actionUrl: null,
    createdAt: new Date().toISOString(),
    readAt: null,
    ...overrides,
  }
}

describe('notificationTarget', () => {
  it('prefers the backend actionUrl over the type map', () => {
    expect(
      notificationTarget(item({ type: 'exchange.completed', actionUrl: '/custom' }), 'org_admin'),
    ).toBe('/custom')
  })

  it('routes exchange notifications to my offers', () => {
    expect(notificationTarget(item({ type: 'exchange.completed' }), 'org_admin')).toBe(
      '/namliya/my-offers',
    )
    expect(notificationTarget(item({ type: 'exchange.request.created' }), 'community_member')).toBe(
      '/namliya/my-offers',
    )
  })

  it('sends platform admins to the announcements workspace', () => {
    expect(notificationTarget(item({ type: 'announcement' }), 'emtedad_admin')).toBe(
      '/announcements',
    )
  })

  it('sends other recipients to the announcement detail page', () => {
    const announcement = item({
      type: 'announcement',
      data: { announcementId: 'announcement-id' },
    })
    expect(notificationTarget(announcement, 'org_admin')).toBe('/announcements/announcement-id')
  })

  it('opens nothing for a non-admin announcement without an id', () => {
    expect(notificationTarget(item({ type: 'announcement' }), 'org_admin')).toBeNull()
  })
})
