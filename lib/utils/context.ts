import type { ActiveContext } from '@/contexts/UserContext'

const organizationRoutes = ['/namliya', '/hakima', '/genny', '/alaesh-andak/request/create']
const communityRoutes = ['/shbeik-lbeik', '/fahs-mahs']

const matchesRoute = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`)

export const isPathAllowedInContext = (pathname: string, context: ActiveContext) => {
  const unavailableRoutes = context === 'org' ? communityRoutes : organizationRoutes
  return !unavailableRoutes.some((route) => matchesRoute(pathname, route))
}
