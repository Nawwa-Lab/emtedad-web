'use client'

import { CommunityRouteGuard } from '@/components/CommunityRouteGuard'
import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemDescription,
  RadioGroupItemTitle,
} from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import BalanceIcon from '@/icons/balance.svg'
import CirclesIcon from '@/icons/circles.svg'
import HandIcon from '@/icons/hand.svg'
import PlantIcon from '@/icons/plant.svg'
import { formatNumber } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { Check } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image, { type StaticImageData } from 'next/image'
import { type ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { BackLink, PageHead } from '../../components'
import { durationUnits, rateOptions } from '../../data'

const toEnglishDigits = (s: string) => s.replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
function digitsOnly(value: string) {
  return toEnglishDigits(value).replace(/\D/g, '')
}

const inputClassName =
  'placeholder:text-soft/60 placeholder:font-medium focus:outline-[3px] focus:outline-blue focus:outline-offset-2 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-blue focus-visible:outline-offset-2'

const postCreateSchema = z.object({
  audience: z.enum(['org', 'mem']),
  availability: z.enum(['open', 'fixed']),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  amount: z.string(),
  unit: z.enum(['hours', 'days', 'sessions']),
  from: z.string(),
  to: z.string(),
  pricing: z.enum(['paid', 'free']),
  serviceHours: z.string(),
  serviceRate: z.number(),
})

type PostCreateFormValues = z.infer<typeof postCreateSchema>

const defaultValues: PostCreateFormValues = {
  audience: 'org',
  availability: 'open',
  title: '',
  description: '',
  category: '',
  amount: '',
  unit: 'hours',
  from: '',
  to: '',
  pricing: 'paid',
  serviceHours: '4',
  serviceRate: 5,
}

function SectionTitle({ icon, children }: { icon: StaticImageData; children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-3.25 font-display text-[27px] leading-[1.2]">
      <Image src={icon} alt="" width={36} height={36} className="size-9 shrink-0" />
      {children}
    </h2>
  )
}

function RateButtons({
  value,
  onChange,
  label,
}: {
  value: number
  onChange: (value: number) => void
  label: string
}) {
  const locale = useLocale()
  return (
    <div className="flex flex-wrap gap-2.25" role="group" aria-label={label}>
      {rateOptions.map((rate) => (
        <button
          key={rate}
          type="button"
          aria-pressed={value === rate}
          onClick={() => onChange(rate)}
          className={cn(
            'size-13 cursor-pointer rounded-[14px] border-[2.5px] border-ink font-display text-[24px] leading-none shadow-[3px_3px_0] shadow-ink transition-colors',
            value === rate ? 'bg-red text-surface' : 'bg-paper text-ink hover:bg-gold',
          )}
        >
          {formatNumber(rate, { locale })}
        </button>
      ))}
    </div>
  )
}

export default function PostCreatePage() {
  const t = useTranslations('khalliKhalesPostCreate')

  const publish = (values: PostCreateFormValues) => {
    console.log('publish service', {
      ...values,
      serviceValue: (Number(values.serviceHours) || 0) * values.serviceRate,
    })
  }

  return (
    <CommunityRouteGuard>
      <>
        <BackLink href="/khalli-khales/browse" label={t('back')} />
        <PageHead title={t('pageTitle')} subtitle={t('pageDesc')} />

        <Form<PostCreateFormValues>
          resolver={zodResolver(postCreateSchema)}
          defaultValues={defaultValues}
          onSubmit={publish}
        >
          <PostCreateForm />
        </Form>
      </>
    </CommunityRouteGuard>
  )
}

function PostCreateForm() {
  const t = useTranslations('khalliKhalesPostCreate')
  const global = useTranslations('global')
  const locale = useLocale()
  const { control, watch } = useFormContext<PostCreateFormValues>()

  const audience = watch('audience')
  const availability = watch('availability')
  const pricing = watch('pricing')
  const serviceHours = watch('serviceHours')
  const serviceRate = watch('serviceRate')

  const audienceOrg = audience === 'org'
  const fmt = (value: number | string) => formatNumber(value, { locale })
  const currency = global('currency')
  const serviceValue = (Number(serviceHours) || 0) * serviceRate

  return (
    <div className="grid grid-cols-1 items-start gap-6 min-[981px]:grid-cols-[1.5fr_1fr]">
      <div>
        {/* audience */}
        <Card effect="3d" className="mb-5.5 px-7.5! pt-7! pb-7! shadow-[6px_6px_0]">
          <SectionTitle icon={CirclesIcon}>{t('audienceTitle')}</SectionTitle>
          <p className="mt-2 mb-5.5 font-body text-[16.5px] font-medium leading-[1.95] text-soft">
            {t('audienceSub')}
          </p>
          <Controller
            control={control}
            name="audience"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
                aria-label={t('audienceAria')}
                className="grid-cols-2 gap-3"
              >
                {(
                  [
                    { id: 'org', title: t('audOrgTitle'), desc: t('audOrgDesc') },
                    { id: 'mem', title: t('audMemTitle'), desc: t('audMemDesc') },
                  ] as const
                ).map((option) => (
                  <RadioGroupItem
                    key={option.id}
                    value={option.id}
                    className="min-h-0 rounded-card px-3.5 py-4 [&_[data-slot=radio-group-indicator]]:hidden hover:translate-x-0 hover:translate-y-0 hover:rotate-0 hover:shadow-[7px_7px_0]"
                  >
                    <RadioGroupItemTitle className="text-[20px]/[1.3]">
                      {option.title}
                    </RadioGroupItemTitle>
                    <RadioGroupItemDescription className="mt-1 max-w-none text-[13.5px]/[1.7]">
                      {option.desc}
                    </RadioGroupItemDescription>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            )}
          />
        </Card>

        {/* details */}
        <Card effect="3d" className="mb-5.5 px-7.5! pt-7! pb-7! shadow-[6px_6px_0]">
          <SectionTitle icon={HandIcon}>{t('detailsTitle')}</SectionTitle>
          <div>
            <Form.Control name="title" label={t('titleLabel')} labelFor="service-title">
              {(field) => (
                <Input
                  id="service-title"
                  placeholder={t('titlePlaceholder')}
                  className={inputClassName}
                  {...field}
                />
              )}
            </Form.Control>

            <Form.Control name="description" label={t('descLabel')} labelFor="service-description">
              {(field) => (
                <>
                  <Textarea
                    id="service-description"
                    placeholder={t('descPlaceholder')}
                    className={cn(inputClassName, 'min-h-35 resize-y')}
                    {...field}
                  />
                  <p className="mt-1.75 block font-body text-[13.5px] font-semibold leading-[1.7] text-soft">
                    {t('descHint')}
                  </p>
                </>
              )}
            </Form.Control>

            <Form.Control name="category" label={t('categoryLabel')} labelFor="service-category">
              {(field) => (
                <>
                  <Input
                    id="service-category"
                    maxLength={14}
                    placeholder={t('categoryPlaceholder')}
                    className={inputClassName}
                    {...field}
                  />
                  <p className="mt-1.75 block font-body text-[13.5px] font-semibold leading-[1.7] text-soft">
                    {t('categoryHint')}
                  </p>
                </>
              )}
            </Form.Control>

            <Form.Control name="availability" label={t('availLabel')} className="mb-5">
              {(field) => (
                <>
                  <div
                    className="flex flex-wrap items-center gap-6.5"
                    role="radiogroup"
                    aria-label={t('availLabel')}
                  >
                    {(['open', 'fixed'] as const).map((option) => {
                      const selected = field.value === option
                      return (
                        <label
                          key={option}
                          className="inline-flex cursor-pointer items-center gap-3 font-body text-[16px] font-bold leading-[1.4]"
                        >
                          <input
                            type="radio"
                            name={field.name}
                            checked={selected}
                            onChange={() => field.onChange(option)}
                            onBlur={field.onBlur}
                            className="sr-only"
                          />
                          <span
                            className={cn(
                              'grid size-6.5 shrink-0 place-items-center rounded-lg border-[2.5px] border-ink shadow-[2px_2px_0] shadow-ink transition-colors',
                              selected ? 'bg-gold' : 'bg-surface',
                            )}
                          >
                            {selected && <Check className="size-3.5" strokeWidth={3} />}
                          </span>
                          {option === 'open' ? t('availAnytime') : t('availFixed')}
                        </label>
                      )
                    })}
                  </div>

                  {availability === 'fixed' && (
                    <div className="mt-3.5 grid grid-cols-1 gap-3.5 min-[621px]:grid-cols-2">
                      <div>
                        <Form.Control
                          name="amount"
                          label={t('amountLabel')}
                          labelFor="service-amount"
                          className="mb-0"
                        >
                          {(amountField) => (
                            <>
                              <Input
                                id="service-amount"
                                inputMode="numeric"
                                placeholder={t('amountPlaceholder')}
                                className={inputClassName}
                                {...amountField}
                                onChange={(event) =>
                                  amountField.onChange(digitsOnly(event.target.value))
                                }
                              />
                              <Controller
                                control={control}
                                name="unit"
                                render={({ field: unitField }) => (
                                  <div
                                    className="mt-2 flex flex-wrap gap-2"
                                    role="radiogroup"
                                    aria-label={t('unitAria')}
                                  >
                                    {durationUnits.map((option) => {
                                      const selected = unitField.value === option
                                      return (
                                        <button
                                          key={option}
                                          type="button"
                                          role="radio"
                                          aria-checked={selected}
                                          onClick={() => unitField.onChange(option)}
                                          className={cn(
                                            'cursor-pointer rounded-full border-[2.5px] border-ink px-4.5 py-2 font-body text-[14.5px] font-extrabold transition-colors focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue',
                                            selected
                                              ? 'bg-ink text-surface'
                                              : 'bg-paper text-ink hover:bg-gold',
                                          )}
                                        >
                                          {option === 'hours'
                                            ? t('unitHours')
                                            : option === 'days'
                                              ? t('unitDays')
                                              : t('unitSessions')}
                                        </button>
                                      )
                                    })}
                                  </div>
                                )}
                              />
                            </>
                          )}
                        </Form.Control>
                      </div>
                      <div>
                        <Form.Control
                          name="from"
                          label={t('fromLabel')}
                          labelFor="service-from"
                          className="mb-0"
                        >
                          {(fromField) => (
                            <Input
                              id="service-from"
                              placeholder={t('fromPlaceholder')}
                              className={inputClassName}
                              {...fromField}
                            />
                          )}
                        </Form.Control>
                        <Form.Control
                          name="to"
                          label={t('toLabel')}
                          labelFor="service-to"
                          className="mb-0 mt-3"
                        >
                          {(toField) => (
                            <Input
                              id="service-to"
                              placeholder={t('toPlaceholder')}
                              className={inputClassName}
                              {...toField}
                            />
                          )}
                        </Form.Control>
                      </div>
                    </div>
                  )}
                </>
              )}
            </Form.Control>
          </div>
        </Card>

        {/* pricing */}
        <Card effect="3d" className="mb-5.5 px-7.5! pt-7! pb-7! shadow-[6px_6px_0]">
          <SectionTitle icon={BalanceIcon}>{t('pricingTitle')}</SectionTitle>

          <Controller
            control={control}
            name="pricing"
            render={({ field }) => (
              <>
                <div
                  className="mt-5.5 mb-3.5 flex flex-wrap gap-2.25"
                  role="radiogroup"
                  aria-label={t('pricingTitle')}
                >
                  {(['paid', 'free'] as const).map((option) => {
                    const selected = field.value === option
                    return (
                      <button
                        key={option}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => field.onChange(option)}
                        className={cn(
                          'rounded-full border-[2.5px] border-ink px-4.5 py-2 font-body text-[14.5px] font-extrabold transition-colors',
                          selected ? 'bg-ink text-surface' : 'bg-paper text-ink hover:bg-gold',
                        )}
                      >
                        {t(option === 'paid' ? 'paid' : 'free')}
                      </button>
                    )
                  })}
                </div>

                {field.value === 'paid' && (
                  <div>
                    <div className="grid grid-cols-1 gap-3.5 min-[621px]:grid-cols-2">
                      <Form.Control
                        name="serviceHours"
                        label={t('hoursLabel')}
                        labelFor="service-hours"
                        className="mb-0"
                      >
                        {(hoursField) => (
                          <Input
                            id="service-hours"
                            inputMode="numeric"
                            placeholder={t('amountPlaceholder')}
                            className={inputClassName}
                            {...hoursField}
                            value={hoursField.value ? fmt(hoursField.value) : ''}
                            onChange={(event) =>
                              hoursField.onChange(digitsOnly(event.target.value))
                            }
                          />
                        )}
                      </Form.Control>
                      <Form.Control name="serviceRate" label={t('rateLabel')} className="mb-0">
                        {(rateField) => (
                          <RateButtons
                            value={rateField.value}
                            onChange={rateField.onChange}
                            label={t('rateAria')}
                          />
                        )}
                      </Form.Control>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-4 rounded-card border-3 border-ink bg-gold px-5.5 py-4.5 shadow-[4px_4px_0] shadow-ink">
                      <span className="min-w-40 flex-1 font-display text-[19px]">
                        {t('calcLabel')}
                        <span className="mt-0.75 block font-body text-[14px] font-semibold text-soft">
                          {t('calcFormula', {
                            count: fmt(serviceHours || 0),
                            rate: fmt(serviceRate),
                          })}
                        </span>
                      </span>
                      <span>
                        <span className="block font-display text-[44px] leading-none">
                          {fmt(serviceValue)}
                          <small className="ms-1.5 text-[18px]">{currency}</small>
                        </span>
                        <span className="mt-1 block font-body text-[12.5px] font-semibold text-soft">
                          {t('vatNote')}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          />

          <div className="mt-4 rounded-card border-[2.5px] border-dashed border-ink bg-paper px-5 py-4">
            <b className="mb-2 block font-display text-[18px] font-normal">{t('guideTitle')}</b>
            <ul>
              {(t.raw('guideItems') as string[]).map((_, index) => (
                <li
                  key={index}
                  className="relative mb-1.25 list-none ps-5 font-body text-[14.5px] font-medium leading-[1.9] text-soft before:absolute before:inset-s-0.5 before:top-2.75 before:size-2 before:rounded-full before:border-2 before:border-ink before:bg-gold"
                >
                  {t.rich(`guideItems.${index}`, {
                    b: (chunks) => <b className="font-extrabold text-ink">{chunks}</b>,
                  })}
                </li>
              ))}
            </ul>
          </div>

          <Button
            type="submit"
            className="mt-4.5 h-auto w-full px-6.5 py-2.75 text-center text-[16px]"
          >
            {t('publish')}
          </Button>
        </Card>
      </div>

      <aside>
        <Card effect="3d" className="mb-5.5 px-7.5! pt-7! pb-7! shadow-[6px_6px_0]">
          <h2 className="font-display text-[22px] leading-[1.2]">{t('summary.title')}</h2>
          <div className="mt-3.5">
            <div className="flex justify-between gap-3 border-b-[2.5px] border-dashed border-ink/26 py-3 font-body text-[15.5px] font-bold">
              <span className="font-semibold text-soft">{t('summary.audienceLabel')}</span>
              <span>{audienceOrg ? t('summary.audienceOrg') : t('summary.audienceMem')}</span>
            </div>
            <div className="flex justify-between gap-3 border-b-[2.5px] border-dashed border-ink/26 py-3 font-body text-[15.5px] font-bold">
              <span className="font-semibold text-soft">{t('summary.requestLabel')}</span>
              <span>{audienceOrg ? t('summary.requestOrg') : t('summary.requestMem')}</span>
            </div>
            <div className="flex justify-between gap-3 py-3 font-body text-[15.5px] font-bold">
              <span className="font-semibold text-soft">{t('summary.valueLabel')}</span>
              <span>{pricing === 'free' ? t('free') : `${fmt(serviceValue)} ${currency}`}</span>
            </div>
          </div>
        </Card>

        <Card
          effect="3d"
          className="mt-5.5 flex items-center gap-4 bg-gold px-6! pt-5! pb-5! shadow-[6px_6px_0]"
        >
          <span className="flex h-11.5 w-10.5 shrink-0 items-center justify-center">
            <Image
              src={PlantIcon}
              alt=""
              width={42}
              height={42}
              className="max-h-full max-w-full"
            />
          </span>
          <p className="min-w-50 flex-1 font-body text-[16px] font-semibold leading-[1.9]">
            <b className="font-display text-[18px] font-normal">{t('note.title')}</b>{' '}
            {t('note.body')}
          </p>
        </Card>
      </aside>
    </div>
  )
}
