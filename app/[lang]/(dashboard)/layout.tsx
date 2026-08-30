import { Header } from "@/components/Header";
import { SidebarNavMenu } from "@/components/SidebarNavMenu";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const messages = await getMessages();
	return (
		<NextIntlClientProvider messages={messages}>
			<Header />
			<div className='flex flex-1 overflow-hidden'>
				<SidebarNavMenu />
				<main className='flex-1 overflow-y-auto p-8'>
					<div className='max-w-300 m-auto'>{children}</div>
				</main>
			</div>
		</NextIntlClientProvider>
	);
}
