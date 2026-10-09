import * as React from 'react'

import { cn } from 'cn'
function Card({
  className,
  animated = false,
  ...props
}: React.ComponentProps<'div'> & { animated?: boolean }) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-surface border-3 border-ink rounded-panel pt-8.5 pb-7.5 px-8 shadow-ink shadow-[8px_8px_0] transition-[transform_.15s,box-shadow_.15s]',
        animated &&
          'p-6! shadow-[6px_6px_0] hover:-translate-x-0.5 hover:-translate-y-1 hover:rotate-[-0.3deg] hover:shadow-[9px_11px_0]',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(' font-display font-bold text-lg mb-3 p-0', className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('font-display font-normal text-ink text-[32px]/[1.35] mb-1.5', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('font-body font-medium text-[14px]/[1.9] text-soft mb-6.5', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-content" className={cn('px-(--card-spacing)', className)} {...props} />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={cn('flex items-center', className)} {...props} />
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
