'use client'

import { usePathname } from '@/i18n/navigation'
import { cn } from 'cn'
interface RouteEntry {
  path?: string
  pattern?: string
  description?: string
}

export function RouteHeader({
  routes,
  title,
  className,
  children,
}: {
  title: string
  routes: RouteEntry[]
  className?: string
  children?: React.ReactNode
}) {
  const pathname = usePathname()

  let description: string = ''

  for (const entry of routes) {
    if (entry.path && entry.path === pathname) {
      description = entry.description ?? ''
      break
    }
    if (entry.pattern) {
      const re = new RegExp(entry.pattern)
      if (re.test(pathname)) {
        description = entry.description ?? ''
        break
      }
    }
  }

  if (!description) return null

  return (
    <>
      <div className={cn('flex flex-row flex-wrap items-end gap-5 sm:gap-3.5 mb-2', className)}>
        <h1 className={cn('font-display font-normal text-[clamp(44px,5.4vw,70px)]/[1]')}>
          {title}
        </h1>
        {description && (
          <p className={cn('font-body font-medium text-[17px] text-soft mb-2.5')}>{description}</p>
        )}
      </div>
      {children}
    </>
  )
}
