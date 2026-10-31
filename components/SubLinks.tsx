'use client'
import { Fragment } from 'react'
import { Link, usePathname } from '@/i18n/navigation'
import { toggleVariants } from '@/components/ui/toggle'
import { cn } from 'cn'

interface NavLink {
  href: string
  label: string
}

interface SubLinksProps {
  links: NavLink[]
  className?: string
  linkClassName?: string
  /** Index of the link after which a separator is rendered */
  separatorAfter?: number
}

export function SubLinks({ links, className, linkClassName, separatorAfter }: SubLinksProps) {
  const pathname = usePathname()

  return (
    <div className={cn('mt-4 mb-6 flex w-fit flex-wrap items-center font-body gap-2', className)}>
      {links.map(({ href, label }, i) => {
        const isActive = pathname === href

        return (
          <Fragment key={href}>
            <Link
              href={href}
              aria-current={isActive ? 'page' : undefined}
              data-active={isActive || undefined}
              className={cn(
                toggleVariants({ size: 'sm' }),
                'data-active:bg-red data-active:text-surface',
                'not-data-active:hover:bg-gold',
                linkClassName,
              )}
            >
              {label}
            </Link>

            {i === separatorAfter && (
              <span
                aria-hidden
                className="w-0.75 h-7.5 rounded-xs my-0 mx-1 bg-[rgba(26,23,20,0.2)]"
              />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
