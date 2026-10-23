'use client'

import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Link } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import CirclesIcon from '@/icons/circles.svg'
import GateIcon from '@/icons/gate.svg'
import LanternIcon from '@/icons/lantern.svg'
import WaveIcon from '@/icons/wave.svg'
import { formatNumber } from '@/lib/utils'
import { createArbitrationAppealSchema, type ArbitrationAppealFormValues } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { use, useMemo, useState } from 'react'
import { useWatch } from 'react-hook-form'
import {
  ArbitrationBalanceRow,
  ArbitrationDeposit,
  ArbitrationFacts,
  ArbitrationHeading,
  ArbitrationIntro,
  ArbitrationLadder,
  ArbitrationNote,
  ArbitrationSection,
} from '../../components'
import { arbitration, submitArbitrationAppeal } from '../../data'

export default function ArbitrationAppealPage({
  params,
}: PageProps<'/[lang]/etabat/arbitrations/[id]/appeal'>) {
  const { id } = use(params)
  const t = useTranslations('etabat.arbitration')
  const global = useTranslations('global')
  const locale = useLocale()
  const currency = global('currency')
  const [files, setFiles] = useState<File[]>([])
  const [submitted, setSubmitted] = useState(false)
  const schema = useMemo(
    () =>
      createArbitrationAppealSchema({
        consentRequired: t('consentRequired'),
        reasonRequired: t('appeal.validation.reasonRequired'),
        reasonMin: t('appeal.validation.reasonMin'),
      }),
    [t],
  )
  const n = (value: number) => formatNumber(value, { locale })
  const money = (value: number) => `${n(value)} ${currency}`
  const rounds = {
    first: t('rounds.first'),
    appeal1: t('rounds.appeal1'),
    appeal2: t('rounds.appeal2'),
    appeal3: t('rounds.appeal3'),
  }
  const keepLines = t.raw('appeal.keepLines') as [string, string][]
  const flipLines = t.raw('appeal.flipLines') as [string, string][]

  if (id !== arbitration.id) notFound()

  const addFiles = (list: FileList | null) => {
    if (!list) return
    const accepted = Array.from(list).filter((file) =>
      ['application/pdf', 'image/png', 'image/jpeg'].includes(file.type),
    )
    setFiles((current) => [...current, ...accepted].slice(0, 5))
  }
  const interpolate = (value: string) =>
    value.replaceAll('{deposit}', n(arbitration.appealDeposit)).replaceAll('{currency}', currency)

  return (
    <div className="mx-auto max-w-245">
      <ArbitrationHeading
        backHref={`/etabat/arbitrations/${arbitration.id}/result`}
        back={t('backResult')}
        title={t('appeal.title')}
        subtitle={t('appeal.subtitle', { id: n(Number(arbitration.id)) })}
      />

      <div className="mb-5.5 rounded-panel border-[3px] border-ink bg-paper px-6 py-5.5">
        <span className="inline-block rounded-full border-2 border-ink bg-surface px-3 py-0.5 font-body text-[11.5px] font-extrabold">
          {t('appeal.priorBadge')}
        </span>
        <b className="mt-2.5 block font-display text-[25px]/[1.25] font-normal">
          {t('appeal.priorVerdict', { party: arbitration.counterparty })}
        </b>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            {Array.from({ length: arbitration.firstPanelSize }, (_, index) => (
              <i
                key={index}
                className={`size-4.25 rounded-full border-[2.5px] border-ink ${index < arbitration.agreeingArbitrators ? 'bg-ink' : 'bg-transparent'}`}
              />
            ))}
          </span>
          <span className="font-body text-sm font-bold text-soft">
            {t('result.schelling', {
              agreed: n(arbitration.agreeingArbitrators),
              total: n(arbitration.firstPanelSize),
            })}
          </span>
        </div>
      </div>

      <ArbitrationIntro
        icon={<Image src={BalanceIcon} alt="" className="mt-0.5 size-8.5 shrink-0" />}
      >
        {t.rich('appeal.intro', { strong: (chunks) => <strong>{chunks}</strong> })}
      </ArbitrationIntro>

      <ArbitrationDeposit
        title={t('appeal.depositTitle')}
        rows={[
          { label: t('appeal.firstDeposit'), value: money(arbitration.firstDeposit) },
          { label: t('appeal.doubling'), value: `× ${n(2)}` },
          {
            label: t('appeal.newPanel'),
            value: `${n(arbitration.firstPanelSize * 2 + 1)} ${t('arbitrator')}`,
          },
        ]}
        totalLabel={t('appeal.requiredDeposit')}
        total={arbitration.appealDeposit}
        currency={currency}
        locale={locale}
        fine={t('appeal.depositFine')}
      />

      <Form<ArbitrationAppealFormValues>
        resolver={zodResolver(schema)}
        defaultValues={{ loanConsent: false, bindingConsent: false, reason: '' }}
        onSubmit={async (values) => {
          await submitArbitrationAppeal(values, files)
          setSubmitted(true)
        }}
      >
        <ArbitrationSection
          icon={<Image src={GateIcon} alt="" className="size-8.5" />}
          title={t('appeal.ladderTitle')}
        >
          <ArbitrationLadder
            current="appeal1"
            labels={rounds}
            locale={locale}
            currency={currency}
          />
        </ArbitrationSection>

        <ArbitrationSection
          icon={<Image src={CirclesIcon} alt="" className="size-8.5" />}
          title={t('appeal.balanceTitle')}
        >
          <div className="mt-3">
            <ArbitrationBalanceRow label={t('appeal.availableBalance')} value={money(0)} />
            <ArbitrationBalanceRow
              label={t('appeal.existingDebt')}
              value={money(arbitration.outstandingDebt)}
            />
            <ArbitrationBalanceRow
              label={t('appeal.appealDeposit')}
              value={money(arbitration.appealDeposit)}
            />
            <ArbitrationBalanceRow
              label={t('appeal.newDebt')}
              value={money(arbitration.outstandingDebt + arbitration.appealDeposit)}
              alert
            />
          </div>
          <ArbitrationNote warning>
            {t.rich('appeal.loanNote', {
              deposit: n(arbitration.appealDeposit),
              debt: n(arbitration.outstandingDebt + arbitration.appealDeposit),
              currency,
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </ArbitrationNote>
          <Form.Control
            name="loanConsent"
            label=""
            className="mt-4.5 [&_[data-slot=field-label]]:hidden"
          >
            {(field, state) => (
              <div className="flex items-start gap-3">
                <Checkbox
                  id="appeal-loan"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={state.invalid}
                  className="border-[2.5px]"
                />
                <label
                  htmlFor="appeal-loan"
                  className="cursor-pointer font-body text-[15px]/[1.8] font-semibold"
                >
                  {t('appeal.loanConsent', { deposit: n(arbitration.appealDeposit), currency })}
                </label>
              </div>
            )}
          </Form.Control>
        </ArbitrationSection>

        <ArbitrationSection
          icon={<Image src={LanternIcon} alt="" className="size-8.5" />}
          title={t('appeal.reasonTitle')}
          description={t('appeal.reasonIntro')}
        >
          <Form.Control
            name="reason"
            label=""
            labelFor="appeal-reason"
            className="mt-4.5 [&_[data-slot=field-label]]:hidden"
          >
            {(field, state) => (
              <Textarea
                id="appeal-reason"
                className="min-h-37.5"
                placeholder={t('appeal.reasonPlaceholder')}
                {...field}
                aria-invalid={state.invalid}
              />
            )}
          </Form.Control>
          <div className="mt-2">
            <label
              htmlFor="appeal-evidence"
              className="mb-2.5 block font-body text-[15px] font-bold text-soft"
            >
              {t('appeal.evidence')} <span className="font-semibold">({t('appeal.optional')})</span>
            </label>
            <label className="block cursor-pointer rounded-card border-[3px] border-dashed border-ink bg-paper px-6 py-6 text-center font-body text-[15px]/[1.9] font-bold text-soft hover:bg-gold hover:text-ink">
              <input
                id="appeal-evidence"
                type="file"
                accept="application/pdf,image/png,image/jpeg"
                multiple
                className="sr-only"
                disabled={files.length >= 5}
                onChange={(event) => {
                  addFiles(event.target.files)
                  event.target.value = ''
                }}
              />
              <span className="block">{t('appeal.upload')}</span>
              <span className="block text-[13.5px] font-semibold">{t('appeal.uploadHint')}</span>
            </label>
            {files.length > 0 && (
              <p className="mt-2 font-body text-sm font-bold">
                {files.map((file) => file.name).join(' · ')}
              </p>
            )}
          </div>
        </ArbitrationSection>

        <ArbitrationSection
          icon={<Image src={BalanceIcon} alt="" className="size-8.5" />}
          title={t('appeal.outcomesTitle')}
          description={t('appeal.outcomesIntro')}
        >
          <div className="mt-4.5 rounded-panel border-[3px] border-ink bg-surface px-6 py-5.5 shadow-[5px_5px_0] shadow-ink">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border-[2.5px] border-ink bg-tint px-3.25 py-0.75 font-body text-xs font-extrabold">
                {t('appeal.firstOutcome')}
              </span>
              <h3 className="font-display text-[22px]/[1.3]">{t('appeal.keepTitle')}</h3>
            </div>
            <OutcomeLines lines={keepLines} interpolate={interpolate} tone="keep" />
          </div>
          <div className="mt-4 rounded-panel border-[3px] border-ink bg-surface px-6 py-5.5 shadow-[5px_5px_0] shadow-ink">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border-[2.5px] border-ink bg-[#9CC49B] px-3.25 py-0.75 font-body text-xs font-extrabold">
                {t('appeal.secondOutcome')}
              </span>
              <h3 className="font-display text-[22px]/[1.3]">{t('appeal.flipTitle')}</h3>
            </div>
            <OutcomeLines lines={flipLines} interpolate={interpolate} tone="flip" />
          </div>
          <ArbitrationNote>
            {t.rich('appeal.outcomesNote', {
              party: arbitration.claimant,
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </ArbitrationNote>
        </ArbitrationSection>

        <ArbitrationSection
          icon={<Image src={WaveIcon} alt="" className="size-8.5" />}
          title={t('appeal.scheduleTitle')}
        >
          <ArbitrationFacts
            items={[
              {
                label: t('appeal.windowLeft'),
                value: (
                  <>
                    {n(3)} <small className="text-sm text-red">{t('workingDays')}</small>
                  </>
                ),
              },
              {
                label: t('appeal.appealDuration'),
                value: (
                  <>
                    {n(15)} <small className="text-sm text-red">{t('workingDay')}</small>
                  </>
                ),
              },
              {
                label: t('appeal.panelSize'),
                value: (
                  <>
                    {n(11)} <small className="text-sm text-red">{t('arbitrator')}</small>
                  </>
                ),
              },
              {
                label: t('appeal.heldCurrency', { currency }),
                value: (
                  <>
                    {n(arbitration.disputeValue)}{' '}
                    <small className="text-sm text-red">{currency}</small>
                  </>
                ),
              },
            ]}
          />
          <ArbitrationNote>{t('appeal.scheduleNote', { currency })}</ArbitrationNote>
          <Form.Control
            name="bindingConsent"
            label=""
            className="mt-4.5 [&_[data-slot=field-label]]:hidden"
          >
            {(field, state) => (
              <div className="flex items-start gap-3">
                <Checkbox
                  id="appeal-binding"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={state.invalid}
                  className="border-[2.5px]"
                />
                <label
                  htmlFor="appeal-binding"
                  className="cursor-pointer font-body text-[15px]/[1.8] font-semibold"
                >
                  {t('appeal.bindingConsent', { currency })}
                </label>
              </div>
            )}
          </Form.Control>
          <SubmitActions
            submit={t('appeal.submit', { deposit: n(arbitration.appealDeposit), currency })}
            accept={t('appeal.accept')}
            warning={t('consentWarning')}
            resultHref={`/etabat/arbitrations/${arbitration.id}/result`}
            submitted={submitted}
          />
          {submitted && (
            <p role="status" className="mt-4 font-body font-bold text-blue">
              {t('appeal.submitted')}{' '}
              <Link href="/etabat" className="underline decoration-2 underline-offset-4">
                {t('appeal.viewCases')}
              </Link>
            </p>
          )}
        </ArbitrationSection>
      </Form>
    </div>
  )
}

function OutcomeLines({
  lines,
  interpolate,
  tone,
}: {
  lines: [string, string][]
  interpolate: (value: string) => string
  tone: 'keep' | 'flip'
}) {
  return (
    <div className="mt-3.5">
      {lines.map(([label, value], index) => (
        <div
          key={label}
          className="flex flex-wrap items-baseline gap-3 border-b-[2.5px] border-dashed border-ink/20 py-2.75 last:border-0"
        >
          <span className="min-w-42.5 flex-1 font-body text-[14.5px]/[1.8] font-semibold text-soft">
            {interpolate(label)}
          </span>
          <b
            className={`font-display text-xl font-normal ${(tone === 'keep' && index === 0) || (tone === 'flip' && (index === 1 || index === 2)) ? 'text-red' : tone === 'flip' && (index === 0 || index === 3) ? 'text-[#2F7A3E]' : ''}`}
          >
            {interpolate(value)}
          </b>
        </div>
      ))}
    </div>
  )
}

function SubmitActions({
  submit,
  accept,
  warning,
  resultHref,
  submitted,
}: {
  submit: string
  accept: string
  warning: string
  resultHref: `/etabat/arbitrations/${string}/result`
  submitted: boolean
}) {
  const [loanConsent, bindingConsent] = useWatch<ArbitrationAppealFormValues>({
    name: ['loanConsent', 'bindingConsent'],
  })
  const ready = loanConsent && bindingConsent
  return (
    <>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button type="submit" disabled={!ready || submitted}>
          {submit}
        </Button>
        <Link
          href={resultHref}
          className="inline-flex items-center rounded-full border-[2.5px] border-ink bg-surface px-5.5 py-2.5 font-body text-[15px] font-bold text-ink hover:bg-gold"
        >
          {accept}
        </Link>
      </div>
      {!ready && <p className="mt-2 font-body text-[13.5px] font-semibold text-soft">{warning}</p>}
    </>
  )
}
