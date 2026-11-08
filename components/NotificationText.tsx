'use client'
import { Link } from '@/i18n/navigation'
import { formatNumber } from '@/lib/utils/index'
import { useLocale, useTranslations } from 'next-intl'
import { useUser } from '@/contexts/UserContext'

export function NotificationText({ notificationsCount }: { notificationsCount?: number }) {
  const tSidebar = useTranslations('sidebar')
  const locale = useLocale()
  const { unreadNotificationsCount } = useUser()
  const count = notificationsCount ?? unreadNotificationsCount

  return (
    <Link
      href="/notifications"
      className="flex sm:hidden relative flex-1 items-center justify-between gap-2 rounded-2xl border border-line-soft bg-paper p-2.5"
      aria-label={tSidebar('notifications')}
    >
      <span className="font-cairo flex items-center gap-2.5 font-bold text-sm rounded-xl py-2.5 px-3.5 decoration-0">
        {tSidebar('notifications')}
      </span>
      {count > 0 && (
        <span className="relative font-cairo w-4.5 h-4.5 rounded-full bg-gold text-ink text-xs grid place-items-center">
          {formatNumber(count, { locale })}
        </span>
      )}
    </Link>
  )
}
