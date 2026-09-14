export const wishes = [
	{
		count: 7,
		category: "إنتاج ونشر",
		title: "مطبعة ودار نشر تعاونية",
		description:
			"الطباعة أكبر بند مصاريف عند أغلبنا — مطبعة عضو في الشبكة تقلب التكلفة تبادلًا.",
		endorsers: ["م", "ح", "ص", "م"],
		endorsersText: "أيّدتها: مشكاة، حلقة، صوت وصورة، ملحة +٣",
		isEndorsed: true,
	},
	{
		count: 6,
		category: "خدمات مهنية",
		title: "مؤسسات عون قانوني أكتر",
		description:
			"عقود وتراخيص وملكية فكرية — الطلب على القانوني أعلى من المعروض بكتير.",
		endorsers: ["ح", "ص", "م"],
		endorsersText: "أيّدتها: حلقة، صوت وصورة، ملحة +٣",
		isEndorsed: false,
	},
	{
		count: 5,
		category: "صحة ورعاية",
		title: "عيادة صحة مجتمعية",
		description:
			"رعاية أولية للعاملين في القطاع الثقافي وأُسرهم عبر رعاية الخدمات.",
		endorsers: ["ص", "م", "ح"],
		endorsersText: "أيّدتها: صوت وصورة، ملحة، حلقة +٢",
		isEndorsed: false,
	},
	{
		count: 4,
		category: "صحة ورعاية",
		title: "حضانات ورعاية أطفال للعاملين",
		description: "علشان الأمهات والآباء في فرقنا يقدروا يشتغلوا وقلبهم مطمّن.",
		endorsers: ["م", "ح"],
		endorsersText: "أيّدتها: ملحة، حلقة +٢",
		isEndorsed: false,
	},
	{
		count: 2,
		category: "خدمات مهنية",
		title: "مجموعة ترجمة تعاونية",
		description:
			"ترجمة أدبية وفنية متخصصة — أبعد من الترجمة العامة المتاحة حاليًّا.",
		endorsers: ["ص", "ح"],
		endorsersText: "أيّدتها: صوت وصورة، حلقة",
		isEndorsed: false,
	},
];

export const filterButtons = [
	{ id: "sort", labelKey: "filter.mostEndorsed" },
	{ id: "latest", labelKey: "filter.latest" },
	{ id: "professional", labelKey: "filter.professionalServices" },
	{ id: "health", labelKey: "filter.healthCare" },
	{ id: "spaces", labelKey: "filter.spaces" },
	{ id: "production", labelKey: "filter.production" },
];
