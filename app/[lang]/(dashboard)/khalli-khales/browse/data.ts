import type { ServiceDetail } from '@/components/CardDetail'

export type KhalliKhalesOffer = {
  id: string
  category: string
  title: string
  desc: string
  providerName: string
  providerRate: string
  price: string
  free?: boolean
  badgeVariant?: 'blue' | 'gold'
  detail: ServiceDetail
}

export const publicToOrganizations: KhalliKhalesOffer[] = [
  {
    id: 'k1',
    category: 'ترجمة',
    title: 'ترجمة عربي ⇄ إنجليزي للمواد الثقافية',
    desc: 'ترجمة التقارير والمواد التعريفية والبيانات الصحفية، مع مراجعة لغوية نهائية.',
    providerName: 'نادية كمال',
    providerRate: 'عامر',
    price: '٢٠',
    detail: {
      type: 'ترجمة · من الجمهور للمؤسسات',
      title: 'ترجمة عربي ⇄ إنجليزي للمواد الثقافية',
      desc: 'ترجمة التقارير والمواد التعريفية والبيانات الصحفية بمصطلحات القطاع الثقافي، مع مراجعة لغوية نهائية.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٠', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: 'حسب عدد الصفحات' },
          { header: 'الإتاحة', description: 'متاحة' },
        ],
      },
      info: 'إيه اللي هتستلمه',
      data: ['ملف مترجم ومنسّق', 'مراجعة لغوية نهائية', 'جولة تعديلات واحدة'],
      providerName: 'نادية كمال',
      providerRate: 'عامر',
      request: 'اطلب الخدمة',
      save: 'احفظ في المحفوظات',
      close: 'اقفل',
    },
  },
  {
    id: 'k2',
    category: 'تصميم',
    title: 'تصميم منشورات سوشيال ميديا',
    desc: 'حزمة منشورات شهرية بهوية مؤسستكم، مع ملفات مفتوحة قابلة للتعديل.',
    providerName: 'كمال درويش',
    providerRate: 'كريم',
    price: '٢٥',
    detail: {
      type: 'تصميم · من الجمهور للمؤسسات',
      title: 'تصميم منشورات سوشيال ميديا',
      desc: 'حزمة منشورات شهرية بهوية مؤسستكم، مع ملفات مفتوحة قابلة للتعديل.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٥', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: 'شهر واحد' },
          { header: 'الإتاحة', description: 'متاح' },
        ],
      },
      info: 'إيه اللي هتستلمه',
      data: ['١٢ منشور جاهز للنشر', 'ملفات مفتوحة قابلة للتعديل', 'جولة ملاحظات واحدة'],
      providerName: 'كمال درويش',
      providerRate: 'كريم',
      request: 'اطلب الخدمة',
      save: 'احفظ في المحفوظات',
      close: 'اقفل',
    },
  },
  {
    id: 'k3',
    category: 'دعم تقني',
    title: 'صيانة وإعداد أجهزة المكتب',
    desc: 'فحص وإعداد أجهزة الكمبيوتر والشبكة، مع تدريب قصير للفريق على الصيانة الأساسية.',
    providerName: 'يوسف حلمي',
    providerRate: 'عامر',
    price: '١٥',
    detail: {
      type: 'دعم تقني · من الجمهور للمؤسسات',
      title: 'صيانة وإعداد أجهزة المكتب',
      desc: 'فحص وإعداد أجهزة الكمبيوتر والشبكة، مع تدريب قصير للفريق على الصيانة الأساسية.',
      cards: {
        firstCard: { title: 'القيمة', price: '١٥', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: 'يوم واحد' },
          { header: 'الإتاحة', description: 'متاح' },
        ],
      },
      info: 'إيه اللي هتستلمه',
      data: ['فحص شامل للأجهزة', 'إعداد الشبكة', 'تدريب قصير للفريق'],
      providerName: 'يوسف حلمي',
      providerRate: 'عامر',
      request: 'اطلب الخدمة',
      save: 'احفظ في المحفوظات',
      close: 'اقفل',
    },
  },
  {
    id: 'k4',
    category: 'استشارات',
    title: 'استشارة في التخطيط الاستراتيجي',
    desc: 'جلستان لمراجعة خطة المؤسسة السنوية وتحديد الأولويات والمؤشرات.',
    providerName: 'هالة رمزي',
    providerRate: 'عامر',
    price: '٣٠',
    detail: {
      type: 'استشارات · من الجمهور للمؤسسات',
      title: 'استشارة في التخطيط الاستراتيجي',
      desc: 'جلستان لمراجعة خطة المؤسسة السنوية وتحديد الأولويات والمؤشرات.',
      cards: {
        firstCard: { title: 'القيمة', price: '٣٠', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: 'جلستان' },
          { header: 'الإتاحة', description: 'متاحة' },
        ],
      },
      info: 'إيه اللي هتستلمه',
      data: ['مراجعة الخطة السنوية', 'خريطة أولويات', 'مؤشرات قياس مقترحة'],
      providerName: 'هالة رمزي',
      providerRate: 'عامر',
      request: 'اطلب الخدمة',
      save: 'احفظ في المحفوظات',
      close: 'اقفل',
    },
  },
]

