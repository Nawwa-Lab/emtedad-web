import * as React from 'react'
import { cn } from 'cn'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'w-full min-h-27.5 bg-paper border border-line rounded-xl py-3 px-4 font-cairo font-semibold text-[14px] text-ink focus:outline-2 focus:outline-offset-1 focus:outline-green-deep focus:border-green-deep focus-visible:outline-offset-0',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
