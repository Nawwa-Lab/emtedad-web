'use client'
import LogoIcon from '@/app/star.svg'
import { QuickAction } from '@/components/QuickAction'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Link, usePathname } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { NotificationBell } from './NotificationBell'
import { Button } from './ui/button'

export function Header() {
  const t = useTranslations('header')
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.toString()
  const returnTo = query ? `${pathname}?${query}` : pathname

  return (
    <header className="flex shrink-0 items-center gap-4 border-b-[3px] border-ink bg-surface px-6 py-3 max-[820px]:flex-wrap max-[820px]:px-4">
      <div className="font-display flex flex-row gap-3 justify-center items-center font-bold text-xl text-red decoration-0">
        <Image src={LogoIcon} alt={t('logo')} className="size-10" />
        <span>{t('logo')}</span>
      </div>
      <Input
        className="w-[min(420px,32vw)] flex-1 rounded-full px-5 py-2.5 text-[15px]! max-[820px]:order-last max-[820px]:w-full max-[820px]:basis-full"
        type="search"
        placeholder={t('searchPlaceholder')}
        aria-label={t('searchAriaLabel')}
      />
      <div className="flex-1"></div>
      <QuickAction />
      <NotificationBell />
      <div className="flex items-center h-full gap-2.5">
        <span className="hidden sm:flex items-center gap-2 border-[2.5px] border-ink text-sm font-body font-bold text-line-soft bg-gold rounded-full p-2">
          <span className="whitespace-nowrap text-ink">{t('contextLabel')}</span>
          <Link href={`/context-selection?redirect=${encodeURIComponent(returnTo)}`}>
            <Button
              variant="outline"
              effect="flat"
              size="sm"
              shape="round"
              className="bg-surface hover:bg-red hover:text-surface"
            >
              {t('switchContext')}
            </Button>
          </Link>
        </span>
        <Link href="/member/123">
          <Avatar color="red" isAnimated>
            <AvatarImage src="https://github.com/shadcn.pngg" />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  )
}
