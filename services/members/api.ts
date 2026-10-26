import 'server-only'

import { serverRequest } from '@/services/http/server'
import type { MemberPublicProfile } from './types'

export const memberApi = {
  getPublicProfile: (id: string) =>
    serverRequest<MemberPublicProfile>(`/api/v1/users/${encodeURIComponent(id)}`),
}
