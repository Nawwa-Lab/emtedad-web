'use client'

import { Form } from '@/components/Form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Link } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import DNAIcon from '@/icons/dna.svg'
import GateIcon from '@/icons/gate.svg'
import HandIcon from '@/icons/hand.svg'
import KeyIcon from '@/icons/key.svg'
import LanternIcon from '@/icons/lantern.svg'
import StarTwoIcon from '@/icons/star-2.svg'
import StarIcon from '@/icons/star.svg'
import WaveIcon from '@/icons/wave.svg'
import { formatNumber } from '@/lib/utils'
import { createCaseResponseSchema, type CaseResponseFormValues } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { use, useMemo, useState } from 'react'
import { etabatCaseDetail, saveCaseResponseDraft, submitCaseResponse } from '../../data'

type Tab = 'complaint' | 'response' | 'exchange' | 'timeline'

export default function EtabatCasePage({ params }: PageProps<'/[lang]/etabat/cases/[id]'>) {
  use(params)

  const t = useTranslations('etabat.home.case')
  const home = useTranslations('etabat.home')
  const global = useTranslations('global')
  const locale = useLocale()
  const [tab, setTab] = useState<Tab>('complaint')
  const [files, setFiles] = useState<File[]>([])
  const [message, setMessage] = useState<'saved' | 'sent' | null>(null)
  const steps = ['filed', 'response', 'mediation', 'arbitration', 'closed'] as const
  const timeline = t.raw('timeline') as [string, string][]
  const caseResponseSchema = useMemo(
    () =>
      createCaseResponseSchema({
        responseRequired: t('validation.responseRequired'),
        responseMin: t('validation.responseMin'),
      }),
    [t],
  )

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return
    const allowed = Array.from(fileList).filter((file) =>
      ['application/pdf', 'image/png', 'image/jpeg'].includes(file.type),
    )
    setFiles((current) => [...current, ...allowed].slice(0, 5))
  }

  const save = async () => {
    await saveCaseResponseDraft()
    setMessage('saved')
  }

  const submit = async (data: CaseResponseFormValues) => {
    await submitCaseResponse(data)
  }

  return (
    <div className="mx-auto max-w-245">
      <Link
        href="/etabat"
        className="mb-4 inline-flex items-center gap-2 font-body text-[15px] font-extrabold text-ink hover:text-red"
      >
        <span className="grid size-9.5 place-items-center rounded-full border-[2.5px] border-ink bg-surface text-xl text-ink rtl:rotate-180">
          ›
        </span>
        {t('back')}
      </Link>

      <section className="mb-5 rounded-panel border-[3px] border-ink bg-surface px-7 py-6 shadow-[8px_8px_0] shadow-ink max-sm:px-4.5">
        <div className="flex flex-wrap items-start gap-3">
          <h1 className="me-auto min-w-50 flex-1 font-display text-[clamp(26px,3.4vw,34px)]/[1.25]">
            {etabatCaseDetail.title}
          </h1>
          <Badge color="tint" effect="flat">
            {home('roles.respondent')}
          </Badge>
          <Badge color="paper" effect="flat" className="font-display tabular-nums">
            {home('caseNumber', { id: formatNumber(etabatCaseDetail.id, { locale }) })}
          </Badge>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2.5 font-body text-[14.5px] font-semibold text-soft">
          <span>
            {t('claimant')}{' '}
            <span className="border-b-[2.5px] border-red font-extrabold text-ink">
              {etabatCaseDetail.claimant}
            </span>
          </span>
          <span className="h-5.5 w-0.75 rounded bg-ink/20" />
          <span>{home('filedDate', { date: etabatCaseDetail.filedAt })}</span>
          <span className="h-5.5 w-0.75 rounded bg-ink/20" />
          <Badge color="red" effect="flat">
            {etabatCaseDetail.deadline}
          </Badge>
        </div>
        <div className="mt-3.5">
          <Badge color="gold" effect="flat" className="w-fit">
            {t('state')}
          </Badge>
          <div className="mt-3 flex items-start" aria-label={home('progressLabel')}>
            {steps.map((step, index) => (
              <span
                key={step}
                className={cn(
                  'relative flex min-w-0 flex-1 flex-col items-center gap-1.5 text-center font-body text-xs font-bold leading-snug text-soft after:absolute after:top-1.75 after:inset-s-1/2 after:z-0 after:h-0.75 after:w-full after:bg-ink/20 last:after:hidden',
                  index === 0 && 'text-ink after:bg-ink',
                  index === 1 && 'text-ink',
                )}
              >
                <i
                  className={cn(
                    'z-10 size-4.25 rounded-full border-[2.5px] border-ink bg-surface',
                    index === 0 && 'bg-ink',
                    index === 1 && 'scale-125 bg-red',
                  )}
                />
                <span>{home(`steps.${step}`)}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4.5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: t('facts.amount'),
              value: (
                <>
                  {formatNumber(etabatCaseDetail.amount, { locale })}{' '}
                  <span className="text-red">{global('currency')}</span>
                </>
              ),
            },
            { label: t('facts.exchange'), value: etabatCaseDetail.exchange },
            {
              label: t('facts.duration'),
              value: t.rich('workingDays', {
                value: formatNumber(etabatCaseDetail.duration, { locale }),
                unit: (chunks) => <span className="text-red">{chunks}</span>,
              }),
            },
            { label: t('facts.mediators'), value: etabatCaseDetail.mediators },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-card border-[2.5px] border-ink bg-paper px-4 py-3.5"
            >
              <span className="block font-body text-[12.5px] font-bold text-soft">{label}</span>
              <span className="mt-1 block font-display text-[17px]/[1.3]">{value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5 rounded-panel border-[3px] border-ink bg-red px-6.5 py-5.5 text-surface shadow-[6px_6px_0] shadow-ink max-sm:px-4.5">
        <div className="flex flex-wrap items-center gap-3">
          <Image src={LanternIcon} alt="" className="size-8 shrink-0" />
          <h2 className="font-display text-2xl/tight">{t('todoTitle')}</h2>
        </div>
        <p className="mt-2.5 font-body text-[15.5px]/[1.9] font-semibold">{t('todoText')}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button className="bg-gold text-ink" onClick={() => setTab('response')}>
            {t('writeResponse')}
          </Button>
          <Button
            variant="outline"
            className="border-surface text-surface hover:bg-surface hover:text-ink"
            effect="flat"
            onClick={() => setTab('complaint')}
          >
            {t('readComplaint')}
          </Button>
        </div>
      </section>

      <div role="tablist" aria-label={t('tabs.complaint')} className="mb-6 flex flex-wrap gap-2.5">
        {(['complaint', 'response', 'exchange', 'timeline'] as Tab[]).map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={tab === item}
            onClick={() => setTab(item)}
            className={cn(
              'rounded-full border-[2.5px] border-ink bg-surface px-5.5 py-2.5 font-body text-[15px] font-extrabold shadow-[3px_3px_0] shadow-ink transition-transform hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0]',
              tab === item && 'bg-ink text-surface',
            )}
          >
            {t(`tabs.${item}`)}
          </button>
        ))}
      </div>

      {tab === 'complaint' && <Complaint t={t} />}
      {tab === 'response' && (
        <section className="mb-5 rounded-panel border-[3px] border-ink bg-surface px-7 py-6 shadow-[6px_6px_0] shadow-ink max-sm:px-4.5">
          <h2 className="flex items-center gap-3 font-display text-[26px]/[1.25]">
            <Image src={DNAIcon} alt="" className="size-8.5" />
            {t('responseTitle')}
          </h2>
          <p className="mt-2 font-body text-base/[1.95] font-medium text-soft">
            {t('responseIntro')}
          </p>
          <Form<CaseResponseFormValues>
            resolver={zodResolver(caseResponseSchema)}
            defaultValues={{ response: '', proposal: '' }}
            onSubmit={submit}
          >
            <Form.Control
              name="response"
              label={t('whatHappened')}
              labelFor="response"
              className="mt-4.5"
            >
              {(field, fieldState) => (
                <Textarea
                  id="response"
                  placeholder={t('whatHappenedHint')}
                  className="min-h-42.5"
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
              )}
            </Form.Control>
            <Form.Control name="proposal" label={t('solution')} labelFor="proposal">
              {(field, fieldState) => (
                <>
                  <Textarea
                    id="proposal"
                    placeholder={t('solutionHint')}
                    className="min-h-25"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  <p className="mt-1.75 font-body text-[13.5px]/[1.7] font-semibold text-soft">
                    {t('optionalHint')}
                  </p>
                </>
              )}
            </Form.Control>
            <div className="mb-4.5">
              <label htmlFor="evidence" className="mb-2.5 block font-body text-sm font-bold">
                {t('evidence')}
              </label>
              <label className="block cursor-pointer rounded-card border-[3px] border-dashed border-ink bg-paper px-6 py-6 text-center font-body font-bold text-soft hover:bg-gold">
                <input
                  id="evidence"
                  disabled={files.length >= 5}
                  type="file"
                  accept="application/pdf,image/png,image/jpeg"
                  multiple
                  className="sr-only"
                  onChange={(event) => {
                    addFiles(event.target.files)
                    event.target.value = ''
                  }}
                />
                <span className="block">{t('upload')}</span>
                <span className="mt-1 block text-[13.5px] font-semibold">{t('uploadHint')}</span>
              </label>
              {files.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {files.map((file) => (
                    <li
                      key={`${file.name}-${file.lastModified}`}
                      className="rounded-full border-2 border-ink bg-paper px-3 py-1 font-body text-xs font-bold"
                    >
                      {file.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p className="flex items-start gap-3 rounded-card border-[2.5px] border-dashed border-red bg-tint px-4.5 py-3.5 font-body text-[14.5px]/[1.85] font-semibold text-ink">
              <Image src={KeyIcon} alt="" className="mt-0.5 size-7 shrink-0" />
              {t.rich('responseLock', { strong: (chunks) => <strong>{chunks}</strong> })}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button type="submit">{t('send')}</Button>
              <Button type="button" variant="outline" effect="flat" onClick={save}>
                {t('save')}
              </Button>
              {message && (
                <span className="font-body text-sm font-bold text-soft">{t(message)}</span>
              )}
            </div>
          </Form>
        </section>
      )}
      {tab === 'exchange' && <Exchange t={t} />}
      {tab === 'timeline' && <Timeline t={t} timeline={timeline} />}
    </div>
  )
}

function Complaint({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <section className="mb-5 rounded-panel border-[3px] border-ink bg-surface px-7 py-6 shadow-[6px_6px_0] shadow-ink max-sm:px-4.5">
      <h2 className="flex items-center gap-3 font-display text-[26px]/[1.25]">
        <Image src={LanternIcon} alt="" className="size-8.5" />
        {t('complaintTitle')}
      </h2>
      <div className="mt-4 mb-4 rounded-card border-[2.5px] border-ink bg-paper px-5 py-4">
        <div className="mb-2.5 flex flex-wrap items-center gap-3">
          <span className="grid size-8 place-items-center rounded-full bg-ink font-display text-surface">
            ص
          </span>
          <b>{etabatCaseDetail.claimant}</b>
          <Badge color="surface" size="sm" effect="flat">
            {t('claimantRole')}
          </Badge>
          <span className="ms-auto text-[13px] font-semibold text-soft">{t('filedTime')}</span>
        </div>
        <p className="font-body text-[15.5px]/[2] font-medium text-soft">
          {etabatCaseDetail.statement}
        </p>
      </div>
      <h2 className="mt-6.5 flex items-center gap-3 font-display text-[26px]/[1.25]">
        <Image src={KeyIcon} alt="" className="size-8.5" />
        {t('requestTitle')}
      </h2>
      <div className="mt-4 rounded-card border-[2.5px] border-ink bg-paper px-5 py-4">
        <p className="font-body text-[15.5px]/[2] font-medium text-soft">
          {etabatCaseDetail.request}
        </p>
      </div>
      <h2 className="mt-6.5 flex items-center gap-3 font-display text-[26px]/[1.25]">
        <Image src={StarTwoIcon} alt="" className="size-8.5" />
        {t('evidenceTitle')}
      </h2>
      <div className="mt-4">
        {etabatCaseDetail.evidence.map(([name, detail]) => (
          <FileRow
            key={name}
            icon={name === etabatCaseDetail.evidence[0][0] ? LanternIcon : StarTwoIcon}
            name={name}
            detail={detail}
            badge={t('uploaded')}
          />
        ))}
      </div>
    </section>
  )
}

function Exchange({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <section className="mb-5 rounded-panel border-[3px] border-ink bg-surface px-7 py-6 shadow-[6px_6px_0] shadow-ink max-sm:px-4.5">
      <h2 className="flex items-center gap-3 font-display text-[26px]/[1.25]">
        <Image src={DNAIcon} alt="" className="size-8.5" />
        {t('exchangeTitle')}
      </h2>
      <p className="mt-2 font-body text-base/[1.95] font-medium text-soft">{t('exchangeIntro')}</p>
      <div className="mt-4.5">
        {etabatCaseDetail.exchangeFiles.map(([name, detail], index) => (
          <FileRow
            key={name}
            icon={[BalanceIcon, WaveIcon, LanternIcon, StarTwoIcon, StarIcon][index]}
            name={name}
            detail={detail}
            badge={t('locked')}
          />
        ))}
      </div>
      <p className="mt-4 rounded-card border-[2.5px] border-dashed border-ink bg-paper px-4.5 py-3.5 font-body text-[14.5px]/[1.85] font-semibold text-soft">
        {t.rich('currencyHeld', {
          strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
        })}
      </p>
    </section>
  )
}

function FileRow({
  icon,
  name,
  detail,
  badge,
}: {
  icon: typeof HandIcon
  name: string
  detail: string
  badge: string
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-3 rounded-card border-[2.5px] border-ink bg-paper px-4 py-3">
      <Image src={icon} alt="" className="size-6.5 shrink-0" />
      <b className="min-w-0 flex-1 font-body text-[15px]">{name}</b>
      <span className="font-body text-[13px] font-semibold text-soft">{detail}</span>
      <Badge color="surface" size="sm" effect="flat">
        {badge}
      </Badge>
    </div>
  )
}

function Timeline({
  t,
  timeline,
}: {
  t: ReturnType<typeof useTranslations>
  timeline: [string, string][]
}) {
  return (
    <section className="mb-5 rounded-panel border-[3px] border-ink bg-surface px-7 py-6 shadow-[6px_6px_0] shadow-ink max-sm:px-4.5">
      <h2 className="flex items-center gap-3 font-display text-[26px]/[1.25]">
        <Image src={GateIcon} alt="" className="size-8.5" />
        {t('timelineTitle')}
      </h2>
      <ol className="mt-4.5">
        {timeline.map(([title, description], index) => (
          <li
            key={title}
            className="relative flex gap-4 pb-5 last:pb-0 before:absolute before:top-8 before:bottom-0 before:inset-s-4 before:w-0.75 before:bg-ink/20 last:before:hidden"
          >
            <span
              className={cn(
                'z-10 grid size-8 place-items-center rounded-full bg-ink font-display text-surface',
                index > 0 && 'border-[2.5px] border-dashed border-ink bg-surface text-soft',
              )}
            >
              {formatNumber(index + 1, { locale: 'ar' })}
            </span>
            <div>
              <h3 className="font-display text-[19px]/[1.35]">{title}</h3>
              <p className="mt-1 font-body text-[14.5px]/[1.85] font-semibold text-soft">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
