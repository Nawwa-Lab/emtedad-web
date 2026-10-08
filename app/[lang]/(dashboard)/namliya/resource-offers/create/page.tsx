'use client'
import { Form, FormControl } from '@/components/Form'
import { ImageDropzone, type AttachedImage } from '@/components/ImageDropzone'
import { Card, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldTitle } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  createPostResourceSchema,
  type PostResourceFormValues,
} from '@/types/schemas/post-resource-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { items, memberResponsible } from './data'
import { Button } from '@/components/ui/button'

// ── Inner components that consume form context ──────────────────────────────

function DurationToggle({ labels }: { labels: { any: string; specific: string } }) {
  const { watch, setValue } = useFormContext<PostResourceFormValues>()
  const selectedDuration = watch('duration')

  return (
    <div className="flex flex-wrap gap-2">
      <span
        onClick={() => {
          setValue('duration', 'any')
          setValue('specificDuration', '')
        }}
        className={cn(
          'inline-block font-cairo border rounded-[999px] font-bold text-[12px] py-2 px-3.75 text-ink cursor-pointer hover:border-green-deep',
          selectedDuration === 'any'
            ? 'bg-green border-green-deep'
            : 'bg-surface border-line text-ink-soft',
        )}
      >
        {labels.any}
      </span>
      <span
        onClick={() => setValue('duration', 'specific')}
        className={cn(
          'inline-block font-cairo border rounded-[999px] font-bold text-[12px] py-2 px-3.75 text-ink cursor-pointer hover:border-green-deep',
          selectedDuration === 'specific'
            ? 'bg-green border-green-deep'
            : 'bg-surface border-line text-ink-soft',
        )}
      >
        {labels.specific}
      </span>
    </div>
  )
}

function SpecificDurationField({ label, placeholder }: { label: string; placeholder: string }) {
  const { watch } = useFormContext<PostResourceFormValues>()
  const duration = watch('duration')

  if (duration !== 'specific') return null

  return (
    <FormControl<PostResourceFormValues>
      name="specificDuration"
      label={label}
      labelFor="resource-specific-duration"
      className="mb-3.5"
    >
      {(field, fieldState) => (
        <Input
          id="resource-specific-duration"
          placeholder={placeholder}
          aria-invalid={fieldState.invalid}
          {...field}
          value={(field.value as string) ?? ''}
        />
      )}
    </FormControl>
  )
}

function CashDepositField({ labels }: { labels: { title: string; desc: string } }) {
  const { watch, setValue } = useFormContext<PostResourceFormValues>()
  const checked = watch('cashDeposit') ?? false

  return (
    <Field orientation="horizontal" className="flex items-start gap-2.5 mt-1 mx-0 mb-2.5">
      <Checkbox
        id="resource-cash-deposit"
        checked={checked}
        onCheckedChange={(val) => {
          const isChecked = val === true
          setValue('cashDeposit', isChecked)
          if (!isChecked) {
            setValue('depositValue', undefined)
          }
        }}
      />
      <Label
        htmlFor="resource-cash-deposit"
        className="flex flex-col items-start text-start font-bold text-[13.5px] font-cairo"
      >
        {labels.title}
        <small className="font-semibold text-ink-soft text-[11px] mt-0.5">{labels.desc}</small>
      </Label>
    </Field>
  )
}

function DepositValueField({ label, placeholder }: { label: string; placeholder: string }) {
  const { watch } = useFormContext<PostResourceFormValues>()
  const isCashDeposit = watch('cashDeposit')

  if (!isCashDeposit) return null

  return (
    <FormControl<PostResourceFormValues>
      name="depositValue"
      label={label}
      labelFor="resource-deposit-value"
      className="mb-3.5"
    >
      {(field, fieldState) => (
        <Input
          id="resource-deposit-value"
          type="number"
          min="1"
          placeholder={placeholder}
          aria-invalid={fieldState.invalid}
          {...field}
          value={field.value ?? ''}
          onChange={(e) => {
            const val = e.target.value
            field.onChange(val === '' ? undefined : Number(val))
          }}
        />
      )}
    </FormControl>
  )
}

function SupervisedUseField({ labels }: { labels: { title: string; desc: string } }) {
  const { watch, setValue } = useFormContext<PostResourceFormValues>()
  const checked = watch('supervisedUse') ?? false

  return (
    <Field orientation="horizontal" className="flex items-start gap-2.5 mt-1 mx-0 mb-2.5">
      <Checkbox
        id="resource-supervised-use"
        checked={checked}
        onCheckedChange={(val) => {
          const isChecked = val === true
          setValue('supervisedUse', isChecked)
          if (!isChecked) {
            setValue('supervisor', '')
            setValue('supervisorPrice', undefined)
          }
        }}
      />
      <Label
        htmlFor="resource-supervised-use"
        className="flex flex-col items-start text-start font-bold text-[13.5px] font-cairo"
      >
        {labels.title}
        <small className="font-semibold text-ink-soft text-[11px] mt-0.5">{labels.desc}</small>
      </Label>
    </Field>
  )
}

