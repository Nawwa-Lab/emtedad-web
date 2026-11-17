'use client'

import { EmptyState } from '@/components/ui/empty-state'
import { useUser } from '@/contexts/UserContext'
import { Link, useRouter } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import CirclesIcon from '@/icons/circles.svg'
import LanternIcon from '@/icons/lantern.svg'
import { formatNumber } from '@/lib/utils'
import {
  type NotificationItem,
  notificationTarget,
  useMarkNotificationRead,
  useNotificationsQuery,
} from '@/services/notifications'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo } from 'react'

const officeLinks = [
  { key: 'balances', href: '/maktab/balances' },
  { key: 'favorites', href: '/maktab/favourites' },
  { key: 'team', href: '/maktab/team' },
  { key: 'notifications' },
  { key: 'messages', href: '/maktab/messages' },
] as const

const tabClass =
  'inline-flex rounded-full border-[2.5px] border-ink bg-surface px-[22px] py-[11px] font-display text-[19px]/[1] text-ink shadow-[4px_4px_0] shadow-ink transition hover:translate-x-px hover:translate-y-px hover:bg-gold hover:shadow-[2px_2px_0]'

type Group = 'today' | 'yesterday' | 'week' | 'older'

function groupFor(value: string): Group {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const date = new Date(value)
  date.setHours(0, 0, 0, 0)
  const days = Math.floor((today.getTime() - date.getTime()) / 86_400_000)
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return 'week'
  return 'older'
}

function relativeTime(value: string, locale: string) {
  const elapsed = new Date(value).getTime() - Date.now()
  const hours = Math.round(elapsed / 3_600_000)
  if (Math.abs(hours) < 24) return new Intl.RelativeTimeFormat(locale).format(hours, 'hour')
  return new Intl.RelativeTimeFormat(locale).format(Math.round(hours / 24), 'day')
}

export default function NotificationsPage() {
  const t = useTranslations('notifications')
  const locale = useLocale()
  const router = useRouter()
  const { user } = useUser()
  const { data, isPending, isError } = useNotificationsQuery()
  const markRead = useMarkNotificationRead()
  const groups = useMemo(
    () =>
      (['today', 'yesterday', 'week', 'older'] as const)
        .map((key) => ({
          key,
          items: data?.items.filter((item) => groupFor(item.createdAt) === key) ?? [],
        }))
        .filter((group) => group.items.length),
    [data],
  )
  const name = user?.org?.legalName ?? user?.first ?? ''

  const open = async (item: NotificationItem) => {
    const target = notificationTarget(item, user?.role)
    try {
      if (!item.readAt) await markRead.mutateAsync(item.notificationId)
    } finally {
      if (target) router.push(target)
    }
  }

  const copy = (item: NotificationItem) => {
    if (item.type === 'announcement') {
      return { title: item.title ?? '', body: item.body ?? '', icon: LanternIcon }
    }
    if (item.type === 'exchange.request.created') {
      return { title: t('types.requestTitle'), body: t('types.requestBody'), icon: CirclesIcon }
    }
    return { title: t('types.completedTitle'), body: t('types.completedBody'), icon: BalanceIcon }
  }

  return (
    <div>
      <header className="mb-2 flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1]">{t('title')}</h1>
        <p className="pb-2.5 font-body text-[17px] font-medium text-soft">
          {t('description', { name, count: formatNumber(data?.unreadCount ?? 0, { locale }) })}
        </p>
      </header>

      <nav aria-label={t('officeNavLabel')} className="mt-5 mb-[22px] flex flex-wrap gap-2.5">
        {officeLinks.map((item) =>
          item.key === 'notifications' ? (
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

      {isPending && (
        <p className="py-10 text-center font-body font-bold text-soft">{t('loading')}</p>
      )}
      {isError && <p className="py-10 text-center font-body font-bold text-red">{t('error')}</p>}
      {!isPending && !isError && !data?.items.length && (
        <EmptyState
          icon={LanternIcon}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
        />
      )}

      {groups.map((group) => (
        <section key={group.key}>
          <h2 className="mt-[26px] mb-3.5 flex items-center gap-3.5 font-display text-2xl text-red after:h-[3px] after:flex-1 after:rounded-sm after:bg-red/25">
            {t(`groups.${group.key}`)}
          </h2>
          <div>
            {group.items.map((item) => {
              const content = copy(item)
              return (
                <button
                  key={item.notificationId}
                  type="button"
                  onClick={() => void open(item)}
                  className={cn(
                    'mb-3.5 flex w-full cursor-pointer items-start gap-4 rounded-panel border-3 border-ink bg-surface px-5.5 py-5 text-start text-ink shadow-[5px_5px_0] shadow-ink transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.75 hover:shadow-[8px_9px_0]',
                    !item.readAt && 'bg-gold',
                  )}
                >
                  <span className="grid size-12 aspect-square rounded-[13px] border-[2.5px] border-ink bg-paper p-2 shadow-[2px_2px_0] shadow-ink">
                    <Image
                      src={content.icon}
                      alt={item.type}
                      className="max-h-full max-w-full aspect-square object-contain"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="block font-display text-[21px]/[1.35] font-normal">
                      {content.title}
                    </strong>
                    <span
                      className={cn(
                        'mt-1 block font-body text-[15.5px]/[1.85] font-medium text-soft',
                        !item.readAt && 'text-ink/70',
                      )}
                    >
                      {content.body}
                    </span>
                    <time className="mt-2.5 block font-body text-[13.5px] font-semibold text-soft">
                      {relativeTime(item.createdAt, locale)}
                    </time>
                  </span>
                  {!item.readAt && (
                    <span className="mt-1.5 size-3.5 shrink-0 rounded-full border-[2.5px] border-ink bg-red" />
                  )}
                </button>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
