'use client'

import { SubLinks } from '@/components/SubLinks'
import { useUser } from '@/contexts/UserContext'
import LanternIcon from '@/icons/lantern.svg'
import { Link } from '@/i18n/navigation'
import { cn } from 'cn'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image, { type StaticImageData } from 'next/image'
import { type ReactNode } from 'react'

/** Design `.back`: circle chevron + label, used by panels 37 and 39. */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mb-4 inline-flex items-center gap-2.5 font-body text-[15.5px] font-bold text-ink"
    >
      <span className="grid size-9.5 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-surface p-2.25 text-ink shadow-[3px_3px_0] shadow-ink">
        <ChevronLeft className="h-full w-full rtl:rotate-180" strokeWidth={3.2} />
      </span>
      <span className="hover:text-red">{label}</span>
    </Link>
  )
}

/**
 * Design `.pagehead`: display h1 + soft subtitle.
 * `spaced` is the design's "spacing overrides" block (mb 26px, h1 line-height 1.25)
 * applied by every panel except 39, which keeps the base (mb 8px, line-height 1).
 */
export function PageHead({
  title,
  subtitle,
  spaced = true,
}: {
  title: string
  subtitle?: string
  spaced?: boolean
}) {
  return (
    <div className={cn('flex flex-wrap items-end gap-5', spaced ? 'mb-6.5' : 'mb-2')}>
      <h1
        className={cn(
          'font-display text-[clamp(44px,5.4vw,70px)] font-normal',
          spaced ? 'leading-[1.25]' : 'leading-[1]',
        )}
      >
        {title}
      </h1>
      {subtitle && <p className="mb-2.5 font-body text-[17px] font-medium text-soft">{subtitle}</p>}
    </div>
  )
}

/** Design `.subtabs`: the khalli-khales pill bar (org: 3 tabs, community: 5 tabs). */
export function SubTabs({ links }: { links: { href: string; label: string }[] }) {
  return (
    <SubLinks
      links={links}
      separatorAfter={0}
      className="mt-0 mb-5.5 gap-2.5"
      linkClassName="relative py-3 px-6.5 text-[21px] h-12 font-display font-normal"
    />
  )
}

type NavLabels = {
  link1: string
  link2: string
  link3: string
  link4: string
  link5: string
}

/** Khalli-khales browse sub-navigation: community members get the two extra links. */
export function KhalliKhalesNav({ labels }: { labels: NavLabels }) {
  const { user } = useUser()
  const isCommunity = user?.role === 'community_member' || user?.activeContext === 'community'

  const links = [
    { href: '/khalli-khales/browse', label: labels.link1 },
    { href: '/khalli-khales/my-offers', label: labels.link2 },
    { href: '/khalli-khales/my-asks', label: labels.link3 },
    ...(isCommunity
      ? [
          { href: '/khalli-khales/my-registrations', label: labels.link4 },
          { href: '/khalli-khales/history', label: labels.link5 },
        ]
      : []),
  ]

  return (
    <SubLinks
      className="mt-0 mb-5.5 gap-2.5"
      linkClassName="relative py-3 px-6.5 text-[21px] h-12 font-display font-normal"
      separatorAfter={0}
      links={links}
    />
  )
}

export type FilterOption = { key: string; label: string }

/**
 * Keys of card action labels (design `.acts` buttons) across the khalli-khales
 * panels. Shared keys live in `khalliKhalesShared`; the rest are owned by the
 * single panel that uses them.
 */
export type CardActionKey =
  | 'edit'
  | 'unpublish'
  | 'delete'
  | 'accept'
  | 'reject'
  | 'conversation'
  | 'markDone'
  | 'reproach'
  | 'rate'
  | 'agreement'
  | 'seeRating'
  | 'closeRegistration'
  | 'participants'
  | 'attendance'
  | 'addSeats'
  | 'reopen'
  | 'seeRatings'
  | 'changeMember'
  | 'markDonePlain'
  | 'withdraw'
  | 'chooseProvider'
  | 'seeReplies'
  | 'changeWatcher'
  | 'markDoneGot'
  | 'markDoneDelivered'
  | 'cancelRequest'
  | 'markDoneReceived'
  | 'cancelRegistration'
  | 'leaveWaitlist'
  | 'viewActivity'

