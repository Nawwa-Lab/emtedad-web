'use client'
import { Form } from '@/components/Form'
import { ImageDropzone, type AttachedImage } from '@/components/ImageDropzone'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Link } from '@/i18n/navigation'
import CirclesIcon from '@/icons/circles.svg'
import HandIcon from '@/icons/hand.svg'
import KeyIcon from '@/icons/key.svg'
import TargetIcon from '@/icons/target.svg'
import {
  createPostResourceSchema,
  type PostResourceFormValues,
} from '@/types/schemas/post-resource-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { ChevronLeft } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { memberResponsible, rateOptions } from './data'

// ── Helpers ─────────────────────────────────────────────────────────────────

const toEnglishDigits = (s: string) => s.replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))

// ── Duration Controls ───────────────────────────────────────────────────────

function DurationSection() {
  const { watch, setValue } = useFormContext<PostResourceFormValues>()
  const t = useTranslations('postResourceNamliya')
  const duration = watch('duration')
  const durationUnit = watch('durationUnit') ?? 'days'

  return (
    <div className="mb-5">
      <span className="block font-bold text-[15px] text-soft mb-2.25 font-body">
        {t('timeTitle')}
      </span>
      <div className="flex gap-2.5 flex-wrap" role="radiogroup" aria-label={t('timeTitle')}>
        <button
          type="button"
          onClick={() => setValue('duration', 'any')}
          className={cn(
            'border-[2.5px] border-ink rounded-full py-2.5 px-5.5 font-body font-extrabold text-[15.5px] transition-colors cursor-pointer',
            duration === 'any' ? 'bg-ink text-surface' : 'bg-paper text-ink hover:bg-gold',
          )}
        >
          {t('openDuration')}
        </button>
        <button
          type="button"
          onClick={() => setValue('duration', 'specific')}
          className={cn(
            'border-[2.5px] border-ink rounded-full py-2.5 px-5.5 font-body font-extrabold text-[15.5px] transition-colors cursor-pointer',
            duration === 'specific' ? 'bg-ink text-surface' : 'bg-paper text-ink hover:bg-gold',
          )}
        >
          {t('specificDuration')}
        </button>
      </div>

      {duration === 'specific' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
          <div>
            <Form.Control<PostResourceFormValues>
              name="specificDuration"
              label={t('howMuch')}
              labelFor="resource-specific-duration"
              className="mb-2"
            >
              {(field, fieldState) => (
                <Input
                  id="resource-specific-duration"
                  placeholder={t('howMuchPlaceholder')}
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
            <div className="flex gap-2 flex-wrap mt-2" role="radiogroup" aria-label="Duration unit">
              <button
                type="button"
                onClick={() => setValue('durationUnit', 'days')}
                className={cn(
                  'border-[2.5px] border-ink rounded-full py-2 px-4.5 font-body font-extrabold text-[14.5px] transition-colors cursor-pointer',
                  durationUnit === 'days'
                    ? 'bg-ink text-surface'
                    : 'bg-paper text-ink hover:bg-gold',
                )}
              >
                {t('days')}
              </button>
              <button
                type="button"
                onClick={() => setValue('durationUnit', 'hours')}
                className={cn(
                  'border-[2.5px] border-ink rounded-full py-2 px-4.5 font-body font-extrabold text-[14.5px] transition-colors cursor-pointer',
                  durationUnit === 'hours'
                    ? 'bg-ink text-surface'
                    : 'bg-paper text-ink hover:bg-gold',
                )}
              >
                {t('hours')}
              </button>
            </div>
          </div>

          <div>
            <Form.Control<PostResourceFormValues>
              name="from"
              label={t('availableFrom')}
              labelFor="resource-from"
              className="mb-3"
            >
              {(field, fieldState) => (
                <Input
                  id="resource-from"
                  placeholder={t('availableFromPlaceholder')}
                  aria-invalid={fieldState.invalid}
                  {...field}
                  value={(field.value as string) ?? ''}
                />
              )}
            </Form.Control>

            <Form.Control<PostResourceFormValues>
              name="to"
              label={t('until')}
              labelFor="resource-to"
            >
              {(field, fieldState) => (
                <Input
                  id="resource-to"
                  placeholder={t('untilPlaceholder')}
                  aria-invalid={fieldState.invalid}
                  {...field}
                  value={(field.value as string) ?? ''}
                />
              )}
            </Form.Control>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Pricing Controls ────────────────────────────────────────────────────────

function PricingSection() {
  const { watch, setValue } = useFormContext<PostResourceFormValues>()
  const t = useTranslations('postResourceNamliya')
  const pricingType = watch('pricingType')

  return (
    <div className="mb-5">
      <span className="block font-bold text-[15px] text-soft mb-2.25 font-body">
        {t('pricingTitle')}
      </span>
      <div
        className="flex gap-2.5 flex-wrap mb-3.5"
        role="radiogroup"
        aria-label={t('pricingTitle')}
      >
        <button
          type="button"
          onClick={() => {
            setValue('pricingType', 'paid')
            setValue('price', undefined)
          }}
          className={cn(
            'border-[2.5px] border-ink rounded-full py-2 px-4.5 font-body font-extrabold text-[14.5px] transition-colors cursor-pointer',
            pricingType === 'paid' ? 'bg-ink text-surface' : 'bg-paper text-ink hover:bg-gold',
          )}
        >
          {t('paid')}
        </button>
        <button
          type="button"
          onClick={() => {
            setValue('pricingType', 'free')
            setValue('price', 0)
          }}
          className={cn(
            'border-[2.5px] border-ink rounded-full py-2 px-4.5 font-body font-extrabold text-[14.5px] transition-colors cursor-pointer',
            pricingType === 'free' ? 'bg-ink text-surface' : 'bg-paper text-ink hover:bg-gold',
          )}
        >
          {t('free')}
        </button>
      </div>

      {pricingType === 'paid' && (
        <Form.Control<PostResourceFormValues>
          name="price"
          label={t('priceTitle')}
          labelFor="resource-price"
        >
          {(field, fieldState) => (
            <>
              <Input
                id="resource-price"
                inputMode="numeric"
                placeholder={t('pricePlaceholder')}
                aria-invalid={fieldState.invalid}
                {...field}
                value={field.value === undefined ? '' : String(field.value)}
                onChange={(e) => {
                  const val = toEnglishDigits(e.target.value).replace(/\D/g, '')
                  field.onChange(val === '' ? undefined : Number(val))
                }}
              />
              <p className="font-semibold text-[13.5px] font-body text-soft mt-1.75 leading-[1.7]">
                {t('vatHint')}
              </p>
            </>
          )}
        </Form.Control>
      )}

      <Card
        effect="flat"
        className="border-[2.5px] border-dashed border-ink rounded-[16px] p-4 sm:p-5 mt-4 bg-paper"
      >
        <CardTitle className="font-display text-[18px] mb-2 block font-normal">
          {t('pricingGuideTitle')}
        </CardTitle>
        <ul className="space-y-1.5">
          {((t.raw('pricingGuide') as string[]) ?? []).map((_, index) => (
            <li
              key={index}
              className="font-medium font-body text-[14.5px] text-soft leading-[1.9] ps-5 relative mb-1.25"
            >
              <span className="absolute inset-s-0.5 top-2.75 size-2 shrink-0 rounded-full border-2 border-ink bg-gold" />
              <span>
                {t.rich(`pricingGuide.${index}`, {
                  b: (chunks) => <strong className="font-extrabold text-ink">{chunks}</strong>,
                })}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

// ── Guarantees Controls ─────────────────────────────────────────────────────

function GuaranteesSection() {
  const { watch, setValue } = useFormContext<PostResourceFormValues>()
  const t = useTranslations('postResourceNamliya')
  const locale = useLocale()

  const cashDeposit = watch('cashDeposit') ?? false
  const supervisedUse = watch('supervisedUse') ?? false
  const supervisorHoursRaw = watch('supervisorHours')
  const selectedRate = watch('supervisorRate') ?? 5

  const hours = Number(supervisorHoursRaw) || 0
  const rate = Number(selectedRate) || 0
  const totalSupervision = hours * rate

  const fmt = (n: number) => n.toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US')

  useEffect(() => {
    setValue('supervisorPrice', totalSupervision)
  }, [totalSupervision, setValue])

  return (
    <Card className="p-7 mb-5.5 bg-surface">
      <h2 className="font-display text-[27px] leading-[1.2] flex items-center gap-3.25 mb-2 font-normal">
        <Image src={HandIcon} alt="" width={36} height={36} className="shrink-0" />
        {t('guaranteesTitle')}
      </h2>
      <p className="font-medium font-body text-[16.5px] text-soft leading-[1.95] mt-2 mb-5.5">
        {t('guaranteesDesc')}
      </p>

      {/* Switch 1: Cash deposit */}
      <div className="flex items-center gap-4 bg-paper border-[2.5px] border-ink rounded-[16px] p-4 sm:p-4.5 flex-wrap mb-4">
        <div className="flex-1 min-w-45">
          <b className="font-display text-[20px] leading-[1.3] block">{t('cashDeposit')}</b>
          <span className="font-body font-medium text-[14.5px] text-soft leading-[1.8] block mt-0.75">
            {t('cashDepositDesc')}
          </span>
        </div>
        <Switch
          checked={cashDeposit}
          onCheckedChange={(val) => {
            setValue('cashDeposit', val)
            if (!val) setValue('depositValue', undefined)
          }}
          id="swDep"
          aria-label={t('cashDeposit')}
        />
      </div>

      {cashDeposit && (
        <Form.Control<PostResourceFormValues>
          name="depositValue"
          label={t('depositValue')}
          labelFor="resource-deposit-value"
          className="mb-4"
        >
          {(field, fieldState) => (
            <Input
              id="resource-deposit-value"
              inputMode="numeric"
              placeholder={t('depositValuePlaceholder')}
              aria-invalid={fieldState.invalid}
              {...field}
              value={field.value === undefined ? '' : String(field.value)}
              onChange={(e) => {
                const val = toEnglishDigits(e.target.value).replace(/\D/g, '')
                field.onChange(val === '' ? undefined : Number(val))
              }}
            />
          )}
        </Form.Control>
      )}

      {/* Switch 2: Supervised use */}
      <div className="flex items-center gap-4 bg-paper border-[2.5px] border-ink rounded-[16px] p-4 sm:p-4.5 flex-wrap mb-4">
        <div className="flex-1 min-w-45">
          <b className="font-display text-[20px] leading-[1.3] block">{t('supervisedUse')}</b>
          <span className="font-body font-medium text-[14.5px] text-soft leading-[1.8] block mt-0.75">
            {t('supervisedUseDesc')}
          </span>
        </div>
        <Switch
          checked={supervisedUse}
          onCheckedChange={(val) => {
            setValue('supervisedUse', val)
            if (!val) {
              setValue('supervisor', undefined)
              setValue('supervisorHours', undefined)
              setValue('supervisorPrice', undefined)
            } else {
              setValue('supervisor', memberResponsible[0]?.value ?? '')
              setValue('supervisorRate', 5)
            }
          }}
          id="swSup"
          aria-label={t('supervisedUse')}
        />
      </div>

      {supervisedUse && (
        <div className="space-y-4 mb-4">
          <Form.Control<PostResourceFormValues>
            name="supervisor"
            label={t('supervisor')}
            labelFor="resource-supervisor"
          >
            {(field, fieldState) => (
              <Select
                items={memberResponsible}
                name={field.name}
                value={(field.value as string) || memberResponsible[0]?.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger id="resource-supervisor" aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder={memberResponsible[0]?.value} />
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

          <Form.Control<PostResourceFormValues>
            name="supervisorHours"
            label={t('supervisorHours')}
            labelFor="resource-supervisor-hours"
          >
            {(field, fieldState) => (
              <Input
                id="resource-supervisor-hours"
                inputMode="numeric"
                placeholder={t('supervisorHoursPlaceholder')}
                aria-invalid={fieldState.invalid}
                {...field}
                value={field.value === undefined ? '' : String(field.value)}
                onChange={(e) => {
                  const val = toEnglishDigits(e.target.value).replace(/\D/g, '')
                  field.onChange(val === '' ? undefined : Number(val))
                }}
              />
            )}
          </Form.Control>

          <div>
            <span className="block font-bold text-[15px] text-soft mb-2.25 font-body">
              {t('hourlyRate')}
            </span>
            <div className="flex gap-2.5 flex-wrap" role="group" aria-label={t('hourlyRate')}>
              {rateOptions.map((option) => {
                const isSelected = selectedRate === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setValue('supervisorRate', option.value)}
                    className={cn(
                      'w-13 h-13 rounded-[14px] border-[2.5px] border-ink font-display text-[24px] leading-none flex items-center justify-center cursor-pointer transition-colors shadow-[3px_3px_0_#1a1714]',
                      isSelected ? 'bg-red text-surface' : 'bg-paper text-ink hover:bg-gold',
                    )}
                  >
                    {locale === 'ar' ? option.labelAr : option.labelEn}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap bg-gold border-3 border-ink rounded-[16px] p-4.5 sm:p-5.5 mt-4 shadow-[4px_4px_0_#1a1714]">
            <div className="font-display text-[19px] flex-1 min-w-40">
              <span>{t('supervisionValue')}</span>
              <span className="block font-body font-semibold text-[14px] text-soft mt-0.75">
                {hours > 0 ? t('hoursTimesRate', { hours: fmt(hours), rate: fmt(rate) }) : '—'}
              </span>
            </div>
            <div>
              <span className="block font-display text-[44px] leading-none font-feature-tnum">
                {hours > 0 ? fmt(totalSupervision) : '—'}
                <small className="text-[18px] ms-1.5 font-normal">{t('currency')}</small>
              </span>
              <span className="block font-body font-semibold text-[12.5px] text-soft mt-1">
                {t('vatNote')}
              </span>
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full text-center mt-2 font-body font-extrabold text-[16px] py-3 rounded-full"
      >
        {t('post')}
      </Button>
    </Card>
  )
}

// ── Summary Aside ───────────────────────────────────────────────────────────

function CostSummaryAside() {
  const { watch } = useFormContext<PostResourceFormValues>()
  const t = useTranslations('postResourceNamliya')
  const locale = useLocale()
  const fmt = (n: number) => n.toLocaleString(locale === 'ar' ? 'ar-EG' : 'en-US')

  const pricingType = watch('pricingType')
  const price = watch('price')
  const supervisedUse = watch('supervisedUse')
  const supervisorPrice = watch('supervisorPrice')
  const cashDeposit = watch('cashDeposit')
  const depositValue = watch('depositValue')

  return (
    <aside>
      <Card className="p-7 mb-5.5 bg-surface">
        <h2 className="font-display text-[22px] leading-[1.2] mb-3.5 font-normal">
          {t('summaryTitle')}
        </h2>
        <div className="flex justify-between gap-3 py-3 border-b-[2.5px] border-dashed border-ink/25 font-bold text-[15.5px]">
          <span className="font-semibold text-soft">{t('loanValue')}</span>
          <span>
            {pricingType === 'free'
              ? t('free')
              : price !== undefined && price > 0
                ? `${fmt(price)} ${t('currency')}`
                : '—'}
          </span>
        </div>
        {supervisedUse && (
          <div className="flex justify-between gap-3 py-3 border-b-[2.5px] border-dashed border-ink/25 font-bold text-[15.5px]">
            <span className="font-semibold text-soft">{t('supervision')}</span>
            <span>
              {supervisorPrice !== undefined && supervisorPrice > 0
                ? `${fmt(supervisorPrice)} ${t('currency')}`
                : '—'}
            </span>
          </div>
        )}
        <div className="flex justify-between gap-3 py-3 border-b-[2.5px] border-dashed border-ink/25 font-bold text-[15.5px]">
          <span className="font-semibold text-soft">{t('vatLabel')}</span>
          <span>{t('onShahama')}</span>
        </div>
        {cashDeposit && (
          <div className="flex justify-between gap-3 py-3 border-b-[2.5px] border-dashed border-ink/25 font-bold text-[15.5px]">
            <span className="font-semibold text-soft">{t('cashDepositSummary')}</span>
            <span>
              {depositValue !== undefined && depositValue > 0
                ? `${fmt(depositValue)} ${t('currencyEgp')}`
                : '—'}
            </span>
          </div>
        )}
        <p className="font-medium font-body text-[14.5px] text-soft leading-[1.85] mt-3">
          {t('summaryNote')}
        </p>
      </Card>

      <Card className="bg-gold border-3 border-ink rounded-panel p-5 sm:p-6 shadow-[6px_6px_0_#1a1714] flex items-center gap-4 mt-5.5">
        <Image src={KeyIcon} alt="" width={42} height={46} className="shrink-0" />
        <div className="font-body font-semibold text-[16px] leading-[1.9] flex-1 min-w-50">
          <b className="font-display text-[18px]">{t('adminOnlyTitle')} </b>
          <span>{t('adminOnlyDesc')}</span>
        </div>
      </Card>
    </aside>
  )
}

// ── Main Page ───────────────────────────────────────────────────────────────

export default function PostResourcePage() {
  const t = useTranslations('postResourceNamliya')

  const schema = useMemo(
    () =>
      createPostResourceSchema({
        imagesRequired: t('validation.imagesRequired'),
        imagesMax: t('validation.imagesMax'),
        titleRequired: t('validation.titleRequired'),
        titleMin: t('validation.titleMin'),
        descriptionRequired: t('validation.descriptionRequired'),
        categoryRequired: t('validation.categoryRequired'),
        priceRequired: t('validation.priceRequired'),
        pricePositive: t('validation.pricePositive'),
        memberRequired: t('validation.memberRequired'),
        depositValueRequired: t('validation.depositValueRequired'),
        depositValuePositive: t('validation.depositValuePositive'),
        supervisorRequired: t('validation.supervisorRequired'),
        supervisorPriceRequired: t('validation.supervisorPriceRequired'),
        supervisorPricePositive: t('validation.supervisorPricePositive'),
        specificDurationRequired: t('validation.specificDurationRequired'),
      }),
    [t],
  )

  const onSubmit = (data: PostResourceFormValues) => {
    console.log('post resource submit', data)
  }

  return (
    <>
      <Link
        href="/namliya/resource-offers"
        className="inline-flex items-center gap-2.5 font-bold text-[15.5px] mb-4 text-ink font-cairo hover:text-red"
      >
        <span className="size-9.5 shrink-0 rounded-full border-[2.5px] border-ink bg-surface shadow-[3px_3px_0] shadow-ink grid place-items-center p-2.25 text-ink">
          <ChevronLeft className="w-full h-full rtl:rotate-180" />
        </span>
        <span>{t('backToNamliya')}</span>
      </Link>
      <div className="flex items-end gap-5 mb-6 flex-wrap">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)] leading-none font-normal">
          {t('header')}
        </h1>
        <p className="font-medium font-body text-[17px] text-soft pb-2.5">{t('desc')}</p>
      </div>

      <Form
        resolver={zodResolver(schema)}
        defaultValues={{
          images: [],
          title: '',
          description: '',
          category: '',
          pricingType: 'paid',
          price: undefined,
          duration: 'any',
          specificDuration: '',
          durationUnit: 'days',
          from: '',
          to: '',
          cashDeposit: false,
          depositValue: undefined,
          supervisedUse: false,
          supervisor: memberResponsible[0]?.value ?? '',
          supervisorHours: undefined,
          supervisorRate: 5,
          supervisorPrice: undefined,
        }}
        onSubmit={onSubmit}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 items-start">
          <div>
            {/* Sheet 1: Resource Images */}
            <Card className="p-7 mb-5.5 bg-surface">
              <h2 className="font-display text-[27px] leading-[1.2] flex items-center gap-3.25 mb-2 font-normal">
                <Image src={TargetIcon} alt="" width={36} height={36} className="shrink-0" />
                {t('imagesTitle')}
              </h2>
              <p className="font-medium font-body text-[16.5px] text-soft leading-[1.95] mt-2 mb-5.5">
                {t('imagesDesc')}
              </p>
              <Form.Control<PostResourceFormValues>
                name="images"
                label={t('imagesTitle')}
                className="mb-4.5"
              >
                {(field, fieldState) => (
                  <ImageDropzone
                    maxImages={6}
                    value={(field.value as AttachedImage[]) ?? []}
                    onChange={field.onChange}
                    invalid={fieldState.invalid}
                  />
                )}
              </Form.Control>
            </Card>

            {/* Sheet 2: Resource Details */}
            <Card className="p-7 mb-5.5 bg-surface">
              <h2 className="font-display text-[27px] leading-[1.2] flex items-center gap-3.25 mb-2 font-normal">
                <Image src={CirclesIcon} alt="" width={36} height={36} className="shrink-0" />
                {t('detailsTitle')}
              </h2>

              <Form.Control<PostResourceFormValues>
                name="title"
                label={t('offerTypeTitle')}
                labelFor="resource-title"
              >
                {(field, fieldState) => (
                  <Input
                    id="resource-title"
                    placeholder={t('offerTypePlaceholder')}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    value={(field.value as string) ?? ''}
                  />
                )}
              </Form.Control>

              <Form.Control<PostResourceFormValues>
                name="description"
                label={t('descriptionTitle')}
                labelFor="resource-description"
              >
                {(field, fieldState) => (
                  <Textarea
                    id="resource-description"
                    placeholder={t('descriptionPlaceholder')}
                    aria-invalid={fieldState.invalid}
                    className="min-h-35 resize-y"
                    {...field}
                    value={(field.value as string) ?? ''}
                  />
                )}
              </Form.Control>

              <Form.Control<PostResourceFormValues>
                name="category"
                label={t('resourceCategory')}
                labelFor="resource-category"
              >
                {(field, fieldState) => (
                  <>
                    <Input
                      id="resource-category"
                      maxLength={14}
                      placeholder={t('categoryPlaceholder')}
                      aria-invalid={fieldState.invalid}
                      {...field}
                      value={(field.value as string) ?? ''}
                    />
                    <p className="font-semibold text-[13.5px] font-body text-soft mt-1.75 leading-[1.7]">
                      {t('categoryHint')}
                    </p>
                  </>
                )}
              </Form.Control>

              <DurationSection />

              <PricingSection />
            </Card>

            {/* Sheet 3: Guarantees */}
            <GuaranteesSection />
          </div>

          {/* Right Column: Aside */}
          <CostSummaryAside />
        </div>
      </Form>
    </>
  )
}
