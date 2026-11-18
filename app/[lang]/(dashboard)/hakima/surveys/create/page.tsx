'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import LanternIcon from '@/icons/lantern.svg'
import StarIcon from '@/icons/star.svg'
import WaveIcon from '@/icons/wave.svg'
import { formatNumber } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { Note } from '../../components'
import { surveyQuestionSeeds, surveyWeights, type SurveyQuestion } from './data'

const sheetClass =
  'mb-[22px] rounded-panel border-[3px] border-ink bg-surface px-7 py-[26px] shadow-[6px_6px_0] shadow-ink max-[620px]:px-[18px] max-[620px]:py-[22px]'

const sheetTitleClass = 'flex items-center gap-[13px] font-display text-[25px]/[1.25]'

const iconClass = 'grid h-[34px] w-8 shrink-0 place-items-center overflow-hidden'

const imageClass = 'max-h-full max-w-full object-contain'

const labelClass = 'mb-[9px] block font-body text-[15px] font-bold text-soft'

export default function CreateSurveyPage() {
  const t = useTranslations('hakima.surveyCreate')
  const global = useTranslations('global')
  const locale = useLocale()
  const [questions, setQuestions] = useState<SurveyQuestion[]>(surveyQuestionSeeds)
  const [draft, setDraft] = useState('')

  const removeQuestion = (id: number) =>
    setQuestions((list) => list.filter((question) => question.id !== id))

  const addQuestion = () => {
    const text = draft.trim()
    if (!text) return
    setQuestions((list) => [
      ...list,
      { id: Math.max(0, ...list.map((question) => question.id)) + 1, audience: 'all', text },
    ])
    setDraft('')
  }

  return (
    <div className="mx-auto max-w-[980px]">
      <Link
        href="/hakima/governance#srv"
        className="mb-4 inline-flex items-center gap-2.5 font-body text-[15.5px] font-bold text-ink hover:text-red"
      >
        <span className="grid size-9.5 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-surface p-2.25 text-ink shadow-[3px_3px_0] shadow-ink">
          <ChevronLeft className="h-full w-full rtl:rotate-180" strokeWidth={3.2} />
        </span>
        {t('back')}
      </Link>

      <header className="mb-[26px] flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1.14] max-[520px]:text-[40px]">
          {t('title')}
        </h1>
        <p className="pb-1.5 font-body text-[17px] font-medium text-soft">{t('subtitle')}</p>
      </header>

      <section className={sheetClass}>
        <h2 className={sheetTitleClass}>
          <span className={iconClass}>
            <Image src={BalanceIcon} alt="" className={imageClass} />
          </span>
          {t('weights.title')}
        </h2>
        <p className="mt-[9px] mb-5 font-body text-[16px] font-medium leading-[1.95] text-soft">
          {t('weights.sub')}
        </p>
        <div className="mt-1.5 grid grid-cols-3 gap-3.5 max-[620px]:grid-cols-1">
          {surveyWeights.map((weight) => (
            <div
              key={weight.key}
              className="min-w-0 rounded-card border-[2.5px] border-ink bg-paper px-[18px] py-4 text-center"
            >
              <b className="block font-display text-[20px]/[1.3] font-normal">
                {t(`weights.rows.${weight.key}.name`)}
              </b>
              <span className="mt-2 block font-display text-[30px]/[1.1] tabular-nums text-soft">
                {formatNumber(weight.share, { locale, style: 'percent' })}
              </span>
              <span className="mt-1.5 block font-body text-[12.5px] font-semibold text-soft">
                {t(`weights.rows.${weight.key}.count`)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={sheetClass}>
        <h2 className={sheetTitleClass}>
          <span className={iconClass}>
            <Image src={LanternIcon} alt="" className={imageClass} />
          </span>
          {t('questions.title')}
        </h2>
        <p className="mt-[9px] mb-5 font-body text-[16px] font-medium leading-[1.95] text-soft">
          {t('questions.sub')}
        </p>
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="mb-3 flex items-start gap-[13px] rounded-card border-[2.5px] border-ink bg-paper px-[17px] py-[15px]"
          >
            <span className="grid size-7 shrink-0 cursor-grab place-items-center rounded-lg bg-ink font-display text-[14px]/[1] text-surface">
              {formatNumber(index + 1, { locale })}
            </span>
            <div className="min-w-0 flex-1">
              <b className="block font-body text-[15px]/[1.6] font-extrabold">
                {question.seed ? t(`questions.items.${question.seed}`) : question.text}
              </b>
              <span className="mt-[5px] block font-body text-[12.5px] font-semibold text-soft">
                {t(`questions.audiences.${question.audience}`)}
              </span>
            </div>
            <button
              type="button"
              aria-label={t('questions.removeLabel')}
              onClick={() => removeQuestion(question.id)}
              className="grid size-[30px] shrink-0 cursor-pointer place-items-center rounded-full border-[2.5px] border-ink bg-surface font-body text-[14px] font-extrabold leading-none hover:bg-red hover:text-surface"
            >
              ✕
            </button>
          </div>
        ))}
        <div className="mb-5 mt-5">
          <label className={labelClass} htmlFor="nq">
            {t('questions.addLabel')}
          </label>
          <Input
            id="nq"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={t('questions.addPlaceholder')}
          />
          <p className="mt-[7px] font-body text-[13.5px]/[1.7] font-semibold text-soft">
            {t.rich('questions.addHint', { b: (chunks) => <b>{chunks}</b> })}
          </p>
        </div>
        <Button type="button" onClick={addQuestion}>
          {t('questions.addButton')}
        </Button>
      </section>

      <section className={sheetClass}>
        <h2 className={sheetTitleClass}>
          <span className={iconClass}>
            <Image src={WaveIcon} alt="" className={imageClass} />
          </span>
          {t('publish.title')}
        </h2>
        <div className="mb-5">
          <label className={labelClass} htmlFor="op">
            {t('publish.opensLabel')}
          </label>
          <Input id="op" type="text" defaultValue={t('publish.opensValue')} />
        </div>
        <div className="mb-5">
          <label className={labelClass} htmlFor="cl">
            {t('publish.closesLabel')}
          </label>
          <Input id="cl" type="text" defaultValue={t('publish.closesValue')} />
        </div>
        <Note icon={StarIcon}>
          {t.rich('publish.note', {
            currency: global('currency'),
            b: (chunks) => <b className="text-ink">{chunks}</b>,
            nlink: (chunks) => (
              <Link
                href="/hakima/annual-review"
                className="border-b-[2.5px] border-red pb-px font-extrabold text-ink hover:text-red"
              >
                {chunks}
              </Link>
            ),
          })}
        </Note>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button>{t('publish.publishButton')}</Button>
          <Button variant="outline" effect="flat">
            {t('publish.draftButton')}
          </Button>
        </div>
      </section>
    </div>
  )
}
