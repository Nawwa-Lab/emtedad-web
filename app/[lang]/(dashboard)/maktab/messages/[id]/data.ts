import type { MessageTagKey } from '../tag-badge'
import type { MarketKey } from '../data'

export type ThreadMessage =
  | { type: 'sys'; text: string }
  | { type: 'daysep'; text: string }
  | { type: 'them' | 'us'; sender: string; text: string; time: string; attachment?: boolean }

export type Thread = {
  messages: ThreadMessage[]
  facts: {
    value: string
    assignedMember: string
    agreementHref: string | null
    market: MarketKey
  }
  tags: MessageTagKey[]
  hasAgreement: boolean
}

const sharedMessages: ThreadMessage[] = [
  { type: 'sys', text: 'system.opened' },
  { type: 'daysep', text: 'threeDaysAgo' },
  { type: 'them', sender: 'halqa', text: 'halqa1', time: 'morning1' },
  { type: 'us', sender: 'us', text: 'us1', time: 'morning2' },
  { type: 'daysep', text: 'yesterday' },
  { type: 'them', sender: 'halqa', text: 'halqa2', time: 'afternoon1', attachment: true },
  { type: 'us', sender: 'us', text: 'us2', time: 'afternoon2' },
  { type: 'sys', text: 'system.agreementEdited' },
  { type: 'daysep', text: 'today' },
  { type: 'them', sender: 'halqa', text: 'halqa3', time: 'twoHoursAgo' },
]

const sharedFacts = {
  assignedMember: 'عمر السيد',
  agreementHref: '/maktab/agreements/1',
} as const

export const threads: Record<string, Thread> = {
  halqa: {
    messages: sharedMessages,
    facts: { value: '٥٥ شهمهم', ...sharedFacts, market: 'namliya' },
    tags: ['maybe'],
    hasAgreement: true,
  },
  sawt: {
    messages: sharedMessages,
    facts: { value: '٤٥ شهمهم', ...sharedFacts, market: 'namliya' },
    tags: ['done'],
    hasAgreement: true,
  },
  daw: {
    messages: sharedMessages,
    facts: { value: '٤٠ شهمهم', ...sharedFacts, market: 'namliya' },
    tags: ['inProgress'],
    hasAgreement: true,
  },
  nadia: {
    messages: sharedMessages,
    facts: { value: '٤٥ شهمهم', ...sharedFacts, agreementHref: null, market: 'khalliKhales' },
    tags: ['inProgress2', 'noAgreement'],
    hasAgreement: false,
  },
  kamal: {
    messages: sharedMessages,
    facts: { value: '٢٥ شهمهم', ...sharedFacts, market: 'khalliKhales' },
    tags: ['done2'],
    hasAgreement: true,
  },
}

// Panel-21a state: the halqa conversation before the agreement is written.
export const contractThreads: Record<string, Thread> = {
  halqa: {
    ...threads.halqa,
    messages: sharedMessages
      .filter((message) => message.text !== 'system.agreementEdited')
      .map((message) =>
        message.type === 'us' && message.text === 'us2'
          ? { ...message, text: 'us2NoAgreement' }
          : message,
      ),
    facts: { ...threads.halqa.facts, agreementHref: null },
    tags: ['maybe', 'noAgreement'],
    hasAgreement: false,
  },
}

export const files = [
  { type: 'PDF', name: 'pdf1', size: 'pdf1Size' },
  { type: 'ZIP', name: 'zip1', size: 'zip1Size' },
  { type: 'PDF', name: 'pdf2', size: 'pdf2Size' },
  { type: 'LNK', name: 'link1', size: 'link1Size' },
] as const
