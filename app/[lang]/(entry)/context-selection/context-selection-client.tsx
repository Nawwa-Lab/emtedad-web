"use client";

import OrgLogo from "@/app/logo.svg";
import PubLogo from "@/app/pub-icon.svg";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

function CheckIndicator({ checked }: { checked: boolean }) {
	return (
		<span
			className={cn(
				"absolute -top-1 -inset-e-1 w-5.5 h-5.5 rounded-full bg-green grid place-items-center transition-opacity duration-150 after:w-2 after:h-1.25 after:border-b-[2.5px] rtl:after:border-e-[2.5px] ltr:after:border-s-[2.5px] after:border-ink after:-rotate-45 after:-translate-y-px",
				checked ? "opacity-100" : "opacity-0",
			)}
		></span>
	);
}

export default function ContextSelectionClient({
	dict,
}: {
	dict: Record<string, string>;
	name: string;
}) {
	const [value, setValue] = useState("org");

	return (
		<>
			<RadioGroup value={value} onValueChange={setValue}>
				<FieldLabel
					htmlFor='c-org'
					className={`relative block rounded-[22px] bg-surface border cursor-pointer transition-[border-color] duration-150 hover:border-green-deep focus-visible:outline-2 focus-visible:outline-green-deep focus-visible:outline-offset-2 ${
						value === "org"
							? "border-2 border-green-deep p-[25px_23px]"
							: "border-line p-[26px_24px]"
					}`}
				>
					<Field className='mb-0' orientation='horizontal'>
						<FieldContent>
							<Image src={OrgLogo} alt='' width={44} height={44} />
							<FieldTitle className='font-display font-bold text-ink text-[22px] mt-3.5'>
								{dict.orgTitle}
							</FieldTitle>
							<FieldDescription className='text-start font-cairo font-semibold text-[13px] text-ink-soft leading-[1.9] mt-1.5'>
								{dict.orgDesc}
							</FieldDescription>
						</FieldContent>
						<RadioGroupItem
							value='org'
							id='c-org'
							indicator={<CheckIndicator checked={value === "org"} />}
						/>
					</Field>
				</FieldLabel>

				<FieldLabel
					htmlFor='c-pub'
					className={`relative block rounded-[22px] bg-surface border cursor-pointer transition-[border-color] duration-150 hover:border-green-deep focus-visible:outline-2 focus-visible:outline-green-deep focus-visible:outline-offset-2 ${
						value === "pub"
							? "border-2 border-green-deep p-[25px_23px]"
							: "border-line p-[26px_24px]"
					}`}
				>
					<Field className='mb-0' orientation='horizontal'>
						<FieldContent>
							<Image src={PubLogo} alt='' width={44} height={44} />
							<FieldTitle className='font-display font-bold text-ink text-[22px] mt-3.5'>
								{dict.pubTitle}
							</FieldTitle>
							<FieldDescription className='text-start font-cairo font-semibold text-[13px] text-ink-soft leading-[1.9] mt-1.5'>
								{dict.pubDesc}
							</FieldDescription>
						</FieldContent>
						<RadioGroupItem
							value='pub'
							id='c-pub'
							indicator={<CheckIndicator checked={value === "pub"} />}
						/>
					</Field>
				</FieldLabel>
			</RadioGroup>

			<button
				type='button'
				className='font-cairo inline-block mt-6 min-w-55 text-center bg-green text-ink border-0 rounded-full cursor-pointer font-body font-extrabold text-[15px] py-3.25 px-8.5 transition-colors duration-150 hover:bg-[#B9C9AC] focus-visible:outline-2 focus-visible:outline-green-deep focus-visible:outline-offset-2'
			>
				{dict.submit}
			</button>
		</>
	);
}
