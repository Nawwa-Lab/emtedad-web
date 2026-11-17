'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import Star2Icon from '@/icons/star-2.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { ChevronLeft } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { TagBadge } from '../tag-badge'
import { files, type Thread } from './data'

const agreementRows = [
  ['deliverables', 'deliverables'],
  ['quantity', 'quantity'],
  ['duration', 'duration'],
  ['milestones', 'milestones'],
  ['value', 'value'],
  ['specialTerms', 'specialTerms'],
  ['supplierTerms', 'supplierTermsNone'],
  ['cashDeposit', 'cashDepositNone'],
  ['supervision', 'supervisionNone'],
] as const

const threadClass = 'rounded-panel border-3 border-ink bg-surface px-6 py-[26px] shadow-[6px_6px_0]'

const ctabClass =
  'relative inline-flex rounded-full border-[2.5px] border-ink bg-surface px-6 py-[11px] font-display text-[20px]/[1] text-ink shadow-[4px_4px_0] shadow-ink transition hover:translate-x-px hover:translate-y-px hover:bg-gold hover:shadow-[2px_2px_0]'

function AttachLink({ type, name, size }: { type: string; name: string; size: string }) {
  const t = useTranslations('messages')

  return (
    <a
      href="#"
      className="mt-2.5 flex items-center gap-3 rounded-card border-[2.5px] border-ink bg-surface px-[15px] py-[11px] transition-colors hover:bg-gold"
    >
      <span className="grid size-[42px] shrink-0 place-items-center rounded-[10px] border-[2.5px] border-ink bg-red font-body text-[12px] font-extrabold text-surface">
        {type}
      </span>
      <span className="min-w-0">
        <b className="block font-body text-[15px] font-extrabold">{t(`files.items.${name}`)}</b>
        <span className="block font-body text-[13px] font-semibold text-soft">{size}</span>
      </span>
    </a>
  )
}

