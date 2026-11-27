import 'server-only'

import { serverRequest } from '@/services/http/server'
import type {
  OrganizationHumanServicesResponse,
  OrganizationMaterialResourcesResponse,
  OrganizationPublicProfileResponse,
  OrganizationSatisfactionDetails,
} from './types'

export const organizationApi = {
  getPublicProfile: (id: string) =>
    serverRequest<OrganizationPublicProfileResponse>(
      `/api/v1/organizations/${encodeURIComponent(id)}`,
    ),
  getHumanServices: (id: string) =>
    serverRequest<OrganizationHumanServicesResponse>(
      `/api/v1/organizations/${encodeURIComponent(id)}/human-services`,
    ),
  getMaterialResources: (id: string) =>
    serverRequest<OrganizationMaterialResourcesResponse>(
      `/api/v1/organizations/${encodeURIComponent(id)}/material-resources`,
    ),
  getSatisfaction: (id: string) =>
    serverRequest<OrganizationSatisfactionDetails>(
      `/api/v1/ratings/organization/${encodeURIComponent(id)}/detailed`,
    ),
}
