'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'

export function AlaeshHeader({ page }: { page: 'browse' | 'myPosts' | 'create' }) {
  const t = useTranslations('alaesh.header')
  const pathname = usePathname()
  const links = [
    { href: '/alaesh-andak/browse', label: t('browse') },
    { href: '/alaesh-andak/my-posts', label: t('myPosts') },
    { href: '/alaesh-andak/request/create', label: t('create') },
  ]

  return (
    <>
      <header className="mb-6.5 flex items-end gap-2.5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1.05] font-normal">
          {t('title')}
        </h1>
        <p className="mt-2 font-body text-[17px] font-medium text-soft">{t(`subtitles.${page}`)}</p>
      </header>

      <nav className="mb-5.5 flex flex-wrap items-center gap-2.5" aria-label={t('navigation')}>
        {links.map((link, index) => (
          <span key={link.href} className="contents">
            {index === 1 && <span className="mx-1 h-7.5 w-0.75 rounded-full bg-ink/20" />}
            <Link
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              className={cn(
                'inline-flex h-12 items-center rounded-full border-[2.5px] border-ink bg-surface px-6.5 font-display text-[21px]/[1] text-ink shadow-[4px_4px_0] shadow-ink transition-[transform,box-shadow,background-color] hover:translate-x-px hover:translate-y-px hover:bg-gold hover:shadow-[2px_2px_0] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue',
                pathname === link.href && 'bg-red text-surface',
              )}
            >
              {link.label}
            </Link>
          </span>
        ))}
      </nav>
    </>
  )
}
