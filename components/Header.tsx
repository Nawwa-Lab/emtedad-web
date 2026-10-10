'use client'
import { QuickAction } from '@/components/QuickAction'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { NotificationBell } from './NotificationBell'

export function Header() {
  const t = useTranslations('header')
  return (
    <header className="flex shrink-0 items-center gap-4 border-b border-line bg-surface px-6 py-3 max-[820px]:flex-wrap max-[820px]:px-4">
      <Link className="font-display font-bold text-xl text-green-deep decoration-0" href="/">
        {t('logo')}
      </Link>
      <Input
        className="w-[min(420px,32vw)] flex-1 rounded-full px-5 py-2.5 text-[15px]! max-[820px]:order-last max-[820px]:w-full max-[820px]:basis-full"
        type="search"
        placeholder={t('searchPlaceholder')}
        aria-label={t('searchAriaLabel')}
      />
      <div className="flex-1"></div>
      <QuickAction />
      <NotificationBell />
      <div className="flex items-center gap-2.5">
        <span className="hidden sm:flex items-center gap-2 text-sm font-cairo font-bold text-line-soft bg-sage rounded-full py-2 ps-2 pe-3.5">
          <span className="whitespace-nowrap text-ink">{t('contextLabel')}</span>
          <Link
            href="/context-selection"
            className="text-xs text-green-deep decoration-0 bg-surface rounded-full py-0.75 px-2.5"
          >
            {t('switchContext')}
          </Link>
        </span>
        <Link href="/member/123">
          <Avatar color="gold" isAnimated>
            <AvatarImage src="https://github.com/shadcn.pngg" />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  )
}
