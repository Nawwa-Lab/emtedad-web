'use client'

import * as React from 'react'
import { CheckIcon } from 'lucide-react'
import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'

import { cn } from 'cn'

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn('grid grid-cols-1 gap-5 text-center min-[700px]:grid-cols-2', className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, children, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        'group/radio-group-item relative flex min-h-70 cursor-pointer flex-col items-center justify-center rounded-panel border-[3px] border-ink bg-surface px-6 pb-6 pt-7.5 text-center shadow-ink shadow-[7px_7px_0] outline-none transition-[transform,box-shadow,background-color] duration-150',
        'hover:-translate-x-0.5 hover:-translate-y-0.75 hover:rotate-[-0.4deg] hover:shadow-ink hover:shadow-[10px_11px_0]',
        'data-checked:-translate-x-0.5 data-checked:-translate-y-0.75 data-checked:bg-gold data-checked:shadow-ink data-checked:shadow-[10px_11px_0]',
        'focus-visible:outline-3 focus-visible:outline-blue focus-visible:outline-offset-4',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:rotate-0 disabled:hover:shadow-[7px_7px_0]',
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="absolute -top-3.5 -inset-s-3.5 z-10 grid size-11 place-items-center rounded-full border-[3px] border-ink bg-red text-surface shadow-ink shadow-[3px_3px_0]"
      >
        <CheckIcon className="size-5.5" strokeWidth={4} />
      </RadioPrimitive.Indicator>
      {children}
    </RadioPrimitive.Root>
  )
}

function RadioGroupItemIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="radio-group-item-icon"
      className={cn(
        'mb-4 flex size-24 shrink-0 items-center justify-center [&_img]:size-full [&_svg]:size-full',
        className,
      )}
      {...props}
    />
  )
}

function RadioGroupItemTitle({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="radio-group-item-title"
      className={cn('font-display text-3xl/tight text-ink', className)}
      {...props}
    />
  )
}

function RadioGroupItemDescription({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="radio-group-item-description"
      className={cn(
        'mt-2 max-w-67.5 font-body text-[15.5px]/[1.85] font-medium text-soft group-data-checked/radio-group-item:text-ink',
        className,
      )}
      {...props}
    />
  )
}

export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemIcon,
  RadioGroupItemTitle,
  RadioGroupItemDescription,
}
