'use client'

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import { Badge } from './badge'

const toggleVariants = cva(
  'group/toggle relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap border-[2.5px] font-body font-bold outline-none transition-[color,background-color,border-color,box-shadow,transform] duration-100 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'border-ink bg-surface text-ink font-extrabold focus-visible:outline-blue focus-visible:outline-offset-3 focus-visible:outline-1 data-[pressed]:bg-red data-[pressed]:text-surface',
        outline:
          'border-ink text-ink bg-surface hover:bg-gold focus-visible:outline-blue focus-visible:outline-offset-3 focus-visible:outline-1 data-[pressed]:bg-ink data-[pressed]:text-surface',
      },
      size: {
        default: "h-12 gap-2 px-5 text-base [&_svg:not([class*='size-'])]:size-4",
        sm: "h-9 gap-1.5 px-4 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        icon: "size-10 p-0 [&_svg:not([class*='size-'])]:size-4",
      },
      shape: {
        round: 'rounded-full',
        square: 'rounded-field',
      },
      effect: {
        flat: 'shadow-none',
        '3d': 'shadow-ink shadow-[4px_4px_0] hover:translate-[1px_1px] hover:shadow-[2px_2px_0] active:shadow-none active:translate-[4px_4px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'round',
      effect: '3d',
    },
  },
)

type ToggleProps = TogglePrimitive.Props &
  VariantProps<typeof toggleVariants> & {
    count?: number | string
  }

function Toggle({
  className,
  children,
  variant = 'default',
  size = 'default',
  shape = 'round',
  effect = '3d',
  count,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, shape, effect, className }))}
      {...props}
    >
      {children}
      {count && (
        <Badge
          size="mini"
          color="red"
          effect="3d"
          className="pointer-events-none absolute -top-2 -inset-s-2"
        >
          {count}
        </Badge>
      )}
    </TogglePrimitive>
  )
}

export { Toggle, toggleVariants }
