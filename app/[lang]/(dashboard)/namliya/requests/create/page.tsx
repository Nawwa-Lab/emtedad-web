'use client'

import { Form } from '@/components/Form'
import { StatusBadge } from '@/components/StatusBadge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Link } from '@/i18n/navigation'
import { formatNumber } from '@/lib/utils'
import { createNamliyaRequestSchema, type NamliyaRequestFormValues } from '@/types/schemas'
import CirclesIcon from '@/icons/circles.svg'
import HandIcon from '@/icons/hand.svg'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { ChevronLeft } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { requestContext } from './data'

const sheetClassName = 'mb-5.5 px-7.5 py-7 shadow-[6px_6px_0]'

export default function CreateNamliyaRequestPage() {
  const t = useTranslations('createRequestNamliya')
  const global = useTranslations('global')
  const locale = useLocale()
  const [sent, setSent] = useState(false)

  const data = requestContext[locale as keyof typeof requestContext]
  const n = (value: number, useGrouping = false) => formatNumber(value, { locale, useGrouping })

  const schema = useMemo(
    () =>
      createNamliyaRequestSchema({
        durationRequired: t('validation.durationRequired'),
      }),
    [t],
  )

  return (
    <>
      <Link
        href={data.serviceHref}
        className="inline-flex items-center gap-2.5 font-bold text-[15.5px] mb-4 text-ink font-body"
      >
        <span className="size-9.5 shrink-0 rounded-full border-[2.5px] border-ink bg-surface shadow-[3px_3px_0] shadow-ink grid place-items-center p-2.25 text-ink">
          <ChevronLeft className="w-full h-full rtl:rotate-180" />
        </span>
        <span className="hover:text-red">{t('backToService')}</span>
      </Link>

      <div className="grid grid-cols-1 min-[981px]:grid-cols-[1.5fr_1fr] gap-6 items-start">
        <div>
          <Card className={sheetClassName}>
            {sent ? (
              <div className="text-center">
                <Image src={HandIcon} alt="" className="mx-auto mb-4.5 w-23 -rotate-6" />
                <h2 className="font-display text-[27px] leading-[1.2] flex items-center justify-center">
                  {t('sentTitle')}
                </h2>
                <p className="font-medium font-body text-[16.5px] text-soft leading-[1.95] mt-2 mb-5.5 mx-auto max-w-150">
                  {t('sentDesc')}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/messages/1" className={cn(buttonVariants({ variant: 'primary' }))}>
                    {t('openConversation')}
                  </Link>
                  <Link
                    href="/namliya/my-asks"
                    className={cn(buttonVariants({ variant: 'outline' }))}
                  >
                    {t('myRequests')}
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-display text-[27px] leading-[1.2] flex items-center gap-3.25">
                  <Image
                    src={CirclesIcon}
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 shrink-0"
                  />
                  {t('formTitle')}
                </h2>
                <p className="font-medium font-body text-[16.5px] text-soft leading-[1.95] mt-2 mb-5.5">
                  {t('formDesc')}
                </p>

                <Form<NamliyaRequestFormValues>
                  resolver={zodResolver(schema)}
                  defaultValues={{
                    unit: 'hours',
                    duration: '',
                    preferredDate: '',
                    alternativeDate: '',
                    notes: '',
                  }}
                  onSubmit={() => setSent(true)}
                >
                  <Form.Control<NamliyaRequestFormValues>
                    name="duration"
                    label={t('durationLabel')}
                    labelFor="request-duration"
                    className="mb-5"
                  >
                    {(field, fieldState) => (
                      <>
                        <DurationUnitPills
                          labels={{ hours: t('hours'), days: t('days') }}
                          ariaLabel={t('durationUnitAria')}
                        />
                        <div className="mt-3.5">
                          <Input
                            id="request-duration"
                            placeholder={t('durationPlaceholder')}
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={(field.value as string) ?? ''}
                          />
                        </div>
                      </>
                    )}
                  </Form.Control>

                  <div className="grid grid-cols-1 min-[621px]:grid-cols-2 gap-4">
                    <Form.Control<NamliyaRequestFormValues>
                      name="preferredDate"
                      label={t('preferredDate')}
                      labelFor="request-preferred-date"
                      className="mb-5"
                    >
                      {(field, fieldState) => (
                        <Input
                          id="request-preferred-date"
                          placeholder={t('preferredDatePlaceholder')}
                          aria-invalid={fieldState.invalid}
                          {...field}
                          value={(field.value as string) ?? ''}
                        />
                      )}
                    </Form.Control>

                    <Form.Control<NamliyaRequestFormValues>
                      name="alternativeDate"
                      label={t('alternativeDate')}
                      labelFor="request-alternative-date"
                      className="mb-5"
                    >
                      {(field, fieldState) => (
                        <Input
                          id="request-alternative-date"
                          placeholder={t('alternativeDatePlaceholder')}
                          aria-invalid={fieldState.invalid}
                          {...field}
                          value={(field.value as string) ?? ''}
                        />
                      )}
                    </Form.Control>
                  </div>

                  <Form.Control<NamliyaRequestFormValues>
                    name="notes"
                    label={`${t('notes')} ${t('optional')}`}
                    labelFor="request-notes"
                    className="mb-5"
                  >
                    {(field, fieldState) => (
                      <Textarea
                        id="request-notes"
                        placeholder={t('notesPlaceholder')}
                        aria-invalid={fieldState.invalid}
                        {...field}
                        value={(field.value as string) ?? ''}
                      />
                    )}
                  </Form.Control>

                  <Button type="submit" className="w-full text-center">
                    {t('submit')}
                  </Button>
                </Form>
              </>
            )}
          </Card>
        </div>

        <aside>
          <Card className={sheetClassName}>
            <h2 className="font-display text-[22px]">{t('serviceTitle')}</h2>

            <div className="mt-4 mb-3.5 flex flex-wrap items-center gap-3.25">
              <Link href={data.organization.profileHref} className="shrink-0">
                <Avatar
                  size="lg"
                  shape="square"
                  className="size-13.5 rounded-[14px] shadow-[3px_3px_0]"
                >
                  <AvatarFallback className="text-[24px] font-display text-blue">
                    {data.organization.initial}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div className="min-w-0">
                <b className="block font-display text-[21px] leading-normal font-normal">
                  <Link href={data.organization.profileHref} className="hover:text-blue">
                    {global('organizations.sawt')}
                  </Link>
                </b>
                <span className="block font-semibold text-[14px] text-soft mt-2">
                  {t('organizationRole')}
                </span>
              </div>
              <StatusBadge label={global('badges.amer')} shape="pill" className="ms-auto" />
            </div>

            <div className="font-display text-[22px] leading-[1.35] mt-3.5 mb-4">
              {data.serviceTitle}
            </div>

            <InfoRow label={t('value')}>
              {n(data.value)} {global('currency')}
            </InfoRow>
            <InfoRow label={t('availability')}>{data.availability}</InfoRow>
            <InfoRow label={t('executingMember')}>
              <Link href={data.member.profileHref} className="hover:text-blue">
                {data.member.name}
              </Link>
            </InfoRow>
          </Card>

          <Card className={sheetClassName}>
            <h2 className="font-display text-[22px]">{t('balanceTitle')}</h2>

            <div className="mt-3.5">
              <InfoRow label={t('balance')}>{n(data.balance, true)}</InfoRow>
              <InfoRow label={t('requestValue')}>{`−${n(data.value)}`}</InfoRow>
              <InfoRow label={t('vatLabel')}>{t('onExchangeValue')}</InfoRow>
              <InfoRow label={t('afterApproval')}>{n(data.afterApproval, true)}</InfoRow>
            </div>

            <p className="font-medium font-body text-[14.5px] text-soft leading-[1.85] mt-3">
              {t('balanceNote')}
            </p>
          </Card>
        </aside>
      </div>
    </>
  )
}

function DurationUnitPills({
  labels,
  ariaLabel,
}: {
  labels: { hours: string; days: string }
  ariaLabel: string
}) {
  const { watch, setValue } = useFormContext<NamliyaRequestFormValues>()
  const unit = watch('unit')

  return (
    <div role="radiogroup" aria-label={ariaLabel} className="flex flex-wrap gap-2.5">
      {(['hours', 'days'] as const).map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={unit === option}
          onClick={() => setValue('unit', option)}
          className={cn(
            'block cursor-pointer rounded-[999px] border-[2.5px] border-ink px-5.5 py-2.75 font-body font-extrabold text-[15.5px] transition-colors',
            unit === option ? 'bg-ink text-surface' : 'bg-paper text-ink hover:bg-gold',
          )}
        >
          {labels[option]}
        </button>
      ))}
    </div>
  )
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-3 py-3 last:pb-0 border-b-[2.5px] border-dashed border-ink/25 last:border-b-0 font-bold text-[15.5px]">
      <span className="font-semibold text-soft">{label}</span>
      <span>{children}</span>
    </div>
  )
}
