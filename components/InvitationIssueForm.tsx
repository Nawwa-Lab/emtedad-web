'use client'

import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import hand from '@/icons/hand.svg'
import key from '@/icons/key.svg'
import { Link } from '@/i18n/navigation'
import {
  useInviteOrganizationMutation,
  useInviteTeamWorkerMutation,
  type IssuedInvitation,
} from '@/services/auth'
import { ApiError } from '@/services/http'
import {
  createInviteIssuanceSchema,
  type InviteIssuanceValues,
} from '@/types/schemas/invite-issuance-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo, useState } from 'react'

export function InvitationIssueForm({
  kind,
  organization,
  backHref,
  matchTeamDesign = false,
}: {
  kind: 'member' | 'organization'
  organization?: string
  backHref: string
  matchTeamDesign?: boolean
}) {
  const t = useTranslations(kind === 'member' ? 'teamInvite' : 'management.organizationInvite')
  const errors = useTranslations('management.inviteErrors')
  const locale = useLocale()
  const memberInvitation = useInviteTeamWorkerMutation()
  const organizationInvitation = useInviteOrganizationMutation()
  const [result, setResult] = useState<IssuedInvitation | null>(null)
  const [submitError, setSubmitError] = useState('')
  const mutation = kind === 'member' ? memberInvitation : organizationInvitation
  const schema = useMemo(
    () =>
      createInviteIssuanceSchema({
        nameRequired: errors('nameRequired'),
        nameMax: errors('nameMax'),
        emailRequired: errors('emailRequired'),
        emailInvalid: errors('emailInvalid'),
      }),
    [errors],
  )

  const submit = async ({ name, email }: InviteIssuanceValues) => {
    setSubmitError('')
    try {
      const issued =
        kind === 'member'
          ? await memberInvitation.mutateAsync({ name, email: email.toLowerCase() })
          : await organizationInvitation.mutateAsync({
              founderFullName: name,
              targetEmail: email.toLowerCase(),
            })
      setResult(issued)
    } catch (error) {
      setSubmitError(
        error instanceof ApiError && error.status === 409
          ? errors('conflict')
          : error instanceof ApiError && error.status === 403
            ? errors('forbidden')
            : errors('generic'),
      )
    }
  }

  if (result) {
    const expiry = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(
      new Date(result.expiresAt),
    )
    return (
      <Card className="flex min-h-105 flex-col items-center justify-center p-8 text-center">
        <Image
          src={hand}
          alt=""
          width={matchTeamDesign ? 92 : 76}
          height={matchTeamDesign ? 92 : 76}
          loading="eager"
          className={matchTeamDesign ? 'mb-[18px]' : 'mb-4'}
        />
        <h2 className="font-display text-[32px]">{t('successTitle')}</h2>
        <p className="mt-3 max-w-xl font-body text-[16px] font-medium leading-8 text-soft">
          {matchTeamDesign
            ? t('successDescriptionDesign', { email: result.email })
            : t('successDescription', { email: result.email, expiry })}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            type="button"
            onClick={() => {
              mutation.reset()
              setResult(null)
            }}
          >
            {t('again')}
          </Button>
          <Link href={backHref}>
            <Button type="button" variant="outline">
              {t('back')}
            </Button>
          </Link>
        </div>
      </Card>
    )
  }

  return (
    <Card className={matchTeamDesign ? 'p-[28px_30px] shadow-[6px_6px_0]' : 'p-6 sm:p-8'}>
      <h2 className="flex items-center gap-[13px] font-display text-[29px]/[1.2]">
        {matchTeamDesign && (
          <Image src={key} alt="" loading="eager" className="size-[38px] shrink-0" />
        )}
        {t('formTitle')}
      </h2>
      <p className="mt-2 font-body text-[16.5px]/[1.95] font-medium text-soft">
        {t('formDescription', { organization: organization ?? '' })}
      </p>
      <Form<InviteIssuanceValues>
        className={matchTeamDesign ? 'mt-[22px]' : 'mt-5'}
        resolver={zodResolver(schema)}
        defaultValues={{ name: '', email: '' }}
        onSubmit={submit}
      >
        <Form.Control<InviteIssuanceValues>
          name="name"
          label={t('nameLabel')}
          labelFor="invite-name"
        >
          {(field, fieldState) => (
            <Input
              id="invite-name"
              autoComplete="name"
              placeholder={t('namePlaceholder')}
              aria-invalid={fieldState.invalid}
              {...field}
            />
          )}
        </Form.Control>
        <Form.Control<InviteIssuanceValues>
          name="email"
          label={t('emailLabel')}
          labelFor="invite-email"
        >
          {(field, fieldState) => (
            <>
              <Input
                id="invite-email"
                type="email"
                dir="ltr"
                autoComplete="email"
                placeholder="name@example.org"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              <p className="mt-1.5 font-body text-[13px] font-semibold leading-6 text-soft">
                {t('emailHint')}
              </p>
            </>
          )}
        </Form.Control>
        {submitError && (
          <p role="alert" className="mb-4 font-body text-sm font-bold text-red">
            {submitError}
          </p>
        )}
        <Button type="submit" className="w-full" loading={mutation.isPending}>
          {t('submit')}
        </Button>
      </Form>
    </Card>
  )
}
