'use client'
import { Link } from '@/i18n/navigation'
import { formatNumber } from '@/lib/utils/index'
import { BellIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from './ui/button'

export function NotificationBell({ notificationsCount = 3 }: { notificationsCount?: number }) {
  const tSidebar = useTranslations('sidebar')
  const locale = useLocale()

  return (
    <Link href="/notifications" aria-label={tSidebar('notifications')}>
      <Button
        size="icon"
        variant="outline"
        shape="round"
        effect="flat"
        className="bg-paper size-11.5"
        aria-label={tSidebar('notifications')}
        count={formatNumber(notificationsCount, {
          locale,
        })}
      >
        <BellIcon className="w-auto stroke-ink size-5 stroke-2" />
      </Button>
    </Link>
  )
}
