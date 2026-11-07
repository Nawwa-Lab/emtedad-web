import type { Locale } from '@/types'

type RequestContext = {
  organization: {
    initial: string
    profileHref: string
  }
  serviceHref: string
  serviceTitle: string
  value: number
  availability: string
  member: {
    name: string
    profileHref: string
  }
  balance: number
  afterApproval: number
}

export const requestContext: Record<Locale, RequestContext> = {
  ar: {
    organization: {
      initial: 'ص',
      profileHref: '/organization/123',
    },
    serviceHref: '/namliya/service-offers/detail/1',
    serviceTitle: 'تصوير وتوثيق فعاليات بالفيديو',
    value: 35,
    availability: 'متاح أي مدة',
    member: {
      name: 'كريم فوزي',
      profileHref: '/member/123',
    },
    balance: 1240,
    afterApproval: 1205,
  },
  en: {
    organization: {
      initial: 'S',
      profileHref: '/organization/123',
    },
    serviceHref: '/namliya/service-offers/detail/1',
    serviceTitle: 'Event videography and documentation',
    value: 35,
    availability: 'Available anytime',
    member: {
      name: 'Karim Fawzy',
      profileHref: '/member/123',
    },
    balance: 1240,
    afterApproval: 1205,
  },
}
