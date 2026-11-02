'use client'
import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { FieldTitle } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Link } from '@/i18n/navigation'
import {
  createPostServiceSchema,
  type PostServiceFormValues,
} from '@/types/schemas/post-service-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { memberResponsible, limitInfo, type Locale } from './data'
import { ChevronLeft } from 'lucide-react'
import CirclesIcon from '@/icons/circles.svg'
import KeyIcon from '@/icons/key.svg'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'

// ── Helpers (outside components: they don't depend on props or state) ───────

const toEnglishDigits = (s: string) => s.replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))

const rateOptions = [
  { value: 1, labelAr: '١', labelEn: '1' },
  { value: 2, labelAr: '٢', labelEn: '2' },
  { value: 3, labelAr: '٣', labelEn: '3' },
  { value: 4, labelAr: '٤', labelEn: '4' },
  { value: 5, labelAr: '٥', labelEn: '5' },
]

// ── Inner components that consume form context ──────────────────────────────

function DurationToggle({ labels }: { labels: { any: string; specific: string } }) {
  const { watch, setValue } = useFormContext<PostServiceFormValues>()
  const selectedDuration = watch('duration')

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => {
          setValue('duration', 'any')
          setValue('specificDuration', '')
          setValue('from', '')
          setValue('to', '')
        }}
        className={cn(
          'inline-block font-cairo border-[2.5px] border-black rounded-[999px] font-bold text-[15.5px] py-2.75 px-5.5 cursor-pointer transition-colors',
          selectedDuration === 'any' ? 'bg-black text-white' : 'bg-paper text-black hover:bg-gold',
        )}
      >
        {labels.any}
      </button>
      <button
        type="button"
        onClick={() => setValue('duration', 'specific')}
        className={cn(
          'inline-block font-cairo border-[2.5px] border-black rounded-[999px] font-bold text-[15.5px] py-2.75 px-5.5 cursor-pointer transition-colors',
          selectedDuration === 'specific'
            ? 'bg-black text-white'
            : 'bg-paper text-black hover:bg-gold',
        )}
      >
        {labels.specific}
      </button>
    </div>
  )
}

