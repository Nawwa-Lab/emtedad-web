'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Link } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import CirclesIcon from '@/icons/circles.svg'
import KeyIcon from '@/icons/key.svg'
import PlantIcon from '@/icons/plant.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { Check, ChevronLeft } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image, { type StaticImageData } from 'next/image'
import { type ReactNode, useState } from 'react'
import { monthlyCap, offerTypes, rateOptions, type OfferTypeId } from './data'

const toEnglishDigits = (s: string) => s.replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))

function digitsOnly(value: string) {
  return toEnglishDigits(value).replace(/\D/g, '')
}

const inputClassName =
  'placeholder:text-soft/60 placeholder:font-medium focus:outline-[3px] focus:outline-blue focus:outline-offset-2 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-blue focus-visible:outline-offset-2'

function SectionTitle({ icon, children }: { icon: StaticImageData; children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-3.25 font-display text-[27px] leading-[1.2]">
      <Image src={icon} alt="" width={36} height={36} className="size-9 shrink-0" />
      {children}
    </h2>
  )
}

function Field({
  label,
  htmlFor,
  hint,
  children,
  className,
}: {
  label: string
  htmlFor?: string
  hint?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mb-5', className)}>
      <label htmlFor={htmlFor} className="mb-2.25 block font-body text-[15px] font-bold text-soft">
        {label}
      </label>
      {children}
      {hint && (
        <p className="mt-1.75 font-body text-[13.5px] font-semibold leading-[1.7] text-soft">
          {hint}
        </p>
      )}
    </div>
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

export default function CreateOfferPage() {
  const t = useTranslations('khalliKhalesOfferCreate')
  const global = useTranslations('global')
  const locale = useLocale()

  const [typeId, setTypeId] = useState<OfferTypeId>('workshop')
  const [availability, setAvailability] = useState<'fixed' | 'open'>('fixed')
  const [pricing, setPricing] = useState<'paid' | 'free'>('paid')

  const [activityHours, setActivityHours] = useState('12')
  const [activityRate, setActivityRate] = useState(5)
  const [seats, setSeats] = useState('12')
  const [serviceHours, setServiceHours] = useState('4')
  const [serviceRate, setServiceRate] = useState(5)
  const [resourceValue, setResourceValue] = useState('')

  const selectedType = offerTypes.find((type) => type.id === typeId) ?? offerTypes[0]
  const kind = selectedType.kind
  const typeLabel = t(`types.${typeId}.title`)
  const currency = global('currency')

  const fmt = (value: number | string) => formatNumber(value, { locale })

  const hours = Number(activityHours) || 0
  const seatsCount = Number(seats) || 1
  const seatPrice = Math.round((hours * activityRate) / Math.max(seatsCount, 1))
  const serviceValue = (Number(serviceHours) || 0) * serviceRate
  const resourceAmount = Number(resourceValue) || 0

  const summaryPrice = t('free')
  const paidPrice =
    kind === 'act'
      ? `${fmt(seatPrice)} ${currency}`
      : kind === 'svc'
        ? `${fmt(serviceValue)} ${currency}`
        : `${fmt(resourceAmount)} ${currency}`

  const priceKey = kind === 'act' ? t('summary.seatPrice') : t('summary.value')
  const publish = () => {
    console.log('publish offer', { typeId, availability, pricing, seatPrice, serviceValue })
  }

  return (
    <>
      <Link
        href="/khalli-khales/gift-shop"
        className="mb-4 inline-flex items-center gap-2.5 font-body text-[15.5px] font-bold text-ink"
      >
        <span className="grid size-9.5 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-surface p-2.25 text-ink shadow-[3px_3px_0] shadow-ink">
          <ChevronLeft className="h-full w-full rtl:rotate-180" strokeWidth={3.2} />
        </span>
        <span className="hover:text-red">{t('back')}</span>
      </Link>

      <div className="mb-6.5 flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1.25]">{t('pageTitle')}</h1>
        <p className="pb-2.5 font-body text-[17px] font-medium text-soft">
          {t('pageDesc', { org: global('organizations.mishkaa') })}
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 min-[981px]:grid-cols-[1.5fr_1fr]">
        <div>
          <Card effect="3d" className="mb-5.5 px-7.5! pt-7! pb-7! shadow-[6px_6px_0]">
            <SectionTitle icon={PlantIcon}>{t('typeTitle')}</SectionTitle>
            <p className="mt-2 mb-5.5 font-body text-[16.5px] font-medium leading-[1.95] text-soft">
              {t('typeSub')}
            </p>
            <div
              className="grid grid-cols-1 gap-3 min-[421px]:grid-cols-2 min-[701px]:grid-cols-3"
              role="radiogroup"
              aria-label={t('typeTitle')}
            >
              {offerTypes.map((type) => {
                const selected = type.id === typeId
                return (
                  <button
                    key={type.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setTypeId(type.id)}
                    className="group block cursor-pointer text-center"
                  >
                    <span
                      className={cn(
                        'block rounded-card border-3 border-ink px-3.5 py-4 shadow-[4px_4px_0] shadow-ink transition-[background,transform] group-hover:-translate-x-px group-hover:-translate-y-0.5',
                        selected ? 'bg-gold' : 'bg-paper',
                      )}
                    >
                      <b className="block font-display text-[20px] text-soft font-normal leading-[1.3]">
                        {t(`types.${type.id}.title`)}
                      </b>
                      <span
                        className={cn(
                          'mt-1 block font-body text-[13.5px] font-medium leading-[1.7]',
                          selected ? 'text-ink' : 'text-soft',
                        )}
                      >
                        {t(`types.${type.id}.desc`)}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </Card>

          <Card effect="3d" className="mb-5.5 px-7.5! pt-7! pb-7! shadow-[6px_6px_0]">
            <SectionTitle icon={CirclesIcon}>{t('detailsTitle')}</SectionTitle>
            <div>
              <Field label={t('titleLabel')} htmlFor="offer-title">
                <Input
                  id="offer-title"
                  placeholder={t('titlePlaceholder')}
                  className={inputClassName}
                  required
                />
              </Field>

              <Field
                label={t('descriptionLabel')}
                htmlFor="offer-description"
                hint={t('descriptionHint')}
              >
                <Textarea
                  id="offer-description"
                  placeholder={t('descriptionPlaceholder')}
                  className={cn(inputClassName, 'min-h-35 resize-y')}
                  required
                />
              </Field>

              <Field label={t('categoryLabel')} htmlFor="offer-category" hint={t('categoryHint')}>
                <Input
                  id="offer-category"
                  maxLength={14}
                  placeholder={t('categoryPlaceholder')}
                  className={inputClassName}
                  required
                />
              </Field>

              <div className="mb-5">
                <span className="mb-2.25 block font-body text-[15px] font-bold text-soft">
                  {t('availabilityLabel')}
                </span>
                <div
                  className="mt-2.5 flex flex-wrap items-center gap-6.5"
                  role="radiogroup"
                  aria-label={t('availabilityLabel')}
                >
                  {(['fixed', 'open'] as const).map((option) => {
                    const selected = availability === option
                    return (
                      <button
                        key={option}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setAvailability(option)}
                        className="inline-flex cursor-pointer items-center gap-3 font-body text-[16px] font-bold leading-[1.4]"
                      >
                        <span
                          className={cn(
                            'grid size-6.5 shrink-0 place-items-center rounded-lg border-[2.5px] border-ink shadow-[2px_2px_0] shadow-ink transition-colors',
                            selected ? 'bg-gold' : 'bg-surface',
                          )}
                        >
                          {selected && <Check className="size-3.5" strokeWidth={3} />}
                        </span>
                        {t(option === 'fixed' ? 'availabilityFixed' : 'availabilityOpen')}
                      </button>
                    )
                  })}
                </div>

                {availability === 'fixed' && (
                  <div className="grid grid-cols-1 gap-3.5 min-[621px]:grid-cols-2">
                    <div>
                      <Field label={t('from')} htmlFor="offer-from" className="mb-0">
                        <Input
                          id="offer-from"
                          placeholder={t('fromPlaceholder')}
                          className={inputClassName}
                        />
                      </Field>
                      <Field label={t('to')} htmlFor="offer-to" className="mb-0 mt-3">
                        <Input
                          id="offer-to"
                          placeholder={t('toPlaceholder')}
                          className={inputClassName}
                        />
                      </Field>
                    </div>
                    <div>
                      <Field label={t('hours')} htmlFor="offer-hours" className="mb-0">
                        <Input
                          id="offer-hours"
                          placeholder={t('hoursPlaceholder')}
                          className={inputClassName}
                        />
                      </Field>
                      <Field label={t('deadline')} htmlFor="offer-deadline" className="mb-0 mt-3">
                        <Input
                          id="offer-deadline"
                          placeholder={t('deadlinePlaceholder')}
                          className={inputClassName}
                        />
                      </Field>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card effect="3d" className="mb-5.5 px-7.5! pt-7! pb-7! shadow-[6px_6px_0]">
            <SectionTitle icon={BalanceIcon}>{t('pricingTitle')}</SectionTitle>

            <div
              className="mt-5.5 mb-3.5 flex flex-wrap gap-2.25"
              role="radiogroup"
              aria-label={t('pricingTitle')}
            >
              {(['paid', 'free'] as const).map((option) => {
                const selected = pricing === option
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setPricing(option)}
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

            {pricing === 'paid' && (
              <div>
                {kind === 'act' && (
                  <div>
                    <div className="grid grid-cols-1 gap-3.5 min-[621px]:grid-cols-2">
                      <Field
                        label={t('activityHours')}
                        htmlFor="offer-activity-hours"
                        hint={t('activityHoursHint')}
                        className="mb-0"
                      >
                        <Input
                          id="offer-activity-hours"
                          inputMode="numeric"
                          placeholder={t('activityHoursPlaceholder')}
                          value={activityHours}
                          onChange={(event) => setActivityHours(digitsOnly(event.target.value))}
                          className={inputClassName}
                        />
                      </Field>
                      <div>
                        <span className="mb-2.25 block font-body text-[15px] font-bold text-soft">
                          {t('hourlyRate')}
                        </span>
                        <RateButtons
                          value={activityRate}
                          onChange={setActivityRate}
                          label={t('hourlyRate')}
                        />
                      </div>
                    </div>

                    <Field label={t('seats')} htmlFor="offer-seats" className="mt-3.5">
                      <Input
                        id="offer-seats"
                        inputMode="numeric"
                        placeholder={t('seatsPlaceholder')}
                        value={seats}
                        onChange={(event) => setSeats(digitsOnly(event.target.value))}
                        className={inputClassName}
                      />
                    </Field>

                    <div className="mt-4 flex flex-wrap items-center gap-4 rounded-card border-3 border-ink bg-gold px-5.5 py-4.5 shadow-[4px_4px_0] shadow-ink">
                      <span className="min-w-40 flex-1 font-display text-[19px]">
                        {t('summary.seatPrice')}
                        <span className="mt-0.75 block font-body text-[14px] font-semibold text-soft">
                          {t('seatFormula', {
                            hours: fmt(hours),
                            rate: fmt(activityRate),
                            seats: fmt(seatsCount),
                          })}
                        </span>
                      </span>
                      <span>
                        <span className="block font-display text-[44px] leading-none">
                          {fmt(seatPrice)}
                          <small className="ms-1.5 text-[18px]">{currency}</small>
                        </span>
                        <span className="mt-1 block font-body text-[12.5px] font-semibold text-soft">
                          {t('vatNote')}
                        </span>
                      </span>
                    </div>
                  </div>
                )}

                {kind === 'svc' && (
                  <div>
                    <div className="grid grid-cols-1 gap-3.5 min-[621px]:grid-cols-2">
                      <Field
                        label={t('serviceHours')}
                        htmlFor="offer-service-hours"
                        className="mb-0"
                      >
                        <Input
                          id="offer-service-hours"
                          inputMode="numeric"
                          placeholder={t('serviceHoursPlaceholder')}
                          value={serviceHours}
                          onChange={(event) => setServiceHours(digitsOnly(event.target.value))}
                          className={inputClassName}
                        />
                      </Field>
                      <div>
                        <span className="mb-2.25 block font-body text-[15px] font-bold text-soft">
                          {t('hourlyRate')}
                        </span>
                        <RateButtons
                          value={serviceRate}
                          onChange={setServiceRate}
                          label={t('hourlyRate')}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-4 rounded-card border-3 border-ink bg-gold px-5.5 py-4.5 shadow-[4px_4px_0] shadow-ink">
                      <span className="min-w-40 flex-1 font-display text-[19px]">
                        {t('serviceValue')}
                        <span className="mt-0.75 block font-body text-[14px] font-semibold text-soft">
                          {t('serviceFormula', {
                            hours: fmt(serviceHours),
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

                {kind === 'res' && (
                  <Field label={t('resourceValue')} htmlFor="offer-resource-value">
                    <Input
                      id="offer-resource-value"
                      inputMode="numeric"
                      placeholder={t('resourcePlaceholder')}
                      value={resourceValue}
                      onChange={(event) => setResourceValue(digitsOnly(event.target.value))}
                      className={inputClassName}
                    />
                    <p className="mt-1.75 font-body text-[13.5px] font-semibold leading-[1.7] text-soft">
                      <b className="font-extrabold text-ink">{t('vatNote')}</b> {t('resourceHint')}
                    </p>
                  </Field>
                )}
              </div>
            )}

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
              type="button"
              onClick={publish}
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
                <span className="font-semibold text-soft">{t('summary.type')}</span>
                <span>{typeLabel}</span>
              </div>
              {kind === 'act' && (
                <div className="flex justify-between gap-3 border-b-[2.5px] border-dashed border-ink/26 py-3 font-body text-[15.5px] font-bold">
                  <span className="font-semibold text-soft">{t('summary.seats')}</span>
                  <span>{fmt(seatsCount)}</span>
                </div>
              )}
              <div className="flex justify-between gap-3 py-3 font-body text-[15.5px] font-bold">
                <span className="font-semibold text-soft">{priceKey}</span>
                <span>{pricing === 'free' ? summaryPrice : paidPrice}</span>
              </div>
            </div>
            <p className="mt-3 font-body text-[14.5px] font-medium leading-[1.85] text-soft">
              {t('summary.note')}
            </p>
          </Card>

          <Card effect="3d" className="mb-5.5 px-7.5! pt-7! pb-7! shadow-[6px_6px_0]">
            <h2 className="font-display text-[22px] leading-[1.2]">{t('cap.title')}</h2>
            <div className="mt-3.5 flex justify-between gap-3 py-3 font-body text-[15.5px] font-bold">
              <span className="font-semibold text-soft">{t('cap.used')}</span>
              <span>
                {fmt(monthlyCap.used)} / {fmt(monthlyCap.total)}
              </span>
            </div>
            <Progress value={monthlyCap.percent} className="mt-2.5" />
            <p className="mt-3 font-body text-[14.5px] font-medium leading-[1.85] text-soft">
              {t('cap.note')}
            </p>
          </Card>

          <Card
            effect="3d"
            className="mt-5.5 flex items-center gap-4 bg-gold px-6! pt-5! pb-5! shadow-[6px_6px_0]"
          >
            <span className="flex h-11.5 w-10.5 shrink-0 items-center justify-center">
              <Image
                src={KeyIcon}
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
    </>
  )
}
