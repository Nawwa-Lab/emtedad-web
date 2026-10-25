'use client'

import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import HandIcon from '@/icons/hand.svg'
import { useLocale, useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileDropzone, type AttachedFile } from '@/components/FileDropzone'
import { createHakimaProposalSchema, type HakimaProposalFormValues } from '@/types/schemas'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { HakimaHeader, Stats } from '../../components'
import { submitProposal } from '../../data'
import { formatNumber } from '@/lib/utils'

const categories = ['protocol', 'membership', 'other'] as const

export default function SubmitHakimaProposalPage() {
  const t = useTranslations('hakima')
  const locale = useLocale()
  const router = useRouter()
  const [category, setCategory] = useState<(typeof categories)[number]>('protocol')
  const [notice, setNotice] = useState('')
  const n = (value: number) => formatNumber(value, { locale })
  const schema = useMemo(
    () =>
      createHakimaProposalSchema({
        title: t('form.validation.title'),
        category: t('form.validation.category'),
        proposal: t('form.validation.proposal'),
        proposalMin: t('form.validation.proposalMin'),
        reason: t('form.validation.reason'),
        impact: t('form.validation.impact'),
      }),
    [t],
  )
  const threshold = category === 'protocol' ? 27720 : 9240
  const percent = category === 'protocol' ? 60 : 20

  const submit = async (values: HakimaProposalFormValues) => {
    await submitProposal(values)
    router.push('/hakima/my-proposals')
  }

  return (
    <div className="mx-auto max-w-225">
      <HakimaHeader back subtitle={t('form.subtitle')} />
      <Stats
        items={[
          {
            label: t('form.available'),
            value: t('form.availableValue'),
            note: t('form.availableNote'),
            color: 'gold',
          },
          { label: t('form.currentCycle'), value: n(12), note: t('form.cycleNote') },
          {
            label: t('form.qualification'),
            value: (
              <>
                {n(2310)}
                <small className="ms-1.25 font-display text-[15px]">{t('detail.token')}</small>
              </>
            ),
            note: t('form.qualificationNote'),
            color: 'red',
          },
        ]}
      />

      <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-surface px-7.5 py-7 shadow-[6px_6px_0] shadow-ink max-sm:px-4.5">
        <h2 className="flex items-center gap-3.25 font-display text-[26px]">
          <Image src={BalanceIcon} alt="" className="size-8.5" />
          {t('form.title')}
        </h2>
        <p className="mt-2 mb-5.5 font-body text-[16.5px]/[1.95] font-medium text-soft">
          {t('form.intro')}
        </p>

        <Form<HakimaProposalFormValues>
          resolver={zodResolver(schema)}
          defaultValues={{
            title: '',
            category: 'protocol',
            proposal: '',
            reason: '',
            impact: '',
            files: [],
          }}
          onSubmit={submit}
        >
          <Form.Control name="title" label={t('form.titleLabel')} labelFor="proposal-title">
            {(field, state) => (
              <Input
                id="proposal-title"
                placeholder={t('form.titlePlaceholder')}
                {...field}
                aria-invalid={state.invalid}
              />
            )}
          </Form.Control>

          <Form.Control name="category" label={t('form.category')}>
            {(field) => (
              <>
                <RadioGroup
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value)
                    setCategory(value as (typeof categories)[number])
                  }}
                  className="flex! flex-wrap items-center justify-start gap-x-6.5 gap-y-3 text-start"
                >
                  {categories.map((value) => (
                    <RadioGroupItem
                      key={value}
                      value={value}
                      className="flex-row! min-h-0! w-auto gap-3 rounded-none! border-0! bg-transparent! px-0! py-0! text-start shadow-none! hover:translate-none! hover:rotate-0! hover:shadow-none! data-checked:translate-none! data-checked:bg-transparent! data-checked:shadow-none! **:data-[slot=radio-group-indicator]:hidden"
                    >
                      <span
                        aria-hidden="true"
                        className="relative size-6.5 shrink-0 rounded-lg border-[2.5px] border-ink bg-surface shadow-[2px_2px_0] shadow-ink group-data-checked/radio-group-item:bg-gold after:absolute after:inset-[5px_7px_8px] after:-rotate-45 after:border-b-[3px] after:border-l-[3px] after:border-ink after:opacity-0 after:content-[''] group-data-checked/radio-group-item:after:opacity-100"
                      />
                      <span className="font-body text-base font-bold">
                        {value === 'other' ? t('form.categoryOther') : t(`category.${value}`)}
                      </span>
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
                <p className="mt-3 font-body text-[13.5px]/[1.7] font-semibold text-soft">
                  {t.rich('form.thresholdHint', {
                    category:
                      category === 'other' ? t('form.categoryOther') : t(`category.${category}`),
                    amount: n(threshold),
                    percent: n(percent),
                    strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
                  })}
                </p>
              </>
            )}
          </Form.Control>

          <Form.Control name="proposal" label={t('form.proposal')} labelFor="proposal-body">
            {(field, state) => (
              <Textarea
                id="proposal-body"
                className="min-h-35"
                placeholder={t('form.proposalPlaceholder')}
                {...field}
                aria-invalid={state.invalid}
              />
            )}
          </Form.Control>
          <Form.Control name="reason" label={t('form.reason')} labelFor="proposal-reason">
            {(field, state) => (
              <Textarea
                id="proposal-reason"
                className="min-h-32.5"
                placeholder={t('form.reasonPlaceholder')}
                {...field}
                aria-invalid={state.invalid}
              />
            )}
          </Form.Control>
          <Form.Control name="impact" label={t('form.impact')} labelFor="proposal-impact">
            {(field, state) => (
              <>
                <Textarea
                  id="proposal-impact"
                  className="min-h-32.5"
                  placeholder={t('form.impactPlaceholder')}
                  {...field}
                  aria-invalid={state.invalid}
                />
                <p className="mt-1.5 font-body text-[13.5px] font-semibold text-soft">
                  {t('form.impactHint')}
                </p>
              </>
            )}
          </Form.Control>

          <Form.Control name="files" label={t('form.documents')} labelFor="proposal-files">
            {(field, state) => (
              <FileDropzone
                acceptedTypes={[
                  'application/pdf',
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                ]}
                design="list"
                title={t('form.upload')}
                description={t('form.uploadHint')}
                value={(field.value as AttachedFile[]) || []}
                onChange={(val) => field.onChange(val)}
                maxFiles={5}
                invalid={state.invalid}
              />
            )}
          </Form.Control>

          <div className="mt-2 flex flex-wrap gap-3">
            <Button type="submit">{t('form.submit')}</Button>
            <Button
              type="button"
              variant="outline"
              effect="flat"
              onClick={() => setNotice(t('form.drafted'))}
            >
              {t('form.draft')}
            </Button>
          </div>
          {notice && <p className="mt-3 font-body font-bold text-blue">{notice}</p>}
        </Form>
      </section>

      <div className="flex items-start gap-3 rounded-card border-[2.5px] border-dashed border-ink bg-paper px-4 py-3.5">
        <Image src={HandIcon} alt="" className="h-7 w-6.5 shrink-0" />
        <p className="font-body text-[14.5px]/[1.85] font-semibold text-soft">
          {t.rich('form.after', {
            strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
          })}
        </p>
      </div>
    </div>
  )
}
