"use client";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { DialogHeader } from "./ui/dialog";

export function QuickAction() {
	const t = useTranslations("quickAction");
	return (
		<>
			<DialogHeader>
				<DialogTitle className='font-display font-bold text-2xl'>
					{t("title")}
				</DialogTitle>
				<DialogDescription className='font-cairo text-ink-soft text-sm mt-1 mb-5'>
					{t("description")}
				</DialogDescription>
			</DialogHeader>
			<div className='bg-paper border border-line-soft mb-5 p-4.5 rounded-2xl'>
				<div className='flex items-baseline gap-2.5 mb-3'>
					<span className='font-display font-bold text-green-deep text-lg'>
						{t("namliyaTitle")}
					</span>
					<span className='font-semibold text-xs text-ink-soft font-cairo'>
						{t("namliyaDesc")}
					</span>
				</div>
				<div className='flex flex-wrap gap-2'>
					<Link
						className='inline-block decoration-0 bg-surface border border-line font-bold rounded-full text-ink text-xs font-cairo py-2 px-4'
						href='#'
					>
						{t("humanService")}
					</Link>
					<Link
						className='inline-block decoration-0 bg-surface border border-line font-bold rounded-full text-ink text-xs font-cairo py-2 px-4'
						href='#'
					>
						{t("materialResource")}
					</Link>
				</div>
			</div>
			<div className='bg-paper border border-line-soft mb-5 p-4.5 rounded-2xl'>
				<div className='flex items-baseline gap-2.5 mb-3'>
					<span className='font-display font-bold text-green-deep text-lg'>
						{t("khalisTitle")}
					</span>
					<span className='font-semibold text-xs text-ink-soft font-cairo'>
						{t("khalisDesc")}
					</span>
				</div>
				<div className='flex flex-wrap gap-2'>
					<Link
						className='inline-block decoration-0 bg-surface border border-line font-bold rounded-full text-ink text-xs font-cairo py-2 px-4'
						href='#'
					>
						{t("workshop")}
					</Link>
					<Link
						className='inline-block decoration-0 bg-surface border border-line font-bold rounded-full text-ink text-xs font-cairo py-2 px-4'
						href='#'
					>
						{t("course")}
					</Link>
					<Link
						className='inline-block decoration-0 bg-surface border border-line font-bold rounded-full text-ink text-xs font-cairo py-2 px-4'
						href='#'
					>
						{t("culturalProgram")}
					</Link>
					<Link
						className='inline-block decoration-0 bg-surface border border-line font-bold rounded-full text-ink text-xs font-cairo py-2 px-4'
						href='#'
					>
						{t("event")}
					</Link>
					<Link
						className='inline-block decoration-0 bg-surface border border-line font-bold rounded-full text-ink text-xs font-cairo py-2 px-4'
						href='#'
					>
						{t("humanService")}
					</Link>
					<Link
						className='inline-block decoration-0 bg-surface border border-line font-bold rounded-full text-ink text-xs font-cairo py-2 px-4'
						href='#'
					>
						{t("materialResource")}
					</Link>
				</div>
			</div>
			<div className='bg-paper border border-line-soft mb-5 p-4.5 rounded-2xl'>
				<div className='flex items-baseline gap-2.5 mb-3'>
					<span className='font-display font-bold text-green-deep text-lg'>
						{t("qalishTitle")}
					</span>
					<span className='font-semibold text-xs text-ink-soft font-cairo'>
						{t("qalishDesc")}
					</span>
				</div>
				<div className='flex flex-wrap gap-2'>
					<Link
						className='inline-block decoration-0 bg-surface border border-line font-bold rounded-full text-ink text-xs font-cairo py-2 px-4'
						href='#'
					>
						{t("newRequest")}
					</Link>
				</div>
			</div>
			<p className='font-semibold text-xs mt-1.5 text-ink-soft font-cairo'>
				{t("footer")}
			</p>
		</>
	);
}
