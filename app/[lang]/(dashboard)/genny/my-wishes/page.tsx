"use client";

import { WishCard } from "@/components/WishCard";
import { useTranslations } from "next-intl";
import { myWishes } from "./data";

export default function MyWishesPage() {
	const t = useTranslations("genny.myWishes");

	return (
		<>
			{myWishes.map((wish, index) => (
				<WishCard key={index} {...wish} mode='mine' />
			))}
		</>
	);
}
