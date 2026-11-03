import { ResetPasswordForm } from './reset-password-form'

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>
}) {
  const { token } = await searchParams
  const validToken = typeof token === 'string' && token.length > 0 && token.length <= 128

  return (
    <ResetPasswordForm key={validToken ? token : 'unavailable'} token={validToken ? token : null} />
  )
}
