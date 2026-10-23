'use client'

import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Link } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import CirclesIcon from '@/icons/circles.svg'
import GateIcon from '@/icons/gate.svg'
import WaveIcon from '@/icons/wave.svg'
import { formatNumber } from '@/lib/utils'
import { createArbitrationStartSchema, type ArbitrationStartFormValues } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo, useState } from 'react'
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
} from '../components'
import { arbitration, submitArbitrationStart } from '../data'

export default function StartArbitrationPage() {
  const t = useTranslations('etabat.arbitration')
  const global = useTranslations('global')
  const locale = useLocale()
  const currency = global('currency')
  const [submitted, setSubmitted] = useState(false)
  const schema = useMemo(
    () => createArbitrationStartSchema({ consentRequired: t('consentRequired') }),
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

  return (
    <div className="mx-auto max-w-245">
      <ArbitrationHeading
        backHref="/etabat"
        back={t('backHome')}
        title={t('start.title')}
        subtitle={t('caseSubtitle', {
          id: n(Number(arbitration.id)),
          title: arbitration.caseTitle,
        })}
      />
      <ArbitrationIntro
        icon={<Image src={BalanceIcon} alt="" className="mt-0.5 size-8.5 shrink-0" />}
      >
        {t.rich('start.intro', { strong: (chunks) => <strong>{chunks}</strong> })}
      </ArbitrationIntro>

      <ArbitrationDeposit
        title={t('start.depositTitle')}
        rows={[
          { label: t('start.disputeValue'), value: money(arbitration.disputeValue) },
          { label: t('start.perArbitrator'), value: money(arbitration.disputeValue * 0.02) },
          { label: t('start.panelSize'), value: `× ${n(arbitration.firstPanelSize)}` },
          { label: t('start.minimum'), value: money(40) },
        ]}
        totalLabel={t('start.requiredDeposit')}
        total={arbitration.firstDeposit}
        currency={currency}
        locale={locale}
        fine={t.rich('start.depositFine', {
          dispute: n(arbitration.disputeValue),
          perArbitrator: n(arbitration.disputeValue * 0.02),
          panel: n(arbitration.firstPanelSize),
          deposit: n(arbitration.firstDeposit),
          minimum: n(40),
          currency,
          strong: (chunks) => <strong className="text-surface">{chunks}</strong>,
        })}
      />

      <Form<ArbitrationStartFormValues>
        resolver={zodResolver(schema)}
        defaultValues={{ loanConsent: false, bindingConsent: false }}
        onSubmit={async (values) => {
          await submitArbitrationStart(values)
          setSubmitted(true)
        }}
      >
        <ArbitrationSection
          icon={<Image src={GateIcon} alt="" className="size-8.5" />}
          title={t('start.ladderTitle')}
          description={t('start.ladderIntro')}
        >
          <ArbitrationLadder current="first" labels={rounds} locale={locale} currency={currency} />
          <ArbitrationNote>
            {t.rich('start.ladderNote', {
              currency,
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </ArbitrationNote>
        </ArbitrationSection>

        <ArbitrationSection
          icon={<Image src={CirclesIcon} alt="" className="size-8.5" />}
          title={t('start.balanceTitle')}
        >
          <div className="mt-3">
            <ArbitrationBalanceRow
              label={t('start.availableBalance')}
              value={money(arbitration.availableBalance)}
            />
            <ArbitrationBalanceRow
              label={t('start.balanceDeposit')}
              value={money(arbitration.firstDeposit)}
            />
            <ArbitrationBalanceRow
              label={t('start.shortfall')}
              value={money(arbitration.loan)}
              alert
            />
          </div>
          <ArbitrationNote warning>
            {t.rich('start.loanNote', {
              loan: n(arbitration.loan),
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
                  id="arbitration-loan"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={state.invalid}
                  className="border-[2.5px]"
                />
                <label
                  htmlFor="arbitration-loan"
                  className="cursor-pointer font-body text-[15px]/[1.8] font-semibold"
                >
                  {t('start.loanConsent', { loan: n(arbitration.loan), currency })}
                </label>
              </div>
            )}
          </Form.Control>
        </ArbitrationSection>

        <ArbitrationSection
          icon={<Image src={BalanceIcon} alt="" className="size-8.5" />}
          title={t('start.fateTitle')}
        >
          <div className="mt-4 grid gap-3">
            {(
              [
                ['✓', 'bg-[#9CC49B]', t('start.fateWinTitle'), t('start.fateWin')],
                [
                  '✕',
                  'bg-red text-surface',
                  t('start.fateLoseTitle'),
                  t.rich('start.fateLose', {
                    strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
                  }),
                ],
                [n(10), 'bg-gold', t('start.fateRewardTitle'), t('start.fateReward', { currency })],
              ] as const
            ).map(([mark, color, title, detail]) => (
              <div
                key={title}
                className="flex items-start gap-3.5 rounded-card border-[2.5px] border-ink bg-paper px-4.5 py-4"
              >
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-[11px] border-[2.5px] border-ink font-display text-xl ${color}`}
                  aria-hidden="true"
                >
                  {mark}
                </span>
                <div>
                  <h3 className="font-display text-[19px]/[1.35]">{title}</h3>
                  <p className="mt-1 font-body text-[14.5px]/[1.85] font-semibold text-soft">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ArbitrationSection>

        <ArbitrationSection
          icon={<Image src={WaveIcon} alt="" className="size-8.5" />}
          title={t('start.scheduleTitle')}
        >
          <ArbitrationFacts
            items={[
              {
                label: t('start.serviceDuration'),
                value: (
                  <>
                    {n(15)} <small className="text-sm text-red">{t('workingDay')}</small>
                  </>
                ),
              },
              { label: t('start.generalDuration'), value: t('start.month') },
              {
                label: t('start.appealWindow'),
                value: (
                  <>
                    {n(5)} <small className="text-sm text-red">{t('workingDays')}</small>
                  </>
                ),
              },
              {
                label: t('start.heldCurrency', { currency }),
                value: (
                  <>
                    {n(arbitration.disputeValue)}{' '}
                    <small className="text-sm text-red">{currency}</small>
                  </>
                ),
              },
            ]}
          />
          <ArbitrationNote>
            {t.rich('start.scheduleNote', {
              currency,
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </ArbitrationNote>
          <Form.Control
            name="bindingConsent"
            label=""
            className="mt-4.5 [&_[data-slot=field-label]]:hidden"
          >
            {(field, state) => (
              <div className="flex items-start gap-3">
                <Checkbox
                  id="arbitration-binding"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={state.invalid}
                  className="border-[2.5px]"
                />
                <label
                  htmlFor="arbitration-binding"
                  className="cursor-pointer font-body text-[15px]/[1.8] font-semibold"
                >
                  {t.rich('start.bindingConsent', {
                    currency,
                    strong: (chunks) => <strong>{chunks}</strong>,
                  })}
                </label>
              </div>
            )}
          </Form.Control>
          <SubmitActions
            submit={t('start.submit', { deposit: n(arbitration.firstDeposit), currency })}
            cancel={t('start.cancel')}
            warning={t('consentWarning')}
            submitted={submitted}
          />
          {submitted && (
            <p role="status" className="mt-4 font-body font-bold text-blue">
              {t('start.submitted')}{' '}
              <Link href="/etabat" className="underline decoration-2 underline-offset-4">
                {t('start.viewCases')}
              </Link>
            </p>
          )}
        </ArbitrationSection>
      </Form>
    </div>
  )
}

function SubmitActions({
  submit,
  cancel,
  warning,
  submitted,
}: {
  submit: string
  cancel: string
  warning: string
  submitted: boolean
}) {
  const [loanConsent, bindingConsent] = useWatch<ArbitrationStartFormValues>({
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
          href="/etabat"
          className="inline-flex items-center rounded-full border-[2.5px] border-ink bg-surface px-5.5 py-2.5 font-body text-[15px] font-bold text-ink hover:bg-gold"
        >
          {cancel}
        </Link>
      </div>
      {!ready && <p className="mt-2 font-body text-[13.5px] font-semibold text-soft">{warning}</p>}
    </>
  )
}
