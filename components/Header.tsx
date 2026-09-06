"use client";
import { QuickAction } from "@/components/QuickAction";
import { SidebarNavMenu } from "@/components/SidebarNavMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { Menu, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { NotificationBell } from "./NotificationBell";

export function Header() {
	const t = useTranslations("header");
	return (
		<header className='flex items-center gap-4 bg-surface border-b border-line py-3 px-6 shrink-0'>
			<Dialog>
				<DialogTrigger className='sm:hidden'>
					<Menu className='stroke-green-deep' />
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<div className='w-[calc(100%-2rem)] flex items-center justify-between mb-5 gap-2'>
							<Input
								className=' sm:w-[min(420px, 32vw)] sm:h-auto h-8.5 border-line-soft rounded-full py-2 px-4.5 '
								type='search'
								placeholder={t("searchPlaceholder")}
								aria-label={t("searchAriaLabel")}
							/>
							<Search
								type='button'
								className='bg-green-deep size-8.5 rounded-full p-2 stroke-sage shrink-0 cursor-pointer hover:bg-green-deep/90'
							/>
						</div>
					</DialogHeader>
					<SidebarNavMenu mobileView />
				</DialogContent>
			</Dialog>
			<Link
				className='font-display font-bold text-xl text-green-deep decoration-0'
				href='/'
			>
				{t("logo")}
			</Link>
			<Input
				className='hidden sm:block w-[min(420px, 32vw)] border-line-soft rounded-full py-2 px-4.5'
				type='search'
				placeholder={t("searchPlaceholder")}
				aria-label={t("searchAriaLabel")}
			/>
			<div className='flex-1'></div>

			<Dialog>
				<DialogTrigger className='hidden sm:block bg-green text-ink border-0 rounded-full cursor-pointer no-underline font-cairo font-extrabold text-sm py-2.5 px-5 whitespace-nowrap'>
					{t("quickAction")}
				</DialogTrigger>
				<DialogContent>
					<QuickAction />
				</DialogContent>
			</Dialog>
			<NotificationBell />
			<div className='flex items-center gap-2.5'>
				<span className='hidden sm:flex items-center gap-2 text-sm font-cairo font-bold text-line-soft bg-sage rounded-full py-2 ps-2 pe-3.5'>
					<span className='whitespace-nowrap text-ink'>
						{t("contextLabel")}
					</span>
					<Link
						href='/context-selection'
						className='text-xs text-green-deep decoration-0 bg-surface rounded-full py-0.75 px-2.5'
					>
						{t("switchContext")}
					</Link>
				</span>
				<Avatar>
					<AvatarImage src='https://github.com/shadcn.pngg' />
					<AvatarFallback className='bg-gold'>C</AvatarFallback>
				</Avatar>
			</div>
		</header>
	);
}
