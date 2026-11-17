import type { MessageTagKey } from './tag-badge'

export type MarketKey = 'namliya' | 'khalliKhales'

export type Conversation = {
  id: string
  key: string
  nameKey: string
  avatar: string
  avatarColor: 'gold' | 'blue' | 'red'
  unread: boolean
  unreadCount?: number
  tag: MessageTagKey
  timeKey: string
  market: MarketKey
  profileHref: string
}

export const conversations: Conversation[] = [
  {
    id: 'halqa',
    key: 'halqa',
    nameKey: 'organizations.halaqa',
    avatar: 'ح',
    avatarColor: 'gold',
    unread: true,
    unreadCount: 3,
    tag: 'maybe',
    timeKey: 'twoHours',
    market: 'namliya',
    profileHref: '/organization/halqa',
  },
  {
    id: 'sawt',
    key: 'sawt',
    nameKey: 'organizations.sawt',
    avatar: 'ص',
    avatarColor: 'blue',
    unread: false,
    tag: 'done',
    timeKey: 'yesterday',
    market: 'namliya',
    profileHref: '/organization/sawt',
  },
  {
    id: 'daw',
    key: 'daw',
    nameKey: 'organizations.daw',
    avatar: 'ض',
    avatarColor: 'red',
    unread: false,
    tag: 'inProgress',
    timeKey: 'threeDays',
    market: 'namliya',
    profileHref: '/organization/daw',
  },
  {
    id: 'nadia',
    key: 'nadia',
    nameKey: 'people.nadia',
    avatar: 'ن',
    avatarColor: 'gold',
    unread: true,
    unreadCount: 1,
    tag: 'inProgress2',
    timeKey: 'fiveHours',
    market: 'khalliKhales',
    profileHref: '/member/nadia',
  },
  {
    id: 'kamal',
    key: 'kamal',
    nameKey: 'people.kamal',
    avatar: 'ك',
    avatarColor: 'blue',
    unread: false,
    tag: 'done2',
    timeKey: 'lastWeek',
    market: 'khalliKhales',
    profileHref: '/member/kamal',
  },
]
