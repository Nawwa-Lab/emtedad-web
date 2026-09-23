'use client'

import { usePathname } from '@/i18n/navigation'
import { cn } from 'cn'
interface RouteHeaderConfig {
  title: string
  description?: string
  action?: React.ReactNode
}

interface RouteEntry {
  path?: string
  pattern?: string
  config: RouteHeaderConfig
}

export function RouteHeader({
  routes,
  className,
  titleClassName,
  descriptionClassName,
  children,
}: {
  routes: RouteEntry[]
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  children?: React.ReactNode
}) {
  const pathname = usePathname()

  let config: RouteHeaderConfig | null = null

  for (const entry of routes) {
    if (entry.path && entry.path === pathname) {
      config = entry.config
      break
    }
    if (entry.pattern) {
      const re = new RegExp(entry.pattern)
      if (re.test(pathname)) {
        config = entry.config
        break
      }
    }
  }

  if (!config) return null

  return (
    <>
      <div className={cn('flex flex-wrap items-baseline gap-2 sm:gap-3.5', className)}>
        <h1 className={cn('font-display font-bold text-[26px]/[1.5]', titleClassName)}>
          {config.title}
        </h1>
        {config?.action && <span className="ms-auto">{config?.action}</span>}
      </div>
      {config.description && (
        <p
          className={cn(
            'font-cairo font-semibold text-sm text-ink-soft mt-0.5',
            descriptionClassName,
          )}
        >
          {config.description}
        </p>
      )}
      {children}
    </>
  )
}
