export type Market = 'namliya' | 'khalli' | 'alaesh'

export type OrganizationListing = {
  title: string
  category: string
  description: string
  owner: string
  ownerAvatarUrl?: string
  market: Market
  price: number
  kind: 'service' | 'resource' | 'request'
  rating?: 'عامر' | 'كريم' | 'أحسن عندك'
  note?: string
  details?: {
    description: string
    facts: Array<[label: string, value: string]>
    sectionTitle: string
    items: string[]
  }
}

export const humanServices: OrganizationListing[] = [
  {
    title: 'تصوير وتوثيق فعاليات بالفيديو',
    category: 'إنتاج',
    description: 'تغطية كاملة لفعاليتكم من التحضير للقطة الأخيرة — تصوير بكاميرتين وصوت نظيف.',
    market: 'namliya',
    owner: 'كريم فوزي',
    price: 35,
    kind: 'service',
    rating: 'عامر',
    details: {
      description:
        'تغطية كاملة لفعاليتكم — من التحضير للقطة الأخيرة: تصوير بكاميرتين، صوت نظيف من المنصة والجمهور، ولقطات تفاصيل بتحكي جوّ الليلة.',
      facts: [
        ['الإتاحة', 'متاح أي مدة'],
        ['التسليم', 'خلال ٤٨ ساعة'],
      ],
      sectionTitle: 'إيه اللي هتستلمه',
      items: ['مادة خام منظمة في مجلدات', 'مقطع ملخّص ٩٠ ثانية', 'ملف صوت منفصل من المنصة'],
    },
  },
  {
    title: 'مونتاج فيديو تعريفي',
    category: 'مونتاج',
    description: 'مونتاج كامل من المادة الخام لنسخة جاهزة للنشر، مع تصحيح ألوان ومكساج صوت.',
    market: 'namliya',
    owner: 'نور علي',
    price: 45,
    kind: 'service',
    rating: 'عامر',
    details: {
      description:
        'مونتاج كامل من المادة الخام لنسخة جاهزة للنشر، مع تصحيح ألوان ومكساج صوت وجولتَي ملاحظات.',
      facts: [
        ['المدة', 'أسبوعان'],
        ['جولات المراجعة', 'جولتان'],
      ],
      sectionTitle: 'إيه اللي هتستلمه',
      items: ['نسخة كاملة ٣ دقائق', 'نسخة مختصرة ٦٠ ثانية', 'ملفات المشروع المفتوحة'],
    },
  },
  {
    title: 'تدريب إدارة مالية للمؤسسات الصغيرة',
    category: 'تدريب',
    description: 'أربع جلسات في الميزانيات والتقارير والتدفق النقدي للمؤسسات الثقافية.',
    market: 'namliya',
    owner: 'هدى سمير',
    price: 50,
    kind: 'service',
    rating: 'كريم',
  },
  {
    title: 'تسجيل ومكساج بودكاست',
    category: 'صوت',
    description: 'تسجيل في الاستوديو أو في موقعكم، مع مكساج ومعالجة صوت جاهزة للمنصات.',
    market: 'khalli',
    owner: 'يوسف عادل',
    price: 30,
    kind: 'service',
    rating: 'كريم',
  },
  {
    title: 'جلسة تصوير شخصية للمبدعين',
    category: 'تصوير',
    description: 'ساعة ونصف في الاستوديو أو في مكانكم، والتسليم ١٥ صورة معدَّلة خلال أسبوع.',
    market: 'khalli',
    owner: 'كريم فوزي',
    price: 25,
    kind: 'service',
    rating: 'عامر',
  },
  {
    title: 'محتاجين مصمّم موشن جرافيك',
    category: 'تصميم',
    description: 'فيديوهان قصيران لحملة توعية عن الأرشفة الصوتية، بأسلوب رسم بسيط.',
    market: 'alaesh',
    owner: 'طلب مفتوح',
    price: 40,
    kind: 'request',
    note: 'قبل ١٥ سبتمبر',
  },
  {
    title: 'مترجم عربي ⇄ إنجليزي للتقارير',
    category: 'ترجمة',
    description: 'ترجمة تقرير سنوي ٤٠ صفحة بمصطلحات القطاع الثقافي.',
    market: 'alaesh',
    owner: 'طلب مفتوح',
    price: 35,
    kind: 'request',
    note: 'مفتوح المدة',
  },
]

