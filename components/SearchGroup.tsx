import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

function SearchGroup({
	title,
	count,
	type,
	linkText,
	children,
}: {
	title: string;
	count?: string;
	type?: string;
	linkText?: string;
	children: React.ReactNode;
}) {
	return (
		<section className='mt-7'>
			<div className='flex items-baseline gap-3 mb-3'>
				<h2 className='font-display font-bold text-lg text-green-deep'>
					{title}
				</h2>
				{count !== undefined && (
					<span className='font-cairo font-extrabold text-xs text-ink-soft'>{count}</span>
				)}
				{linkText && (
					<Link
						href={`/${type}`}
						className='font-cairo ms-auto font-bold text-[12.5px] no-underline text-green-deep hover:underline'
					>
						{linkText}
					</Link>
				)}
			</div>
			{children}
		</section>
	);
}

function SearchGroupList({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("flex flex-col gap-2.5", className)}>{children}</div>
	);
}

function SearchGroupListItem({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"bg-surface border border-line rounded-2xl flex items-center gap-4 p-4 px-5",
				className,
			)}
		>
			{children}
		</div>
	);
}

SearchGroup.List = SearchGroupList;
SearchGroup.ListItem = SearchGroupListItem;

export { SearchGroup };
