import type { InvitationType } from '@/services/auth'
import { notFound } from 'next/navigation'
import { InvitationSignup } from '../invitation-signup'

export default async function InvitationPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>
  searchParams: Promise<{ token?: string | string[] }>
}) {
  const { type } = await params
  const { token } = await searchParams

  if (type !== 'member' && type !== 'organization') notFound()

  return (
    <InvitationSignup
      type={type as InvitationType}
      token={typeof token === 'string' && token.length > 0 && token.length <= 128 ? token : null}
    />
  )
}
