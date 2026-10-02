'use client'

import { Form, FormControl } from '@/components/Form'
import { HelpCard } from '@/components/HelpCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { AlaeshRequestFormValues, createAlaeshRequestSchema } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

interface AlaeshRequestFormProps {
  mode: 'create' | 'edit'
  initialRequest?: Partial<AlaeshRequestFormValues>
}

export function AlaeshRequestForm({ mode, initialRequest }: AlaeshRequestFormProps) {
  const t = useTranslations('alaesh.addRequest')

  const schema = useMemo(
    () =>
      createAlaeshRequestSchema({
        titleRequired: t('titleRequired'),
        titleMin: t('titleMin'),
        descriptionRequired: t('descriptionRequired'),
        descriptionMin: t('descriptionMin'),
        categoryRequired: t('categoryRequired'),
        marketRequired: t('marketRequired'),
      }),
    [t],
  )

  const categories = [
    { value: 'spaces', label: t('categories.spaces') },
    { value: 'design', label: t('categories.design') },
    { value: 'training', label: t('categories.training') },
    { value: 'maintenance', label: t('categories.maintenance') },
    { value: 'accounting', label: t('categories.accounting') },
    { value: 'other', label: t('categories.other') },
  ]

  const onSubmit = (data: AlaeshRequestFormValues) => {
    console.log('alaesh request submit', data)
  }

  return (
    <>
      <Card className="p-7">
        <h1 className="font-display font-bold text-[23px]/[1.5] mb-5">
          {mode === 'create' ? t('title') : t('editTitle')}
        </h1>
        <Form
          resolver={zodResolver(schema)}
          defaultValues={{
            market: initialRequest?.market ?? 'namliya',
            title: initialRequest?.title ?? '',
            description: initialRequest?.description ?? '',
            category: initialRequest?.category ?? '',
            timeframe: initialRequest?.timeframe ?? '',
          }}
          onSubmit={onSubmit}
        >
          <FormControl name="market" label={t('marketLabel')} labelFor="alaesh-market">
            {(field) => (
              <ToggleGroup
                value={field.value ? [field.value] : undefined}
                onValueChange={(value) => {
                  if (value.length) field.onChange(value[0])
                }}
                className="flex flex-wrap"
              >
                <ToggleGroupItem
                  type="button"
                  value="namliya"
                  className={cn(
                    'inline-block font-cairo border rounded-[999px] font-bold text-[12px] py-1.75 px-3.75 cursor-pointer',
                    field.value === 'namliya'
                      ? 'bg-green text-ink border-transparent'
                      : 'bg-surface border-line text-ink-soft hover:border-green-deep hover:text-ink',
                  )}
                >
                  {t('marketNamliya')}
                </ToggleGroupItem>
                <ToggleGroupItem
                  type="button"
                  value="khalis"
                  className={cn(
                    'inline-block font-cairo border rounded-[999px] font-bold text-[12px] py-1.75 px-3.75 cursor-pointer',
                    field.value === 'khalis'
                      ? 'bg-green text-ink border-transparent'
                      : 'bg-surface border-line text-ink-soft hover:border-green-deep hover:text-ink',
                  )}
                >
                  {t('marketKhalis')}
                </ToggleGroupItem>
              </ToggleGroup>
            )}
          </FormControl>
          <FormControl name="title" label={t('titleLabel')} labelFor="alaesh-title">
            {(field, fieldState) => (
              <Input
                id="alaesh-title"
                type="text"
                placeholder={t('titlePlaceholder')}
                {...field}
                aria-invalid={fieldState.invalid}
              />
            )}
          </FormControl>
          <FormControl name="description" label={t('descriptionLabel')} labelFor="alaesh-desc">
            {(field, fieldState) => (
              <textarea
                id="alaesh-desc"
                placeholder={t('descriptionPlaceholder')}
                className="w-full bg-paper border border-line rounded-xl py-3 px-4 font-cairo font-semibold text-sm text-ink min-h-27.5 resize-y focus:outline-2 focus:outline-green-deep focus:outline-offset-1 focus:border-green-deep"
                {...field}
                aria-invalid={fieldState.invalid}
              />
            )}
          </FormControl>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <FormControl name="category" label={t('categoryLabel')} labelFor="alaesh-category">
              {(field, fieldState) => (
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  items={categories}
                >
                  <SelectTrigger size="lg" id="alaesh-category" aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </FormControl>
            <FormControl
              name="timeframe"
              required={false}
              label={t('timeframeLabel')}
              labelFor="alaesh-timeframe"
            >
              {(field) => (
                <Input
                  id="alaesh-timeframe"
                  type="text"
                  placeholder={t('timeframePlaceholder')}
                  {...field}
                />
              )}
            </FormControl>
          </div>
          <div className="flex gap-3 mt-2 flex-wrap">
            <Button
              type="submit"
              className="bg-green text-ink font-extrabold text-sm py-3 px-7 rounded-full"
            >
              {mode === 'create' ? t('submitAdd') : t('submitEdit')}
            </Button>
          </div>
        </Form>
      </Card>
      <HelpCard title={t('tipsTitle')} tips={[t('tip1'), t('tip2'), t('tip3'), t('tip4')]} />
    </>
  )
}
