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
import { toast } from '@/components/ui/toast'
import { Link, useRouter } from '@/i18n/navigation'
import { useResetPasswordMutation } from '@/services/auth'
import { createResetPasswordSchema, type ResetPasswordFormValues } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export default function ResetPasswordPage() {
  const t = useTranslations('resetPassword')
  const router = useRouter()
  const searchParams = useSearchParams()
  const resetPassword = useResetPasswordMutation()
  const token = searchParams.get('token')
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

  const onSubmit = (data: ResetPasswordFormValues) => {
    if (!token) {
      toast.add({ title: t('tokenMissing'), type: 'error', priority: 'high' })
      return
    }

    toast.promise(
      resetPassword.mutateAsync(
        { token, newPassword: data.password },
        { onSuccess: () => router.replace('/login') },
      ),
      {
        loading: t('resetLoading'),
        success: t('resetSuccess'),
        error: t('resetFailed'),
      },
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
          </CardContent>
          <CardFooter className="flex flex-col gap-4.5">
            <Button type="submit" className="w-full mt-2" loading={resetPassword.isPending}>
              {t('submit')}
            </Button>
            <Link href="/login" className="item-center">
              <Button variant="link">{t('remembered')}</Button>
            </Link>
          </CardFooter>
        </Form>
      </Card>
    </div>
  )
}
