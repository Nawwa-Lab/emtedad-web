'use client'

import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import BalanceIcon from '@/icons/balance.svg'
import CirclesIcon from '@/icons/circles.svg'
import DnaIcon from '@/icons/dna.svg'
import HandIcon from '@/icons/hand.svg'
import PlantIcon from '@/icons/plant.svg'
import { formatNumber } from '@/lib/utils'
import { createAnnualReviewSchema, type AnnualReviewFormValues } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { HakimaHeader, HakimaNav } from '../components'
import {
  annualReview,
  annualReviewDefaults,
  annualReviewQuestions,
  annualReviewScale,
  saveAnnualReview,
  submitAnnualReview,
} from './data'

function SurveyProgress() {
  const t = useTranslations('hakima.annualReview')
  const global = useTranslations('global')
  const locale = useLocale()
  const answers = useWatch<AnnualReviewFormValues>()
  const completed = annualReviewQuestions.filter((id) => answers[id]).length
  const percentage = (completed / annualReview.questions) * 100
  const n = (value: number) => formatNumber(value, { locale, useGrouping: true })

  return (
    <div className="mb-5.5 flex flex-wrap items-center gap-3.5 rounded-panel border-[3px] border-ink bg-gold px-5.5 py-4.5 shadow-[6px_6px_0] shadow-ink">
      <span className="min-w-50 flex-1 font-body text-[15px]/[1.85] font-semibold">
        <strong className="mb-1 block font-display text-xl font-normal">
          {t('survey.open', { year: n(annualReview.year) })}
        </strong>
        {t('survey.closes', {
          day: n(annualReview.closesDay),
          reward: n(annualReview.reward),
          currency: global('currency'),
        })}
      </span>
      <span className="block h-4.5 min-w-37.5 flex-1 overflow-hidden rounded-full border-[2.5px] border-ink bg-surface">
        <i
          className="block h-full bg-red transition-[width] duration-300"
          style={{ width: `${percentage}%` }}
        />
      </span>
      <strong className="font-display text-[22px] font-normal">
        {n(completed)} / {n(annualReview.questions)}
      </strong>
    </div>
  )
}

function SurveyActions({ onSaved }: { onSaved: () => void }) {
  const t = useTranslations('hakima.annualReview')
  const { getValues } = useFormContext<AnnualReviewFormValues>()

  const save = async () => {
    await saveAnnualReview(getValues())
    onSaved()
  }

  return (
    <div className="mt-5.5 flex flex-wrap gap-3 border-t-[3px] border-dashed border-ink pt-5">
      <Button type="submit">{t('survey.submit')}</Button>
      <Button type="button" variant="outline" effect="flat" onClick={() => void save()}>
        {t('survey.save')}
      </Button>
    </div>
  )
}