function SpecificDurationField({ label, placeholder }: { label: string; placeholder: string }) {
  const { watch, setValue } = useFormContext<PostServiceFormValues>()
  const duration = watch('duration')
  const durationUnit = watch('durationUnit') ?? 'Hours'
  const t = useTranslations('postServiceNamliya')

  if (duration !== 'specific') return null

  const timeframes = t.raw('timeframe') as Record<string, string>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
      <div>
        <Form.Control<PostServiceFormValues>
          name="specificDuration"
          label={label}
          labelFor="service-specific-duration"
          className="mb-2"
        >
          {(field, fieldState) => (
            <Input
              id="service-specific-duration"
              placeholder={placeholder}
              inputMode="numeric"
              aria-invalid={fieldState.invalid}
              {...field}
              value={(field.value as string) ?? ''}
              onChange={(e) => {
                const digits = toEnglishDigits(e.target.value).replace(/\D/g, '')
                field.onChange(digits)
              }}
            />
          )}
        </Form.Control>
        <div className="flex gap-2 flex-wrap mt-2">
          {Object.entries(timeframes).map(([key, item]) => (
            <button
              key={key}
              type="button"
              onClick={() => setValue('durationUnit', key)}
              className={cn(
                'inline-block font-cairo border-[2.5px] border-black rounded-[999px] font-bold text-[15.5px] py-2.75 px-5.5 cursor-pointer transition-colors',
                durationUnit === key ? 'bg-black text-white' : 'bg-paper text-black hover:bg-gold',
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Form.Control<PostServiceFormValues>
          name="from"
          label={t('from')}
          labelFor="service-from"
          className="mb-3.5"
        >
          {(field, fieldState) => (
            <Input
              id="service-from"
              placeholder={t('fromPlaceholder')}
              aria-invalid={fieldState.invalid}
              {...field}
              value={(field.value as string) ?? ''}
            />
          )}
        </Form.Control>
        <Form.Control<PostServiceFormValues>
          name="to"
          label={t('to')}
          labelFor="service-to"
          className="mb-3.5"
        >
          {(field, fieldState) => (
            <Input
              id="service-to"
              placeholder={t('toPlaceholder')}
              aria-invalid={fieldState.invalid}
              {...field}
              value={(field.value as string) ?? ''}
            />
          )}
        </Form.Control>
      </div>
    </div>
  )
}

function PricingToggle({ labels }: { labels: { paid: string; free: string } }) {
  const { watch, setValue } = useFormContext<PostServiceFormValues>()
  const pricingType = watch('pricingType')

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => {
          setValue('pricingType', 'paid')
          setValue('hourlyRate', 5, { shouldValidate: true })
          setValue('serviceHours', '7', { shouldValidate: true })
          setValue('price', 35, { shouldValidate: true })
        }}
        className={cn(
          'inline-block font-cairo border-[2.5px] border-black rounded-[999px] font-bold text-[15.5px] py-2.75 px-5.5 cursor-pointer transition-colors',
          pricingType === 'paid' ? 'bg-black text-white' : 'bg-paper text-black hover:bg-gold',
        )}
      >
        {labels.paid}
      </button>
      <button
        type="button"
        onClick={() => {
          setValue('pricingType', 'free')
          setValue('hourlyRate', undefined)
          setValue('serviceHours', '')
          setValue('price', 0)
        }}
        className={cn(
          'inline-block font-cairo border-[2.5px] border-black rounded-[999px] font-bold text-[15.5px] py-2.75 px-5.5 cursor-pointer transition-colors',
          pricingType === 'free' ? 'bg-black text-white' : 'bg-paper text-black hover:bg-gold',
        )}
      >
        {labels.free}
      </button>
    </div>
  )
}

function SpecificPricingField({
  serviceHoursLabel,
  hourlyRateLabel,
  placeholder,
}: {
  serviceHoursLabel: string
  hourlyRateLabel: string
  placeholder: string
}) {
  const { watch, setValue } = useFormContext<PostServiceFormValues>()
  const locale = useLocale()
  const t = useTranslations('postServiceNamliya')

  const pricingType = watch('pricingType')
  const selectedRate = watch('hourlyRate')
  const hoursRaw = watch('serviceHours') as string | undefined

  // Calculate the total from the two fields
  const hours = Number(hoursRaw) || 0
  const rate = Number(selectedRate) || 0
  const total = hours * rate

  const fmt = (n: number) => n.toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US')

  // Keep the form's `price` in sync with the total when in paid mode
  useEffect(() => {
    if (pricingType === 'paid') {
      setValue('price', total, { shouldValidate: true })
    }
  }, [pricingType, total, setValue])

  // Must stay AFTER all hooks
  if (pricingType !== 'paid') return null

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
        {/* Hours input */}
        <div>
          <Form.Control<PostServiceFormValues>
            name="serviceHours"
            label={serviceHoursLabel}
            labelFor="service-hours"
          >
            {(field, fieldState) => (
              <Input
                id="service-hours"
                inputMode="numeric"
                placeholder={placeholder}
                aria-invalid={fieldState.invalid}
                {...field}
                value={(field.value as string) ?? ''}
                onChange={(e) => {
                  // accept Arabic digits, store English digits only
                  const digitsOnly = toEnglishDigits(e.target.value).replace(/\D/g, '')
                  field.onChange(digitsOnly)
                }}
              />
            )}
          </Form.Control>
        </div>

        {/* Rate buttons */}
        <div>
          <Form.Control<PostServiceFormValues>
            name="hourlyRate"
            label={hourlyRateLabel}
            labelFor="hourly-rate"
          >
            {(_, fieldState) => (
              <div className="flex gap-2 w-full" id="hourly-rate">
                {rateOptions.map((option) => {
                  const isSelected = selectedRate === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setValue('hourlyRate', option.value, { shouldValidate: true })}
                      className={cn(
                        'flex-1 h-13.5 rounded-[14px] border-[2.5px] border-black font-cairo font-bold text-[22px] flex items-center justify-center cursor-pointer transition-all shadow-[2.5px_3px_0px_#1a1714]',
                        isSelected ? 'bg-red text-white' : 'bg-paper text-black hover:bg-gold',
                        fieldState.invalid && !selectedRate && 'border-red',
                      )}
                    >
                      {locale === 'ar' ? option.labelAr : option.labelEn}
                    </button>
                  )
                })}
              </div>
            )}
          </Form.Control>
        </div>

        {/* Result box (spans both columns) */}
        <Card className="sm:col-span-2 bg-gold p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="font-display text-[19px] flex-1 min-w-40">
              <p>{t('serviceValue')}</p>
              <p className="font-body text-[14px] font-semibold text-soft mt-0.75">
                {t('hoursTimesRate', { hours: fmt(hours), rate: fmt(rate) })}
              </p>
            </div>

            <div>
              <p className="font-display text-[44px] leading-none">
                <span>{fmt(total)}</span>{' '}
                <span className="text-[18px] ms-1.5">{t('currency')}</span>
              </p>
              <p className=" font-semibold text-[12.5px] text-soft mt-1">{t('vatNote')}</p>
            </div>
          </div>
        </Card>
      </div>
      <p className="font-semibold font-body text-[13.5px] text-soft mt-1.75 leading-[1.7]">
        {t('priceNote')}
      </p>
    </>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function PostServicePage() {
  const t = useTranslations('postServiceNamliya')
  const locale = useLocale() as Locale

  const schema = useMemo(
    () =>
      createPostServiceSchema({
        titleRequired: t('validation.titleRequired'),
        titleMin: t('validation.titleMin'),
        descriptionRequired: t('validation.descriptionRequired'),
        categoryRequired: t('validation.categoryRequired'),
        priceRequired: t('validation.priceRequired'),
        pricePositive: t('validation.pricePositive'),
        memberRequired: t('validation.memberRequired'),
        specificDurationRequired: t('validation.specificDurationRequired'),
        serviceHoursRequired: t('validation.serviceHoursRequired'),
        hourlyRateRequired: t('validation.hourlyRateRequired'),
      }),
    [t],
  )

  const onSubmit = (data: PostServiceFormValues) => {
    console.log('post service submit', data)
  }

  return (
    <>
      <Link
        href="/namliya/service-offers"
        className="inline-flex items-center gap-2.5 font-bold text-[15.5px] mb-4 text-ink font-cairo"
      >
        <span className="size-9.5 shrink-0 rounded-full border-[2.5px] border-ink bg-surface shadow-[3px_3px_0] shadow-ink grid place-items-center p-2.25 text-ink">
          <ChevronLeft className="w-full h-full rtl:rotate-180" />
        </span>
        <span className="hover:text-red">{t('backToNamliya')}</span>
      </Link>
      <div className="flex items-end gap-5 mb-2">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)] leading-none">
          {t('pageTitle')}
        </h1>
        <p className="font-medium font-body text-[17px] text-soft pb-2.5">{t('pageDesc')}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-start">
        <Card className="p-4 sm:p-7">
          <FieldTitle className="font-display font-bold text-lg sm:text-[23px] mb-5 flex items-center gap-3.5">
            <Image src={CirclesIcon} alt="" width={36} height={36} />
            {t('addPostTitle')}
          </FieldTitle>
          <p className="font-medium font-body text-[16.5px] text-soft leading-[1.95] mt-2 mb-5.5">
            {t('addPostDesc')}
          </p>
          <Form
            resolver={zodResolver(schema)}
            defaultValues={{
              title: '',
              description: '',
              category: '',
              pricingType: 'paid' as const,
              serviceHours: '7',
              hourlyRate: 5,
              price: 35,
              duration: 'any' as const,
              specificDuration: '',
              durationUnit: 'Hours',
              from: '',
              to: '',
              member: memberResponsible[0].value,
            }}
            onSubmit={onSubmit}
          >
            <Form.Control<PostServiceFormValues>
              name="title"
              label={t('offerTypeTitle')}
              labelFor="service-title"
            >
              {(field, fieldState) => (
                <Input
                  id="service-title"
                  placeholder={t('offerTypePlaceholder')}
                  aria-invalid={fieldState.invalid}
                  {...field}
                  value={(field.value as string) ?? ''}
                />
              )}
            </Form.Control>

            <Form.Control<PostServiceFormValues>
              name="description"
              label={t('descriptionTitle')}
              labelFor="service-description"
            >
              {(field, fieldState) => (
                <>
                  <Textarea
                    id="service-description"
                    placeholder={t('descriptionPlaceholder')}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    value={(field.value as string) ?? ''}
                  />
                  <p className="font-semibold text-[13.5px] font-body text-soft mt-1.75 leading-[1.7]">
                    {t('descNotice')}
                  </p>
                </>
              )}
            </Form.Control>

            <Form.Control<PostServiceFormValues>
              name="category"
              label={t('serviceCategory')}
              labelFor="service-category"
            >
              {(field, fieldState) => (
                <>
                  <Input
                    id="service-category"
                    placeholder={t('categoryPlaceholder')}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    value={(field.value as string) ?? ''}
                  />
                  <p className="font-semibold font-body text-[13.5px] text-soft mt-1.75 leading-[1.7]">
                    {t('categoryNotice')}
                  </p>
                </>
              )}
            </Form.Control>

            <Form.Control<PostServiceFormValues>
              name="duration"
              label={t('timeTitle')}
              className="mb-3.5"
            >
              {() => <DurationToggle labels={{ any: t('anytime'), specific: t('specificTime') }} />}
            </Form.Control>

            <SpecificDurationField
              label={t('specificDuration')}
              placeholder={t('specificDurationPlaceholder')}
            />

            <Form.Control<PostServiceFormValues>
              name="pricingType"
              label={t('pricingTitle')}
              className="mb-3.5"
            >
              {() => <PricingToggle labels={{ paid: t('paid'), free: t('free') }} />}
            </Form.Control>

            <SpecificPricingField
              serviceHoursLabel={t('serviceHours')}
              hourlyRateLabel={t('hourlyRate')}
              placeholder={t('serviceHoursPlaceholder')}
            />

            <Card
              effect="flat"
              className="border-[2.5px] border-dashed border-ink py-4 px-5 mt-4 mb-2 bg-paper"
            >
              <CardTitle className="font-display text-[18px] mb-2">{t('priceInfoNote')}</CardTitle>
              <ul className="space-y-1.5">
                {((t.raw('priceData') as string[]) ?? []).map((_, index) => (
                  <li
                    key={index}
                    className="font-medium font-body text-[14.5px] text-soft leading-[1.9] ps-5 relative mb-1.25"
                  >
                    <span className="absolute inset-s-0 top-[0.8em] size-2.5 shrink-0 rounded-full border-2 border-ink bg-gold" />
                    <span>
                      {t.rich(`priceData.${index}`, {
                        b: (chunks) => (
                          <strong className="font-extra-bold text-ink">{chunks}</strong>
                        ),
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Form.Control<PostServiceFormValues>
              name="member"
              label={t('memberResponsible')}
              labelFor="service-member"
            >
              {(field, fieldState) => (
                <Select
                  items={memberResponsible}
                  name={field.name}
                  value={field.value as string}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="service-member" aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder={memberResponsible[0].value} />
                  </SelectTrigger>
                  <SelectContent side="bottom" sideOffset={0} alignItemWithTrigger={false}>
                    <SelectGroup>
                      {memberResponsible.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          className="focus:bg-line focus:text-ink [aria-selected]:bg-line [aria-selected]:text-ink"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </Form.Control>

            <Button type="submit" className="mt-1.5 w-full text-center">
              {t('post')}
            </Button>
          </Form>
        </Card>
        <aside>
          <Card className="py-7 px-7.5 mb-5.5 bg-surface">
            <CardTitle className="text-[22px] font-display leading-[1.2] flex items-center gap-3.25">
              {t('limitsTitle')}
            </CardTitle>
            <div className="flex justify-between gap-3 py-3 px-0 border-b-[2.5px] border-dashed border-soft text-[15.5px]">
              <span className="font-semibold text-soft">{t('user')}</span>
              <span className="font-bold">{t('usedRatio')}</span>
            </div>
            <Progress value={65} className="mt-3.5" />
            <p className="font-medium font-body text-[14.5px] text-soft leading-[1.85] mt-3">
              {limitInfo[locale]}
            </p>
          </Card>
          <Card className="bg-gold py-5 px-6 mt-5.5 flex items-center gap-4">
            <Image src={KeyIcon} alt="" width={42} height={46} />
            <div className="font-semibold font-body text-[16px] leading-[1.9] flex-1 min-w-50">
              <b className="font-display text-[18px]">{t('cardInfo')}</b>
              <p>{t('cardDesc')}</p>
            </div>
          </Card>
        </aside>
      </div>
    </>
  )
}
