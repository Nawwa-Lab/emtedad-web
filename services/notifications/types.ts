export type NotificationItem = {
  notificationId: string
  type: 'announcement' | 'exchange.request.created' | 'exchange.completed'
  title: string | null
  body: string | null
  data: Record<string, unknown>
  actionUrl: string | null
  createdAt: string
  readAt: string | null
}

export type NotificationPage = {
  items: NotificationItem[]
  total: number
  unreadCount: number
}

export type AnnouncementAudience = 'organizations' | 'team_members' | 'public'
export type AnnouncementStatus = 'draft' | 'published'

export type Announcement = {
  announcementId: string
  title: string
  body: string
  audiences: AnnouncementAudience[]
  status: AnnouncementStatus
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export type AnnouncementInput = Pick<Announcement, 'title' | 'body' | 'audiences' | 'status'>
