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
import { useRouter } from '@/i18n/navigation'
import Hand from '@/icons/hand.svg'
import { useForgotPasswordMutation } from '@/services/auth'
import { createForgotPasswordSchema, type ForgotPasswordFormValues } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'

export default function ForgotPasswordPage() {
  const t = useTranslations('forgetPassword')
  const router = useRouter()
  const forgotPassword = useForgotPasswordMutation()
  const [sentEmail, setSentEmail] = useState<string | null>(null)
  const schema = useMemo(
    () =>
      createForgotPasswordSchema({
        emailRequired: t('emailRequired'),
        emailInvalid: t('emailInvalid'),
      }),
    [t],
  )

  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotPassword.mutate(data, {
      onSuccess: () => setSentEmail(data.email),
      onError: () => toast.add({ title: t('requestFailed'), type: 'error', priority: 'high' }),
    })
  }

  const resend = () => {
    if (sentEmail) onSubmit({ email: sentEmail })
  }

  return (
    <div className="relative w-[min(470px,94vw)]">
      <Card>
        {sentEmail ? (
          <CardContent className="flex flex-col items-center text-center">
            <Image src={Hand} alt="" className="mb-4 size-21" />
            <CardTitle>{t('sentTitle')}</CardTitle>
            <CardDescription>{t('sentDescription')}</CardDescription>
            <Button variant="outline" className="w-full" onClick={() => router.push('/login')}>
              {t('backToLogin')}
            </Button>
            <Button
              variant="link"
              className="mt-5"
              onClick={resend}
              disabled={forgotPassword.isPending}
            >
              {t('resend')}
            </Button>
          </CardContent>
        ) : (
          <>
            <CardHeader>
              <CardTitle>{t('title')}</CardTitle>
              <CardDescription>{t('description')}</CardDescription>
            </CardHeader>
            <Form<ForgotPasswordFormValues>
              resolver={zodResolver(schema)}
              defaultValues={{ email: '' }}
              onSubmit={onSubmit}
            >
              <CardContent>
                <Form.Control name="email" label={t('emailLabel')} labelFor="email">
                  {(field, fieldState) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.org"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                  )}
                </Form.Control>
              </CardContent>
              <CardFooter className="flex flex-col gap-4.5">
                <Button type="submit" className="w-full mt-2" loading={forgotPassword.isPending}>
                  {t('submit')}
                </Button>
                <Button type="button" variant="link" onClick={() => router.push('/login')}>
                  {t('remembered')}
                </Button>
              </CardFooter>
            </Form>
          </>
        )}
      </Card>
    </div>
  )
}
