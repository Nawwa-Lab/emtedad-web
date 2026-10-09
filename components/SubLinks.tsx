'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { toggleVariants } from '@/components/ui/toggle'
import { cn } from 'cn'
interface NavLink {
  href: string
  label: string
}

export function SubLinks({ links, className }: { links: NavLink[]; className?: string }) {
  const pathname = usePathname()

  return (
    <div className={cn('mt-4 mb-2 flex w-fit flex-wrap items-center gap-2', className)}>
      {links.map(({ href, label }) => {
        const isActive = pathname === href

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            data-active={isActive || undefined}
            className={cn(
              toggleVariants({ size: 'sm' }),
              'data-active:bg-red data-active:text-surface',
            )}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