export const materialResources: OrganizationListing[] = [
  {
    title: 'كاميرا سينمائية مع عدستين',
    category: 'معدات',
    description: 'كاميرا بحالة ممتازة مع عدستين وثلاث بطاريات وحقيبة صلبة، بإشراف مشغّل من الفريق.',
    market: 'namliya',
    owner: 'بإشراف كريم فوزي',
    price: 30,
    kind: 'resource',
    rating: 'عامر',
    details: {
      description:
        'كاميرا بحالة ممتازة مع عدسة ٢٤–٧٠ وعدسة ٥٠ ثابتة، وثلاث بطاريات وشاحن مزدوج وحقيبة صلبة.',
      facts: [
        ['الإتاحة', 'حتى ٣ أيام'],
        ['تأمين نقدي', '١٬٠٠٠ جنيه'],
      ],
      sectionTitle: 'شروط الاستخدام',
      items: [
        'الاستخدام بإشراف مشغّل من فريقنا — ١٠ شهمهم',
        'الإرجاع بنفس حالة الاستلام',
        'أي عطل بيتعالج ودّيًّا الأول',
      ],
    },
  },
  {
    title: 'استوديو تسجيل مجهّز',
    category: 'مساحات',
    description: 'غرفة معالَجة صوتيًّا مع ميكروفونات ومكسر — بالساعة أو باليوم الكامل.',
    market: 'namliya',
    owner: 'حجز مسبق',
    price: 20,
    kind: 'resource',
    rating: 'عامر',
  },
  {
    title: 'طقم إضاءة للتصوير',
    category: 'معدات',
    description: 'ثلاث وحدات إضاءة مع حوامل وفلاتر، مناسبة للتصوير الداخلي والفعاليات.',
    market: 'namliya',
    owner: 'بإشراف يوسف عادل',
    price: 15,
    kind: 'resource',
    rating: 'كريم',
  },
  {
    title: 'ركن قراءة وعرض للجمهور',
    category: 'موارد',
    description: 'مساحة صغيرة داخل الاستوديو للعرض والقراءة، متاحة للحجز بالساعة.',
    market: 'khalli',
    owner: 'حجز مسبق',
    price: 20,
    kind: 'resource',
    rating: 'كريم',
  },
  {
    title: 'محتاجين مخزن لديكورات المسرح',
    category: 'مساحات',
    description: 'مساحة تخزين جافة ٢٠ متر، لمدة ٣ شهور، في القاهرة الكبرى.',
    market: 'alaesh',
    owner: 'طلب مفتوح',
    price: 20,
    kind: 'request',
    note: 'من أكتوبر',
  },
]

type Review = {
  name: string
  rating: 'عامر' | 'كريم'
  context: string
  text: string
  source: string
}

const reviews: Review[] = [
  {
    name: 'حلقة',
    rating: 'عامر',
    context: 'بعد «تصوير وتوثيق فعاليات» · ١٢ أغسطس',
    text: 'وصلوا قبل الفعالية بساعة زي ما اتفقنا، واشتغلوا من غير ما حد يحس بيهم. المادة الخام وصلتنا منظمة في مجلدات، والملخّص كان جاهز للنشر في يومين.',
    source: 'على نملية · خدمة بشرية',
  },
  {
    name: 'ملحة',
    rating: 'عامر',
    context: 'بعد «تدريب إدارة مالية» · ٢ أغسطس',
    text: 'هدى بسّطت حاجات كنا خايفين منها من سنين. الجلسات كانت عملية، وكل جلسة خرجنا منها بملف نقدر نستخدمه على طول.',
    source: 'على نملية · خدمة بشرية',
  },
  {
    name: 'مشكاة',
    rating: 'كريم',
    context: 'بعد «إعارة كاميرا» · ٢٨ يوليو',
    text: 'الكاميرا وصلت بحالة ممتازة والإشراف كان مفيد جدًّا. التأخير الوحيد كان في موعد الاستلام، واتحلّ بالتفاهم.',
    source: 'على نملية · مورد مادي',
  },
  {
    name: 'نادية كمال',
    rating: 'عامر',
    context: 'بعد «ورشة بودكاست» · ٢٠ يوليو',
    text: 'أول مرة أدخل استوديو حقيقي. خرجت بمقطع بصوتي وبفكرة واضحة أكمّل بيها. الورشة كانت للمبتدئين فعلًا مش بالاسم بس.',
    source: 'على خلي خالص · نشاط',
  },
]

