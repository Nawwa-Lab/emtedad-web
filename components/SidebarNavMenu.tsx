"use client";
import { QuickAction } from "@/components/QuickAction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@base-ui/react";
import { useTranslations } from "next-intl";
import { NotificationText } from "./NotificationText";

const navLinks = [
	{ href: "/maktab", label: "maktab" },
	{ href: "/namliya", label: "namliya" },
	{ href: "#", label: "khalis" },
	{ href: "#", label: "have_qalish" },
	{ href: "/hakima", label: "hakima" },
	{ href: "#", label: "jni" },
	{ type: "separator" as const },
	{ href: "#", label: "taabat" },
	{ href: "#", label: "check_mihs" },
];

export function SidebarNavMenu({
	mobileView = false,
}: {
	mobileView?: boolean;
}) {
	const pathname = usePathname();
	const tNav = useTranslations("navigation");
	const tSidebar = useTranslations("sidebar");
	const tHeader = useTranslations("header");

	const links = navLinks.map((link) => {
		if (link.type === "separator") return { type: "separator" as const };
		return { href: link.href, label: tNav(link.label) };
	});

	return (
		<nav
			className={cn(
				"sm:w-52.5 sm:shrink-0 bg-surface sm:border-e sm:border-line py-4.5 px-3 sm:flex sm:flex-col sm:overflow-y-auto hidden",
				mobileView ? "flex flex-col p-0" : "hidden",
			)}
			aria-label={tSidebar("mainNavAriaLabel")}
		>
			<Dialog>
				<DialogTrigger
					className={cn(
						"sm:hidden bg-green text-ink border-0 rounded-full cursor-pointer no-underline font-cairo font-extrabold text-sm py-2.5 px-5 whitespace-nowrap ",
						mobileView && "mb-3",
					)}
				>
					{tSidebar("quickAction")}
				</DialogTrigger>
				<DialogContent>
					<QuickAction />
				</DialogContent>
			</Dialog>
			{links.map((link, index) => {
				if (link.type === "separator") {
					return (
						<Separator
							className='h-px bg-line-soft my-2.5 mx-1.5'
							key={`sep-${index}`}
						/>
					);
				}
				const isActive = pathname === link.href;

				return (
					<Link
						key={link.href + String(index)}
						href={link.href}
						className={cn(
							"font-cairo flex items-center gap-2.5 font-bold text-sm rounded-xl py-2.5 px-3.5 mb-1 decoration-0",
							isActive
								? "text-ink bg-green"
								: "text-ink-soft hover:bg-sage hover:text-ink",
							mobileView && "w-full ",
						)}
					>
						{!mobileView && (
							<span
								className={cn(
									"w-2 h-2 rounded-full shrink-0",
									isActive ? "bg-gold-deep" : "bg-line",
								)}
							></span>
						)}
						<span className={cn(mobileView && "text-center w-full")}>
							{link.label}
						</span>
					</Link>
				);
			})}
			<div className='flex flex-1 gap-3'>
				<span
					className={cn(
						"sm:hidden flex flex-1 items-center justify-between gap-2 text-sm font-cairo font-bold text-line-soft bg-sage rounded-full py-2 ps-2 pe-3.5",
					)}
				>
					<span className='whitespace-nowrap text-ink'>
						{tHeader("contextLabel")}
					</span>
					<Link
						href='/context-selection'
						className='text-xs text-green-deep decoration-0 bg-surface rounded-full py-0.75 px-2.5'
					>
						{tHeader("switchContext")}
					</Link>
				</span>
				<NotificationText />
			</div>

			<div
				className={cn(
					"mt-auto flex items-center gap-2.5 bg-paper border border-line-soft rounded-2xl p-3",
					mobileView && "mt-3",
				)}
			>
				<Avatar>
					<AvatarImage src='https://github.com/shadcn.pngg' />
					<AvatarFallback className='bg-green'>C</AvatarFallback>
				</Avatar>
				<span>
					<span className='font-cairo block font-extrabold text-[13px] text-ink'>
						{tSidebar("orgName")}
					</span>
					<Link
						href='/organization/123'
						className='font-cairo font-bold text-[11px] no-underline text-green-deep'
					>
						{tSidebar("publicProfile")}
					</Link>
				</span>
			</div>
		</nav>
	);
}
