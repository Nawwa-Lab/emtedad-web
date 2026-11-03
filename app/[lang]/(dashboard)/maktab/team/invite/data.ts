export type PendingInvitation = {
  id: string
  name: { ar: string; en: string }
  email: string
  daysLeft: number
}

export const pendingInvitations: PendingInvitation[] = [
  {
    id: 'invite-huda',
    name: { ar: 'هدى سمير', en: 'Huda Samir' },
    email: 'huda@example.org',
    daysLeft: 3,
  },
  {
    id: 'invite-youssef',
    name: { ar: 'يوسف عادل', en: 'Youssef Adel' },
    email: 'youssef@example.org',
    daysLeft: 0,
  },
]