/** Resolves every `CardActionKey` to its localized label. */
export function useCardActionLabels(): Record<CardActionKey, string> {
  const shared = useTranslations('khalliKhalesShared')
  const org = useTranslations('khalliKhalesMyOffersOrg')
  const asksOrg = useTranslations('khalliKhalesMyAsksOrg')
  const offers = useTranslations('khalliKhalesMyOffers')
  const asks = useTranslations('khalliKhalesMyAsks')
  const regs = useTranslations('khalliKhalesMyRegistrations')

  return {
    edit: shared('actionEdit'),
    unpublish: shared('actionUnpublish'),
    delete: shared('actionDelete'),
    accept: shared('actionAccept'),
    reject: shared('actionReject'),
    conversation: shared('actionConversation'),
    markDone: shared('actionMarkDone'),
    reproach: shared('actionReproach'),
    rate: shared('actionRate'),
    agreement: shared('actionAgreement'),
    seeRating: shared('actionSeeRating'),
    closeRegistration: shared('actionCloseRegistration'),
    participants: org('actionParticipants'),
    attendance: org('actionAttendance'),
    addSeats: org('actionAddSeats'),
    reopen: org('actionReopen'),
    seeRatings: org('actionSeeRatings'),
    changeMember: org('actionChangeMember'),
    markDonePlain: org('actionMarkDonePlain'),
    withdraw: asksOrg('actionWithdraw'),
    chooseProvider: asksOrg('actionChooseProvider'),
    seeReplies: asksOrg('actionSeeReplies'),
    changeWatcher: asksOrg('actionChangeWatcher'),
    markDoneGot: asksOrg('actionMarkDoneGot'),
    markDoneDelivered: offers('actionMarkDoneDelivered'),
    cancelRequest: asks('actionCancelRequest'),
    markDoneReceived: asks('actionMarkDoneReceived'),
    cancelRegistration: regs('actionCancelRegistration'),
    leaveWaitlist: regs('actionLeaveWaitlist'),
    viewActivity: regs('actionViewActivity'),
  }
}

export type FilterRow = {
  label: string
  options: FilterOption[]
  value: string
  onChange: (key: string) => void
}

/** Design `.path`: bordered sheet of filter rows with pill options. */
export function FilterBar({ rows }: { rows: FilterRow[] }) {
  return (
    <section className="mb-5.5 rounded-panel border-3 border-ink bg-surface px-5.5 py-5 shadow-[6px_6px_0] shadow-ink">
      {rows.map((row, index) => (
        <div
          key={row.label}
          className={cn(
            'flex flex-wrap items-center gap-3',
            index > 0 &&
              'mt-3.5 border-t-[2.5px] border-dashed border-[rgba(26,23,20,0.26)] pt-3.5',
          )}
        >
          <span className="w-[86px] shrink-0 font-display text-[18px] text-soft">{row.label}</span>
          {row.options.map((option) => (
            <button
              key={option.key}
              type="button"
              aria-pressed={row.value === option.key}
              onClick={() => row.onChange(option.key)}
              className={cn(
                'cursor-pointer rounded-full border-[2.5px] border-ink px-5 py-2.25 font-body text-[15px] font-extrabold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue',
                row.value === option.key
                  ? 'bg-ink text-surface'
                  : 'bg-paper text-ink hover:bg-gold',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      ))}
    </section>
  )
}

/** Bold segment of a resline count — design `.resline b` (display, 22px, ink). */
export function reslineBold(chunks: ReactNode) {
  return <b className="font-display text-[22px] text-ink">{chunks}</b>
}

/** Design `.resline`: 30px icon + count sentence above the card grid. */
export function ResLine({ icon, children }: { icon: StaticImageData; children: ReactNode }) {
  return (
    <div className="mb-4.5 flex flex-wrap items-center gap-3 font-body text-[16px] font-semibold text-soft">
      <span className="block size-7.5 shrink-0">
        <Image src={icon} alt="" className="size-full" />
      </span>
      <span>{children}</span>
    </div>
  )
}

/** Design `.empty`: dashed sheet with the lantern icon, shown when a filter has no matches. */
export function EmptyState({ title }: { title: string }) {
  const t = useTranslations('khalliKhalesShared')

  return (
    <div className="rounded-panel border-3 border-dashed border-ink bg-surface px-6 py-11 text-center">
      <span className="mx-auto mb-3.5 block w-[70px]">
        <Image src={LanternIcon} alt="" className="h-auto w-full" />
      </span>
      <h3 className="font-display text-[26px] text-ink">{title}</h3>
      <p className="mt-2 font-body text-[16px] font-medium leading-[1.9] text-soft">
        {t('emptyHint')}
      </p>
    </div>
  )
}
