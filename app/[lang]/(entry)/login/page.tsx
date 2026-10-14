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
import { useLoginMutation } from '@/services/auth'
import { createLoginSchema, type LoginFormValues } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

export default function LoginPage() {
  const t = useTranslations('login')
  const router = useRouter()
  const login = useLoginMutation()

  const schema = useMemo(
    () =>
      createLoginSchema({
        emailRequired: t('emailRequired'),
        emailInvalid: t('emailInvalid'),
        passwordRequired: t('passwordRequired'),
      }),
    [t],
  )

  const onSubmit = (data: LoginFormValues) => {
    login.mutate(data, {
      onSuccess: () => {
        router.replace('/')
      },
      onError: () => toast.add({ title: t('loginFailed'), type: 'error', priority: 'high' }),
    })
  }

  return (
    <div className="relative w-[min(470px,94vw)]">
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <Form<LoginFormValues>
          resolver={zodResolver(schema)}
          defaultValues={{ email: '', password: '' }}
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
            <Form.Control name="password" label={t('passwordLabel')} labelFor="password">
              {(field, fieldState) => (
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
              )}
            </Form.Control>
          </CardContent>
          <CardFooter className="flex flex-col gap-4.5">
            <Button type="submit" className="w-full mt-2" loading={login.isPending}>
              {t('submit')}
            </Button>
            <Link href="/forget-password" className="item-center">
              <Button variant="link" className="underline">
                {t('forgotPassword')}
              </Button>
            </Link>
          </CardFooter>
        </Form>
      </Card>
      <div className="flex flex-col items-center justify-center mt-5.5">
        <p className="font-semibold text-[14.5px]/[1.9] text-soft text-center font-body">
          {t('invitation')}
        </p>
        <Link href="/" className="item-center">
          <Button variant="link" className="underline">
            اعرف أكتر عن الشبكة
          </Button>
        </Link>
      </div>
    </div>
  )
}
