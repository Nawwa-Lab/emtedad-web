import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'cn'

const badgeVariants = cva(
  'inline-flex font-body items-center border-[2.5px] rounded-full border-ink font-bold transition-colors [a]:cursor-pointer',
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
        sm: 'px-2.5 py-0.75 text-[10.5px]',
        default: 'px-[15px] py-[5px] text-[13.5px]',
        lg: 'px-[20px] py-[7px] text-[22px]',
      },
    },
    defaultVariants: {
      color: 'gold',
      size: 'default',
    },
  },
)

function Badge({
  className,
  color = 'gold',
  size = 'default',
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ color, size }), className),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      color,
      size,
    },
  })
}

export { Badge, badgeVariants }
