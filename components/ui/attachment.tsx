import * as React from 'react'
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cn } from 'cn'

function Attachment({
  className,
  selected = false,
  ...props
}: React.ComponentProps<'div'> & { selected?: boolean }) {
  return (
    <div
      data-slot="attachment"
      data-selected={selected || undefined}
      className={cn(
        'group/attachment relative aspect-square overflow-hidden rounded-card border-[2.5px] border-ink bg-paper shadow-ink shadow-[3px_3px_0]',
        className,
      )}
      {...props}
    />
  )
}

function AttachmentMedia({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="attachment-media"
      className={cn('relative size-full overflow-hidden', className)}
      {...props}
    />
  )
}

function AttachmentContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="attachment-content" className={cn('min-w-0', className)} {...props} />
}

function AttachmentTitle({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span data-slot="attachment-title" className={cn('block truncate', className)} {...props} />
  )
}

function AttachmentDescription({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="attachment-description"
      className={cn('block truncate text-soft', className)}
      {...props}
    />
  )
}

function AttachmentActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="attachment-actions"
      className={cn('absolute top-1.5 inset-e-1.5 z-20 flex', className)}
      {...props}
    />
  )
}

function AttachmentAction({ className, ...props }: ButtonPrimitive.Props) {
  return (
    <ButtonPrimitive
      data-slot="attachment-action"
      className={cn(
        'grid size-6.5 cursor-pointer place-items-center rounded-full border-2 border-ink bg-red text-surface transition-transform hover:-translate-y-px focus-visible:outline-3 focus-visible:outline-blue focus-visible:outline-offset-2',
        className,
      )}
      {...props}
    />
  )
}

function AttachmentPrimary({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="attachment-primary"
      className={cn(
        'pointer-events-none font-body absolute bottom-1.5 inset-s-1.5 z-20 rounded-full border-2 border-ink bg-gold px-2 py-0.5 text-[11px] font-extrabold leading-none text-ink',
        className,
      )}
      {...props}
    />
  )
}

function AttachmentTrigger({
  className,
  render,
  type,
  ...props
}: useRender.ComponentProps<'button'>) {
  return useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(
      {
        type: render ? type : (type ?? 'button'),
        className: cn(
          'absolute inset-0 z-10 cursor-pointer outline-none focus-visible:outline-3 focus-visible:outline-blue focus-visible:outline-offset-[-3px]',
          className,
        ),
      },
      props,
    ),
    render,
    state: { slot: 'attachment-trigger' },
  })
}

function AttachmentGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="attachment-group"
      className={cn('grid grid-cols-2 gap-3 sm:grid-cols-4', className)}
      {...props}
    />
  )
}

export {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentPrimary,
  AttachmentTrigger,
}