export const publicToMembers: KhalliKhalesOffer[] = [
  {
    id: 'm1',
    category: 'صحة',
    title: 'استشارة تغذية للعاملين',
    desc: 'جلسة أونلاين لمراجعة النظام الغذائي ووضع خطة بسيطة قابلة للتطبيق.',
    providerName: 'دعاء فهمي',
    providerRate: 'عامر',
    price: '١٥',
    detail: {
      type: 'صحة · من الجمهور لأعضاء الفرق',
      title: 'استشارة تغذية للعاملين',
      desc: 'جلسة أونلاين لمراجعة النظام الغذائي ووضع خطة بسيطة قابلة للتطبيق — العرض ده شخصي، بيتحجز من حساب العضو نفسه.',
      cards: {
        firstCard: { title: 'القيمة', price: '١٥', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: 'ساعة' },
          { header: 'الحجز', description: 'من حساب العضو' },
        ],
      },
      info: 'مهم تعرفه',
      data: ['المؤسسة ما بتحجزش نيابةً عن أعضائها', 'القيمة بتتخصم من مخصص العضو الشهري'],
      providerName: 'دعاء فهمي',
      providerRate: 'عامر',
      request: 'شارك مع الفريق',
      close: 'اقفل',
    },
  },
  {
    id: 'm2',
    category: 'قانوني',
    title: 'استشارة قانونية شخصية',
    desc: 'استشارة في عقود العمل والحقوق، للأفراد مش للمؤسسات.',
    providerName: 'مصطفى لبيب',
    providerRate: 'عامر',
    price: '٢٠',
    detail: {
      type: 'قانوني · من الجمهور لأعضاء الفرق',
      title: 'استشارة قانونية شخصية',
      desc: 'استشارة في عقود العمل والحقوق، للأفراد مش للمؤسسات — العرض ده شخصي، بيتحجز من حساب العضو نفسه.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٠', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: 'جلسة واحدة' },
          { header: 'الحجز', description: 'من حساب العضو' },
        ],
      },
      info: 'مهم تعرفه',
      data: ['المؤسسة ما بتحجزش نيابةً عن أعضائها', 'القيمة بتتخصم من مخصص العضو الشهري'],
      providerName: 'مصطفى لبيب',
      providerRate: 'عامر',
      request: 'شارك مع الفريق',
      close: 'اقفل',
    },
  },
  {
    id: 'm3',
    category: 'تعليم',
    title: 'دروس لغة إنجليزية للمبتدئين',
    desc: 'أربع جلسات أسبوعية أونلاين، بمجموعات صغيرة أو فردي.',
    providerName: 'سناء عز',
    providerRate: 'كريم',
    price: '١٨',
    detail: {
      type: 'تعليم · من الجمهور لأعضاء الفرق',
      title: 'دروس لغة إنجليزية للمبتدئين',
      desc: 'أربع جلسات أسبوعية أونلاين، بمجموعات صغيرة أو فردي — العرض ده شخصي، بيتحجز من حساب العضو نفسه.',
      cards: {
        firstCard: { title: 'القيمة', price: '١٨', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: '٤ جلسات' },
          { header: 'الحجز', description: 'من حساب العضو' },
        ],
      },
      info: 'مهم تعرفه',
      data: ['المؤسسة ما بتحجزش نيابةً عن أعضائها', 'القيمة بتتخصم من مخصص العضو الشهري'],
      providerName: 'سناء عز',
      providerRate: 'كريم',
      request: 'شارك مع الفريق',
      close: 'اقفل',
    },
  },
]