export function Conversation({ id, thread }: { id: string; thread: Thread }) {
  const t = useTranslations('messages')
  const tg = useTranslations('global')
  const locale = useLocale()
  const [activeTab, setActiveTab] = useState('conversation')
  const [message, setMessage] = useState('')

  const tabs = [
    { key: 'conversation', count: 3 },
    { key: 'agreement', count: undefined },
    ...(thread.hasAgreement ? [{ key: 'amendments', count: 2 }] : []),
    { key: 'files', count: 4 },
  ]

  return (
    <div>
      <Link
        href="/maktab/messages"
        className="mb-4 inline-flex items-center gap-2.5 font-body text-[15.5px] font-bold text-ink transition-colors hover:text-red"
      >
        <span className="grid size-[38px] shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-surface p-[9px] shadow-[3px_3px_0] shadow-ink">
          <ChevronLeft className="size-full rtl:rotate-180" strokeWidth={3.2} />
        </span>
        {t('backToMessages')}
      </Link>

      <Card className="mb-5 px-[26px] py-6 shadow-[6px_6px_0]">
        <CardContent>
          <div className="flex flex-wrap items-center gap-3.5">
            <h1 className="min-w-[250px] flex-1 font-display text-[clamp(28px,3.6vw,38px)]/[1.25]">
              {t('conversationTitle')}
            </h1>
            {thread.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          <div className="mt-[18px] flex flex-wrap items-center gap-3 border-t-[2.5px] border-dashed border-ink/25 pt-[18px]">
            <span className="flex items-center gap-[11px] rounded-full border-[2.5px] border-ink bg-paper py-[7px] pe-[7px] ps-4 font-body text-[15px] font-bold">
              <Avatar color="gold" effect="flat" className="size-[38px]">
                <AvatarFallback className="text-[17px]">ح</AvatarFallback>
              </Avatar>
              {tg('organizations.halaqa')}
              <span className="font-body text-[13px] font-semibold text-soft">
                · {t('parties.student')}
              </span>
            </span>
            <span className="font-display text-2xl text-red">{t('parties.arrow')}</span>
            <span className="flex items-center gap-[11px] rounded-full border-[2.5px] border-ink bg-paper py-[7px] pe-[7px] ps-4 font-body text-[15px] font-bold">
              <Avatar color="red" effect="flat" className="size-[38px]">
                <AvatarFallback className="text-[17px]">م</AvatarFallback>
              </Avatar>
              {tg('organizations.mishkaa')}
              <span className="font-body text-[13px] font-semibold text-soft">
                · {t('parties.provider')}
              </span>
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="min-w-[145px] flex-1 rounded-card border-[2.5px] border-ink bg-paper px-4 py-2.5">
              <span className="block font-body text-[12.5px] font-bold text-soft">
                {thread.hasAgreement ? t('facts.value') : t('facts.initialValue')}
              </span>
              <span className="mt-1 block font-display text-[20px]/[1.25]">
                {thread.facts.value}
              </span>
            </span>
            <span className="min-w-[145px] flex-1 rounded-card border-[2.5px] border-ink bg-paper px-4 py-2.5">
              <span className="block font-body text-[12.5px] font-bold text-soft">
                {t('facts.assignedMember')}
              </span>
              <span className="mt-1 block font-display text-[20px]/[1.25]">
                {thread.facts.assignedMember}
              </span>
            </span>
            <span className="min-w-[145px] flex-1 rounded-card border-[2.5px] border-ink bg-paper px-4 py-2.5">
              <span className="block font-body text-[12.5px] font-bold text-soft">
                {t('facts.agreement')}
              </span>
              <span className="mt-1 block font-display text-[20px]/[1.25]">
                {thread.hasAgreement && thread.facts.agreementHref ? (
                  <Link
                    href={thread.facts.agreementHref}
                    className="border-b-[2.5px] border-blue text-blue"
                  >
                    {t('facts.agreementVersion')}
                  </Link>
                ) : (
                  <span className="text-soft">{t('facts.agreementNotWritten')}</span>
                )}
              </span>
            </span>
            <span className="min-w-[145px] flex-1 rounded-card border-[2.5px] border-ink bg-paper px-4 py-2.5">
              <span className="block font-body text-[12.5px] font-bold text-soft">
                {t('facts.market')}
              </span>
              <span className="mt-1 block font-display text-[20px]/[1.25]">
                {t(`facts.${thread.facts.market}`)}
              </span>
            </span>
          </div>
        </CardContent>
      </Card>

      <div role="tablist" aria-label={t('tabs.label')} className="mb-5 flex flex-wrap gap-2.5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(ctabClass, activeTab === tab.key && 'bg-red text-surface')}
          >
            {t(`tabs.${tab.key}`)}
            {tab.count !== undefined && (
              <span className="absolute -top-[11px] -start-[11px] inline-flex h-6 min-w-6 items-center justify-center rounded-full border-[2.5px] border-ink bg-red px-1.5 text-[13px] font-extrabold leading-none text-surface">
                {formatNumber(tab.count, { locale })}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'conversation' && (
        <div className={threadClass}>
          {thread.messages.map((msg, i) => {
            if (msg.type === 'sys') {
              return (
                <div key={i} className="mb-4 text-center">
                  <span className="inline-block rounded-full border-[2.5px] border-ink bg-blue px-5 py-[9px] font-body text-[14.5px] font-bold text-surface">
                    {t(`thread.${msg.text}`)}
                  </span>
                </div>
              )
            }
            if (msg.type === 'daysep') {
              return (
                <div
                  key={i}
                  className="my-[18px] flex items-center gap-3.5 font-body text-[14px] font-bold text-soft"
                >
                  <span className="h-[2.5px] flex-1 rounded-[2px] bg-ink/20" />
                  {t(`thread.daySeparators.${msg.text}`)}
                  <span className="h-[2.5px] flex-1 rounded-[2px] bg-ink/20" />
                </div>
              )
            }
            const isUs = msg.type === 'us'
            return (
              <div key={i} className={cn('mb-4 max-w-[76%]', isUs ? 'ms-auto' : 'me-auto')}>
                <span className="mb-1 block font-display text-[16px]">
                  {t(`thread.senders.${msg.sender}`)}
                </span>
                <div
                  className={cn(
                    'rounded-[18px] border-[2.5px] border-ink px-[18px] py-3.5 font-body text-[16.5px]/[1.9] font-medium',
                    isUs ? 'rounded-ss-[6px] bg-gold' : 'rounded-se-[6px] bg-paper',
                  )}
                >
                  {t(`thread.messages.${msg.text}`)}
                </div>
                {msg.attachment && (
                  <AttachLink type="PDF" name="pdf1" size={t('thread.attachmentCaption')} />
                )}
                <span className="mt-[7px] block font-body text-[12.5px] font-semibold text-soft">
                  {t(`thread.times.${msg.time}`)}
                </span>
              </div>
            )
          })}

          <div className="mt-5 flex items-center gap-3 border-t-[3px] border-dashed border-ink/25 pt-5">
            <input
              type="text"
              placeholder={t('composer.placeholder')}
              aria-label={t('composer.placeholder')}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="min-w-0 flex-1 rounded-full border-[2.5px] border-ink bg-paper px-5 py-[13px] font-body text-[16px] font-semibold text-ink outline-none focus:outline-[3px] focus:outline-blue focus:outline-offset-2"
            />
            <button
              type="button"
              aria-label={t('composer.attach')}
              className="grid size-[50px] shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-surface font-display text-[22px] shadow-[3px_3px_0] shadow-ink transition-colors hover:bg-gold"
            >
              +
            </button>
            <Button variant="primary" shape="round" effect="3d" className="font-extrabold">
              {t('composer.send')}
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'agreement' && thread.hasAgreement && (
        <div className={threadClass}>
          {agreementRows.map(([rowKey, valueKey]) => (
            <div
              key={rowKey}
              className="grid grid-cols-[168px_1fr] gap-4 border-b-[2.5px] border-dashed border-ink/25 py-4 last:border-b-0 max-[620px]:grid-cols-1 max-[620px]:gap-1"
            >
              <span className="font-display text-[19px]/[1.35]">
                {t(`agreement.rows.${rowKey}`)}
              </span>
              <span
                className={cn(
                  'font-body text-[16.5px]/[1.9] font-medium text-soft',
                  valueKey.endsWith('None') && 'opacity-75',
                )}
              >
                {t(`agreement.values.${valueKey}`)}
              </span>
            </div>
          ))}

          <div className="mt-5 flex flex-wrap items-center gap-4 rounded-card border-[3px] border-ink bg-gold px-5 py-4">
            <span className="flex h-[42px] w-[38px] shrink-0 items-center justify-center">
              <Image src={Star2Icon} alt="" className="h-auto w-full max-h-full max-w-full" />
            </span>
            <p className="min-w-[200px] flex-1 font-body text-[15.5px]/[1.85] font-bold">
              {t('agreement.lockNotice.text')} <b>{t('agreement.lockNotice.bold')}</b>
            </p>
            <Link
              href="/maktab/agreements/1"
              className={buttonVariants({ variant: 'primary', shape: 'round', effect: '3d' })}
            >
              {t('agreement.lockNotice.editButton')}
            </Link>
          </div>
        </div>
      )}

      {activeTab === 'agreement' && !thread.hasAgreement && (
        <div className={threadClass}>
          <div className="px-2.5 py-[26px] text-center">
            <span className="mx-auto mb-4 block size-[76px]">
              <Image src={Star2Icon} alt="" className="size-full" />
            </span>
            <h3 className="font-display text-[29px]/[1.3]">{t('agreementEmpty.title')}</h3>
            <p className="mx-auto mb-[22px] mt-2.5 max-w-[560px] font-body text-[16.5px]/[1.95] font-medium text-soft">
              {t('agreementEmpty.description')}
            </p>
            <Link
              href={`/maktab/messages/${id}/contract/create`}
              className={buttonVariants({ variant: 'primary', shape: 'round', effect: '3d' })}
            >
              {t('agreementEmpty.button')}
            </Link>
            <p className="mx-auto mt-[18px] max-w-[520px] font-body text-[14.5px] font-semibold">
              {t('agreementEmpty.hint')}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'amendments' && (
        <div className={threadClass}>
          <div className="flex flex-wrap items-start gap-3.5 rounded-card border-[3px] border-ink bg-gold px-[22px] py-[18px]">
            <div className="min-w-[220px] flex-1">
              <b className="block font-display text-[22px]/[1.3]">{t('amendments.title')}</b>
              <span className="mt-[5px] block font-body text-[15px]/[1.8] font-semibold text-soft">
                {t('amendments.subtitle')}
              </span>
            </div>
            <Link
              href="/maktab/agreements/1/amendments"
              className={buttonVariants({ variant: 'primary', shape: 'round', effect: '3d' })}
            >
              {t('amendments.reviewButton')}
            </Link>
          </div>
        </div>
      )}

      {activeTab === 'files' && (
        <div className={threadClass}>
          <div className="grid grid-cols-2 gap-3.5 max-[820px]:grid-cols-1">
            {files.map((file) => (
              <AttachLink
                key={file.name}
                type={file.type}
                name={file.name}
                size={t(`files.items.${file.size}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
