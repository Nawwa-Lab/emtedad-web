'use client'
import { Link } from '@/i18n/navigation'
import { Card, CardTitle } from '@/components/ui/card'
import { Field, FieldTitle } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Form, FormControl } from '@/components/Form'
import { items, memberResponsible } from './data'
import { useTranslations } from 'next-intl'
import { cn } from 'cn'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ImageDropzone } from '@/components/ImageDropzone'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import {
  createPostResourceSchema,
  type PostResourceFormValues,
} from '@/types/schemas/post-resource-schema'
import { useFormContext } from 'react-hook-form'

// ── Inner components that consume form context ──────────────────────────────

function DurationToggle({ labels }: { labels: { any: string; specific: string } }) {
  const { watch, setValue } = useFormContext<PostResourceFormValues>()
  const selectedDuration = watch('duration')

  return (
    <div className="flex flex-wrap gap-2">
      <span
        onClick={() => setValue('duration', 'any')}
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

function CashDepositField({
  labels,
}: {
  labels: { title: string; desc: string }
}) {
  const { watch, setValue } = useFormContext<PostResourceFormValues>()
  const checked = watch('cashDeposit') ?? false

  return (
    <Field orientation="horizontal" className="flex items-start gap-2.5 mt-1 mx-0 mb-2.5">
      <Checkbox
        id="resource-cash-deposit"
        checked={checked}
        onCheckedChange={(val) => setValue('cashDeposit', val === true)}
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

function SupervisedUseField({
  labels,
}: {
  labels: { title: string; desc: string }
}) {
  const { watch, setValue } = useFormContext<PostResourceFormValues>()
  const checked = watch('supervisedUse') ?? false

  return (
    <Field orientation="horizontal" className="flex items-start gap-2.5 mt-1 mx-0 mb-2.5">
      <Checkbox
        id="resource-supervised-use"
        checked={checked}
        onCheckedChange={(val) => setValue('supervisedUse', val === true)}
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

// ── Page ────────────────────────────────────────────────────────────────────

export default function PostResourcePage() {
  const t = useTranslations('postResourceNamliya')

  const schema = useMemo(
    () =>
      createPostResourceSchema({
        titleRequired: t('validation.titleRequired'),
        titleMin: t('validation.titleMin'),
        categoryRequired: t('validation.categoryRequired'),
        memberRequired: t('validation.memberRequired'),
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
              title: '',
              description: '',
              category: '',
              price: '',
              duration: 'any' as const,
              cashDeposit: false,
              depositValue: '',
              supervisedUse: false,
              supervisor: '',
              supervisorPrice: '',
            }}
            onSubmit={onSubmit}
          >
            {/* Resource image — uncontrolled, managed outside RHF */}
            <div className="mb-4.5">
              <Label className="block font-bold text-[13px] text-ink-soft mb-2 font-cairo">
                {t('resourceImage')}
              </Label>
              <ImageDropzone maxImages={5} onChange={(images) => console.log(images)} />
            </div>

            <FormControl<PostResourceFormValues>
              name="title"
              label={t('offerTypeTitle')}
              labelFor="resource-title"
            >
              {(field, fieldState) => (
                <Input
                  id="resource-title"
                  placeholder={t('offerTypePlaceholder')}
                  className="w-full py-3 px-4 font-cairo font-semibold text-[14px] text-ink"
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
                      className="w-full py-3 px-4 text-[14px] font-cairo font-semibold text-ink min-h-13"
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
                    placeholder={t('pricePlaceholder')}
                    className="w-full py-3 px-4 font-cairo font-semibold text-[14px] text-ink"
                    aria-invalid={fieldState.invalid}
                    {...field}
                    value={(field.value as string) ?? ''}
                  />
                )}
              </FormControl>
            </div>

            <FormControl<PostResourceFormValues>
              name="duration"
              label={t('timeTitle')}
              className="mb-3.5"
            >
              {() => (
                <DurationToggle labels={{ any: t('anytime'), specific: t('specificTime') }} />
              )}
            </FormControl>

            <CashDepositField
              labels={{ title: t('cashDeposit'), desc: t('depositDesc') }}
            />

            <FormControl<PostResourceFormValues>
              name="depositValue"
              label={t('depositValue')}
              labelFor="resource-deposit-value"
              className="mb-3.5"
            >
              {(field, fieldState) => (
                <Input
                  id="resource-deposit-value"
                  placeholder={t('depositValuePlaceholder')}
                  className="w-full max-w-full sm:max-w-55 py-3 px-4 font-cairo font-semibold text-[14px] text-ink"
                  aria-invalid={fieldState.invalid}
                  {...field}
                  value={(field.value as string) ?? ''}
                />
              )}
            </FormControl>

            <SupervisedUseField
              labels={{ title: t('supervisedUse'), desc: t('supervisedUseDesc') }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <FormControl<PostResourceFormValues>
                name="supervisor"
                label={t('supervisor')}
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
                      className="w-full py-3 px-4 text-[14px] font-cairo font-semibold text-ink min-h-13"
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
                label={t('supervisorPrice')}
                labelFor="resource-supervisor-price"
              >
                {(field, fieldState) => (
                  <Input
                    id="resource-supervisor-price"
                    placeholder={t('price')}
                    className="w-full py-3 px-4 font-cairo font-semibold text-[14px] text-ink"
                    aria-invalid={fieldState.invalid}
                    {...field}
                    value={(field.value as string) ?? ''}
                  />
                )}
              </FormControl>
            </div>

            <div className="flex gap-3 mt-2 flex-wrap">
              <button
                type="submit"
                className="text-[14px] py-3 px-7 font-cairo cursor-pointer bg-green text-ink rounded-[999px] font-extrabold inline-block text-center w-full sm:w-auto hover:opacity-90"
              >
                {t('post')}
              </button>
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
