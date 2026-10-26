import 'server-only'

import { serverRequest } from '@/services/http/server'
import type { OrganizationPublicProfile } from './types'

export const organizationApi = {
  getPublicProfile: (id: string) =>
    serverRequest<OrganizationPublicProfile>(
      `/api/v1/organizations/${encodeURIComponent(id)}/public`,
    ),
}
