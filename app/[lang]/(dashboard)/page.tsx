"use client";
import Logo from "@/app/logo.svg";
import { QuickAction } from "@/components/QuickAction";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
export const iframeHeight = "800px";

export const description = "A sidebar with a header and a search form.";

export default function Page() {
	const t = useTranslations("dashboard");
	return (
		<div className='relative min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center gap-6 dot-grid-bg'>
			<div className='text-center'>
				<Image src={Logo} alt='Emtedad Logo' className='mx-auto mb-3.5' />
				<div className='font-display font-bold text-[30px] text-ink'>
					{t("title")}
				</div>
				<p className='mt-2 font-semibold text-[14.5px]/[2] text-ink-soft text-center font-cairo'>
					{t("description")}
				</p>
				<div className='mt-6 flex flex-col sm:flex-row items-center justify-center gap-2'>
					<Dialog>
						<DialogTrigger className=' bg-green text-ink border-0 rounded-full cursor-pointer no-underline font-cairo font-extrabold text-sm py-3.25 px-6.5 whitespace-nowrap'>
							{t("quickAction")}
						</DialogTrigger>
						<DialogContent>
							<QuickAction />
						</DialogContent>
					</Dialog>
					<Link
						href='/namliya'
						className='inline-block text-green-deep border-green-deep border rounded-full font-cairo font-bold text-sm py-3 px-6.5'
					>
						{t("watchNamliya")}
					</Link>
				</div>
			</div>
		</div>
	);
}
