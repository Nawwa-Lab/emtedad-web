"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4 text-start", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  indicator,
  ...props
}: RadioPrimitive.Root.Props & { indicator?: React.ReactNode }) {
  return (
		<RadioPrimitive.Root
			data-slot='radio-group-item'
			className={cn(
				"group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none",
				"focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
				"disabled:cursor-not-allowed disabled:opacity-50",
				"data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground",
				indicator && "aria-[checked=false]:opacity-0",
				className,
			)}
			{...props}
		>
			<RadioPrimitive.Indicator
				data-slot='radio-group-indicator'
				className='flex size-4 items-center justify-center'
			>
				{indicator ?? (
					<span className='absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green' />
				)}
			</RadioPrimitive.Indicator>
		</RadioPrimitive.Root>
	);
}

export { RadioGroup, RadioGroupItem }
