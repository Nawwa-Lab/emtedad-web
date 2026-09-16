"use client";

import { Form, FormControl } from "@/components/Form";
import { HelpCard } from "@/components/HelpCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { WishSearch } from "@/components/WishSearch";
import { createWishSchema, WishFormValues } from "@/types/schemas/wish-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

interface WishFormProps {
	mode: "add" | "edit";
	initialWish?: Partial<WishFormValues>;
}

export function WishForm({ mode, initialWish }: WishFormProps) {
	const t = useTranslations("genny.addWish");
	const tf = useTranslations("genny.browse.filter");

	const schema = useMemo(
		() =>
			createWishSchema({
				titleRequired: t("titleRequired"),
				titleMin: t("titleMin"),
				descriptionRequired: t("descriptionRequired"),
				descriptionMin: t("descriptionMin"),
				categoryRequired: t("categoryRequired"),
			}),
		[t],
	);

	const onSubmit = (data: WishFormValues) => {
		console.log("wish submit", data);
	};

	const categories = [
		{ value: "spaces" as const, label: tf("spaces") },
		{
			value: "professionalServices" as const,
			label: tf("professionalServices"),
		},
		{ value: "healthCare" as const, label: tf("healthCare") },
		{ value: "production" as const, label: tf("production") },
		{ value: "other" as const, label: t("otherCategory") },
	];

	return (
		<div className='grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start mt-4'>
			<Card className='p-7'>
				<h1 className='font-display font-bold text-[23px]/[1.5] mb-1.5'>
					{mode === "add" ? t("title") : t("editTitle")}
				</h1>
				<p className='font-cairo font-semibold text-xs text-ink-soft mb-4.5'>
					{t("subtitle")}
				</p>
				<WishSearch
					label={t("dupeLabel")}
					searchAriaLabel={t("dupeSearchAria")}
					queryRequired={t("queryRequired")}
					endorsedCountLabel={(count) => t("endorsedCount", { count })}
					endorseLabel={t("endorseInstead")}
				/>
				<Form
					resolver={zodResolver(schema)}
					defaultValues={{
						title: initialWish?.title ?? "",
						description: initialWish?.description ?? "",
						category: initialWish?.category ?? "",
					}}
					onSubmit={onSubmit}
				>
					<FormControl
						name='title'
						label={t("titleLabel")}
						labelFor='wish-title'
					>
						{(field, fieldState) => (
							<Input
								id='wish-title'
								type='text'
								placeholder={t("titlePlaceholder")}
								{...field}
								aria-invalid={fieldState.invalid}
							/>
						)}
					</FormControl>
					<FormControl
						name='description'
						label={t("descriptionLabel")}
						labelFor='wish-desc'
					>
						{(field, fieldState) => (
							<textarea
								id='wish-desc'
								placeholder={t("descriptionPlaceholder")}
								className='w-full bg-paper border border-line rounded-xl py-3 px-4 font-cairo font-semibold text-sm text-ink min-h-25 resize-y focus:outline-2 focus:outline-green-deep focus:outline-offset-1 focus:border-green-deep'
								{...field}
								aria-invalid={fieldState.invalid}
							/>
						)}
					</FormControl>
					<FormControl
						name='category'
						label={t("categoryLabel")}
						labelFor='wish-category'
					>
						{(field, fieldState) => (
							<Select
								name={field.name}
								value={field.value}
								onValueChange={field.onChange}
								items={categories}
							>
								<SelectTrigger
									size='lg'
									id='wish-category'
									aria-invalid={fieldState.invalid}
								>
									<SelectValue placeholder='-' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{categories.map((cat) => (
											<SelectItem key={cat.value} value={cat.value}>
												{cat.label}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						)}
					</FormControl>
					<Button
						type='submit'
						className='bg-green text-ink font-extrabold text-sm py-3 px-7 rounded-full'
					>
						{mode === "add" ? t("submitAdd") : t("submitEdit")}
					</Button>
				</Form>
			</Card>
			<HelpCard
				title={t("tipsTitle")}
				tips={[t("tip1"), t("tip2"), t("tip3")]}
			/>
		</div>
	);
}
