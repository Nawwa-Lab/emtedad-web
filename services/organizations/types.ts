// shortcut: The public-profile endpoint has no OpenAPI response schema; keep this
// aligned with the identity service until the contract is documented.
export type OrganizationPublicProfile = {
  organizationId: string
  legalName: string
  mission: string | null
  description: string | null
  areasOfWork: string[] | null
  country: string | null
  city: string | null
  foundationDate: string | null
  websiteUrl: string | null
  logoUrl: string | null
  coverImageUrl: string | null
  socialLinks: Record<string, string> | null
  status: 'pending_approval' | 'active' | 'suspended'
  createdAt: string
  members: Array<{
    accountId: string
    name: string | null
    role: 'org_admin' | 'team_worker'
    profilePhotoUrl: string | null
  }>
}
