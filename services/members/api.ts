import 'server-only'

import { serverRequest } from '@/services/http/server'
import type { MemberPublicProfileResponse } from './types'

export const memberApi = {
  getPublicProfile: (id: string) =>
    serverRequest<MemberPublicProfileResponse>(`/api/v1/users/${encodeURIComponent(id)}`),
}
