'use client'

import { Form } from '@/components/Form'
import { Textarea } from '@/components/ui/textarea'
import DNAIcon from '@/icons/dna.svg'
import GateIcon from '@/icons/gate.svg'
import KeyIcon from '@/icons/key.svg'
import LanternIcon from '@/icons/lantern.svg'
import MessageIcon from '@/icons/message.svg'
import WaveIcon from '@/icons/wave.svg'
import { formatNumber } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import type { z } from 'zod'
import { FahsNote, FahsSection, WorkspaceBack } from '../../components'
import { submitMock, withCurrency, type Assignment } from '../../data'
import { mediationReportSchema, settlementSchema } from '../../schemas'

type Tab = 'settlements' | 'discussion' | 'file' | 'report'
export default function MediationWorkspace({ item }: { item: Assignment }) {
  const t = useTranslations('fahsMahs')
  const g = useTranslations('global')
  const locale = useLocale()
  const m = useTranslations('fahsMahs.mediation')
  const titles = t.raw('cases') as Record<string, string>
  const notes = t.raw('notes') as Record<string, string>
  const tabs = m.raw('tabs') as string[]
  const files = m.raw('files') as string[]
  const timeline = m.raw('timeline') as string[]
  const parties = m.raw('partiesFull') as string[]
  const discussionMessages = m.raw('discussionMessages') as [string, string][]
  const [tab, setTab] = useState<Tab>(item.reportDue ? 'report' : 'settlements')
  const [voted, setVoted] = useState(false)
  const [proposals, setProposals] = useState<string[]>([])
  const [messages, setMessages] = useState<string[]>([])
  const [draft, setDraft] = useState('')
  const [notice, setNotice] = useState('')
  const [reportSent, setReportSent] = useState(!item.reportDue && item.status === 'failed')
  const closed = item.status === 'failed' || item.status === 'successful' || voted
  const workshop = item.id === 'workshop'
  const proposalSchema = useMemo(() => settlementSchema(m('required')), [m])
  const reportSchema = useMemo(() => mediationReportSchema(m('required')), [m])
  const tabKeys: Tab[] = ['settlements', 'discussion', 'file', 'report']
  const date = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
    day: 'numeric',
    month: 'long',
  }).format(new Date(`${item.date}T12:00:00`))
  return (
    <div className="mx-auto max-w-245">
      <WorkspaceBack href="/fahs-mahs/my-mediations" label={m('back')} />
      <div className="mb-5 flex items-center gap-3 rounded-panel border-[3px] border-ink bg-blue px-5 py-4 text-surface">
        <Image src={DNAIcon} alt="" className="size-11 shrink-0" />
        <div>
          <b className="font-display text-[24px]">{m('role')}</b>
          <p className="font-body text-sm font-semibold">{m('roleText')}</p>
        </div>
      </div>
      <div className="mb-5 rounded-panel border-[3px] border-ink bg-surface px-6 py-6 shadow-[6px_6px_0] shadow-ink">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-[clamp(30px,4vw,44px)]/[1.2]">{titles[item.caseKey]}</h1>
          <span className="rounded-full border-2 border-ink bg-gold px-3 py-1 font-body text-sm font-bold">
            {closed
              ? t(`status.${item.status === 'successful' ? 'successful' : 'failed'}`)
              : m('status')}
          </span>
          {workshop && (
            <span className="font-body text-sm font-bold text-soft">{m('caseNumber')}</span>
          )}
        </div>
        {workshop && (
          <div className="relative mt-6">
            <div
              aria-hidden="true"
              className="absolute inset-x-[10%] top-2.5 border-t-[3px] border-ink"
            />
            <ol className="relative flex justify-between gap-1">
              {timeline.map((step, index) => (
                <li
                  key={step}
                  className="flex min-w-0 flex-1 flex-col items-center gap-1 text-center font-body text-xs font-bold"
                >
                  <span
                    className={`size-5 rounded-full border-[3px] border-ink ${index <= 2 ? 'bg-gold' : 'bg-paper'}`}
                  />
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
        <p className="mt-3 font-body text-[15px]/[1.85] font-semibold text-soft">
          {withCurrency(notes[item.note], g('currency'))}
        </p>
        {workshop && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {parties.map((party, index) => (
              <div key={party} className="rounded-card border-2 border-ink bg-paper p-3">
                <b className="block font-display text-xl">{party}</b>
                <span className="font-body text-sm text-soft">
                  {m(index === 0 ? 'claimant' : 'respondent')}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(m.raw('facts') as string[]).map((label, index) => (
            <div key={label} className="rounded-card border-2 border-ink bg-paper px-3 py-3">
              <span className="block font-body text-xs font-bold text-soft">{label}</span>
              <strong className="font-display text-[25px]">
                {index === 0
                  ? workshop
                    ? formatNumber(500, { locale })
                    : '—'
                  : index === 1
                    ? date
                    : index === 2
                      ? closed
                        ? '—'
                        : m('days')
                      : formatNumber(10, { locale })}{' '}
                {(index === 0 && workshop) || index === 3 ? (
                  <small className="text-sm text-red">{g('currency')}</small>
                ) : null}
              </strong>
            </div>
          ))}
        </div>
      </div>
      {item.status !== 'failed' && item.status !== 'successful' && item.id === 'workshop' && (
        <FahsSection title={m('failureTitle')} icon={LanternIcon} className="bg-tint">
          <p className="font-body text-[15px]/[1.9]">{m('failureText')}</p>
          <p className="mt-4 rounded-full border-2 border-ink bg-gold px-4 py-2 font-body text-sm font-bold">
            {m('failureUnlocked')}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span aria-hidden="true" className="flex gap-1">
              {[0, 1, 2].map((index) => (
                <i
                  key={index}
                  className={`size-3 rounded-full border-2 border-ink ${index === 0 || (index === 1 && voted) ? 'bg-red' : 'bg-surface'}`}
                />
              ))}
            </span>
            <p className="font-body text-sm font-bold">
              {m(voted ? 'failureCountTwo' : 'failureCount')}
            </p>
          </div>
          <button
            type="button"
            disabled={reportSent}
            onClick={() => {
              setVoted(!voted)
              setNotice(!voted ? m('failureClosed') : '')
            }}
            className="mt-4 rounded-full border-[2.5px] border-ink bg-red px-5 py-2 font-body font-extrabold text-surface disabled:opacity-50"
          >
            {voted ? m('failureUndo') : m('failureVote')}
          </button>
          <p className="mt-3 font-body text-sm text-soft">{m('failureFine')}</p>
        </FahsSection>
      )}
      {voted && <FahsNote warning>{m('failureClosed')}</FahsNote>}
      <div aria-label={m('role')} className="mb-5 flex flex-wrap gap-2">
        {tabKeys.map((key, index) => (
          <button
            type="button"
            aria-pressed={tab === key}
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-full border-[2.5px] border-ink px-4 py-2 font-body text-sm font-extrabold ${tab === key ? 'bg-ink text-surface' : 'bg-surface hover:bg-gold'}`}
          >
            {tabs[index]}
          </button>
        ))}
      </div>
      {tab === 'settlements' && (
        <>
          <FahsSection title={m('settlementsTitle')} icon={DNAIcon}>
            <p className="mb-4 font-body text-[15px]/[1.85]">{m('settlementsText')}</p>
            {!closed && (
              <Form
                resolver={zodResolver(proposalSchema)}
                defaultValues={{ proposal: '' }}
                onSubmit={async (values) => {
                  await submitMock(values)
                  setProposals((current) => [values.proposal, ...current])
                  setNotice(m('submitted'))
                }}
              >
                <Form.Control<z.infer<typeof proposalSchema>>
                  name="proposal"
                  label={m('proposalLabel')}
                  labelFor="proposal"
                >
                  {(field) => (
                    <Textarea
                      {...field}
                      id="proposal"
                      placeholder={m('proposalPlaceholder')}
                      className="min-h-30 resize-y"
                    />
                  )}
                </Form.Control>
                <button
                  type="submit"
                  className="mt-3 rounded-full border-[2.5px] border-ink bg-red px-5 py-2 font-body font-extrabold text-surface"
                >
                  {m('proposalSubmit')}
                </button>
              </Form>
            )}
            <div className="mt-4">
              <FahsNote>{m('settlementsReward', { currency: g('currency') })}</FahsNote>
            </div>
          </FahsSection>
          {proposals.map((proposal, index) => (
            <FahsSection key={`${proposal}-${index}`} title={m('proposalSubmit')}>
              <p className="font-body text-[15px]/[1.9]">{proposal}</p>
              <p className="mt-2 font-body text-sm font-bold text-red">{m('pendingParties')}</p>
            </FahsSection>
          ))}
          {item.id === 'workshop' && (
            <>
              <FahsSection title={m('proposalTwo')}>
                <p className="font-body text-[15px]/[1.9]">
                  {m('proposalTwoText', { currency: g('currency') })}
                </p>
                <p className="mt-2 font-body text-sm font-bold text-red">{m('pendingParties')}</p>
              </FahsSection>
              <FahsSection title={m('proposalOne')}>
                <p className="font-body text-[15px]/[1.9]">{m('proposalOneText')}</p>
                <p className="mt-2 font-body text-sm font-bold text-red">{m('rejected')}</p>
              </FahsSection>
            </>
          )}
        </>
      )}
      {tab === 'discussion' && (
        <FahsSection title={m('discussionTitle')} icon={MessageIcon}>
          <p className="mb-4 font-body text-[15px]/[1.9]">{m('discussionIntro')}</p>
          {workshop &&
            discussionMessages.map(([speaker, message]) => (
              <div
                key={speaker}
                className="mb-3 rounded-card border-2 border-ink bg-paper p-3 font-body"
              >
                <b className="block text-sm">{speaker}</b>
                <p className="mt-1 text-[15px]/[1.8]">{message}</p>
              </div>
            ))}
          {messages.map((message, index) => (
            <div
              key={index}
              className="mb-3 rounded-card border-2 border-ink bg-paper p-3 font-body"
            >
              {message}
            </div>
          ))}
          <label htmlFor="mediation-message" className="font-body text-sm font-bold">
            {m('discussionLabel')}
          </label>
          <Textarea
            id="mediation-message"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={m('discussionPlaceholder')}
            className="mt-2 min-h-28"
          />
          <button
            type="button"
            disabled={!draft.trim()}
            onClick={async () => {
              await submitMock(draft)
              setMessages((current) => [...current, draft.trim()])
              setDraft('')
            }}
            className="mt-3 rounded-full border-[2.5px] border-ink bg-gold px-5 py-2 font-body font-extrabold disabled:opacity-50"
          >
            {m('send')}
          </button>
        </FahsSection>
      )}
      {tab === 'file' && (
        <FahsSection title={m('fileTitle')} icon={GateIcon}>
          <p className="font-body text-[15px]/[1.9]">{m('fileText')}</p>
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={file}
                className="flex items-center gap-3 rounded-card border-2 border-ink bg-paper px-4 py-3"
              >
                <Image src={index % 2 ? WaveIcon : LanternIcon} alt="" className="size-7" />
                <b className="flex-1 font-body text-sm">{withCurrency(file, g('currency'))}</b>
                <Image src={KeyIcon} alt="" className="size-5" />
              </div>
            ))}
          </div>
        </FahsSection>
      )}
      {tab === 'report' && (
        <FahsSection title={m('reportTitle')} icon={LanternIcon}>
          {!closed ? (
            <FahsNote>{m('reportLocked')}</FahsNote>
          ) : reportSent ? (
            <FahsNote>{m('reportSent')}</FahsNote>
          ) : (
            <>
              <p className="mb-4 font-body text-[15px]/[1.9]">{m('reportWarning')}</p>
              <Form
                resolver={zodResolver(reportSchema)}
                defaultValues={{ where: '', partial: '' }}
                onSubmit={async (values) => {
                  await submitMock(values)
                  setReportSent(true)
                  setNotice(m('reportSent'))
                }}
              >
                <Form.Control<z.infer<typeof reportSchema>>
                  name="where"
                  label={m('reportWhere')}
                  labelFor="report-where"
                >
                  {(field) => <Textarea {...field} id="report-where" className="min-h-28" />}
                </Form.Control>
                <Form.Control<z.infer<typeof reportSchema>>
                  name="partial"
                  label={m('reportPartial')}
                  labelFor="report-partial"
                >
                  {(field) => <Textarea {...field} id="report-partial" className="min-h-24" />}
                </Form.Control>
                <button
                  type="submit"
                  className="mt-3 rounded-full border-[2.5px] border-ink bg-red px-5 py-2 font-body font-extrabold text-surface"
                >
                  {m('reportSubmit')}
                </button>
              </Form>
            </>
          )}
        </FahsSection>
      )}
      {notice && (
        <p
          role="status"
          className="mb-5 rounded-card border-2 border-ink bg-gold px-4 py-3 font-body font-bold"
        >
          {notice}
        </p>
      )}
    </div>
  )
}