export const satisfactionSections = [
  {
    title: 'التقييم العام',
    subtitle: 'من ٤٨ عضوًا قيّموا صوت وصورة',
    totalReviews: 26,
    counts: [
      ['عامر', 50],
      ['كريم', 20],
      ['أحسن عندك', 4],
    ] as const,
    reviews,
  },
  {
    title: 'الخدمات البشرية',
    subtitle: '٤٧ تقييمًا على خدمات الفريق',
    totalReviews: 19,
    counts: [
      ['عامر', 28],
      ['كريم', 9],
      ['أحسن عندك', 1],
    ] as const,
    reviews: [
      reviews[0],
      {
        name: 'ضي',
        rating: 'كريم',
        context: 'بعد «مونتاج فيديو تعريفي» · ٥ أغسطس',
        text: 'الشغل نضيف والنتيجة عجبتنا، بس جولة الملاحظات التانية اتأخرت أسبوع عن المتفق عليه.',
        source: 'كمقدِّم خدمة · على نملية',
      },
    ],
  },
  {
    title: 'الموارد المادية',
    subtitle: '٢١ تقييمًا على المعدات والمساحات',
    totalReviews: 7,
    counts: [
      ['عامر', 9],
      ['كريم', 4],
      ['أحسن عندك', 2],
    ] as const,
    reviews: [
      reviews[2],
      {
        name: 'حلقة',
        rating: 'عامر',
        context: 'بعد «استوديو تسجيل» · ١٥ يوليو',
        text: 'المكان معالَج صوتيًّا فعلًا، والحجز كان مرن معانا لما اضطرينا نأجّل يوم.',
        source: 'كمشارِك مورد · على نملية',
      },
    ],
  },
  {
    title: 'الجمهور',
    subtitle: '٢٠ تقييمًا من أفراد الجمهور',
    totalReviews: 20,
    counts: [
      ['عامر', 14],
      ['كريم', 5],
      ['أحسن عندك', 1],
    ] as const,
    reviews: [
      reviews[3],
      {
        name: 'كمال درويش',
        rating: 'كريم',
        context: 'بعد «جلسة تصوير شخصية» · ٨ يوليو',
        text: 'الصور طلعت حلوة وطبيعية. كنت متمنّي نسخ أكتر، بس اللي وصلني كان شغل محترم.',
        source: 'على خلي خالص · خدمة',
      },
    ],
  },
] as const

export const memberServices = [
  humanServices[0],
  humanServices[4],
  {
    title: 'الإشراف على كاميرا سينمائية',
    category: 'معدات',
    description: 'بيسلّم الكاميرا ويستلمها ويفحصها مع الطرف التاني، ويشرف على الاستخدام.',
    market: 'namliya',
    owner: 'صوت وصورة',
    price: 10,
    kind: 'service',
    rating: 'عامر',
  },
  {
    title: 'ورشة تصوير للمبتدئين',
    category: 'تدريب',
    description: 'يومان في أساسيات الكاميرا والإضاءة، مع تطبيق عملي في موقع حقيقي.',
    market: 'khalli',
    owner: 'صوت وصورة',
    price: 45,
    kind: 'service',
    rating: 'عامر',
  },
] satisfies OrganizationListing[]

export const memberReviews = [
  {
    ...reviews[0],
    text: 'وصل قبل الفعالية بساعة زي ما اتفقنا، واشتغل من غير ما حد يحس بيه. المادة الخام وصلتنا منظمة في مجلدات حسب التوقيت.',
    source: 'كمقدِّم خدمة · على نملية',
  },
  {
    name: 'ملحة',
    rating: 'عامر',
    context: 'بعد «جلسة تصوير» · ٣٠ يوليو',
    text: 'صبره في التحضير هو اللي فرق. قعد معانا نص ساعة يفهم المكان قبل ما يمسك الكاميرا.',
    source: 'كمقدِّم خدمة · على خلي خالص',
  },
  {
    ...reviews[2],
    text: 'الإشراف كان مفيد وعملي. التأخير الوحيد كان في موعد الاستلام واتحلّ بالتفاهم.',
    source: 'كمشرف على مورد · على نملية',
  },
  {
    ...reviews[3],
    text: 'شرح بسيط من غير تعالي. كنت فاكرة إن الموضوع أصعب من كده بكتير.',
    source: 'كمقدِّم خدمة · على خلي خالص',
  },
] satisfies Review[]

export const teamRatings: Record<string, 'عامر' | 'كريم'> = {
  'كريم فوزي': 'عامر',
  'نور علي': 'عامر',
  'هدى سمير': 'كريم',
  'يوسف عادل': 'كريم',
  'سلمى راضي': 'عامر',
}
