'use client'
import { Form, FormControl } from '@/components/Form'
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
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { items, memberResponsible } from './data'

// ── Inner component that consumes form context ──────────────────────────────

function DurationToggle({ labels }: { labels: { any: string; specific: string } }) {
  const { watch, setValue } = useFormContext<PostServiceFormValues>()
  const selectedDuration = watch('duration')

  return (
    <div className="flex flex-wrap gap-2">
      <span
        onClick={() => {
          setValue('duration', 'any')
          setValue('specificDuration', '')
        }}
        className={cn(
          'inline-block font-cairo border rounded-[999px] font-bold text-[12px] py-1.75 px-3.75 text-ink cursor-pointer hover:border-green-deep',
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
          'inline-block font-cairo border rounded-[999px] font-bold text-[12px] py-1.75 px-3.75 text-ink cursor-pointer hover:border-green-deep',
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
  const { watch } = useFormContext<PostServiceFormValues>()
  const duration = watch('duration')

  if (duration !== 'specific') return null

  return (
    <FormControl<PostServiceFormValues>
      name="specificDuration"
      label={label}
      labelFor="service-specific-duration"
      className="mb-3.5"
    >
      {(field, fieldState) => (
        <Input
          id="service-specific-duration"
          placeholder={placeholder}
          aria-invalid={fieldState.invalid}
          {...field}
          value={(field.value as string) ?? ''}
        />
      )}
    </FormControl>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function PostServicePage() {
  const t = useTranslations('postServiceNamliya')

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
        className="inline-block font-bold text-[12.5px] mb-3.5 text-green-deep font-cairo hover:underline"
      >
        {t('backToNamliya')}
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-start">
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
              price: undefined as unknown as number,
              duration: 'any' as const,
              specificDuration: '',
              member: '',
            }}
            onSubmit={onSubmit}
          >
            <FormControl<PostServiceFormValues>
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
            </FormControl>

            <FormControl<PostServiceFormValues>
              name="description"
              label={t('descriptionTitle')}
              labelFor="service-description"
            >
              {(field, fieldState) => (
                <Textarea
                  id="service-description"
                  placeholder={t('descriptionPlaceholder')}
                  aria-invalid={fieldState.invalid}
                  {...field}
                  value={(field.value as string) ?? ''}
                />
              )}
            </FormControl>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <FormControl<PostServiceFormValues>
                name="category"
                label={t('serviceCategory')}
                labelFor="service-category"
              >
                {(field, fieldState) => (
                  <Select
                    items={items}
                    name={field.name}
                    value={field.value as string}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="service-category"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder={items[1].value} />
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

              <FormControl<PostServiceFormValues>
                name="price"
                label={t('priceTitle')}
                labelFor="service-price"
              >
                {(field, fieldState) => (
                  <Input
                    id="service-price"
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

            <FormControl<PostServiceFormValues>
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

            <FormControl<PostServiceFormValues>
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
                  <SelectTrigger
                    id="service-member"
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

            <div className="flex gap-3 mt-2 flex-wrap">
              <Button
                type="submit"
              >
                {t('post')}
              </Button>
              <Button>
                {t('save')}
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
