"use client";

import { SearchGroup } from "@/components/SearchGroup";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { formatNumber } from "@/utils/formatter";
import { useLocale, useTranslations } from "next-intl";
import { use } from "react";

const NAMLIYA_OFFERS = [
	{
		title: "تصميم مطبوعات وهوية للفعاليات",
		mini: "ع",
		meta: "مشكاة · عامر · متاح أي مدة",
		price: 40,
	},
	{
		title: "تصميم أدلة ومطبوعات تعليمية",
		mini: "ع",
		meta: "حلقة · عامر · محدد حتى ٣٠ سبتمبر",
		price: 55,
	},
];

const KHALIS_OFFERS = [
	{
		title: "تصميم سوشيال ميديا — مصممة مستقلة",
		mini: "ك",
		miniGold: true,
		meta: "سارة حسن · كريم · متاح أي مدة",
		price: 35,
	},
];

const QALISH_REQUESTS = [
	{
		title: "محتاجين تصميم موشن جرافيك لحملة توعية",
		mini: "م",
		meta: "ملحة · نُشر من ٣ أيام · ٢ ردود «عندي»",
	},
];

const MEMBERS = [{ av: "ع", name: "عمر السيد" }];

const VALID_FILTERS = [
	"all",
	"namliya",
	"khalis",
	"qalish",
	"members",
] as const;
type FilterKey = (typeof VALID_FILTERS)[number];

function isValidFilter(f: string): f is FilterKey {
	return (VALID_FILTERS as readonly string[]).includes(f);
}

