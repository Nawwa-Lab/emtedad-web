import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'cn'

const badgeVariants = cva(
  'flex font-body items-center justify-center border-[2.5px] rounded-full border-ink font-bold transition-colors [a]:cursor-pointer',
  {
    variants: {
      color: {
        red: 'bg-red text-surface',
        blue: 'bg-blue text-surface',
        gold: 'bg-gold text-ink',
        tint: 'bg-tint text-ink',
        paper: 'bg-paper text-ink',
        surface: 'bg-surface text-ink',
      },
      size: {
        mini: 'z-3 py-0! px-0.5! h-6 min-w-6 text-[10.5px] shadow-[2px_2px_0]!',
        sm: 'px-2.5 py-0.75 text-[10.5px]',
        default: 'px-[15px] py-[5px] text-[13.5px]',
        lg: 'px-[20px] py-[7px] text-[22px]',
      },
      effect: {
        flat: 'shadow-none',
        '3d': 'shadow-ink shadow-[4px_4px_0]',
      },
    },
    defaultVariants: {
      color: 'gold',
      size: 'default',
      effect: '3d',
    },
  },
)

function Badge({
  className,
  color = 'gold',
  size = 'default',
  effect = '3d',
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ color, size, effect }), className),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      color,
      size,
      effect,
    },
  })
}

export { Badge, badgeVariants }
