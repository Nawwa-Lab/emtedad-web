import { RoleRouteGuard } from '@/components/RoleRouteGuard'

export default function ManagementLayout({ children }: { children: React.ReactNode }) {
  return <RoleRouteGuard roles={['emtedad_admin']}>{children}</RoleRouteGuard>
}