export default function SearchPage({
	params,
}: {
	params: Promise<{ term: string; filter: string }>;
}) {
	const { term, filter: rawFilter } = use(params);
	const decoded = decodeURIComponent(term);
	const filter: FilterKey = isValidFilter(rawFilter) ? rawFilter : "all";
	const t = useTranslations("search");
	const tNav = useTranslations("navigation");
	const locale = useLocale();

	const filters = [
		{ key: "all" as const, label: t("filterAll", { count: 5 }) },
		{ key: "namliya" as const, label: `${tNav("namliya", { count: 2 })}` },
		{ key: "khalis" as const, label: `${tNav("khalis", { count: 1 })}` },
		{ key: "qalish" as const, label: `${tNav("have_qalish", { count: 1 })}` },
		{ key: "members" as const, label: `${t("members", { count: 1 })}` },
	];

	const showNamliya = filter === "all" || filter === "namliya";
	const showKhalis = filter === "all" || filter === "khalis";
	const showQalish = filter === "all" || filter === "qalish";
	const showMembers = filter === "all" || filter === "members";

	return (
		<>
			<h1 className='font-display font-bold text-[26px] leading-normal'>
				{t("heading", { term: decoded })}
			</h1>
			<p className='font-semibold text-[13.5px] text-ink-soft mt-1'>
				{t("resultCount", { count: formatNumber(5, { locale }) })}
			</p>

			{/* Filters */}
			<div className='flex flex-wrap gap-2 mt-5 mb-2'>
				{filters.map((f) => (
					<Badge key={f.key} variant={filter === f.key ? "default" : "outline"}>
						<Link href={`/search/${term}/${f.key}`}>{f.label}</Link>
					</Badge>
				))}
			</div>

			<div className='h-px bg-line' />

			{/* Namliya offers */}
			{showNamliya && (
				<SearchGroup
					title={t("namliyaOffers")}
					count={formatNumber(2, { locale })}
					linkText={t("viewAllNamliya")}
					type='namliya'
				>
					<SearchGroup.List>
						{NAMLIYA_OFFERS.map((o) => (
							<SearchGroup.ListItem key={o.title}>
								<div className='flex-1 min-w-0'>
									<span className='inline-block font-bold text-[10.5px] text-green-deep bg-green-deep/12 rounded-full py-[3px] px-2.5 mb-1.5'>
										{t("catDesign")}
									</span>
									<h3 className='font-cairo font-extrabold text-[15px] leading-[1.6]'>
										{o.title}
									</h3>
									<div className='font-cairo flex items-center gap-2 font-semibold text-xs text-ink-soft mt-1 flex-wrap'>
										<Avatar size='sm' className='bg-green'>
											<AvatarFallback>{o.mini}</AvatarFallback>
										</Avatar>
										{o.meta}
									</div>
								</div>
								<div className='flex items-center gap-3.5 shrink-0'>
									<span className='font-cairo font-extrabold text-base'>
										{formatNumber(o.price, { locale })}
										<small className='font-display font-semibold text-[11px] text-gold-deep ms-0.5'>
											{t("shahama")}
										</small>
									</span>
									<Link
										href='#'
										className='inline-block no-underline border border-green-deep text-green-deep bg-transparent rounded-full font-cairo font-bold text-[12.5px] py-2 px-4.5 cursor-pointer hover:bg-sage'
									>
										{t("order")}
									</Link>
								</div>
							</SearchGroup.ListItem>
						))}
					</SearchGroup.List>
				</SearchGroup>
			)}

			{/* Khalis offers */}
			{showKhalis && (
				<SearchGroup
					title={t("khalisOffers")}
					count={formatNumber(5, { locale })}
					type=''
					linkText={t("viewAllKhalis")}
				>
					<SearchGroup.List>
						{KHALIS_OFFERS.map((o) => (
							<SearchGroup.ListItem key={o.title}>
								<div className='flex-1 min-w-0'>
									<span className='inline-block font-bold text-[10.5px] text-green-deep bg-green-deep/12 rounded-full py-[3px] px-2.5 mb-1.5'>
										{t("catPublicToOrgs")}
									</span>
									<h3 className='font-cairo font-extrabold text-[15px] leading-[1.6]'>
										{o.title}
									</h3>
									<div className='font-cairo flex items-center gap-2 font-semibold text-xs text-ink-soft mt-1 flex-wrap'>
										<Avatar
											size='sm'
											className={o.miniGold ? "bg-gold" : "bg-green"}
										>
											<AvatarFallback>{o.mini}</AvatarFallback>
										</Avatar>
										{o.meta}
									</div>
								</div>
								<div className='flex items-center gap-3.5 shrink-0'>
									<span className='font-cairo font-extrabold text-base'>
										{formatNumber(o.price, { locale })}
										<small className='font-display font-semibold text-[11px] text-gold-deep ms-0.5'>
											{t("shahama")}
										</small>
									</span>
									<Link
										href='#'
										className='inline-block no-underline border border-green-deep text-green-deep bg-transparent rounded-full font-cairo font-bold text-[12.5px] py-2 px-4.5 cursor-pointer hover:bg-sage'
									>
										{t("order")}
									</Link>
								</div>
							</SearchGroup.ListItem>
						))}
					</SearchGroup.List>
				</SearchGroup>
			)}

			{/* Qalish requests */}
			{showQalish && (
				<SearchGroup
					title={t("qalishRequests")}
					count={formatNumber(1, { locale })}
					linkText={t("viewAllRequests")}
					type=''
				>
					<SearchGroup.List>
						{QALISH_REQUESTS.map((o) => (
							<SearchGroup.ListItem key={o.title}>
								<div className='flex-1 min-w-0'>
									<span className='inline-block font-bold text-[10.5px] rounded-full py-[3px] px-2.5 mb-1.5 bg-gold/20 text-gold-deep'>
										{t("catRequest")}
									</span>
									<h3 className='font-cairo font-extrabold text-[15px] leading-[1.6]'>
										{o.title}
									</h3>
									<div className='font-cairo flex items-center gap-2 font-semibold text-xs text-ink-soft mt-1 flex-wrap'>
										<Avatar size='sm' className='bg-green'>
											<AvatarFallback>{o.mini}</AvatarFallback>
										</Avatar>
										{o.meta}
									</div>
								</div>
								<div className='flex items-center gap-3.5 shrink-0'>
									<Link
										href='#'
										className='bg-green text-ink border-0 rounded-full cursor-pointer no-underline font-cairo font-extrabold text-sm py-2.5 px-5 whitespace-nowrap'
									>
										{t("iHave")}
									</Link>
								</div>
							</SearchGroup.ListItem>
						))}
					</SearchGroup.List>
				</SearchGroup>
			)}

			{/* Members */}
			{showMembers && (
				<SearchGroup title={t("members")} count={formatNumber(1, { locale })}>
					<SearchGroup.List>
						{MEMBERS.map((m) => (
							<SearchGroup.ListItem key={m.name}>
								<Avatar size='lg' className='bg-sage border border-line-soft'>
									<AvatarFallback className='text-green-deep'>
										{m.av}
									</AvatarFallback>
								</Avatar>
								<span className='flex-1'>
									<span className='font-cairo font-extrabold text-[14.5px] block'>
										{m.name}
									</span>
									<span className='font-cairo font-semibold text-xs text-ink-soft'>
										{t("visualDesigner")}
									</span>
								</span>
								<span className='font-cairo inline-flex items-center gap-1.5 font-extrabold text-[11.5px] rounded-full py-1 px-3 bg-gold text-ink'>
									{t("kareem")}
								</span>
								<Link
									href='#'
									className='inline-block no-underline border border-green-deep text-green-deep bg-transparent rounded-full font-cairo font-bold text-[12.5px] py-2 px-4.5 cursor-pointer hover:bg-sage'
								>
									{t("profile")}
								</Link>
							</SearchGroup.ListItem>
						))}
					</SearchGroup.List>
				</SearchGroup>
			)}
		</>
	);
}