export const giftShop: KhalliKhalesOffer[] = [
  {
    id: 'g1',
    category: 'ورشة',
    title: 'ورشة بودكاست للمبتدئين',
    desc: 'يومان في التسجيل والمونتاج الأساسي، مع تطبيق عملي كامل في الاستوديو.',
    providerName: 'صوت وصورة',
    providerRate: 'عامر',
    price: '٤٥',
    detail: {
      type: 'ورشة · الجيفت شوب',
      title: 'ورشة بودكاست للمبتدئين',
      desc: 'يومان في التسجيل والمونتاج الأساسي، مع تطبيق عملي كامل داخل الاستوديو. معروضة من صوت وصورة لأفراد الجمهور.',
      cards: {
        firstCard: { title: 'سعر المقعد', price: '٤٥', currency: 'شهمهم' },
        restCards: [
          { header: 'المقاعد', description: '١٢ — فاضل ٦' },
          { header: 'التاريخ', description: '١٢ سبتمبر' },
        ],
      },
      info: 'البرنامج',
      data: ['اليوم الأول: الفكرة والسكريبت والصوت', 'اليوم التاني: التسجيل والمونتاج والنشر'],
      providerName: 'صوت وصورة',
      providerRate: 'عامر',
      request: 'شوف صفحة العرض',
      close: 'اقفل',
    },
  },
  {
    id: 'g2',
    category: 'برنامج',
    title: 'برنامج الأرشفة الصوتية — ٦ أسابيع',
    desc: 'برنامج تدريبي في أرشفة التسجيلات وتوثيقها، لخريجي الدراسات الإنسانية.',
    providerName: 'حلقة',
    providerRate: 'عامر',
    price: '٦٠',
    detail: {
      type: 'برنامج · الجيفت شوب',
      title: 'برنامج الأرشفة الصوتية — ٦ أسابيع',
      desc: 'برنامج تدريبي في أرشفة التسجيلات وتوثيقها، لخريجي الدراسات الإنسانية.',
      cards: {
        firstCard: { title: 'القيمة', price: '٦٠', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: '٦ أسابيع' },
          { header: 'المقاعد', description: '١٥ — فاضل ٤' },
        ],
      },
      info: 'إيه اللي هتستلمه',
      data: ['منهج أرشفة عملي', 'ورش تطبيقية أسبوعية', 'شهادة إتمام'],
      providerName: 'حلقة',
      providerRate: 'عامر',
      request: 'شوف صفحة العرض',
      close: 'اقفل',
    },
  },
  {
    id: 'g3',
    category: 'فعالية',
    title: 'ليلة عروض أفلام قصيرة',
    desc: 'عرض لستة أفلام قصيرة مصرية مع نقاش مفتوح مع صنّاعها بعد العرض.',
    providerName: 'ملحة',
    providerRate: 'عامر',
    price: 'مجانًا',
    free: true,
    detail: {
      type: 'فعالية · الجيفت شوب',
      title: 'ليلة عروض أفلام قصيرة',
      desc: 'عرض لستة أفلام قصيرة مصرية مع نقاش مفتوح مع صنّاعها بعد العرض.',
      cards: {
        firstCard: { title: 'القيمة', price: 'مجانًا', currency: '' },
        restCards: [
          { header: 'المقاعد', description: '٨٠ — فاضل ٣٢' },
          { header: 'التاريخ', description: '٢٠ سبتمبر' },
        ],
      },
      info: 'البرنامج',
      data: ['عرض ٦ أفلام قصيرة', 'نقاش مفتوح مع الصنّاع'],
      providerName: 'ملحة',
      providerRate: 'عامر',
      request: 'شوف صفحة العرض',
      close: 'اقفل',
    },
  },
  {
    id: 'g4',
    category: 'مورد',
    title: 'قاعة للقراءة والعمل المشترك',
    desc: 'مساحة هادئة للقراءة والعمل، متاحة بالساعة لأفراد الجمهور.',
    providerName: 'حلقة',
    providerRate: 'كريم',
    price: '٥',
    badgeVariant: 'gold',
    detail: {
      type: 'مورد · الجيفت شوب',
      title: 'قاعة للقراءة والعمل المشترك',
      desc: 'مساحة هادئة للقراءة والعمل، متاحة بالساعة لأفراد الجمهور.',
      cards: {
        firstCard: { title: 'القيمة', price: '٥', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: 'بالساعة' },
          { header: 'الإتاحة', description: 'متاحة' },
        ],
      },
      info: 'إيه اللي هتستلمه',
      data: ['قاعة هادئة', 'واي فاي', 'إضاءة طبيعية'],
      providerName: 'حلقة',
      providerRate: 'كريم',
      request: 'شوف صفحة العرض',
      close: 'اقفل',
    },
  },
]
