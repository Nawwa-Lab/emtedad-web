'use client'

import { Form } from '@/components/Form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import BalanceIcon from '@/icons/balance.svg'
import GateIcon from '@/icons/gate.svg'
import HandIcon from '@/icons/hand.svg'
import KeyIcon from '@/icons/key.svg'
import LanternIcon from '@/icons/lantern.svg'
import MessageIcon from '@/icons/message.svg'
import TargetIcon from '@/icons/target.svg'
import { formatNumber } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import type { z } from 'zod'
import { useFormContext } from 'react-hook-form'
import { FahsNote, FahsSection, WorkspaceBack } from '../../components'
import { submitMock, withCurrency, type Assignment } from '../../data'
import { arbitrationDecisionSchema } from '../../schemas'

function SaveDecisionDraft({ onSaved, label }: { onSaved: () => void; label: string }) {
  const { getValues } = useFormContext<z.infer<ReturnType<typeof arbitrationDecisionSchema>>>()
  return (
    <button
      type="button"
      onClick={async () => {
        await submitMock(getValues())
        onSaved()
      }}
      className="rounded-full border-[2.5px] border-ink bg-surface px-5 py-2.5 font-body font-extrabold"
    >
      {label}
    </button>
  )
}

export default function ArbitrationWorkspace({ item }: { item: Assignment }) {
  const t = useTranslations('fahsMahs')
  const a = useTranslations('fahsMahs.arbitration')
  const g = useTranslations('global')
  const locale = useLocale()
  const titles = t.raw('cases') as Record<string, string>
  const notes = t.raw('notes') as Record<string, string>
  const penalties = a.raw('penalties') as string[]
  const files = a.raw('files') as string[]
  const penaltyDescriptions = a.raw('penaltyDescriptions') as string[]
  const discussionMessages = a.raw('discussionMessages') as [string, string][]
  const [phase, setPhase] = useState<'decision' | 'review'>(
    item.status === 'review' ? 'review' : 'decision',
  )
  const [submitted, setSubmitted] = useState(
    item.status === 'review' ||
      item.status === 'issued' ||
      item.status === 'archived' ||
      item.status === 'reversed',
  )
  const [penalty, setPenalty] = useState('2')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [notice, setNotice] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const schema = useMemo(() => arbitrationDecisionSchema(a('required')), [a])
  const historical =
    item.status === 'issued' || item.status === 'archived' || item.status === 'reversed'
  const panelSize =
    item.panelSize ??
    (item.kind === 'appeal'
      ? item.role === 'appealNineteen'
        ? 23
        : 11
      : item.role === 'arbitratorSix'
        ? 7
        : 5)
  return (
    <div className="mx-auto max-w-245">
      <WorkspaceBack
        href={item.kind === 'appeal' ? '/fahs-mahs/appeals' : '/fahs-mahs/my-arbitrations'}
        label={item.kind === 'appeal' ? a('backAppeals') : a('back')}
      />
      <div className="mb-5 flex items-start gap-3 rounded-panel border-[3px] border-ink bg-tint px-5 py-4 shadow-[5px_5px_0] shadow-ink">
        <Image src={HandIcon} alt="" className="size-10 shrink-0" />
        <div>
          <b className="font-display text-[23px]">{a('privacyTitle')}</b>
          <p className="font-body text-sm font-semibold">{a('privacy')}</p>
        </div>
      </div>
      <div className="mb-5 rounded-panel border-[3px] border-ink bg-surface px-6 py-6 shadow-[6px_6px_0] shadow-ink">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-[clamp(30px,4vw,44px)]/[1.2]">{titles[item.caseKey]}</h1>
          <span className="rounded-full border-2 border-ink bg-gold px-3 py-1 font-body text-sm font-bold">
            {item.kind === 'appeal'
              ? t('meta.appealRound')
              : historical
                ? t(`status.${item.status}`)
                : a('status')}
          </span>
          {item.id === 'delivery' && (
            <span className="font-body text-sm font-bold text-soft">{a('caseNumber')}</span>
          )}
        </div>
        <p className="mt-3 font-body text-sm font-semibold text-soft">
          {withCurrency(notes[item.note], g('currency'))}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-card border-2 border-ink bg-paper p-3">
            <b className="font-display text-[24px]">{a('partyA')}</b>
            <p className="font-body text-sm">
              {item.id === 'delivery' ? a('claimant') : t('invitations.claimant')}
            </p>
          </div>
          <div className="rounded-card border-2 border-ink bg-paper p-3">
            <b className="font-display text-[24px]">{a('partyB')}</b>
            <p className="font-body text-sm">
              {item.id === 'delivery' ? a('respondent') : t('invitations.respondent')}
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(a.raw('facts') as string[]).map((label, index) => (
            <div key={label} className="rounded-card border-2 border-ink bg-paper p-3">
              <span className="block font-body text-xs font-bold text-soft">{label}</span>
              <b className="font-display text-[25px]">
                {index === 0
                  ? item.disputeValue !== undefined
                    ? formatNumber(item.disputeValue, { locale })
                    : '—'
                  : index === 1
                    ? formatNumber(panelSize, { locale })
                    : index === 2
                      ? formatNumber(10, { locale })
                      : historical || item.remainingDays === undefined
                        ? '—'
                        : `${formatNumber(item.remainingDays, { locale })} ${a('dayUnit')}`}{' '}
                {(index === 0 && item.disputeValue !== undefined) || index === 2 ? (
                  <small className="text-sm text-red">{g('currency')}</small>
                ) : null}
              </b>
            </div>
          ))}
        </div>
      </div>
      {!historical && (
        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setPhase('decision')}
            aria-pressed={phase === 'decision'}
            className={`rounded-panel border-[3px] border-ink px-5 py-4 text-start font-display text-[22px] shadow-[4px_4px_0] shadow-ink ${phase === 'decision' ? 'bg-gold' : 'bg-surface'}`}
          >
            {a('phaseOne')}
          </button>
          <button
            type="button"
            disabled={!submitted}
            onClick={() => setPhase('review')}
            aria-pressed={phase === 'review'}
            className={`rounded-panel border-[3px] border-ink px-5 py-4 text-start font-display text-[22px] shadow-[4px_4px_0] shadow-ink disabled:cursor-not-allowed disabled:opacity-50 ${phase === 'review' ? 'bg-gold' : 'bg-surface'}`}
          >
            {a('phaseTwo')}
          </button>
        </div>
      )}
      {(historical || phase === 'decision') && (
        <>
          {!submitted && (
            <Form<z.infer<typeof schema>>
              resolver={zodResolver(schema)}
              defaultValues={{ party: 'b', reason: '', penalty: '2' }}
              onSubmit={async (values) => {
                await submitMock(values)
                setSubmitted(true)
                setPenalty(values.penalty)
                setPhase('review')
                setNotice('')
              }}
            >
              <FahsSection title={a('decisionTitle')} icon={BalanceIcon}>
                <p className="mb-4 font-body text-[15px]/[1.85]">{a('decisionText')}</p>
                <Form.Control<z.infer<typeof schema>>
                  name="party"
                  label={a('decisionTitle')}
                  labelFor="side-a"
                >
                  {(field) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid-cols-1 sm:grid-cols-2"
                    >
                      <RadioGroupItem id="side-a" value="a" className="min-h-24 text-start">
                        <b className="font-display text-[23px]">{a('favorA')}</b>
                        <span className="font-body text-sm">{t('invitations.claimant')}</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="b" className="min-h-24 text-start">
                        <b className="font-display text-[23px]">{a('favorB')}</b>
                        <span className="font-body text-sm">{t('invitations.respondent')}</span>
                      </RadioGroupItem>
                    </RadioGroup>
                  )}
                </Form.Control>
              </FahsSection>
              <FahsSection title={a('reasonTitle')} icon={MessageIcon}>
                <p className="mb-4 font-body text-[15px]/[1.85]">{a('reasonText')}</p>
                <Form.Control<z.infer<typeof schema>>
                  name="reason"
                  label={a('reasonLabel')}
                  labelFor="reason"
                >
                  {(field) => (
                    <Textarea
                      {...field}
                      id="reason"
                      placeholder={a('reasonPlaceholder')}
                      className="min-h-40"
                    />
                  )}
                </Form.Control>
              </FahsSection>
              <FahsSection title={a('penaltyTitle')} icon={TargetIcon}>
                <p className="mb-4 font-body text-[15px]/[1.85]">{a('penaltyText')}</p>
                <Form.Control<z.infer<typeof schema>>
                  name="penalty"
                  label={a('penaltyTitle')}
                  labelFor="penalty-0"
                >
                  {(field) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid-cols-1"
                    >
                      {penalties.map((label, index) => (
                        <RadioGroupItem
                          key={label}
                          id={`penalty-${index}`}
                          value={String(index)}
                          className="min-h-18 items-start text-start shadow-[3px_3px_0]"
                        >
                          <b className="font-display text-[22px]">{label}</b>
                          <span className="mt-1 font-body text-sm text-soft">
                            {penaltyDescriptions[index]}
                          </span>
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  )}
                </Form.Control>
              </FahsSection>
              <FahsSection title={a('fileTitle')} icon={GateIcon}>
                <p className="mb-4 font-body text-[15px]/[1.85]">{a('fileText')}</p>
                <div className="space-y-2">
                  {files.map((file) => (
                    <div
                      key={file}
                      className="flex items-center gap-3 rounded-card border-2 border-ink bg-paper p-3"
                    >
                      <Image src={LanternIcon} alt="" className="size-7" />
                      <b className="flex-1 font-body text-sm">{file}</b>
                      <Image src={KeyIcon} alt="" className="size-5" />
                    </div>
                  ))}
                </div>
              </FahsSection>
              <FahsNote warning>{a('deadline', { currency: g('currency') })}</FahsNote>
              <div className="mb-6 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-full border-[2.5px] border-ink bg-red px-5 py-2.5 font-body font-extrabold text-surface"
                >
                  {a('submit')}
                </button>
                <SaveDecisionDraft label={a('save')} onSaved={() => setNotice(a('saved'))} />
              </div>
            </Form>
          )}
          {historical && <FahsNote>{withCurrency(notes[item.note], g('currency'))}</FahsNote>}
        </>
      )}
      {!historical && phase === 'review' && submitted && (
        <>
          <FahsSection title={a('reviewTitle')} icon={BalanceIcon}>
            <p className="font-body text-[15px]/[1.9]">
              {item.id === 'delivery' ? a('reviewText') : a('reviewTextOther')}
            </p>
          </FahsSection>
          {item.id === 'delivery' && (
            <FahsSection title={a('votes')} icon={TargetIcon}>
              <p className="mb-4 font-body text-sm text-soft">{a('anonymous')}</p>
              {[4, 1].map((count, index) => (
                <div key={count} className="mb-3 flex items-center gap-3">
                  <span className="w-35 font-body text-sm font-bold">
                    {index === 0 ? a('favorB') : a('favorA')}
                  </span>
                  <div className="h-5 flex-1 rounded-full border-2 border-ink bg-paper">
                    <span
                      className={`block h-full rounded-full bg-gold ${index === 0 ? 'w-4/5' : 'w-1/5'}`}
                    />
                  </div>
                  <b>{count}</b>
                </div>
              ))}
              <h3 className="mt-6 font-display text-[23px]">{a('penaltyVotes')}</h3>
              {[1, 2, 2, 0].map((count, index) => (
                <div key={index} className="mt-2 flex items-center gap-3">
                  <span className="w-35 font-body text-sm font-bold">{penalties[index]}</span>
                  <div className="h-4 flex-1 rounded-full border-2 border-ink bg-paper">
                    <span
                      className={`block h-full bg-blue ${count === 0 ? 'w-0' : count === 1 ? 'w-1/5' : 'w-2/5'}`}
                    />
                  </div>
                  <b>{count}</b>
                </div>
              ))}
            </FahsSection>
          )}
          <FahsSection title={a('discussion')} icon={MessageIcon}>
            <p className="mb-4 font-body text-sm">{a('anonymous')}</p>
            {item.id === 'delivery' &&
              discussionMessages.map(([speaker, body]) => (
                <div
                  key={speaker}
                  className="mb-2 rounded-card border-2 border-ink bg-paper p-3 font-body"
                >
                  <b className="block text-sm">{speaker}</b>
                  <p className="mt-1 text-[15px]/[1.8]">{body}</p>
                </div>
              ))}
            {messages.map((entry, index) => (
              <p
                key={index}
                className="mb-2 rounded-card border-2 border-ink bg-paper p-3 font-body"
              >
                {entry}
              </p>
            ))}
            <label htmlFor="panel-message" className="font-body text-sm font-bold">
              {a('messageLabel')}
            </label>
            <Textarea
              id="panel-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={a('messagePlaceholder')}
              className="mt-2 min-h-28"
            />
            <button
              type="button"
              disabled={!message.trim()}
              onClick={async () => {
                await submitMock(message)
                setMessages((current) => [...current, message.trim()])
                setMessage('')
              }}
              className="mt-3 rounded-full border-[2.5px] border-ink bg-gold px-5 py-2 font-body font-extrabold disabled:opacity-50"
            >
              {a('send')}
            </button>
          </FahsSection>
          <FahsSection title={a('penaltyTitle')} icon={TargetIcon}>
            <RadioGroup
              value={penalty}
              onValueChange={(value) => setPenalty(String(value))}
              disabled={confirmed}
              className="grid-cols-1"
            >
              {penalties.map((label, index) => (
                <RadioGroupItem
                  key={label}
                  value={String(index)}
                  className="min-h-18 items-start text-start"
                >
                  <b className="font-display text-[22px]">{label}</b>
                  <span className="mt-1 font-body text-sm text-soft">
                    {penaltyDescriptions[index]}
                  </span>
                </RadioGroupItem>
              ))}
            </RadioGroup>
            <button
              type="button"
              disabled={confirmed}
              onClick={async () => {
                await submitMock(penalty)
                setConfirmed(true)
                setNotice(a('confirmed'))
              }}
              className="mt-5 rounded-full border-[2.5px] border-ink bg-red px-5 py-2.5 font-body font-extrabold text-surface disabled:opacity-50"
            >
              {a('confirmPenalty')}
            </button>
          </FahsSection>
        </>
      )}
      {notice && (
        <p
          role="status"
          className="mb-5 rounded-card border-2 border-ink bg-gold p-3 font-body font-bold"
        >
          {notice}
        </p>
      )}
    </div>
  )
}
