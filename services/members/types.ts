// shortcut: The public-profile endpoint has no OpenAPI response schema; keep this
// aligned with the identity service until the contract is documented.
export type MemberPublicProfile = {
  accountId?: string
  uuid?: string
  firstName?: string | null
  lastName?: string | null
  first?: string | null
  last?: string | null
  bio?: string | null
  skills?: string[] | null
  areasOfExpertise?: string[] | null
  profilePhotoUrl?: string | null
  organization?: {
    organizationId: string
    legalName: string
    logoUrl?: string | null
  } | null
  org?: {
    organizationId: string
    legalName: string
    logoUrl?: string | null
  } | null
}
