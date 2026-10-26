'use client'

import { useEffect, useState } from 'react'

export type Invite = 'mediation' | 'arbitration'
const initial: Invite[] = ['mediation', 'arbitration']
const key = 'fahs-mahs-invitations'
const changed = 'fahs-mahs-invitations-changed'
export const invitationTerms = { arbitrationSecurity: 10, reward: 10 } as const

export const mediationPartyProfiles = [
  {
    nameKey: 'partyOne',
    initialKey: 'partyOneInitial',
    roleKey: 'claimant',
    href: '/organization/beit-el-hekaya',
  },
  {
    nameKey: 'partyTwo',
    initialKey: 'partyTwoInitial',
    roleKey: 'respondent',
    href: '/organization/dar-noon-publishing',
  },
] as const

function read(): Invite[] {
  try {
    const saved = JSON.parse(sessionStorage.getItem(key) ?? 'null')
    return Array.isArray(saved) && saved.every((value) => initial.includes(value)) ? saved : initial
  } catch {
    return initial
  }
}

export function useInvitations() {
  const [remaining, setRemaining] = useState<Invite[]>(initial)
  useEffect(() => {
    const refresh = () => setRemaining(read())
    refresh()
    window.addEventListener(changed, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(changed, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])
  const respond = (kind: Invite) => {
    const next = read().filter((value) => value !== kind)
    sessionStorage.setItem(key, JSON.stringify(next))
    window.dispatchEvent(new Event(changed))
  }
  return { remaining, respond }
}