function SupervisorFields({
  labels,
}: {
  labels: { supervisor: string; supervisorPrice: string; pricePlaceholder: string }
}) {
  const { watch } = useFormContext<PostResourceFormValues>()
  const isSupervisedUse = watch('supervisedUse')

  if (!isSupervisedUse) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <FormControl<PostResourceFormValues>
        name="supervisor"
        label={labels.supervisor}
        labelFor="resource-supervisor"
      >
        {(field, fieldState) => (
          <Select
            items={memberResponsible}
            name={field.name}
            value={field.value as string}
            onValueChange={field.onChange}
          >
            <SelectTrigger
              id="resource-supervisor"
              aria-invalid={fieldState.invalid}
            >
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
      </FormControl>

      <FormControl<PostResourceFormValues>
        name="supervisorPrice"
        label={labels.supervisorPrice}
        labelFor="resource-supervisor-price"
      >
        {(field, fieldState) => (
          <Input
            id="resource-supervisor-price"
            type="number"
            min="1"
            placeholder={labels.pricePlaceholder}
            aria-invalid={fieldState.invalid}
            {...field}
            value={field.value ?? ''}
            onChange={(e) => {
              const val = e.target.value
              field.onChange(val === '' ? undefined : Number(val))
            }}
          />
        )}
      </FormControl>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

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
        className="inline-block font-bold text-[12.5px] mb-3.5 text-green-deep font-cairo hover:underline"
      >
        {t('backToNamliya')}
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 md:gap-6 items-start">
        <Card className="p-4 sm:p-7">
          <FieldTitle className="font-display font-bold text-lg sm:text-[23px] mb-5">
            {t('addPostTitle')}
          </FieldTitle>
          <Form
            resolver={zodResolver(schema)}
            defaultValues={{
              images: [],
              title: '',
              description: '',
              category: '',
              price: undefined as unknown as number,
              duration: 'any' as const,
              specificDuration: '',
              cashDeposit: false,
              depositValue: undefined,
              supervisedUse: false,
              supervisor: '',
              supervisorPrice: undefined,
            }}
            onSubmit={onSubmit}
          >
            <FormControl<PostResourceFormValues>
              name="images"
              label={t('resourceImage')}
              className="mb-4.5"
            >
              {(field, fieldState) => (
                <ImageDropzone
                  maxImages={5}
                  value={(field.value as AttachedImage[]) ?? []}
                  onChange={field.onChange}
                  invalid={fieldState.invalid}
                />
              )}
            </FormControl>

            <FormControl<PostResourceFormValues>
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
            </FormControl>

            <FormControl<PostResourceFormValues>
              name="description"
              label={t('descriptionTitle')}
              labelFor="resource-description"
            >
              {(field, fieldState) => (
                <Textarea
                  id="resource-description"
                  placeholder={t('descriptionPlaceholder')}
                  aria-invalid={fieldState.invalid}
                  {...field}
                  value={(field.value as string) ?? ''}
                />
              )}
            </FormControl>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <FormControl<PostResourceFormValues>
                name="category"
                label={t('resourceCategory')}
                labelFor="resource-category"
              >
                {(field, fieldState) => (
                  <Select
                    items={items}
                    name={field.name}
                    value={field.value as string}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="resource-category"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder={items[0].value} />
                    </SelectTrigger>
                    <SelectContent side="bottom" sideOffset={0} alignItemWithTrigger={false}>
                      <SelectGroup>
                        {items.map((item) => (
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
              </FormControl>

              <FormControl<PostResourceFormValues>
                name="price"
                label={t('priceTitle')}
                labelFor="resource-price"
              >
                {(field, fieldState) => (
                  <Input
                    id="resource-price"
                    type="number"
                    min="1"
                    placeholder={t('pricePlaceholder')}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const val = e.target.value
                      field.onChange(val === '' ? undefined : Number(val))
                    }}
                  />
                )}
              </FormControl>
            </div>

            <FormControl<PostResourceFormValues>
              name="duration"
              label={t('timeTitle')}
              className="mb-3.5"
            >
              {() => <DurationToggle labels={{ any: t('anytime'), specific: t('specificTime') }} />}
            </FormControl>

            <SpecificDurationField
              label={t('specificDuration')}
              placeholder={t('specificDurationPlaceholder')}
            />

            <CashDepositField labels={{ title: t('cashDeposit'), desc: t('depositDesc') }} />

            <DepositValueField
              label={t('depositValue')}
              placeholder={t('depositValuePlaceholder')}
            />

            <SupervisedUseField
              labels={{ title: t('supervisedUse'), desc: t('supervisedUseDesc') }}
            />

            <SupervisorFields
              labels={{
                supervisor: t('supervisor'),
                supervisorPrice: t('supervisorPrice'),
                pricePlaceholder: t('price'),
              }}
            />

            <div className="flex gap-3 mt-2 flex-wrap">
              <Button
                type="submit"
              >
                {t('post')}
              </Button>
            </div>
          </Form>
        </Card>
        <Card className="p-4 sm:p-5.5">
          <CardTitle className="text-green-deep mb-2 text-[15px]">{t('conditionsTitle')}</CardTitle>
          <ul className="space-y-1.5">
            {(t.raw('conditions') as Record<string, string>[]).map((item, itemIndex) =>
              Object.values(item).map((condition, condIndex) => (
                <li
                  key={`${itemIndex}-${condIndex}`}
                  className="font-cairo font-semibold text-[13px] leading-loose ps-5 relative text-ink-soft"
                >
                  <span className="absolute inset-s-0 top-[0.65em] w-1.5 h-1.5 rounded-full bg-green" />
                  {condition}
                </li>
              )),
            )}
          </ul>
        </Card>
      </div>
    </>
  )
}
