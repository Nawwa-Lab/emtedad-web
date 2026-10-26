'use client'

import { Form, type FormStepConfig } from '@/components/Form'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { WishSearch } from '@/components/WishSearch'
import { Link } from '@/i18n/navigation'
import GennyIcon from '@/icons/genny.svg'
import HandIcon from '@/icons/hand.svg'
import TargetIcon from '@/icons/target.svg'
import { createWishSchema, type WishFormValues } from '@/types/schemas/wish-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import type { WishFamily, WishSuggestion } from './WishCard'

export function WishForm({
  family,
  mode,
  suggestions,
  initialWish,
}: {
  family: WishFamily
  mode: 'create' | 'edit'
  suggestions: WishSuggestion[]
  initialWish?: Partial<WishFormValues>
}) {
  const t = useTranslations(`${family}.addWish`)
  const [submitted, setSubmitted] = useState(false)
  const route = family === 'genny' ? 'genny' : 'shbeik-lbeik'
  const isCreate = mode === 'create'

  const schema = useMemo(
    () =>
      createWishSchema({
        queryRequired: t('queryRequired'),
        titleRequired: t('titleRequired'),
        titleMin: t('titleMin'),
        descriptionRequired: t('descriptionRequired'),
        descriptionMin: t('descriptionMin'),
        categoryRequired: t('categoryRequired'),
        categoryMax: t('categoryMax'),
        impactRequired: t('impactRequired'),
        impactMin: t('impactMin'),
        requireImpact: family === 'genny',
      }),
    [family, t],
  )

  const steps = useMemo<Array<FormStepConfig<WishFormValues>>>(
    () =>
      isCreate
        ? [
            { id: 'search', title: t('searchTitle'), fields: ['query'] },
            {
              id: 'details',
              title: t('detailsTitle'),
              fields: ['title', 'category', 'description', 'impact'],
            },
          ]
        : [
            {
              id: 'details',
              title: t('editTitle'),
              fields: ['title', 'category', 'description', 'impact'],
            },
          ],
    [isCreate, t],
  )

  return (
    <div className="mx-auto max-w-215">
      <Link
        href={`/${route}/browse`}
        className="mb-4 inline-flex items-center gap-2.5 font-body text-[15.5px] font-bold hover:text-red"
      >
        <span className="grid size-9.5 place-items-center rounded-full border-[2.5px] border-ink bg-surface font-display text-3xl/[1] shadow-[3px_3px_0] shadow-ink rtl:rotate-180">
          ‹
        </span>
        {t('back')}
      </Link>

      <header className="mb-6.5 flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1.25]">{t('familyTitle')}</h1>
        <p className="pb-2.5 font-body text-[17px] font-medium text-soft">
          {mode === 'edit' ? t('editSubtitle') : t('pageSubtitle')}
        </p>
      </header>

      {submitted ? (
        <section className="rounded-panel border-[3px] border-ink bg-surface px-7.5 py-8 text-center shadow-[6px_6px_0] shadow-ink">
          <Image src={HandIcon} alt="" className="mx-auto mb-4.5 w-23 -rotate-6" />
          <h2 className="font-display text-[32px]/[1.2]">{t('successTitle')}</h2>
          <p className="mx-auto mt-3 max-w-150 font-body text-base/[1.95] font-medium text-soft">
            {mode === 'edit' ? t('editSuccessDescription') : t('successDescription')}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href={`/${route}/browse`} className={cn(buttonVariants({ variant: 'primary' }))}>
              {t('viewBoard')}
            </Link>
            <Link
              href={family === 'genny' ? '/genny/my-wishes' : '/community/history'}
              className={cn(buttonVariants({ variant: 'outline' }))}
            >
              {t('viewMine')}
            </Link>
          </div>
        </section>
      ) : (
        <Form
          resolver={zodResolver(schema)}
          defaultValues={{
            query: initialWish?.query ?? t('defaultQuery'),
            title: initialWish?.title ?? '',
            category: initialWish?.category ?? '',
            description: initialWish?.description ?? '',
            impact: initialWish?.impact ?? '',
          }}
          variant="multi-step"
          steps={steps}
          onSubmit={() => setSubmitted(true)}
        >
          <Form.Progress className="mb-5.5 [&_li_span]:w-13" />

          {isCreate && (
            <Form.Step id="search">
              <Sheet
                title={t('searchTitle')}
                description={t('searchDescription')}
                icon={TargetIcon}
              >
                <WishSearch family={family} suggestions={suggestions} />
                <div className="mt-5.5 flex flex-wrap gap-3 border-t-[3px] border-dashed border-ink pt-5">
                  <Form.Next>{t('continueToWish')}</Form.Next>
                  <Link
                    href={`/${route}/browse`}
                    className={cn(buttonVariants({ variant: 'outline' }))}
                  >
                    {t('cancel')}
                  </Link>
                </div>
              </Sheet>
            </Form.Step>
          )}

          <Form.Step id="details">
            <Sheet
              title={mode === 'edit' ? t('editTitle') : t('detailsTitle')}
              description={mode === 'edit' ? t('editDescription') : t('detailsDescription')}
              icon={GennyIcon}
            >
              <Form.Control
                name="title"
                label={t('titleLabel')}
                labelFor="wish-title"
                className="mb-5"
              >
                {(field, fieldState) => (
                  <Input
                    {...field}
                    id="wish-title"
                    aria-invalid={fieldState.invalid}
                    placeholder={t('titlePlaceholder')}
                  />
                )}
              </Form.Control>
              <Form.Control
                name="category"
                label={t('categoryLabel')}
                labelFor="wish-category"
                className="mb-5"
              >
                {(field, fieldState) => (
                  <>
                    <Input
                      {...field}
                      id="wish-category"
                      maxLength={14}
                      aria-invalid={fieldState.invalid}
                      placeholder={t('categoryPlaceholder')}
                    />
                    <p className="mt-1.5 font-body text-[13px]/[1.7] font-semibold text-soft">
                      {t('categoryHint')}
                    </p>
                  </>
                )}
              </Form.Control>
              <Form.Control
                name="description"
                label={t('descriptionLabel')}
                labelFor="wish-desc"
                className="mb-5"
              >
                {(field, fieldState) => (
                  <Textarea
                    {...field}
                    id="wish-desc"
                    aria-invalid={fieldState.invalid}
                    placeholder={t('descriptionPlaceholder')}
                    className="min-h-32.5"
                  />
                )}
              </Form.Control>
              <Form.Control
                name="impact"
                label={t('impactLabel')}
                labelFor="wish-impact"
                className="mb-5"
              >
                {(field, fieldState) => (
                  <>
                    <Textarea
                      {...field}
                      id="wish-impact"
                      aria-invalid={fieldState.invalid}
                      placeholder={t('impactPlaceholder')}
                      className="min-h-30"
                    />
                    <p className="mt-1.5 font-body text-[13px]/[1.7] font-semibold text-soft">
                      {t('impactHint')}
                    </p>
                  </>
                )}
              </Form.Control>

              {family === 'shbeik' && (
                <div className="mt-4 mb-4.5 flex items-start gap-3.25 rounded-card border-[2.5px] border-dashed border-ink bg-paper px-4.5 py-3.75">
                  <Image src={HandIcon} alt="" className="h-7.5 w-7 shrink-0" />
                  <p className="font-body text-[14.5px]/[1.85] font-semibold text-soft">
                    <b className="font-extrabold text-ink">{t('publicNameTitle')}</b>{' '}
                    {t('publicNameDescription')}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Form.Next>{mode === 'edit' ? t('submitEdit') : t('submitAdd')}</Form.Next>
                {isCreate && <Form.Back>{t('backToSearch')}</Form.Back>}
              </div>
            </Sheet>
          </Form.Step>
        </Form>
      )}
    </div>
  )
}

function Sheet({
  title,
  description,
  icon,
  children,
}: {
  title: string
  description: string
  icon: typeof GennyIcon
  children: React.ReactNode
}) {
  return (
    <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-surface px-7.5 py-7 shadow-[6px_6px_0] shadow-ink max-sm:px-5">
      <h2 className="flex items-center gap-3 font-display text-[27px]/[1.2]">
        <Image src={icon} alt="" className="size-9 shrink-0" />
        {title}
      </h2>
      <p className="mb-5 mt-2 font-body text-[16.5px]/[1.95] font-medium text-soft">
        {description}
      </p>
      {children}
    </section>
  )
}
