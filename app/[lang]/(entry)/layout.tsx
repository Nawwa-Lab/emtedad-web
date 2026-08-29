import Logo from "@/app/logo.svg";
import Image from "next/image";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='relative sm:min-h-screen sm:overflow-hidden  min-h-auto flex flex-col items-center justify-center py-12 px-5 gap-6 dot-grid-bg'>
			<div className='text-center'>
				<Image src={Logo} alt='Emtedad Logo' className='mx-auto mb-2.5' />
				<div className='font-display font-bold text-[40px]/[1.3] text-green-deep'>
					امتداد
				</div>
			</div>
			{children}
		</main>
	);
}
