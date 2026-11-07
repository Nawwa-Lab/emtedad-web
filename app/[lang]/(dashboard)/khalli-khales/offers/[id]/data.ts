export type KhalliKhalesOfferDetail = {
  id: string
  category: string
  title: string
  description: string
  facts: {
    hours: string
    hourlyRate: string
    availability: string
    delivery: string
  }
  deliverables: string[]
  formula: string
  price: string
  provider: {
    name: string
    profileHref: string
  }
  ratingCount: string
  requestHref: string
}

const offers: KhalliKhalesOfferDetail[] = [
  {
    id: 'k1',
    category: 'ترجمة',
    title: 'ترجمة عربي ⇄ إنجليزي للمواد الثقافية',
    description:
      'ترجمة التقارير والمواد التعريفية والبيانات الصحفية بمصطلحات القطاع الثقافي، مع مراجعة لغوية نهائية. بشتغل على النص كامل مش مقاطع، وبرجع لكم بأسئلة لو فيه مصطلح داخلي بيخص مؤسستكم.',
    facts: {
      hours: '٤ ساعات',
      hourlyRate: '٥ شهمهم',
      availability: 'متاحة أي وقت',
      delivery: 'حسب عدد الصفحات',
    },
    deliverables: [
      'ملف مترجم ومنسّق بنفس تنسيق الأصل',
      'مراجعة لغوية نهائية قبل التسليم',
      'جولة تعديلات واحدة مشمولة',
    ],
    formula: 'عدد ساعات الخدمة × سعر الساعة = ٤ ساعات × ٥ شهمهم = ٢٠ شهمهم.',
    price: '٢٠',
    provider: {
      name: 'نادية كمال',
      profileHref: '/member/nadia',
    },
    ratingCount: '٢٢',
    requestHref: '/namliya/requests/create',
  },
]

export function findOffer(id: string) {
  return offers.find((offer) => offer.id === id) ?? offers[0]
}
