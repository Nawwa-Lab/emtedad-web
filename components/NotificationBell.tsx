'use client'
import { Link } from '@/i18n/navigation'
import { formatNumber } from '@/lib/utils/index'
import { cn } from 'cn'
import { BellIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from './ui/button'
import { useUser } from '@/contexts/UserContext'

export function NotificationBell({ notificationsCount }: { notificationsCount?: number }) {
  const tSidebar = useTranslations('sidebar')
  const locale = useLocale()
  const { unreadNotificationsCount } = useUser()
  const count = notificationsCount ?? unreadNotificationsCount

  return (
    <Link
      href="/notifications"
      aria-label={tSidebar('notifications')}
      className={cn(count > 0 && 'origin-top animate-ring')}
    >
      <Button
        size="icon"
        variant="outline"
        shape="round"
        effect="flat"
        className="bg-paper size-11.5"
        aria-label={tSidebar('notifications')}
        count={count ? formatNumber(count, { locale }) : undefined}
      >
        <BellIcon className="w-auto stroke-ink size-5 stroke-2" />
      </Button>
    </Link>
  )
}
