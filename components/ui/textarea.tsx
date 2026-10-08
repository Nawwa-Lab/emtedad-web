import * as React from 'react'
import { cn } from 'cn'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'w-full min-h-30 resize-y bg-paper border-[2.5px] border-ink rounded-field py-3.5 px-4.5 font-body font-semibold text-[17px] text-ink focus:outline focus-visible:outline focus-visible:outline-auto disabled:border-dashed disabled:cursor-not-allowed disabled:text-soft disabled:bg-paper-dark',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