export default function HakimaAnnualReviewPage() {
  const t = useTranslations('hakima.annualReview')
  const global = useTranslations('global')
  const locale = useLocale()
  const [tab, setTab] = useState<'survey' | 'rewards'>('survey')
  const [status, setStatus] = useState<'saved' | 'submitted' | null>(null)
  const schema = createAnnualReviewSchema(t('survey.required'))
  const n = (value: number) => formatNumber(value, { locale, useGrouping: true })

  const submit = async (value: AnnualReviewFormValues) => {
    await submitAnnualReview(value)
    setStatus('submitted')
  }

  const selectAdjacentTab = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    setTab((current) => (current === 'survey' ? 'rewards' : 'survey'))
  }

  return (
    <>
      <HakimaHeader subtitle={t('subtitle', { year: n(annualReview.year) })} />
      <HakimaNav />

      <section className="mb-5.5 flex items-center gap-4 rounded-panel border-[3px] border-ink bg-surface px-6 py-5 shadow-[6px_6px_0] shadow-ink">
        <span className="grid size-12 shrink-0 place-items-center rounded-[13px] border-[2.5px] border-ink bg-gold p-1.75 shadow-[2px_2px_0] shadow-ink">
          <Image src={BalanceIcon} alt="" className="size-full" />
        </span>
        <p className="font-body text-[16px]/[1.95] font-medium text-soft">
          {t.rich('intro', {
            title: (chunks) => (
              <strong className="mb-1 block font-display text-[21px] text-ink">{chunks}</strong>
            ),
            strong: (chunks) => (
              <>
                <br /> <strong className="text-ink font-display text-[21px]">{chunks}</strong>{' '}
                <br />
              </>
            ),
          })}
        </p>
      </section>

      <div className="mb-6 flex flex-wrap gap-2.5" role="tablist" aria-label={t('tabs.label')}>
        {(['survey', 'rewards'] as const).map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={tab === item}
            onClick={() => setTab(item)}
            onKeyDown={selectAdjacentTab}
            className={cn(
              'rounded-full border-[2.5px] border-ink bg-surface px-6.5 py-3 font-display text-[21px]/[1] text-ink shadow-[4px_4px_0] shadow-ink hover:translate-x-px hover:translate-y-px hover:bg-gold hover:shadow-[2px_2px_0] focus-visible:outline-3 focus-visible:outline-blue focus-visible:outline-offset-3',
              tab === item && 'bg-red text-surface hover:bg-red',
            )}
          >
            {t(`tabs.${item}`)}
          </button>
        ))}
      </div>

      {tab === 'survey' ? (
        <Form<AnnualReviewFormValues>
          resolver={zodResolver(schema)}
          defaultValues={annualReviewDefaults}
          onSubmit={submit}
        >
          <SurveyProgress />

          <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-surface px-7.5 py-7 shadow-[6px_6px_0] shadow-ink max-sm:px-5">
            <h2 className="flex items-center gap-3.25 font-display text-[27px]/[1.2]">
              <Image src={CirclesIcon} alt="" className="size-9 shrink-0" />
              {t('index.title')}
            </h2>
            <p className="mt-2 mb-5 font-body text-[16.5px]/[1.95] font-medium text-soft">
              {t('index.description')}
            </p>
            <div className="mt-4.5 grid gap-3.5 min-[761px]:grid-cols-3">
              {(['organizations', 'audience', 'teams'] as const).map((source) => {
                const weight =
                  source === 'organizations'
                    ? annualReview.organizationsWeight
                    : source === 'audience'
                      ? annualReview.audienceWeight
                      : annualReview.teamsWeight
                return (
                  <div
                    key={source}
                    className={cn(
                      'rounded-card border-[2.5px] border-ink bg-paper px-5 py-4.5',
                      source === 'organizations' && 'bg-gold',
                    )}
                  >
                    <strong className="block font-display text-[38px]/[1] font-normal">
                      {n(weight)}٪
                    </strong>
                    <span className="mt-1.5 block font-display text-[19px]">
                      {t(`index.sources.${source}.name`)}
                    </span>
                    <span className="mt-1 block font-body text-[13.5px]/[1.8] font-semibold text-soft">
                      {t(`index.sources.${source}.description`, {
                        count: n(annualReview.organizations),
                      })}
                    </span>
                  </div>
                )
              })}
            </div>
            <span className="mt-4.5 flex h-6.5 overflow-hidden rounded-full border-[2.5px] border-ink">
              <i className="h-full w-1/2 bg-gold" />
              <i className="h-full w-[30%] bg-blue" />
              <i className="h-full w-1/5 bg-red" />
            </span>
            <div className="mt-2.5 flex flex-wrap gap-4 font-body text-[13.5px] font-bold">
              {(['organizations', 'audience', 'teams'] as const).map((source, index) => (
                <span key={source} className="inline-flex items-center gap-1.5">
                  <i
                    className={cn(
                      'size-3.5 rounded-sm border-2 border-ink',
                      index === 0 ? 'bg-gold' : index === 1 ? 'bg-blue' : 'bg-red',
                    )}
                  />
                  {t(`index.sources.${source}.legend`)}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-surface px-7.5 py-7 shadow-[6px_6px_0] shadow-ink max-sm:px-5">
            <h2 className="flex items-center gap-3.25 font-display text-[27px]/[1.2]">
              <Image src={HandIcon} alt="" className="size-9 shrink-0" />
              {t('survey.title')}
            </h2>
            <p className="mt-2 mb-5 font-body text-[16.5px]/[1.95] font-medium text-soft">
              {t('survey.description')}
            </p>
            {annualReviewQuestions.map((question) => (
              <Form.Control<AnnualReviewFormValues>
                key={question}
                name={question}
                label={t(`survey.questions.${question}`)}
                className="border-b-[2.5px]  border-dashed border-ink/25 py-5 last:border-0 **:data-[slot=field-label]:font-display **:data-[slot=field-label]:text-xl/[1.4]"
              >
                {(field) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="mt-3 flex flex-wrap gap-2.25 text-center"
                  >
                    {annualReviewScale.map((value) => (
                      <RadioGroupItem
                        key={value}
                        value={value}
                        className="min-h-0 min-w-23 flex-1 rounded-card border-[2.5px] px-2.5 py-3 font-body text-sm font-extrabold shadow-[3px_3px_0] bg-paper data-checked:bg-red data-checked:text-surface data-checked:shadow-[3px_3px_0] hover:translate-x-0 hover:translate-y-0 hover:rotate-0 hover:bg-gold hover:shadow-[3px_3px_0] **:data-[slot=radio-group-indicator]:hidden"
                      >
                        {t(`survey.scale.${value}`)}
                      </RadioGroupItem>
                    ))}
                  </RadioGroup>
                )}
              </Form.Control>
            ))}
            <SurveyActions onSaved={() => setStatus('saved')} />
            <p className="sr-only" aria-live="polite">
              {status ? t(`survey.${status}`) : ''}
            </p>
          </section>
        </Form>
      ) : (
        <>
          <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-red px-7 py-6.5 text-surface shadow-[7px_7px_0] shadow-ink">
            <span className="block font-body text-[14.5px] font-bold text-surface/90">
              {t('rewards.poolLabel')}
            </span>
            <strong className="mt-1 block font-display text-[54px]/[1.05] font-normal">
              {n(annualReview.rewardsPool)}
              <small className="ms-1.5 text-xl text-gold">{global('currency')}</small>
            </strong>
            <p className="mt-2 font-body text-[14.5px]/[1.85] font-semibold text-surface/90">
              {t('rewards.poolDescription', {
                percent: n(annualReview.poolPercent),
                year: n(annualReview.year),
                volume: n(annualReview.exchangeVolume),
                currency: global('currency'),
              })}
            </p>
          </section>

          <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-surface px-7.5 py-7 shadow-[6px_6px_0] shadow-ink max-sm:px-5">
            <h2 className="flex items-center gap-3.25 font-display text-[27px]/[1.2]">
              <Image src={PlantIcon} alt="" className="size-9 shrink-0" />
              {t('rewards.shareTitle')}
            </h2>
            <p className="mt-2 mb-5 font-body text-[16.5px]/[1.95] font-medium text-soft">
              {t('rewards.shareDescription')}
            </p>
            {(
              [
                ['share', annualReview.poolShare],
                ['cycle', annualReview.cycleReward],
                ['survey', annualReview.surveyReward],
              ] as const
            ).map(([id, value]) => (
              <div
                key={id}
                className="flex flex-wrap items-center gap-3.5 border-b-[2.5px] border-dashed border-ink/25 py-3.75"
              >
                <span className="min-w-47.5 flex-1 font-body text-base font-bold text-soft">
                  <strong className="mb-0.5 block font-display text-[19px] font-normal text-ink">
                    {t(`rewards.rows.${id}.title`)}
                  </strong>
                  {t(`rewards.rows.${id}.description`, {
                    tokens: n(annualReview.organizationTokens),
                    total: n(annualReview.networkTokens),
                    percent: n(annualReview.tokenPercent),
                    completed: n(annualReview.completedCycles),
                    cycles: n(annualReview.totalCycles),
                  })}
                  {id !== 'share' && (
                    <span className="ms-2 inline-flex rounded-full border-[2.5px] border-dashed border-ink bg-surface px-3 py-1 text-[13px] font-extrabold text-soft">
                      {t(`rewards.rows.${id}.status`)}
                    </span>
                  )}
                </span>
                <strong className="font-display text-[26px] font-normal">
                  {id === 'share' ? '' : '+'}
                  {n(value)}
                </strong>
              </div>
            ))}
            <div className="mt-4 flex flex-wrap items-center gap-3.5 rounded-card border-[2.5px] border-ink bg-gold px-5 py-4.25">
              <span className="min-w-47.5 flex-1 font-body text-base font-bold text-soft">
                <strong className="block font-display text-[21px] font-normal text-ink">
                  {t('rewards.total.title')}
                </strong>
                {t('rewards.total.description', { day: n(annualReview.closesDay) })}
              </span>
              <strong className="font-display text-[34px] font-normal">
                {n(annualReview.expectedTotal)}
                <small className="ms-1.25 text-[15px] text-red">{global('currency')}</small>
              </strong>
            </div>
          </section>

          <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-surface px-7.5 py-7 shadow-[6px_6px_0] shadow-ink max-sm:px-5">
            <h2 className="flex items-center gap-3.25 font-display text-[27px]/[1.2]">
              <Image src={DnaIcon} alt="" className="size-9 shrink-0" />
              {t('rewards.distribution.title')}
            </h2>
            <ul className="mt-3.5">
              {[1, 2, 3, 4].map((item) => (
                <li
                  key={item}
                  className="relative mb-2.25 ps-6 font-body text-[16.5px]/[2] font-medium text-soft last:mb-0 before:absolute before:top-3.25 before:inset-s-0.5 before:size-2.5 before:rounded-full before:border-[2.5px] before:border-ink before:bg-gold"
                >
                  {t.rich(`rewards.distribution.item${item}`, {
                    reward: n(annualReview.reward),
                    currency: global('currency'),
                    strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
                  })}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </>
  )
}
