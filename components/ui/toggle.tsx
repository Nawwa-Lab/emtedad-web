'use client'

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
const toggleVariants = cva(
  'group/toggle inline-flex cursor-pointer items-center justify-center whitespace-nowrap border-[2.5px] font-body font-bold outline-none transition-[color,background-color,border-color,box-shadow,transform] duration-100 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'border-ink bg-surface text-ink font-extrabold shadow-ink shadow-[4px_4px_0] hover:translate-[1px_1px] hover:shadow-[2px_2px_0] active:translate-[4px_4px] active:shadow-none focus-visible:outline-blue focus-visible:outline-offset-3 focus-visible:outline-1 data-[pressed]:bg-red data-[pressed]:text-surface',
        outline:
          'border-ink bg-surface text-ink font-extrabold shadow-ink shadow-[4px_4px_0] hover:translate-[1px_1px] hover:shadow-[2px_2px_0] active:translate-[4px_4px] active:shadow-none focus-visible:outline-blue focus-visible:outline-offset-3 focus-visible:outline-1 data-[pressed]:bg-red data-[pressed]:text-surface',
      },
      size: {
        default: "h-12 gap-2 rounded-full px-5 text-base [&_svg:not([class*='size-'])]:size-4",
        sm: "h-9 gap-1.5 rounded-full px-4 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-14 gap-2 rounded-full px-6 text-lg [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Toggle({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
