'use client'

import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from 'cn'

const avatarVariants = cva(
  'font-display group/avatar relative flex border-[2.5px] border-ink shadow-ink shadow-[4px_4px_0] shrink-0 select-none after:absolute after:inset-0 after:mix-blend-darken',
  {
    variants: {
      size: {
        default: 'size-12',
        sm: 'size-8',
        lg: 'size-16',
        xl: 'size-26',
      },
      color: {
        gold: 'bg-gold text-ink',
        red: 'bg-red text-surface',
        blue: 'bg-blue text-surface',
        tint: 'bg-tint text-ink',
      },
      shape: {
        round: 'rounded-full after:rounded-full',
        square: 'rounded-[20%] after:rounded-[20%]',
      },
    },
    defaultVariants: {
      color: 'gold',
      size: 'default',
      shape: 'round',
    },
  },
)

type AvatarProps = Omit<AvatarPrimitive.Root.Props, 'color'> &
  VariantProps<typeof avatarVariants> & {
    isAnimated?: boolean
  }

function Avatar({
  className,
  size = 'default',
  color = 'gold',
  shape = 'round',
  isAnimated = false,
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-color={color}
      data-shape={shape}
      data-animated={isAnimated}
      className={cn(
        avatarVariants({ size, color, shape, className }),
        isAnimated &&
          'shadow-none focus-visible:outline-blue transition-transform duration-0.1 focus-visible:outline-offset-3 focus-visible:outline-3 hover:shadow-[2px_2px_0] hover:translate-[1px_1px] active:shadow-none active:translate-[4px_4px] cursor-pointer',
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full rounded-[inherit] object-cover', className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'font-display flex size-full items-center justify-center rounded-[inherit] bg-inherit text-base font-bold text-inherit group-data-[size=sm]/avatar:text-xs group-data-[size=lg]/avatar:text-xl group-data-[size=xl]/avatar:text-[34px]',
        className,
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        'absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none',
        'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
        'group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2',
        'group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2',
        className,
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        'group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background',
        className,
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        'relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3',
        className,
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  avatarVariants,
}
