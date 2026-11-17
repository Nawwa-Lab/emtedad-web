'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Link, useRouter } from '@/i18n/navigation'
import DnaIcon from '@/icons/dna.svg'
import Star2Icon from '@/icons/star-2.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { ChevronLeft } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { use, useState } from 'react'
import { agreement } from './data'
import { DiffBox } from './diff-box'

const editFieldClass = 'py-3 px-4 text-[15.5px] font-medium'
const primaryButtonClass =
  'h-auto px-[26px] py-[11px] text-[16px] max-[520px]:px-5 max-[520px]:py-2.5 max-[520px]:text-[15px]'
const ghostButtonClass = 'h-auto px-[22px] py-2.5 text-[15px]'

const dialogFields = [
  { key: 'deliverables', multiline: true },
  { key: 'quantity', multiline: false },
  { key: 'duration', multiline: false },
  { key: 'milestones', multiline: false },
  { key: 'value', multiline: false },
  { key: 'specialTerms', multiline: true },
] as const

export default function AgreementPage({ params }: PageProps<'/[lang]/maktab/agreements/[id]'>) {
  const { id } = use(params)
  const t = useTranslations('agreements')
  const tm = useTranslations('messages')
  const tg = useTranslations('global')
  const locale = useLocale()
  const router = useRouter()
  const [editing, setEditing] = useState(false)

  const org = (key: string) => tg(`organizations.${key}`)
  const conversationHref = `/maktab/messages/${agreement.conversationId}`

  return (
    <div>
      <Link
        href={conversationHref}
        className="mb-4 inline-flex items-center gap-2.5 text-[15.5px] font-bold text-ink no-underline hover:text-red"
      >
        <span className="grid size-9.5 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-surface p-2.25 text-ink shadow-[3px_3px_0]">
          <ChevronLeft className="h-full w-full rtl:rotate-180" strokeWidth={3.2} />
        </span>
        {t('backToConversation')}
      </Link>

      <Card className="mb-5 p-6 px-6.5 shadow-[6px_6px_0]">
        <div className="flex flex-wrap items-center gap-3.5">
          <h1 className="min-w-62.5 flex-1 font-display text-[clamp(28px,3.6vw,38px)] leading-tight">
            {t('title')}
          </h1>
          <Badge color="gold" effect="flat" className="shrink-0 font-extrabold">
            {t('tags.current')}
          </Badge>
          <Badge color="red" effect="flat" className="shrink-0 font-extrabold">
            {t('tags.proposed')}
          </Badge>
        </div>
        <p className="mt-2 text-[15.5px]/[1.8] font-semibold text-soft">
          {t('rel.prefix')}{' '}
          <Link
            href={conversationHref}
            className="border-b-[2.5px] border-blue font-bold text-blue no-underline"
          >
            {tm('conversationTitle')}
          </Link>
          {' · '}
          {org('halaqa')} {t('rel.arrow')} {org('mishkaa')} {' · '}
          {formatNumber(agreement.value, { locale })} {tg('currency')}
        </p>
        <div className="mt-4.5 flex flex-wrap gap-3 border-t-[2.5px] border-dashed border-ink/26 pt-4.5">
          {agreement.parties.map((party) => (
            <span
              key={party.org}
              className="flex items-center gap-2.75 rounded-full border-[2.5px] border-ink bg-gold py-1.75 pe-1.75 ps-4.5 text-[15px] font-bold"
            >
              <span
                className={cn(
                  'grid size-9 shrink-0 place-items-center rounded-full border-[2.5px] border-ink font-display text-[16px]',
                  party.tone === 'red' ? 'bg-red text-surface' : 'bg-gold text-ink',
                )}
              >
                {org(party.org).charAt(0)}
              </span>
              {org(party.org)}
              <span className="text-[13px] font-semibold text-soft">
                {t(`confirm.${party.status}`)}
              </span>
            </span>
          ))}
        </div>
      </Card>

      <Card className="mb-5 flex flex-wrap items-center gap-4 bg-gold px-[22px] py-[18px] shadow-[6px_6px_0]">
        <span className="min-w-[210px] flex-1">
          <b className="block font-display text-[22px]/[1.3]">{t('editbar.title')}</b>
          <span className="mt-[3px] block text-[14.5px] font-semibold text-soft">
            {t('editbar.subtitle')}
          </span>
        </span>
        <Button
          variant="primary"
          shape="round"
          effect="3d"
          className={primaryButtonClass}
          onClick={() => setEditing(true)}
        >
          {tm('agreement.lockNotice.editButton')}
        </Button>
      </Card>

      <Card className="px-7 py-[26px] shadow-[6px_6px_0]">
        {agreement.rows.map(([rowKey, valueKey]) => (
          <div
            key={rowKey}
            className="grid grid-cols-[172px_1fr_auto] items-start gap-4 border-b-[2.5px] border-dashed border-ink/26 py-[18px] max-[760px]:grid-cols-1 max-[760px]:gap-2"
          >
            <span className="font-display text-[19px]/[1.35]">
              {tm(`agreement.rows.${rowKey}`)}
            </span>
            <span
              className={cn(
                'text-[16.5px]/[1.9] font-medium text-soft',
                valueKey.endsWith('None') && 'opacity-[0.72]',
              )}
            >
              {tm(`agreement.values.${valueKey}`)}
            </span>
            {rowKey === agreement.pending.row && (
              <div className="col-span-full mt-3 rounded-card border-3 border-ink bg-gold p-4 px-[18px]">
                <div className="mb-3 flex items-center gap-[11px] font-display text-[19px]">
                  <span className="size-7 shrink-0">
                    <Image src={Star2Icon} alt="" className="h-full w-full" />
                  </span>
                  {t('pending.title', { org: org(agreement.pending.by) })}
                </div>
                <div className="grid grid-cols-2 gap-3 max-[620px]:grid-cols-1">
                  <DiffBox
                    label={t('diff.current')}
                    text={tm(`agreement.values.${agreement.pending.oldValue}`)}
                  />
                  <DiffBox
                    label={t('diff.proposedBy', { org: org(agreement.pending.by) })}
                    text={t(`diff.${agreement.pending.newValue}`)}
                    state="new"
                  />
                </div>
                <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
                  <span className="min-w-[180px] flex-1 text-[14.5px] font-bold">
                    {t('pending.note')}
                  </span>
                  <Button
                    variant="outline"
                    effect="flat"
                    className="h-auto px-[18px] py-[9px] text-[14.5px] bg-surface"
                  >
                    {t('pending.editAction')}
                  </Button>
                  <Button
                    variant="outline"
                    effect="flat"
                    className="h-auto px-[18px] py-[9px] text-[14.5px] bg-surface"
                  >
                    {t('pending.withdrawAction')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}

        <Card
          effect="flat"
          className="mt-5 flex flex-wrap items-center gap-4 rounded-card! bg-blue px-[22px] py-[18px] text-surface"
        >
          <span className="flex h-12 w-11 shrink-0 items-center justify-center rounded-field border-[2.5px] border-ink bg-surface p-[7px]">
            <Image src={DnaIcon} alt="" className="h-auto max-h-full w-full max-w-full" />
          </span>
          <p className="min-w-[230px] flex-1 text-[16px]/[1.9] font-semibold">
            <b className="block font-display text-[18px]">{t('openbar.title')}</b>
            {t('openbar.body')}
          </p>
        </Card>
      </Card>

      <details className="mt-[26px]">
        <summary className="flex cursor-pointer list-none items-center gap-3 rounded-card border-[2.5px] border-dashed border-ink bg-surface px-5 py-[15px] font-display text-[20px] hover:bg-gold open:mb-4 [&::-webkit-details-marker]:hidden">
          {t('history.summary')}
          <span className="ms-auto rounded-full bg-ink px-[11px] py-[3px] font-body text-[13px] font-extrabold text-surface">
            {formatNumber(agreement.versions.length, { locale })}
          </span>
        </summary>
        {agreement.versions.map((version) => (
          <Card key={version.n} className="mb-4 px-[26px] py-[24px] shadow-[5px_5px_0]">
            <div className="mb-1.5 flex flex-wrap items-center gap-[13px]">
              <b className="font-display text-[25px]/[1.2]">
                {t('history.versionTitle', { n: formatNumber(version.n, { locale }) })}
              </b>
              <Badge
                color={version.tag === 'active' ? 'gold' : 'surface'}
                effect="flat"
                className={cn(
                  'font-extrabold',
                  version.tag === 'superseded' && 'border-dashed text-soft',
                )}
              >
                {t(`history.tags.${version.tag}`)}
              </Badge>
            </div>
            <p className="mb-4 border-b-[2.5px] border-dashed border-ink/26 pb-4 text-[14.5px]/[1.85] font-semibold text-soft">
              {t(`history.v${version.n}.meta`, {
                a: org('mishkaa'),
                b: org('halaqa'),
              })}
            </p>
            {version.changes.map((field) => (
              <div key={field} className="mb-3.5 last:mb-0">
                <div className="mb-2 font-display text-[17px]">{tm(`agreement.rows.${field}`)}</div>
                <div className="grid grid-cols-2 gap-3 max-[620px]:grid-cols-1">
                  <DiffBox
                    label={t('diff.before')}
                    text={t(`history.v${version.n}.changes.${field}`)}
                    state="old"
                  />
                  <DiffBox
                    label={t('diff.after')}
                    text={tm(`agreement.values.${field}`)}
                    state="new"
                  />
                </div>
              </div>
            ))}
            <div className="relative mt-3.5 ps-6.5 [&::before]:absolute [&::before]:inset-y-1.5 [&::before]:inset-s-1.75 [&::before]:w-0.75 [&::before]:rounded-xs [&::before]:bg-ink/22 [&::before]:content-['']">
              {version.events.map((event, index) => (
                <div
                  key={`${event.key}-${index}`}
                  className="relative mb-2.25 text-[14.5px]/[1.8] font-semibold text-soft [&::before]:absolute [&::before]:-inset-s-6 [&::before]:top-2 [&::before]:size-3.25 [&::before]:rounded-full [&::before]:border-[2.5px] [&::before]:border-ink [&::before]:bg-gold [&::before]:content-['']"
                >
                  {event.who && <b className="text-ink font-body">{org(event.who)}</b>}
                  {event.who && ' '}
                  {t(`history.v${version.n}.events.${event.key}`)}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </details>

      <Dialog open={editing} onOpenChange={setEditing}>
        <DialogContent
          className="px-7.5 pb-7 pt-8 sm:w-[min(760px,94vw)]"
          overlayClassName="bg-[rgba(26,23,20,0.55)]"
          closeLabel={t('dialog.close')}
        >
          <DialogTitle className="pe-14 text-3xl/tight">
            {tm('agreement.lockNotice.editButton')}
          </DialogTitle>
          <DialogDescription className="mb-5 mt-2 text-[16px]">
            {t('dialog.description')}
          </DialogDescription>

          {dialogFields.map((field) => (
            <div key={field.key} className="mb-4">
              <label htmlFor={`ef-${field.key}`} className="mb-1.75 block font-display text-[18px]">
                {tm(`agreement.rows.${field.key}`)}
              </label>
              {field.multiline ? (
                <Textarea
                  id={`ef-${field.key}`}
                  rows={3}
                  defaultValue={tm(`agreement.values.${field.key}`)}
                  className={`min-h-0 ${editFieldClass}`}
                />
              ) : (
                <Input
                  id={`ef-${field.key}`}
                  type="text"
                  defaultValue={tm(`agreement.values.${field.key}`)}
                  className={editFieldClass}
                />
              )}
            </div>
          ))}

          <div className="mb-4">
            <label htmlFor="ef-reason" className="mb-1.75 block font-display text-[18px]">
              {t('dialog.reason')}{' '}
              <span className="font-body text-[14px] font-medium text-soft">
                {t('dialog.optional')}
              </span>
            </label>
            <Input
              id="ef-reason"
              type="text"
              placeholder={t('dialog.reasonPlaceholder')}
              className={editFieldClass}
            />
          </div>

          <div className="mt-5.5 flex flex-wrap gap-3 border-t-[3px] border-dashed border-ink pt-4.5">
            <Button
              variant="primary"
              shape="round"
              effect="3d"
              className={primaryButtonClass}
              onClick={() => router.push(`/maktab/agreements/${id}/amendments`)}
            >
              {t('dialog.send')}
            </Button>
            <Button
              variant="outline"
              effect="flat"
              className={ghostButtonClass}
              onClick={() => setEditing(false)}
            >
              {t('dialog.cancel')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
