import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"block border-0 cursor-pointer rounded-[999px] font-cairo! font-extrabold  transition-colors ",
	{
		variants: {
			variant: {
				primary:
					"text-[15px] py-[13px] px-5 bg-green text-ink hover:bg-green/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep",
				ghost:
					"text-[15px] py-[13px] px-5 border-green-deep text-green-deep hover:bg-green-deep/10 border",
				destructive:
					"bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
				link: "text-green-deep text-[13.5px] underline-offset-4 hover:underline",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	},
);

function Button({
	className,
	variant = "primary",
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot='button'
			className={cn(buttonVariants({ variant, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
