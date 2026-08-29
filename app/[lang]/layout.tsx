import type { Locale } from "@/types";
import type { Metadata } from "next";
import { Alexandria, Cairo } from "next/font/google";
import "./globals.css";

const cairoFont = Cairo({
	weight: ["500", "600", "700", "800"],
	subsets: ["arabic"],
	variable: "--cairo-font",
	display: "block",
});

const alexandriaFont = Alexandria({
	weight: ["600", "700"],
	subsets: ["arabic"],
	variable: "--alex-font",
	display: "block",
});

export const metadata: Metadata = {
	title: "Emtedad",
	description: "Emtedad UI",
};

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	const dir = (lang as Locale) === "ar" ? "rtl" : "ltr";
	return (
		<html lang={lang} dir={dir}>
			<body
				className={`h-screen flex flex-col relative ${cairoFont.variable} ${alexandriaFont.variable} bg-paper`}
			>
				{children}
			</body>
		</html>
	);
}
