'use client'

import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Link, useRouter } from '@/i18n/navigation'
import { authApi, useResetPasswordMutation } from '@/services/auth'
import { ApiError } from '@/services/http'
import { createResetPasswordSchema, type ResetPasswordFormValues } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'

type PreviewState =
  | { status: 'loading' }
  | { status: 'valid' }
  | { status: 'unavailable' }
  | { status: 'retry'; rateLimited: boolean }

function ResetStateCard({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="relative w-[min(470px,94vw)]" aria-live="polite">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {action && <CardFooter>{action}</CardFooter>}
      </Card>
    </div>
  )
}

export function ResetPasswordForm({ token }: { token: string | null }) {
  const t = useTranslations('resetPassword')
  const router = useRouter()
  const resetPassword = useResetPasswordMutation()
  const [attempt, setAttempt] = useState(0)
  const [submitError, setSubmitError] = useState<string>()
  const [preview, setPreview] = useState<PreviewState>(
    token ? { status: 'loading' } : { status: 'unavailable' },
  )
  const schema = useMemo(
    () =>
      createResetPasswordSchema({
        passwordRequired: t('passwordRequired'),
        passwordMin: t('passwordMin'),
        passwordMax: t('passwordMax'),
        confirmPasswordRequired: t('confirmPasswordRequired'),
        passwordMismatch: t('passwordMismatch'),
      }),
    [t],
  )

  useEffect(() => {
    if (!token) return

    let current = true
    authApi
      .previewResetPassword(token)
      .then((result) => {
        if (current) setPreview({ status: result.valid ? 'valid' : 'unavailable' })
      })
      .catch((error) => {
        if (!current) return
        if (error instanceof ApiError && error.status === 400) {
          setPreview({ status: 'unavailable' })
        } else {
          setPreview({
            status: 'retry',
            rateLimited: error instanceof ApiError && error.status === 429,
          })
        }
      })

    return () => {
      current = false
    }
  }, [attempt, token])

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) return

    setSubmitError(undefined)
    try {
      await resetPassword.mutateAsync({ token, newPassword: data.password })
      router.replace('/login')
    } catch (error) {
      if (error instanceof ApiError && error.status === 400 && /reset token/i.test(error.message)) {
        setPreview({ status: 'unavailable' })
      } else {
        setSubmitError(t('resetFailed'))
      }
    }
  }

  if (preview.status === 'loading') {
    return <ResetStateCard title={t('loadingTitle')} description={t('loadingDescription')} />
  }

  if (preview.status === 'unavailable') {
    return (
      <ResetStateCard
        title={t('unavailableTitle')}
        description={t('unavailableDescription')}
        action={
          <Link href="/forget-password">
            <Button>{t('requestNewLink')}</Button>
          </Link>
        }
      />
    )
  }

  if (preview.status === 'retry') {
    return (
      <ResetStateCard
        title={t('retryTitle')}
        description={preview.rateLimited ? t('rateLimitedDescription') : t('retryDescription')}
        action={
          <Button
            onClick={() => {
              setPreview({ status: 'loading' })
              setAttempt((value) => value + 1)
            }}
          >
            {t('retry')}
          </Button>
        }
      />
    )
  }

  return (
    <div className="relative w-[min(470px,94vw)]">
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <Form<ResetPasswordFormValues>
          resolver={zodResolver(schema)}
          defaultValues={{ password: '', confirmPassword: '' }}
          onSubmit={onSubmit}
        >
          <CardContent>
            <Form.Control name="password" label={t('passwordLabel')} labelFor="password">
              {(field, fieldState) => (
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
              )}
            </Form.Control>
            <Form.Control
              name="confirmPassword"
              label={t('passwordConfirmLabel')}
              labelFor="confirm-password"
            >
              {(field, fieldState) => (
                <Input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
              )}
            </Form.Control>
            {submitError && (
              <p role="alert" className="mb-4 font-body text-sm font-bold text-red-dark">
                {submitError}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4.5">
            <Button type="submit" className="mt-2 w-full" loading={resetPassword.isPending}>
              {t('submit')}
            </Button>
            <Link href="/login">
              <Button type="button" variant="link">
                {t('remembered')}
              </Button>
            </Link>
          </CardFooter>
        </Form>
      </Card>
    </div>
  )
}
