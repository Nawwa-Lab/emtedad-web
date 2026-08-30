"use client";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export function NotificationText({
	notificationsCount = 3,
}: {
	notificationsCount?: number;
}) {
	const tSidebar = useTranslations("sidebar");
	const locale = useLocale();

	return (
		<Link
			href='/notifications'
			className='flex sm:hidden relative flex-1 items-center justify-between gap-2 rounded-2xl border border-line-soft bg-paper p-2.5'
			aria-label={tSidebar("notifications")}
		>
			<span className='font-cairo flex items-center gap-2.5 font-bold text-sm rounded-xl py-2.5 px-3.5 decoration-0'>
				{tSidebar("notifications")}
			</span>
			<span className='relative font-cairo w-4.5 h-4.5 rounded-full bg-gold text-ink text-xs grid place-items-center'>
				{notificationsCount.toLocaleString(
					locale === "ar" ? "ar-SA" : "en-US",
					{ minimumIntegerDigits: notificationsCount < 10 ? 1 : 2 },
				)}
			</span>
		</Link>
	);
}
