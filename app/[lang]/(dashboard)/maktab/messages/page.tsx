'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useUser } from '@/contexts/UserContext'
import { Link, useRouter } from '@/i18n/navigation'
import NoteIcon from '@/icons/star-2.svg'
import PlantIcon from '@/icons/plant.svg'
import CirclesIcon from '@/icons/circles.svg'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import type { KeyboardEvent, MouseEvent } from 'react'
import { conversations, type Conversation } from './data'
import { TagBadge } from './tag-badge'

const officeLinks = [
  { key: 'balances', href: '/maktab/balances' },
  { key: 'favorites', href: '/maktab/favourites' },
  { key: 'team', href: '/maktab/team' },
  { key: 'notifications', href: '/maktab/notifications' },
  { key: 'messages' },
] as const

const tabClass =
  'inline-flex rounded-full border-[2.5px] border-ink bg-surface px-[22px] py-[11px] font-display text-[19px]/[1] text-ink shadow-[4px_4px_0] shadow-ink transition hover:translate-x-px hover:translate-y-px hover:bg-gold hover:shadow-[2px_2px_0]'

function ConversationCard({ conv }: { conv: Conversation }) {
  const t = useTranslations('messages')
  const tg = useTranslations('global')
  const locale = useLocale()
  const router = useRouter()

  const openProfile = (event: MouseEvent | KeyboardEvent) => {
    if ('key' in event && event.key !== 'Enter') return
    event.stopPropagation()
    router.push(conv.profileHref)
  }

  return (
    <Link
      href={`/maktab/messages/${conv.id}`}
      className={cn(
        'relative flex items-start gap-4 rounded-panel border-3 border-ink bg-surface px-[22px] py-5 shadow-[5px_5px_0] shadow-ink transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-[3px] hover:shadow-[8px_9px_0]',
        conv.unread && 'bg-gold',
      )}
    >
      {conv.unread && conv.unreadCount !== undefined && (
        <span className="absolute -top-[11px] -start-[11px] z-3 inline-flex h-6 min-w-6 items-center justify-center rounded-full border-[2.5px] border-ink bg-red px-1.5 text-[13px] font-extrabold leading-none text-surface">
          {formatNumber(conv.unreadCount, { locale })}
        </span>
      )}
      <Avatar color={conv.avatarColor} className="size-14 shadow-[2px_2px_0] shadow-ink">
        <AvatarFallback className="text-[24px]">{conv.avatar}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-[23px]/[1.2] font-bold">
            <span
              role="link"
              tabIndex={0}
              onClick={openProfile}
              onKeyDown={openProfile}
              className="cursor-pointer transition-colors hover:text-blue"
            >
              {tg(conv.nameKey)}
            </span>
          </span>
          <TagBadge tag={conv.tag} />
          <span className="ms-auto whitespace-nowrap font-body text-[13.5px] font-semibold text-soft">
            {t(`time.${conv.timeKey}`)}
          </span>
        </div>
        <p className="mt-1 font-body text-[14.5px] font-semibold text-soft">
          {t(`conversations.${conv.key}.relation`)}
        </p>
        <p className="mt-2.5 line-clamp-1 font-body text-[16px]/[1.8] font-medium">
          <strong className="font-extrabold">{t(`conversations.${conv.key}.lastSender`)}</strong>{' '}
          {t(`conversations.${conv.key}.lastMessage`)}
        </p>
      </div>
    </Link>
  )
}

export default function MessagesPage() {
  const t = useTranslations('messages')
  const locale = useLocale()
  const { user } = useUser()

  const name = user?.org?.legalName ?? user?.first ?? ''
  const totalConversations = conversations.length
  const unreadCount = conversations.filter((c) => c.unread).length

  const sections = [
    { key: 'namliya', icon: CirclesIcon },
    { key: 'khalliKhales', icon: PlantIcon },
  ] as const

  return (
    <div>
      <header className="mb-2 flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1]">{t('title')}</h1>
        <p className="pb-2.5 font-body text-[17px] font-medium text-soft">
          {t('description', {
            name,
            total: formatNumber(totalConversations, { locale }),
            unread: formatNumber(unreadCount, { locale }),
          })}
        </p>
      </header>

      <nav aria-label={t('officeNavLabel')} className="mt-5 mb-[22px] flex flex-wrap gap-2.5">
        {officeLinks.map((item) =>
          item.key === 'messages' ? (
            <span
              key={item.key}
              aria-current="page"
              className={cn(tabClass, 'bg-red text-surface')}
            >
              {t(`officeNav.${item.key}`)}
            </span>
          ) : (
            <Link key={item.key} href={item.href} className={tabClass}>
              {t(`officeNav.${item.key}`)}
            </Link>
          ),
        )}
      </nav>

      <div className="mt-6 flex items-center gap-4 rounded-panel border-3 border-ink bg-gold px-6 py-5 shadow-[6px_6px_0] shadow-ink">
        <span className="flex h-12 w-11 shrink-0 items-center justify-center">
          <Image src={NoteIcon} alt="" className="h-auto w-full max-h-full max-w-full" />
        </span>
        <p className="min-w-[200px] flex-1 font-body text-[16px]/[1.9] font-semibold">
          <b className="font-display text-[18px]">{t('note.title')}</b> {t('note.body')}
        </p>
      </div>

      {sections.map((section) => {
        const sectionConversations = conversations.filter((c) => c.market === section.key)

        return (
          <section key={section.key}>
            <div className="mt-7 mb-4 flex flex-wrap items-center gap-3.5">
              <span className="grid size-[42px] shrink-0 place-items-center rounded-[12px] border-[2.5px] border-ink bg-surface p-1.5 shadow-[2px_2px_0] shadow-ink">
                <Image src={section.icon} alt="" className="size-full" />
              </span>
              <h2 className="font-display text-[30px]/[1.2]">{t(`sections.${section.key}`)}</h2>
              <span className="ms-auto font-body text-[15px] font-bold text-soft">
                {t(`sections.${section.key}Count`)}
              </span>
            </div>
            <div className="flex flex-col gap-3.5">
              {sectionConversations.map((conv) => (
                <ConversationCard key={conv.id} conv={conv} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
