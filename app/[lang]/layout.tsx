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

export async function generateStaticParams() {
	return [{ lang: "ar" }, { lang: "en" }];
}

export default async function RootLayout({
	children,
	params,
}: LayoutProps<"/[lang]">) {
	const { lang } = await params;
	const dir = lang === "ar" ? "rtl" : "ltr";
	return (
		<html lang={lang} dir={dir}>
			<body
				className={`min-h-full flex flex-col ${cairoFont.variable} ${alexandriaFont.variable}`}
			>
				{children}
			</body>
		</html>
	);
}
