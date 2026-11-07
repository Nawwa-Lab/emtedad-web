export type ActivityDetail = {
  id: string
  category: string
  seatsLeft: string
  title: string
  description: string
  facts: {
    seats: string
    date: string
    time: string
    place: string
    deadline: string
  }
  program: string[]
  audience: string[]
  formula: string
  price: string
  provider: {
    profileHref: string
    nameKey: 'sawt' | 'halaqa'
  }
  ratingCount: string
  allowance: {
    remaining: string
    total: string
    price: string
    over: string
    usedPercent: number
  }
}

const activities: ActivityDetail[] = [
  {
    id: 'g1',
    category: 'ورشة',
    seatsLeft: '٦',
    title: 'ورشة بودكاست للمبتدئين',
    description:
      'يومان في التسجيل والمونتاج الأساسي. بنبدأ من الفكرة والسكريبت، وبننتهي بمقطع مسجَّل ومعمول له مكساج في الاستوديو. مش محتاج خبرة سابقة ولا معدات — كل حاجة موجودة في المكان.',
    facts: {
      seats: '١٢ — فاضل ٦',
      date: '١٢ و١٣ سبتمبر',
      time: '٥ — ٩ مساءً',
      place: 'استوديو صوت وصورة — وسط البلد',
      deadline: '٩ سبتمبر',
    },
    program: [
      'اليوم الأول: الفكرة والسكريبت وأساسيات الصوت',
      'اليوم التاني: التسجيل والمونتاج والنشر على المنصات',
      'التسليم: مقطع بصوتك جاهز للنشر + ملف المشروع',
    ],
    audience: [
      'مبتدئين مالهمش خبرة سابقة في التسجيل',
      'العاملين في المؤسسات الثقافية اللي عايزين يوثّقوا شغلهم صوتيًّا',
    ],
    formula:
      '(ساعات المقدِّمين × سعر الساعة) ÷ عدد المقاعد = (١٢ ساعة × ٤٥ شهمهم) ÷ ١٢ مقعدًا = ٤٥ شهمهم للمقعد.',
    price: '٤٥',
    provider: {
      profileHref: '/organization/123',
      nameKey: 'sawt',
    },
    ratingCount: '٤٨',
    allowance: {
      remaining: '١٠',
      total: '٢٥',
      price: '٤٥',
      over: '٣٥',
      usedPercent: 40,
    },
  },
  {
    id: 'g7',
    category: 'ورشة',
    seatsLeft: '٤',
    title: 'ورشة تصوير بالموبايل — يوم واحد',
    description:
      'يوم واحد بنتعلم فيه أساسيات التصوير بالموبايل: الإضاءة والتكوين وتحرير الصور. هتخرج بصور جاهزة للنشر ومجموعة صور شخصية.',
    facts: {
      seats: '١٦ — فاضل ٤',
      date: '٢٠ سبتمبر',
      time: '١١ ص — ٤ م',
      place: 'عند حلقة',
      deadline: '١٧ سبتمبر',
    },
    program: [
      'الصبح: أساسيات الإضاءة والتكوين',
      'بعد الضهر: تطبيق عملي وتحرير الصور',
      'التسليم: مجموعة صور جاهزة للنشر',
    ],
    audience: ['مبتدئين في التصوير', 'أي حد عايز يطلع صور أحسن من موبايله'],
    formula:
      '(ساعات المقدِّمين × سعر الساعة) ÷ عدد المقاعد = (٥ ساعات × ٤٨ شهمهم) ÷ ١٦ مقعدًا = ١٥ شهمهم للمقعد.',
    price: '١٥',
    provider: {
      profileHref: '/organization/456',
      nameKey: 'halaqa',
    },
    ratingCount: '٣٢',
    allowance: {
      remaining: '٢٥',
      total: '٢٥',
      price: '١٥',
      over: '٠',
      usedPercent: 0,
    },
  },
]

export function findActivity(id: string) {
  return activities.find((activity) => activity.id === id) ?? activities[0]
}
