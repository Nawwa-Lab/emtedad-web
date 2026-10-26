'use client'

import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { cn } from 'cn'

function Switch({
  className,
  size = 'default',
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: 'sm' | 'default'
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        'peer group/switch relative inline-flex shrink-0 items-center w-16.5 h-9 rounded-full border-[2.5px] border-ink bg-surface shadow-[2px_2px_0_#1a1714] cursor-pointer transition-colors outline-none focus-visible:outline-3 focus-visible:outline-blue focus-visible:outline-offset-3 data-checked:bg-gold data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none absolute top-0.75 inset-s-0.75 size-6 rounded-full bg-ink transition-transform data-unchecked:translate-x-0 rtl:data-checked:-translate-x-7.5 ltr:data-checked:translate-x-7.5"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
