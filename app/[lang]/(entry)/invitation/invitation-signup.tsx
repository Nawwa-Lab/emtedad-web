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
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Link, useRouter } from '@/i18n/navigation'
import { authApi, type InvitationPreview, type InvitationType } from '@/services/auth'
import { ApiError } from '@/services/http'
import {
  createMemberInvitationSchema,
  createOrganizationInvitationSchema,
  splitInviteeName,
  type MemberInvitationValues,
  type OrganizationInvitationValues,
} from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState, type KeyboardEvent } from 'react'

type ValidPreview = Extract<InvitationPreview, { valid: true }>
type PreviewState =
  | { status: 'loading' }
  | { status: 'valid'; preview: ValidPreview }
  | { status: 'unavailable' }
  | { status: 'retry'; rateLimited: boolean }
  | { status: 'complete' }

function isUnavailableSubmission(error: unknown) {
  return error instanceof ApiError && error.status === 400 && /invitation/i.test(error.message)
}

function InvitationCard({
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

function InviteBanner({ children, initial }: { children: React.ReactNode; initial: string }) {
  return (
    <div className="mb-6 flex items-center gap-3.5 rounded-card border-[2.5px] border-ink bg-gold px-4 py-3.5 shadow-[4px_4px_0] shadow-ink">
      <span
        className="grid size-[46px] shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-surface font-display text-[20px]/[1] text-ink"
        aria-hidden="true"
      >
        {initial}
      </span>
      <p className="font-body text-[15.5px]/[1.75] font-bold">{children}</p>
    </div>
  )
}

function LockedEmail({ email }: { email: string }) {
  const t = useTranslations('inviteSignup')

  return (
    <Field>
      <FieldLabel htmlFor="invitation-email">{t('email')}</FieldLabel>
      <Input
        id="invitation-email"
        type="email"
        value={email}
        readOnly
        aria-readonly="true"
        dir="ltr"
        className="border-dashed bg-paper-dark text-soft"
      />
      <FieldDescription>{t('emailNote')}</FieldDescription>
    </Field>
  )
}

function TermsField({
  field,
  organization = false,
}: {
  field: { value: boolean; onChange: (value: boolean) => void; onBlur: () => void }
  organization?: boolean
}) {
  const t = useTranslations('inviteSignup')

  return (
    <div className="flex items-start gap-3">
      <Checkbox
        id="invitation-terms"
        checked={field.value}
        onCheckedChange={field.onChange}
        onBlur={field.onBlur}
      />
      <label htmlFor="invitation-terms" className="font-body text-[15px]/[1.8] font-semibold">
        {organization ? (
          <>
            {t('termsBefore')}
            <Link href="/#papers" className="border-b-2 border-red font-extrabold text-red">
              {t('termsLink')}
            </Link>
            {t('termsAfterOrganization')}
          </>
        ) : (
          t.rich('memberTerms', {
            conditions: (chunks) => (
              <Link href="/#papers" className="border-b-2 border-red font-extrabold text-red">
                {chunks}
              </Link>
            ),
            charter: (chunks) => (
              <Link href="/#papers" className="border-b-2 border-red font-extrabold text-red">
                {chunks}
              </Link>
            ),
          })
        )}
      </label>
    </div>
  )
}

function AreasInput({ value, onChange }: { value: string[]; onChange: (value: string[]) => void }) {
  const t = useTranslations('inviteSignup')
  const [draft, setDraft] = useState('')

  const add = () => {
    const area = draft.trim()
    if (!area || value.includes(area)) return
    onChange([...value, area])
    setDraft('')
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    event.preventDefault()
    add()
  }

  return (
    <>
      <Input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={onKeyDown}
        onBlur={add}
        placeholder={t('areasPlaceholder')}
      />
      {value.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-2">
          {value.map((area) => (
            <span
              key={area}
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-gold px-3 py-1 text-sm font-bold"
            >
              {area}
              <button
                type="button"
                onClick={() => onChange(value.filter((item) => item !== area))}
                aria-label={t('removeArea', { area })}
                className="cursor-pointer"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </>
  )
}

function MemberForm({
  token,
  preview,
  unavailable,
}: {
  token: string
  preview: ValidPreview
  unavailable: () => void
}) {
  const t = useTranslations('inviteSignup')
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string>()
  const [submitting, setSubmitting] = useState(false)
  const names = splitInviteeName(preview.invitee.fullName)
  const schema = useMemo(
    () =>
      createMemberInvitationSchema({
        required: t('required'),
        nameMax: t('nameMax'),
        passwordMin: t('passwordMin'),
        passwordMax: t('passwordMax'),
        passwordMismatch: t('passwordMismatch'),
        consentRequired: t('consentRequired'),
      }),
    [t],
  )

  const submit = async (values: MemberInvitationValues) => {
    setSubmitError(undefined)
    setSubmitting(true)
    try {
      await authApi.acceptInvitation({
        token,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      })
      router.replace('/login')
    } catch (error) {
      if (isUnavailableSubmission(error)) unavailable()
      else if (error instanceof ApiError && error.status === 409)
        setSubmitError(t('existingAccount'))
      else setSubmitError(t('submitFailed'))
    } finally {
      setSubmitting(false)
    }
  }

  const organizationName = preview.organization?.name ?? ''

  return (
    <div className="relative w-full max-w-[470px]">
      <Card className="max-[520px]:px-5 max-[520px]:py-[26px]">
        <InviteBanner initial={organizationName.charAt(0)}>
          {t.rich('memberInvite', {
            organization: organizationName,
            strong: (chunks) => (
              <strong className="font-display text-[19px] font-normal">{chunks}</strong>
            ),
          })}
        </InviteBanner>
        <CardHeader>
          <CardTitle>{t('memberTitle')}</CardTitle>
          <CardDescription>{t('memberDescription')}</CardDescription>
        </CardHeader>
        <Form<MemberInvitationValues>
          resolver={zodResolver(schema)}
          defaultValues={{ ...names, password: '', confirmPassword: '', acceptTerms: false }}
          onSubmit={submit}
        >
          <CardContent>
            <div className="grid gap-x-4 sm:grid-cols-2">
              <Form.Control name="firstName" label={t('firstName')} labelFor="member-first-name">
                {(field, state) => (
                  <Input
                    id="member-first-name"
                    autoComplete="given-name"
                    aria-invalid={state.invalid}
                    {...field}
                  />
                )}
              </Form.Control>
              <Form.Control name="lastName" label={t('lastName')} labelFor="member-last-name">
                {(field, state) => (
                  <Input
                    id="member-last-name"
                    autoComplete="family-name"
                    aria-invalid={state.invalid}
                    {...field}
                  />
                )}
              </Form.Control>
            </div>
            <LockedEmail email={preview.invitee.email} />
            <Form.Control name="password" label={t('password')} labelFor="member-password">
              {(field, state) => (
                <Input
                  id="member-password"
                  type="password"
                  dir="ltr"
                  placeholder={t('passwordPlaceholder')}
                  autoComplete="new-password"
                  aria-invalid={state.invalid}
                  {...field}
                />
              )}
            </Form.Control>
            <Form.Control
              name="confirmPassword"
              label={t('confirmPassword')}
              labelFor="member-confirm-password"
            >
              {(field, state) => (
                <Input
                  id="member-confirm-password"
                  type="password"
                  dir="ltr"
                  placeholder={t('confirmPasswordPlaceholder')}
                  autoComplete="new-password"
                  aria-invalid={state.invalid}
                  {...field}
                />
              )}
            </Form.Control>
            <Form.Control
              name="acceptTerms"
              label=""
              className="mt-1.5 mb-1 [&_[data-slot=field-label]]:hidden"
            >
              {(field) => <TermsField field={field} />}
            </Form.Control>
            {submitError && (
              <p role="alert" className="mb-4 font-body text-sm font-bold text-red-dark">
                {submitError}
              </p>
            )}
          </CardContent>
          <CardFooter className="mt-3.5 flex flex-col">
            <Button type="submit" className="w-full" loading={submitting}>
              {t('memberSubmit')}
            </Button>
            <Link href="/login" className="mt-5">
              <Button
                type="button"
                variant="link"
                className="rounded-none border-b-[2.5px] border-red pb-px text-[15.5px]"
              >
                {t('login')}
              </Button>
            </Link>
          </CardFooter>
        </Form>
      </Card>
    </div>
  )
}

function optional(value: string) {
  return value.trim() || undefined
}

function OrganizationForm({
  token,
  preview,
  unavailable,
  complete,
}: {
  token: string
  preview: ValidPreview
  unavailable: () => void
  complete: () => void
}) {
  const t = useTranslations('inviteSignup')
  const [submitError, setSubmitError] = useState<string>()
  const names = splitInviteeName(preview.invitee.fullName)
  const schema = useMemo(
    () =>
      createOrganizationInvitationSchema({
        required: t('required'),
        nameMax: t('nameMax'),
        passwordMin: t('passwordMin'),
        passwordMax: t('passwordMax'),
        passwordMismatch: t('passwordMismatch'),
        consentRequired: t('consentRequired'),
        legalNameMax: t('legalNameMax'),
      }),
    [t],
  )
  const steps = useMemo(
    () => [
      {
        id: 'organization',
        title: t('organizationStep'),
        fields: [
          'legalName',
          'description',
          'mission',
          'areasOfWork',
          'country',
          'city',
          'foundationDate',
          'websiteUrl',
        ] as Array<keyof OrganizationInvitationValues>,
      },
      {
        id: 'account',
        title: t('accountStep'),
        fields: ['firstName', 'lastName', 'password', 'confirmPassword', 'acceptTerms'] as Array<
          keyof OrganizationInvitationValues
        >,
      },
    ],
    [t],
  )

  const submit = async (values: OrganizationInvitationValues) => {
    setSubmitError(undefined)
    try {
      await authApi.registerOrganization({
        inviteToken: token,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        legalName: values.legalName,
        mission: optional(values.mission),
        description: optional(values.description),
        websiteUrl: optional(values.websiteUrl),
        country: optional(values.country),
        city: optional(values.city),
        foundationDate: optional(values.foundationDate),
        areasOfWork: values.areasOfWork.length ? values.areasOfWork : undefined,
      })
      complete()
    } catch (error) {
      if (isUnavailableSubmission(error)) unavailable()
      else setSubmitError(t('submitFailed'))
    }
  }

  return (
    <div className="relative w-[min(720px,94vw)]">
      <Card>
        <InviteBanner initial={t('platformInitial')}>{t('organizationInvite')}</InviteBanner>
        <Form<OrganizationInvitationValues>
          resolver={zodResolver(schema)}
          variant="multi-step"
          steps={steps}
          defaultValues={{
            ...names,
            password: '',
            confirmPassword: '',
            acceptTerms: false,
            legalName: '',
            mission: '',
            description: '',
            websiteUrl: '',
            country: '',
            city: '',
            foundationDate: '',
            areasOfWork: [],
          }}
          onSubmit={submit}
        >
          <Form.Step id="organization">
            <Form.Progress />
            <CardHeader>
              <CardTitle>{t('organizationTitle')}</CardTitle>
              <CardDescription>{t('organizationDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <h2 className="mb-4 font-display text-xl">{t('identitySection')}</h2>
              <Form.Control name="legalName" label={t('legalName')} labelFor="legal-name">
                {(field, state) => (
                  <Input id="legal-name" aria-invalid={state.invalid} {...field} />
                )}
              </Form.Control>
              <Form.Control name="description" label={t('description')} labelFor="description">
                {(field, state) => (
                  <Input id="description" aria-invalid={state.invalid} {...field} />
                )}
              </Form.Control>
              <Form.Control name="mission" label={t('mission')} labelFor="mission">
                {(field, state) => (
                  <Textarea id="mission" aria-invalid={state.invalid} {...field} />
                )}
              </Form.Control>
              <h2 className="mb-4 mt-7 font-display text-xl">{t('areasSection')}</h2>
              <Form.Control name="areasOfWork" label={t('areas')}>
                {(field) => <AreasInput value={field.value} onChange={field.onChange} />}
              </Form.Control>
              <h2 className="mb-4 mt-7 font-display text-xl">{t('contactSection')}</h2>
              <div className="grid gap-x-4 sm:grid-cols-2">
                <Form.Control name="city" label={t('city')} labelFor="city">
                  {(field, state) => <Input id="city" aria-invalid={state.invalid} {...field} />}
                </Form.Control>
                <Form.Control name="country" label={t('country')} labelFor="country">
                  {(field, state) => <Input id="country" aria-invalid={state.invalid} {...field} />}
                </Form.Control>
                <Form.Control
                  name="foundationDate"
                  label={t('foundationDate')}
                  labelFor="foundation-date"
                >
                  {(field, state) => (
                    <Input
                      id="foundation-date"
                      type="date"
                      aria-invalid={state.invalid}
                      {...field}
                    />
                  )}
                </Form.Control>
                <Form.Control name="websiteUrl" label={t('website')} labelFor="website">
                  {(field, state) => (
                    <Input
                      id="website"
                      type="url"
                      dir="ltr"
                      aria-invalid={state.invalid}
                      {...field}
                    />
                  )}
                </Form.Control>
              </div>
            </CardContent>
            <CardFooter>
              <Form.Next className="w-full">{t('organizationNext')}</Form.Next>
            </CardFooter>
          </Form.Step>
          <Form.Step id="account">
            <Form.Progress />
            <CardHeader>
              <CardTitle>{t('accountTitle')}</CardTitle>
              <CardDescription>{t('accountDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-x-4 sm:grid-cols-2">
                <Form.Control name="firstName" label={t('firstName')} labelFor="org-first-name">
                  {(field, state) => (
                    <Input
                      id="org-first-name"
                      autoComplete="given-name"
                      aria-invalid={state.invalid}
                      {...field}
                    />
                  )}
                </Form.Control>
                <Form.Control name="lastName" label={t('lastName')} labelFor="org-last-name">
                  {(field, state) => (
                    <Input
                      id="org-last-name"
                      autoComplete="family-name"
                      aria-invalid={state.invalid}
                      {...field}
                    />
                  )}
                </Form.Control>
              </div>
              <LockedEmail email={preview.invitee.email} />
              <div className="grid gap-x-4 sm:grid-cols-2">
                <Form.Control name="password" label={t('password')} labelFor="org-password">
                  {(field, state) => (
                    <Input
                      id="org-password"
                      type="password"
                      autoComplete="new-password"
                      aria-invalid={state.invalid}
                      {...field}
                    />
                  )}
                </Form.Control>
                <Form.Control
                  name="confirmPassword"
                  label={t('confirmPassword')}
                  labelFor="org-confirm-password"
                >
                  {(field, state) => (
                    <Input
                      id="org-confirm-password"
                      type="password"
                      autoComplete="new-password"
                      aria-invalid={state.invalid}
                      {...field}
                    />
                  )}
                </Form.Control>
              </div>
              <Form.Control name="acceptTerms" label="" className="mt-5">
                {(field) => <TermsField field={field} organization />}
              </Form.Control>
              {submitError && (
                <p role="alert" className="mb-4 font-body text-sm font-bold text-red-dark">
                  {submitError}
                </p>
              )}
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
              <Form.Next>{t('organizationSubmit')}</Form.Next>
              <Form.Back>{t('back')}</Form.Back>
            </CardFooter>
          </Form.Step>
        </Form>
      </Card>
    </div>
  )
}

export function InvitationSignup({ type, token }: { type: InvitationType; token: string | null }) {
  const t = useTranslations('inviteSignup')
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<PreviewState>(
    token ? { status: 'loading' } : { status: 'unavailable' },
  )

  useEffect(() => {
    if (!token) return

    let current = true
    authApi
      .previewInvitation(type, token)
      .then((preview) => {
        if (!current) return
        if (!preview.valid || preview.type !== type) setState({ status: 'unavailable' })
        else if (type === 'member' && !preview.organization) setState({ status: 'unavailable' })
        else setState({ status: 'valid', preview })
      })
      .catch((error) => {
        if (!current) return
        if (error instanceof ApiError && error.status === 400) setState({ status: 'unavailable' })
        else
          setState({
            status: 'retry',
            rateLimited: error instanceof ApiError && error.status === 429,
          })
      })

    return () => {
      current = false
    }
  }, [attempt, token, type])

  if (state.status === 'loading') {
    return <InvitationCard title={t('loadingTitle')} description={t('loadingDescription')} />
  }

  if (state.status === 'unavailable') {
    return (
      <InvitationCard
        title={t('unavailableTitle')}
        description={t('unavailableDescription')}
        action={
          <Link href="/login">
            <Button>{t('login')}</Button>
          </Link>
        }
      />
    )
  }

  if (state.status === 'retry') {
    return (
      <InvitationCard
        title={t('retryTitle')}
        description={state.rateLimited ? t('rateLimitedDescription') : t('retryDescription')}
        action={
          <Button
            onClick={() => {
              setState({ status: 'loading' })
              setAttempt((value) => value + 1)
            }}
          >
            {t('retry')}
          </Button>
        }
      />
    )
  }

  if (state.status === 'complete') {
    return (
      <InvitationCard
        title={t('organizationSuccessTitle')}
        description={t('organizationSuccessDescription')}
      />
    )
  }

  return type === 'member' ? (
    <MemberForm
      token={token as string}
      preview={state.preview}
      unavailable={() => setState({ status: 'unavailable' })}
    />
  ) : (
    <OrganizationForm
      token={token as string}
      preview={state.preview}
      unavailable={() => setState({ status: 'unavailable' })}
      complete={() => setState({ status: 'complete' })}
    />
  )
}
