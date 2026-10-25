'use client'

import { calculateRequestValue } from '@/app/[lang]/(dashboard)/alaesh-andak/data'
import { AlaeshHeader } from '@/components/AlaeshHeader'
import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/toast'
import BalanceIcon from '@/icons/balance.svg'
import CirclesIcon from '@/icons/circles.svg'
import KeyIcon from '@/icons/key.svg'
import TargetIcon from '@/icons/target.svg'
import { Link, useRouter } from '@/i18n/navigation'
import { formatNumber } from '@/lib/utils'
import { AlaeshRequestFormValues, createAlaeshRequestSchema } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image, { type StaticImageData } from 'next/image'
import { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

interface AlaeshRequestFormProps {
  mode: 'create' | 'edit'
  initialRequest?: Partial<AlaeshRequestFormValues>
}

export function AlaeshRequestForm({ mode, initialRequest }: AlaeshRequestFormProps) {
  const t = useTranslations('alaesh.create')
  const router = useRouter()
  const schema = useMemo(
    () =>
      createAlaeshRequestSchema({
        titleRequired: t('validation.titleRequired'),
        titleMin: t('validation.titleMin'),
        descriptionRequired: t('validation.descriptionRequired'),
        descriptionMin: t('validation.descriptionMin'),
        categoryRequired: t('validation.categoryRequired'),
        marketRequired: t('validation.marketRequired'),
        timeframeRequired: t('validation.timeframeRequired'),
        positiveNumber: t('validation.positiveNumber'),
      }),
    [t],
  )

  const onSubmit = () => {
    toast.add({ title: t(mode === 'create' ? 'published' : 'updated') })
    router.push('/alaesh-andak/my-posts')
  }

  return (
    <>
      <AlaeshHeader page="create" />
      <Form<AlaeshRequestFormValues>
        resolver={zodResolver(schema)}
        defaultValues={{
          kind: initialRequest?.kind ?? 'human',
          title: initialRequest?.title ?? '',
          description: initialRequest?.description ?? '',
          category: initialRequest?.category ?? '',
          market: initialRequest?.market ?? 'namliya',
          timeframeMode: initialRequest?.timeframeMode ?? 'open',
          timeframeFrom: initialRequest?.timeframeFrom ?? '',
          timeframeTo: initialRequest?.timeframeTo ?? '',
          hours: initialRequest?.hours ?? 8,
          rate: initialRequest?.rate ?? 5,
          resourceValue: initialRequest?.resourceValue ?? 20,
        }}
        onSubmit={onSubmit}
      >
        <AlaeshRequestFields />
      </Form>
    </>
  )
}

function AlaeshRequestFields() {
  const t = useTranslations('alaesh.create')
  const global = useTranslations('global')
  const locale = useLocale()
  const { control } = useFormContext<AlaeshRequestFormValues>()
  const values = useWatch({ control })
  const kind = values.kind ?? 'human'
  const hours = values.hours ?? 0
  const rate = values.rate ?? 1
  const resourceValue = values.resourceValue ?? 0
  const value = calculateRequestValue(kind, hours, rate, resourceValue)
  const n = (number: number) => formatNumber(number, { locale })

  return (
    <div className="grid items-start gap-6 min-[981px]:grid-cols-[1.5fr_1fr]">
      <div>
        <FormSection icon={TargetIcon} title={t('kind.title')} description={t('kind.description')}>
          <Form.Control name="kind" label={t('kind.label')} labelFor="alaesh-kind">
            {(field) => (
              <div
                id="alaesh-kind"
                role="radiogroup"
                className="grid gap-3 min-[561px]:grid-cols-2"
              >
                {(['human', 'resource'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={field.value === option}
                    onClick={() => field.onChange(option)}
                    className={cn(
                      'rounded-card border-[3px] border-ink bg-paper px-4.5 py-4 text-start shadow-[4px_4px_0] shadow-ink transition-transform hover:-translate-y-0.5',
                      field.value === option && 'bg-gold',
                    )}
                  >
                    <strong className="block font-display text-xl font-normal">
                      {t(`kind.options.${option}.title`)}
                    </strong>
                    <span className="mt-1 block font-body text-sm/[1.75] font-medium text-soft">
                      {t(`kind.options.${option}.description`)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </Form.Control>
        </FormSection>

        <FormSection icon={CirclesIcon} title={t('details.title')}>
          <Form.Control name="title" label={t('details.requestTitle')} labelFor="alaesh-title">
            {(field, fieldState) => (
              <Input
                id="alaesh-title"
                placeholder={t('details.titlePlaceholder')}
                aria-invalid={fieldState.invalid}
                {...field}
              />
            )}
          </Form.Control>

          <Form.Control
            name="description"
            label={t('details.description')}
            labelFor="alaesh-description"
          >
            {(field, fieldState) => (
              <>
                <Textarea
                  id="alaesh-description"
                  className="min-h-37.5"
                  placeholder={t('details.descriptionPlaceholder')}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <p className="font-body text-[13px] font-medium text-soft">
                  {t('details.descriptionHint')}
                </p>
              </>
            )}
          </Form.Control>

          <Form.Control name="category" label={t('details.category')} labelFor="alaesh-category">
            {(field, fieldState) => (
              <>
                <Input
                  id="alaesh-category"
                  maxLength={14}
                  placeholder={t('details.categoryPlaceholder')}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <p className="font-body text-[13px] font-medium text-soft">
                  {t('details.categoryHint')}
                </p>
              </>
            )}
          </Form.Control>

          <Form.Control name="market" label={t('details.market')} labelFor="alaesh-market">
            {(field) => (
              <ChoiceRow
                id="alaesh-market"
                value={field.value}
                options={['namliya', 'khalis']}
                getLabel={(option) => t(`details.markets.${option}`)}
                onChange={field.onChange}
              />
            )}
          </Form.Control>

          <Form.Control
            name="timeframeMode"
            label={t('details.timeframe')}
            labelFor="alaesh-timeframe"
          >
            {(field) => (
              <ChoiceRow
                id="alaesh-timeframe"
                value={field.value}
                options={['open', 'fixed']}
                getLabel={(option) => t(`details.timeframes.${option}`)}
                onChange={field.onChange}
              />
            )}
          </Form.Control>

          {values.timeframeMode === 'fixed' && (
            <div className="grid gap-3.5 min-[621px]:grid-cols-2">
              <Form.Control name="timeframeFrom" label={t('details.from')} labelFor="time-from">
                {(field, fieldState) => (
                  <Input
                    id="time-from"
                    placeholder={t('details.fromPlaceholder')}
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                )}
              </Form.Control>
              <Form.Control name="timeframeTo" label={t('details.to')} labelFor="time-to">
                {(field, fieldState) => (
                  <Input
                    id="time-to"
                    placeholder={t('details.toPlaceholder')}
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                )}
              </Form.Control>
            </div>
          )}
        </FormSection>

        <FormSection
          icon={BalanceIcon}
          title={t('pricing.title')}
          description={t('pricing.description')}
        >
          {kind === 'human' ? (
            <div className="grid gap-3.5 min-[621px]:grid-cols-2">
              <Form.Control name="hours" label={t('pricing.hours')} labelFor="alaesh-hours">
                {(field, fieldState) => (
                  <Input
                    id="alaesh-hours"
                    type="number"
                    min={1}
                    inputMode="numeric"
                    value={field.value}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                    aria-invalid={fieldState.invalid}
                  />
                )}
              </Form.Control>
              <Form.Control name="rate" label={t('pricing.rate')} labelFor="alaesh-rate">
                {(field) => (
                  <div id="alaesh-rate" role="radiogroup" className="flex flex-wrap gap-2.25">
                    {[1, 2, 3, 4, 5].map((option) => (
                      <button
                        key={option}
                        type="button"
                        role="radio"
                        aria-checked={field.value === option}
                        onClick={() => field.onChange(option)}
                        className={cn(
                          'grid size-13 place-items-center rounded-field border-[2.5px] border-ink bg-paper font-display text-2xl shadow-[3px_3px_0] shadow-ink hover:bg-gold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue',
                          field.value === option && 'bg-red text-surface',
                        )}
                      >
                        {n(option)}
                      </button>
                    ))}
                  </div>
                )}
              </Form.Control>
            </div>
          ) : (
            <Form.Control
              name="resourceValue"
              label={t('pricing.resourceValue')}
              labelFor="resource-value"
            >
              {(field, fieldState) => (
                <>
                  <Input
                    id="resource-value"
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={field.value}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                    aria-invalid={fieldState.invalid}
                  />
                  <p className="font-body text-[13px]/[1.8] font-medium text-soft">
                    {t('pricing.resourceHint', { percent: n(14) })}
                  </p>
                </>
              )}
            </Form.Control>
          )}

          {kind === 'human' && (
            <div className="mt-4 flex flex-wrap items-center gap-4 rounded-card border-[3px] border-ink bg-gold px-5.5 py-4.5 shadow-[4px_4px_0] shadow-ink">
              <span className="min-w-40 flex-1 font-display text-[19px]">
                {t('pricing.offeredValue')}
                <small className="mt-1 block font-body text-sm font-semibold text-soft">
                  {t('pricing.calculation', { hours: n(hours), rate: n(rate) })}
                </small>
              </span>
              <span>
                <strong className="block font-display text-[44px]/[1] font-normal">
                  {n(value)}
                  <small className="ms-1.5 text-lg">{global('currency')}</small>
                </strong>
                <small className="font-body text-[12.5px] font-semibold text-soft">
                  {t('pricing.tax', { percent: n(14) })}
                </small>
              </span>
            </div>
          )}

          <div className="mt-4 rounded-card border-[2.5px] border-dashed border-ink bg-paper px-5 py-4">
            <strong className="font-display text-lg font-normal">{t('pricing.guideTitle')}</strong>
            <ul className="mt-2 space-y-1">
              {[1, 2, 3, 4].map((item) => (
                <li
                  key={item}
                  className="relative ps-5 font-body text-[14.5px]/[1.9] font-medium text-soft before:absolute before:top-2.5 before:start-0 before:size-2 before:rounded-full before:border-2 before:border-ink before:bg-gold"
                >
                  {t(`pricing.guide.${item}`)}
                </li>
              ))}
            </ul>
          </div>

          <Button type="submit" className="mt-4.5 w-full">
            {t('submit')}
          </Button>
        </FormSection>
      </div>

      <aside className="min-[981px]:sticky min-[981px]:top-5">
        <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-surface px-6.5 py-6 shadow-[6px_6px_0] shadow-ink">
          <h2 className="font-display text-[22px]">{t('summary.title')}</h2>
          <div className="mt-3.5">
            <SummaryRow label={t('summary.kind')} value={t(`kind.options.${kind}.title`)} />
            <SummaryRow
              label={t('summary.market')}
              value={t(`summary.markets.${values.market ?? 'namliya'}`)}
            />
            <SummaryRow
              label={t('summary.audience')}
              value={t(`summary.audiences.${values.market ?? 'namliya'}`)}
            />
            <SummaryRow label={t('summary.value')} value={`${n(value)} ${global('currency')}`} />
          </div>
        </section>

        <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-surface px-6.5 py-6 shadow-[6px_6px_0] shadow-ink">
          <h2 className="font-display text-[22px]">{t('after.title')}</h2>
          <p className="mt-2.5 font-body text-[15px]/[1.95] font-medium text-soft">
            {t('after.body')}
          </p>
        </section>

        <section className="flex items-center gap-4 rounded-panel border-[3px] border-ink bg-gold px-6 py-5 shadow-[6px_6px_0] shadow-ink">
          <Image src={KeyIcon} alt="" className="h-11.5 w-10.5 shrink-0" />
          <p className="font-body text-base/[1.9] font-semibold">
            <strong className="font-display text-lg font-normal">{t('note.title')}</strong>{' '}
            {t('note.body')}{' '}
            <Link href="/shbeik-lbeik/browse" className="font-extrabold underline">
              {t('note.link')}
            </Link>
          </p>
        </section>
      </aside>
    </div>
  )
}

function FormSection({
  icon,
  title,
  description,
  children,
}: {
  icon: StaticImageData
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-surface px-7.5 py-7 shadow-[6px_6px_0] shadow-ink max-[520px]:px-5">
      <h2 className="flex items-center gap-3 font-display text-[27px]/[1.2]">
        <Image src={icon} alt="" className="size-9 shrink-0" />
        {title}
      </h2>
      {description && (
        <p className="mb-5.5 mt-2 font-body text-[16.5px]/[1.95] font-medium text-soft">
          {description}
        </p>
      )}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  )
}

function ChoiceRow({
  id,
  value,
  options,
  getLabel,
  onChange,
}: {
  id: string
  value: string
  options: string[]
  getLabel: (option: string) => string
  onChange: (value: string) => void
}) {
  return (
    <div id={id} role="radiogroup" className="flex flex-wrap gap-6.5">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          onClick={() => onChange(option)}
          className="group inline-flex items-center gap-3 font-body text-base font-bold"
        >
          <span
            className={cn(
              'relative size-6.5 rounded-lg border-[2.5px] border-ink bg-surface shadow-[2px_2px_0] shadow-ink group-hover:bg-paper',
              value === option &&
                'bg-gold after:absolute after:inset-x-1.75 after:top-1 after:h-2.75 after:rotate-[-45deg] after:border-b-[3px] after:border-s-[3px] after:border-ink rtl:after:rotate-[45deg]',
            )}
          />
          {getLabel(option)}
        </button>
      ))}
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b-[2.5px] border-dashed border-ink/25 py-3 font-body text-[15.5px] font-bold last:border-b-0">
      <span className="font-semibold text-soft">{label}</span>
      <span className="text-end">{value}</span>
    </div>
  )
}
