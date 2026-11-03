export type LocalizedText = { ar: string; en: string }

export type OrganizationStatus = 'invited' | 'active' | 'suspended'

export type ManagedOrganization = {
  id: string
  name: LocalizedText
  email: string
  status: OrganizationStatus
  date: string
  expiry?: string
  members?: number
  tokens?: number
  hasOpenCase?: boolean
}

export const organizations: ManagedOrganization[] = [
  {
    id: 'org-hill-space',
    name: { ar: 'مساحة التل', en: 'The Hill Space' },
    email: 'admin@hill-space.org',
    status: 'invited',
    date: '2025-10-04',
    expiry: '2025-10-18',
  },
  {
    id: 'org-city-sound',
    name: { ar: 'مركز صوت المدينة', en: 'City Sound Center' },
    email: 'admin@city-sound.org',
    status: 'active',
    date: '2025-05-12',
    members: 4,
    tokens: 1485,
  },
  {
    id: 'org-story-house',
    name: { ar: 'بيت الحكاية', en: 'The Story House' },
    email: 'admin@story-house.org',
    status: 'active',
    date: '2025-02-03',
    members: 7,
    tokens: 1485,
  },
  {
    id: 'org-dar-noon',
    name: { ar: 'دار نون للنشر', en: 'Dar Noon Publishing' },
    email: 'admin@dar-noon.org',
    status: 'active',
    date: '2025-05-12',
    members: 3,
    hasOpenCase: true,
  },
  {
    id: 'org-handicrafts',
    name: { ar: 'ورشة الحرف اليدوية', en: 'Handicrafts Workshop' },
    email: 'admin@handicrafts.org',
    status: 'suspended',
    date: '2025-09-22',
  },
]

export type MemberStatus = 'team' | 'community' | 'suspended'

export type ManagedMember = {
  id: string
  name: LocalizedText
  username: string
  gender: 'female' | 'male'
  status: MemberStatus
  previousStatus?: Exclude<MemberStatus, 'suspended'>
  organization?: LocalizedText
  organizationId?: string
  date: string
  balance: number
}

export const members: ManagedMember[] = [
  {
    id: '98edab7c04bb4d69ce12f045b3f2b3ffdf1a425a',
    name: { ar: 'نادية كمال', en: 'Nadia Kamal' },
    username: 'nadia.k',
    gender: 'female',
    status: 'team',
    organization: { ar: 'مشكاة للثقافة', en: 'Meshkat for Culture' },
    organizationId: 'org-meshkat',
    date: '2025-06-02',
    balance: 68,
  },
  {
    id: '76a6e3a356115163bac6a2c514640e941c04e55e',
    name: { ar: 'رنا فتحي', en: 'Rana Fathy' },
    username: 'rana.f',
    gender: 'female',
    status: 'community',
    date: '2025-03-14',
    balance: 34,
  },
  {
    id: 'ed683f8e9f285b6379ab821db8013b74247e02ca',
    name: { ar: 'مروان صبحي', en: 'Marwan Sobhy' },
    username: 'marwan.s',
    gender: 'male',
    status: 'team',
    organization: { ar: 'استوديو الورشة', en: 'Al-Warsha Studio' },
    organizationId: 'org-workshop',
    date: '2025-04-08',
    balance: 42,
  },
  {
    id: '13e7700f6dfa4b18d63ef887142e9f7d979ef185',
    name: { ar: 'كريم عبد اللطيف', en: 'Karim Abdel Latif' },
    username: 'karim.a',
    gender: 'male',
    status: 'community',
    date: '2025-09-01',
    balance: 19,
  },
  {
    id: 'd460741c9814d61a5faaa8ede3213bb6f2f73a56',
    name: { ar: 'هاني رؤوف', en: 'Hany Raouf' },
    username: 'hany.r',
    gender: 'male',
    status: 'suspended',
    previousStatus: 'community',
    date: '2025-09-18',
    balance: 0,
  },
]
