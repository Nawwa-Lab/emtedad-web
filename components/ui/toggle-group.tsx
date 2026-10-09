'use client'

import { toggleVariants } from '@/components/ui/toggle'
import { Badge } from '@/components/ui/badge'
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group'
import { type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import * as React from 'react'

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: 'horizontal' | 'vertical'
  }
>({
  size: 'default',
  variant: 'outline',
  shape: 'round',
  effect: 'flat',
  spacing: 2,
  orientation: 'horizontal',
})

function ToggleGroup({
  className,
  variant = 'outline',
  size = 'default',
  shape = 'round',
  effect = 'flat',
  spacing = 2,
  orientation = 'horizontal',
  children,
  ...props
}: ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: 'horizontal' | 'vertical'
  }) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      data-effect={effect}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ '--gap': spacing } as React.CSSProperties}
      className={cn(
        'group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, shape, effect, spacing, orientation }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant = 'default',
  size = 'default',
  shape = 'round',
  effect = '3d',
  count,
  ...props
}: TogglePrimitive.Props &
  VariantProps<typeof toggleVariants> & {
    count?: number
  }) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-shape={context.shape || shape}
      data-effect={context.effect || effect}
      data-spacing={context.spacing}
      className={cn(
        'shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[shape=round]:first:rounded-l-full group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[shape=round]:first:rounded-t-full group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[shape=round]:last:rounded-r-full group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[shape=round]:last:rounded-b-full group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[shape=square]:first:rounded-l-field group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[shape=square]:first:rounded-t-field group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[shape=square]:last:rounded-r-field group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[shape=square]:last:rounded-b-field group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:border-l-0 group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:border-t-0 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:first:border-l-[2.5px] group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:first:border-t-[2.5px]',
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
          shape: context.shape || shape,
          effect: context.effect || effect,
        }),
        className,
      )}
      {...props}
    >
      {children}
      {count && count > 0 ? (
        <Badge
          color="red"
          effect="3d"
          size="sm"
          className="pointer-events-none absolute -top-2 -inset-s-2 z-10"
        >
          {count}
        </Badge>
      ) : null}
    </TogglePrimitive>
  )
}

export { ToggleGroup, ToggleGroupItem }
