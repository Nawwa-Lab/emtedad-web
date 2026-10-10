'use client'

import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { cn } from 'cn'

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cn(className)} {...props} />
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        'group rounded-card border-[2.5px] border-ink bg-surface shadow-ink shadow-[4px_4px_0]',
        className,
      )}
      {...props}
    />
  )
}

function AccordionHeader({ className, ...props }: AccordionPrimitive.Header.Props) {
  return (
    <AccordionPrimitive.Header data-slot="accordion-header" className={cn(className)} {...props} />
  )
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Trigger
      data-slot="accordion-trigger"
      className={cn(
        'flex w-full cursor-pointer items-center gap-3.5 px-5.5 py-4.5 text-start font-display text-[22px] text-ink focus-visible:outline-blue focus-visible:outline-3 focus-visible:outline-offset-0',
        className,
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className="group-data-open:rotate-45 transition-transform duration-[0.25s] ms-auto grid size-8 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-gold font-body text-xl leading-none text-ink group-data-open:bg-red group-data-open:text-surface"
      >
        +
      </span>
    </AccordionPrimitive.Trigger>
  )
}

function AccordionContent({ className, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn('px-5.5 pb-5 text-[16.5px] font-medium leading-[1.95] text-soft', className)}
      {...props}
    />
  )
}

export { Accordion, AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger }
