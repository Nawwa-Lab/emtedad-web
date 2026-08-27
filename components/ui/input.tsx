import { Input as InputPrimitive } from "@base-ui/react/input";
import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<InputPrimitive
			type={type}
			data-slot='input'
			className={cn(
				"w-full bg-paper border border-line rounded-xl py-3 px-4 font-cairo font-semibold text-[15px] text-ink focus:outline-2 focus:outline-offset-1 focus:outline-green-deep focus:border-green-deep focus-visible:outline-offset-0",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
