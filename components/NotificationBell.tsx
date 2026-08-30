"use client";
import { Link } from "@/i18n/navigation";
import { BellIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export function NotificationBell({
	notificationsCount = 3,
}: {
	notificationsCount?: number;
}) {
	const tSidebar = useTranslations("sidebar");
	const locale = useLocale();

	return (
		<Link
			href='/notifications'
			className='hidden sm:flex relative w-9.5 h-9.5 p-2.5 rounded-full border border-line-soft items-center justify-center bg-paper'
			aria-label={tSidebar("notifications")}
		>
			<BellIcon className='w-auto stroke-ink-soft' />
			<span className='absolute font-cairo -top-1 -inset-s-1.25 w-4.5 h-4.5 rounded-full bg-gold text-ink text-xs grid place-items-center'>
				{notificationsCount.toLocaleString(
					locale === "ar" ? "ar-SA" : "en-US",
					{ minimumIntegerDigits: notificationsCount < 10 ? 1 : 2 },
				)}
			</span>
		</Link>
	);
}
