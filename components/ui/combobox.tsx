'use client'

import { Combobox as ComboboxPrimitive } from '@base-ui/react'
import { CheckIcon, XIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from 'cn'

const Combobox = ComboboxPrimitive.Root

function ComboboxValue(props: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxChips({ className, ...props }: ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        'flex min-h-13 flex-wrap items-center gap-2 rounded-field border-[2.5px] border-ink bg-paper px-3 py-2 font-body text-[17px] font-semibold focus-within:outline focus-within:outline-auto has-aria-invalid:border-red',
        className,
      )}
      {...props}
    />
  )
}

function ComboboxChip({ className, children, ...props }: ComboboxPrimitive.Chip.Props) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        'flex items-center gap-1.5 rounded-full border-2 border-ink bg-gold px-3 py-1 text-sm font-extrabold',
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ChipRemove
        data-slot="combobox-chip-remove"
        render={
          <button
            type="button"
            className="grid size-5 place-items-center rounded-full hover:bg-ink hover:text-surface focus-visible:outline-2"
          />
        }
      >
        <XIcon className="size-3.5" />
      </ComboboxPrimitive.ChipRemove>
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn('min-w-32 flex-1 bg-transparent outline-none placeholder:text-soft', className)}
      {...props}
    />
  )
}

function ComboboxContent({
  className,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props & Pick<ComboboxPrimitive.Positioner.Props, 'anchor'>) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner anchor={anchor} sideOffset={6} className="isolate z-50">
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={cn(
            'max-h-(--available-height) w-(--anchor-width) overflow-hidden rounded-field border-[2.5px] border-ink bg-paper font-body font-semibold shadow-[4px_4px_0] shadow-ink data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0',
            className,
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn('max-h-60 overflow-y-auto p-1.5', className)}
      {...props}
    />
  )
}

function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        'relative flex cursor-default items-center rounded-lg py-2.5 pe-9 ps-3 outline-none data-highlighted:bg-red data-highlighted:text-surface data-disabled:opacity-40',
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator className="absolute end-3">
        <CheckIcon className="size-4" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn('px-3 py-4 text-center text-sm text-soft', className)}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
}
