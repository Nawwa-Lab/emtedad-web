import type { ServiceDetail } from '@/components/CardDetail'
import type { ServiceCardAction, ServiceCardInfoRow } from '@/components/ServicesCard'
import type { CardActionKey } from './components'

// Browse
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
  note?: string
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
    note: '١٢ مقعدًا · فاضل ٦ · ١٢ سبتمبر',
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
      extra: {
        info: 'إزاي اتحسب السعر',
        data: ['ساعات المقدِّمين × سعر الساعة ÷ عدد المقاعد'],
      },
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
    note: '١٥ مقعدًا · فاضل ٢ · يبدأ ١ أكتوبر',
    detail: {
      type: 'برنامج · الجيفت شوب',
      title: 'برنامج الأرشفة الصوتية — ٦ أسابيع',
      desc: 'برنامج تدريبي في أرشفة التسجيلات وتوثيقها، لخريجي الدراسات الإنسانية.',
      cards: {
        firstCard: { title: 'القيمة', price: '٦٠', currency: 'شهمهم' },
        restCards: [
          { header: 'المقاعد', description: '١٥ — فاضل ٢' },
          { header: 'التاريخ', description: 'يبدأ ١ أكتوبر' },
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
    note: '٦٠ مقعدًا · فاضل ٢٣ · ٢٨ سبتمبر',
    detail: {
      type: 'فعالية · الجيفت شوب',
      title: 'ليلة عروض أفلام قصيرة',
      desc: 'عرض لستة أفلام قصيرة مصرية مع نقاش مفتوح مع صنّاعها بعد العرض.',
      cards: {
        firstCard: { title: 'القيمة', price: 'مجانًا', currency: '' },
        restCards: [
          { header: 'المقاعد', description: '٦٠ — فاضل ٢٣' },
          { header: 'التاريخ', description: '٢٨ سبتمبر' },
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
  {
    id: 'g5',
    category: 'كورس',
    title: 'كورس التصوير الوثائقي',
    desc: 'ستة أسابيع في بناء القصة البصرية والتصوير في المواقع الحقيقية.',
    providerName: 'صوت وصورة',
    providerRate: 'عامر',
    price: '٥٥',
    note: '١٠ مقاعد · مكتمل · يبدأ ٥ أكتوبر',
    detail: {
      type: 'كورس · الجيفت شوب',
      title: 'كورس التصوير الوثائقي',
      desc: 'ستة أسابيع في بناء القصة البصرية والتصوير في المواقع الحقيقية.',
      cards: {
        firstCard: { title: 'القيمة', price: '٥٥', currency: 'شهمهم' },
        restCards: [
          { header: 'المقاعد', description: '١٠ — مكتمل' },
          { header: 'التاريخ', description: 'يبدأ ٥ أكتوبر' },
        ],
      },
      info: 'إيه اللي هتستلمه',
      data: ['بناء القصة البصرية', 'تصوير في مواقع حقيقية', 'مراجعة أعمال نهائية'],
      providerName: 'صوت وصورة',
      providerRate: 'عامر',
      request: 'شوف صفحة العرض',
      close: 'اقفل',
    },
  },
  {
    id: 'g6',
    category: 'خدمة',
    title: 'جلسة تصوير شخصية للمبدعين',
    desc: 'ساعة ونصف في الاستوديو أو في مكانكم، والتسليم ١٥ صورة معدَّلة.',
    providerName: 'صوت وصورة',
    providerRate: 'عامر',
    price: '٢٥',
    detail: {
      type: 'خدمة · الجيفت شوب',
      title: 'جلسة تصوير شخصية للمبدعين',
      desc: 'ساعة ونصف في الاستوديو أو في مكانكم، والتسليم ١٥ صورة معدَّلة.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٥', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: 'ساعة ونصف' },
          { header: 'التسليم', description: '١٥ صورة معدَّلة' },
        ],
      },
      info: 'إيه اللي هتستلمه',
      data: ['جلسة في الاستوديو أو مكانكم', '١٥ صورة معدَّلة', 'ملفات عالية الدقة'],
      providerName: 'صوت وصورة',
      providerRate: 'عامر',
      request: 'شوف صفحة العرض',
      close: 'اقفل',
    },
  },
]

// Gift shop
export const giftShopOffers: KhalliKhalesOffer[] = giftShop

export const giftShopTotalOffers = 18

// Public to members
export const publicToMembersOffers: KhalliKhalesOffer[] = [
  ...publicToMembers,
  {
    id: 'm4',
    category: 'منزلية',
    title: 'مساعدة في تنظيم المساحات',
    desc: 'جلسة عملية لتنظيم مساحة السكن أو المكتب الشخصي وترتيب الأرشيف الورقي.',
    providerName: 'رانيا مجدي',
    providerRate: 'كريم',
    price: '١٢',
    detail: {
      type: 'منزلية · من الجمهور لأعضاء الفرق',
      title: 'مساعدة في تنظيم المساحات',
      desc: 'جلسة عملية لتنظيم مساحة السكن أو المكتب الشخصي وترتيب الأرشيف الورقي — العرض ده شخصي، بيتحجز من حساب العضو نفسه.',
      cards: {
        firstCard: { title: 'القيمة', price: '١٢', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: 'جلسة واحدة' },
          { header: 'الحجز', description: 'من حساب العضو' },
        ],
      },
      info: 'مهم تعرفه',
      data: ['المؤسسة ما بتحجزش نيابةً عن أعضائها', 'القيمة بتتخصم من مخصص العضو الشهري'],
      providerName: 'رانيا مجدي',
      providerRate: 'كريم',
      request: 'شارك مع الفريق',
      close: 'اقفل',
    },
  },
  {
    id: 'm5',
    category: 'صحة',
    title: 'جلسات دعم نفسي جماعية',
    desc: 'مجموعة أسبوعية صغيرة بإشراف أخصائية، للعاملين في القطاع الثقافي.',
    providerName: 'ليلى حسن',
    providerRate: 'عامر',
    price: '٢٠',
    detail: {
      type: 'صحة · من الجمهور لأعضاء الفرق',
      title: 'جلسات دعم نفسي جماعية',
      desc: 'مجموعة أسبوعية صغيرة بإشراف أخصائية، للعاملين في القطاع الثقافي — العرض ده شخصي، بيتحجز من حساب العضو نفسه.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٠', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: 'مجموعة أسبوعية' },
          { header: 'الحجز', description: 'من حساب العضو' },
        ],
      },
      info: 'مهم تعرفه',
      data: ['المؤسسة ما بتحجزش نيابةً عن أعضائها', 'القيمة بتتخصم من مخصص العضو الشهري'],
      providerName: 'ليلى حسن',
      providerRate: 'عامر',
      request: 'شارك مع الفريق',
      close: 'اقفل',
    },
  },
  {
    id: 'm6',
    category: 'تعليم',
    title: 'دروس عود للمبتدئين',
    desc: 'ثماني جلسات فردية في أساسيات العزف وقراءة النوتة.',
    providerName: 'طارق سليم',
    providerRate: 'عامر',
    price: '٢٥',
    detail: {
      type: 'تعليم · من الجمهور لأعضاء الفرق',
      title: 'دروس عود للمبتدئين',
      desc: 'ثماني جلسات فردية في أساسيات العزف وقراءة النوتة — العرض ده شخصي، بيتحجز من حساب العضو نفسه.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٥', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: '٨ جلسات' },
          { header: 'الحجز', description: 'من حساب العضو' },
        ],
      },
      info: 'مهم تعرفه',
      data: ['المؤسسة ما بتحجزش نيابةً عن أعضائها', 'القيمة بتتخصم من مخصص العضو الشهري'],
      providerName: 'طارق سليم',
      providerRate: 'عامر',
      request: 'شارك مع الفريق',
      close: 'اقفل',
    },
  },
]

export const publicToMembersTotalOffers = 11

// Public to organizations
export const publicToOrganizationsOffers: KhalliKhalesOffer[] = [
  ...publicToOrganizations,
  {
    id: 'k5',
    category: 'تصوير',
    title: 'تصوير فوتوغرافي للفعاليات',
    desc: 'تغطية فوتوغرافية كاملة مع تسليم ٤٠ صورة معدَّلة جاهزة للنشر.',
    providerName: 'مروان صبحي',
    providerRate: 'كريم',
    price: '٢٢',
    detail: {
      type: 'تصوير · من الجمهور للمؤسسات',
      title: 'تصوير فوتوغرافي للفعاليات',
      desc: 'تغطية فوتوغرافية كاملة للفعالية مع تسليم ٤٠ صورة معدَّلة جاهزة للنشر.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٢', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: 'حسب الفعالية' },
          { header: 'الإتاحة', description: 'متاح' },
        ],
      },
      info: 'إيه اللي هتستلمه',
      data: ['تغطية فوتوغرافية كاملة', '٤٠ صورة معدَّلة', 'ملفات عالية الدقة'],
      providerName: 'مروان صبحي',
      providerRate: 'كريم',
      request: 'اطلب الخدمة',
      save: 'احفظ في المحفوظات',
      close: 'اقفل',
    },
  },
  {
    id: 'k6',
    category: 'كتابة',
    title: 'كتابة وتحرير المحتوى التعريفي',
    desc: 'صياغة نصوص الموقع والمواد التعريفية بلغة واضحة قريبة من جمهوركم.',
    providerName: 'دينا فؤاد',
    providerRate: 'عامر',
    price: '١٨',
    detail: {
      type: 'كتابة · من الجمهور للمؤسسات',
      title: 'كتابة وتحرير المحتوى التعريفي',
      desc: 'صياغة نصوص الموقع والمواد التعريفية بلغة واضحة قريبة من جمهوركم.',
      cards: {
        firstCard: { title: 'القيمة', price: '١٨', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: 'حسب حجم المحتوى' },
          { header: 'الإتاحة', description: 'متاحة' },
        ],
      },
      info: 'إيه اللي هتستلمه',
      data: ['نصوص الموقع', 'مواد تعريفية', 'جولة تعديلات واحدة'],
      providerName: 'دينا فؤاد',
      providerRate: 'عامر',
      request: 'اطلب الخدمة',
      save: 'احفظ في المحفوظات',
      close: 'اقفل',
    },
  },
]

export const publicToOrganizationsTotalOffers = 24

// Activity detail
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

// Registration confirmation
export type AdvanceMonth = {
  id: 'september' | 'october' | 'november'
  used: number
  total: number
  percent: number
  tone: 'used' | 'default'
}

export type AdvanceConfirmation = {
  kind: 'advance'
  price: number
  monthlyAllowance: number
  remainingThisMonth: number
  over: number
  novemberRemaining: number
  months: AdvanceMonth[]
}

export type WithinBudgetConfirmation = {
  kind: 'within'
  price: number
  monthlyAllowance: number
  remainingThisMonth: number
  remainingAfter: number
  meterPercent: number
}

export type RegistrationConfirmation = AdvanceConfirmation | WithinBudgetConfirmation

const registrations: Record<string, RegistrationConfirmation> = {
  g1: {
    kind: 'advance',
    price: 45,
    monthlyAllowance: 25,
    remainingThisMonth: 10,
    over: 35,
    novemberRemaining: 15,
    months: [
      { id: 'september', used: 10, total: 10, percent: 100, tone: 'used' },
      { id: 'october', used: 25, total: 25, percent: 100, tone: 'used' },
      { id: 'november', used: 10, total: 25, percent: 40, tone: 'default' },
    ],
  },
  g7: {
    kind: 'within',
    price: 15,
    monthlyAllowance: 25,
    remainingThisMonth: 25,
    remainingAfter: 10,
    meterPercent: 40,
  },
}

export function findRegistration(activityId: string): RegistrationConfirmation {
  return registrations[activityId] ?? registrations.g1
}

// Offer detail
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

// Offer create
export type OfferTypeId = 'workshop' | 'course' | 'program' | 'event' | 'service' | 'resource'

export type OfferKind = 'act' | 'svc' | 'res'

export type OfferType = {
  id: OfferTypeId
  kind: OfferKind
}

export const offerTypes: OfferType[] = [
  { id: 'workshop', kind: 'act' },
  { id: 'course', kind: 'act' },
  { id: 'program', kind: 'act' },
  { id: 'event', kind: 'act' },
  { id: 'service', kind: 'svc' },
  { id: 'resource', kind: 'res' },
]

export const rateOptions = [1, 2, 3, 4, 5] as const

export const monthlyCap = {
  used: 260,
  total: 400,
  percent: 65,
}

// Post create
export type DurationUnit = 'hours' | 'days' | 'sessions'

export const durationUnits: DurationUnit[] = ['hours', 'days', 'sessions']

// Participants attendance
export const activityParticipants: KhalliKhalesOffer[] = [
  {
    id: 'a1',
    category: 'ورشة',
    title: 'ورشة بودكاست للمبتدئين',
    desc: 'يومان في التسجيل والمونتاج الأساسي، مع تطبيق عملي كامل في الاستوديو.',
    providerName: 'صوت وصورة',
    providerRate: 'عامر',
    price: '٤٥',
    detail: {
      type: 'ورشة · الجيفت شوب',
      title: 'ورشة بودكاست للمبتدئين',
      desc: 'يومان في التسجيل والمونتاج الأساسي، مع تطبيق عملي كامل داخل الاستوديو.',
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
    id: 'a2',
    category: 'كورس',
    title: 'كורס التصوير الوثائقي',
    desc: 'ستة أسابيع في بناء القصة البصرية والتصوير في المواقع الحقيقية.',
    providerName: 'صوت وصورة',
    providerRate: 'عامر',
    price: '٥٥',
    detail: {
      type: 'كورس · الجيفت شوب',
      title: 'كورس التصوير الوثائقي',
      desc: 'ستة أسابيع في بناء القصة البصرية والتصوير في المواقع الحقيقية.',
      cards: {
        firstCard: { title: 'القيمة', price: '٥٥', currency: 'شهمهم' },
        restCards: [
          { header: 'المقاعد', description: '١٠ — مكتمل' },
          { header: 'التاريخ', description: 'يبدأ ٥ أكتوبر' },
        ],
      },
      info: 'إيه اللي هتستلمه',
      data: ['بناء القصة البصرية', 'تصوير في مواقع حقيقية', 'مراجعة أعمال نهائية'],
      providerName: 'صوت وصورة',
      providerRate: 'عامر',
      request: 'شوف صفحة العرض',
      close: 'اقفل',
    },
  },
  {
    id: 'a3',
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
          { header: 'المقاعد', description: '٦٠ — فاضل ٢٣' },
          { header: 'التاريخ', description: '٢٨ سبتمبر' },
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
    id: 'a4',
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
          { header: 'المقاعد', description: '١٥ — فاضل ٢' },
          { header: 'التاريخ', description: 'يبدأ ١ أكتوبر' },
        ],
      },
      info: 'إيه اللي هتستلمه',
      data: ['منهج أرشافة عملي', 'ورش تطبيقية أسبوعية', 'شهادة إتمام'],
      providerName: 'حلقة',
      providerRate: 'عامر',
      request: 'شوف صفحة العرض',
      close: 'اقفل',
    },
  },
  {
    id: 'a5',
    category: 'ورشة',
    title: 'ورشة الكتابة للمنصات',
    desc: 'ثلاث جلسات في كتابة المحتوى الرقمي للمؤسسات الثقافية.',
    providerName: 'مروة سعيد',
    providerRate: 'عامر',
    price: '٤٥',
    detail: {
      type: 'ورشة · الجيفت شوب',
      title: 'ورشة الكتابة للمنصات',
      desc: 'ثلاث جلسات في كتابة المحتوى الرقمي للمؤسسات الثقافية.',
      cards: {
        firstCard: { title: 'سعر المقعد', price: '٤٥', currency: 'شهمهم' },
        restCards: [
          { header: 'المقاعد', description: '١٢ — فاضل ٧' },
          { header: 'التاريخ', description: 'بداية أكتوبر' },
        ],
      },
      info: 'إيه اللي هتستلمه',
      data: ['ورش تطبيقية أسبوعية', 'مراجعة أعمال'],
      providerName: 'مروة سعيد',
      providerRate: 'عامر',
      request: 'شوف صفحة العرض',
      close: 'اقفل',
    },
  },
]

export type ParticipantWhenKey =
  | 'whenRegisteredFourDaysF'
  | 'whenRegisteredThreeDaysM'
  | 'whenRegisteredTwoDaysM'
  | 'whenRegisteredYesterdayF'
  | 'whenRegisteredTodayM'
  | 'whenRegisteredTodayF'
  | 'whenCancelledThreeDaysAgo'

export type ParticipantTagKey =
  'registeredTagF' | 'registeredTagM' | 'waitTagShort' | 'cancelledTag'

export type ParticipantRosterRow = {
  id: string
  initial: string
  name: string
  whenKey: ParticipantWhenKey
  tagKey: ParticipantTagKey
  secondTagKey?: 'waitTagLong'
  attended?: boolean
}

export const participantsStats = {
  registered: 6,
  total: 12,
  seatsLeft: 6,
  waitlist: 2,
}

export const participantsRoster: ParticipantRosterRow[] = [
  {
    id: 'p1',
    initial: 'ن',
    name: 'نادية كمال',
    whenKey: 'whenRegisteredFourDaysF',
    tagKey: 'registeredTagF',
    attended: true,
  },
  {
    id: 'p2',
    initial: 'ك',
    name: 'كمال درويش',
    whenKey: 'whenRegisteredThreeDaysM',
    tagKey: 'registeredTagM',
    attended: true,
  },
  {
    id: 'p3',
    initial: 'ي',
    name: 'يوسف حلمي',
    whenKey: 'whenRegisteredTwoDaysM',
    tagKey: 'registeredTagM',
    attended: false,
  },
  {
    id: 'p4',
    initial: 'ه',
    name: 'هالة رمزي',
    whenKey: 'whenRegisteredYesterdayF',
    tagKey: 'registeredTagF',
    attended: false,
  },
  {
    id: 'p5',
    initial: 'د',
    name: 'دينا فؤاد',
    whenKey: 'whenRegisteredYesterdayF',
    tagKey: 'registeredTagF',
    attended: false,
  },
  {
    id: 'p6',
    initial: 'م',
    name: 'مروان صبحي',
    whenKey: 'whenRegisteredTodayM',
    tagKey: 'registeredTagM',
    attended: false,
  },
  {
    id: 'p7',
    initial: 'س',
    name: 'سناء عز',
    whenKey: 'whenRegisteredTodayF',
    tagKey: 'waitTagShort',
    secondTagKey: 'waitTagLong',
  },
  {
    id: 'p8',
    initial: 'ر',
    name: 'رانيا مجدي',
    whenKey: 'whenRegisteredTodayF',
    tagKey: 'waitTagShort',
    secondTagKey: 'waitTagLong',
  },
  {
    id: 'p9',
    initial: 'ط',
    name: 'طارق سليم',
    whenKey: 'whenCancelledThreeDaysAgo',
    tagKey: 'cancelledTag',
    secondTagKey: 'waitTagLong',
  },
]

// History
export type HistoryKind = 'served' | 'requested' | 'attended' | 'borrowed'

export type HistoryRating = {
  value: string
  comment: string
  tone?: 'gold' | 'surface'
}

export type HistoryItem = {
  id: string
  kind: HistoryKind
  title: string
  provider: string
  date: string
  amount: string
  out?: boolean
  mine: HistoryRating | null
  theirs: HistoryRating | null
}

export type HistoryGroup = {
  label: string
  items: HistoryItem[]
}

export const historyStats = {
  done: 6,
  earned: 35,
  spent: 60,
  rating: 'عامر',
}

export const historyGroups: HistoryGroup[] = [
  {
    label: 'سبتمبر ٢٠٢٦',
    items: [
      {
        id: 'h1',
        kind: 'served',
        title: 'ترجمة التقرير السنوي',
        provider: 'مشكاة',
        date: '٢ سبتمبر',
        amount: '+٢٠',
        mine: {
          value: 'عامر',
          comment: 'تعاملوا بوضوح من أول رسالة، والمحتوى وصلني منظّم.',
        },
        theirs: {
          value: 'عامر',
          comment: 'ترجمة دقيقة وسلّمت قبل الميعاد بيومين. هنشتغل معاها تاني.',
        },
      },
    ],
  },
  {
    label: 'أغسطس ٢٠٢٦',
    items: [
      {
        id: 'h2',
        kind: 'served',
        title: 'إعداد أجهزة وشبكة المكتب',
        provider: 'حلقة',
        date: '٢٢ أغسطس',
        amount: '+١٥',
        mine: {
          value: 'كريم',
          tone: 'surface',
          comment: 'الشغل اتعمل تمام، بس الوصول للمكتب اتأخر ساعة عن الميعاد.',
        },
        theirs: {
          value: 'عامر',
          comment: 'حلّت مشكلة الشبكة اللي قعدنا معاها أسبوعين في ساعتين.',
        },
      },
      {
        id: 'h3',
        kind: 'requested',
        title: 'ورشة تصوير بالموبايل — خاصة',
        provider: 'صوت وصورة',
        date: '٢٢ أغسطس',
        amount: '−١٥',
        out: true,
        mine: {
          value: 'عامر',
          comment: 'شرح بسيط من غير تعالي، وخرجت بحاجة أقدر أكمّل بيها.',
        },
        theirs: {
          value: 'عامر',
          comment: 'حضرت مستعدة وسألت أسئلة كويسة — تجربة مريحة.',
        },
      },
      {
        id: 'h4',
        kind: 'attended',
        title: 'ورشة تصوير بالموبايل — يوم واحد',
        provider: 'حلقة',
        date: '٢٠ أغسطس',
        amount: '−١٥',
        out: true,
        mine: null,
        theirs: null,
      },
      {
        id: 'h5',
        kind: 'attended',
        title: 'ليلة عروض أفلام قصيرة',
        provider: 'ملحة',
        date: '٢ أغسطس',
        amount: '−٠',
        out: true,
        mine: {
          value: 'عامر',
          comment: 'ليلة حلوة، والنقاش بعد العرض كان أحسن من العرض نفسه.',
        },
        theirs: null,
      },
    ],
  },
  {
    label: 'يوليو ٢٠٢٦',
    items: [
      {
        id: 'h6',
        kind: 'borrowed',
        title: 'كاميرا للتصوير الشخصي',
        provider: 'صوت وصورة',
        date: '١٤ يوليو',
        amount: '−٣٠',
        out: true,
        mine: {
          value: 'عامر',
          comment: 'الكاميرا وصلت بحالة ممتازة والتسليم كان سهل.',
        },
        theirs: {
          value: 'عامر',
          comment: 'رجّعت الكاميرا في ميعادها وبنفس الحالة.',
        },
      },
    ],
  },
]

// My asks
export type AskType = 'svc' | 'res'
export type AskStatus = 'ask' | 'doing' | 'done'

type AskAction = {
  key: CardActionKey
  variant?: ServiceCardAction['variant']
  href?: string
}

type AskBase = {
  id: string
  category: string
  title: string
  desc: string
  price: string
  badgeVariant?: 'blue' | 'gold'
  infoRows: ServiceCardInfoRow[]
  actions: AskAction[]
  detail: ServiceDetail
}

export type OrgAsk = AskBase & { status: AskStatus }
export type CommunityAsk = AskBase & { type: AskType; status: AskStatus }

export const myAsksOrg: OrgAsk[] = [
  {
    id: 'q1',
    status: 'ask',
    category: 'ترجمة',
    title: 'ترجمة عربي ⇄ إنجليزي للمواد الثقافية',
    desc: 'طلبتوها من نادية كمال لترجمة التقرير السنوي.',
    price: '٢٠',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'عند ' }, { avatar: 'ن' }, { text: 'نادية كمال', bold: true }],
      },
      { kind: 'text', segs: [{ text: 'بعتّوه من يومين · لسه ما ردّتش' }] },
      { kind: 'text', segs: [{ text: 'المواعيد اللي طلبتوها: ١٠ — ٢٠ سبتمبر' }] },
    ],
    actions: [{ key: 'conversation' }, { key: 'withdraw', variant: 'danger' }],
    detail: {
      type: 'ترجمة · طلب على خلي خالص',
      title: 'ترجمة عربي ⇄ إنجليزي للمواد الثقافية',
      desc: 'طلبتوها من نادية كمال لترجمة التقرير السنوي للمؤسسة.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٠', currency: 'شهمهم' },
        restCards: [
          { header: 'الردود', description: '٠' },
          { header: 'المواعيد', description: '١٠ — ٢٠ سبتمبر' },
        ],
      },
      info: 'إيه اللي هتستلموه',
      data: ['ترجمة عربية', 'تصحيح لغوي', 'مراجعة نهائية'],
      providerName: 'نادية كمال',
      providerRate: 'عامر',
      request: 'اطلب الخدمة',
      close: 'اقفل',
    },
  },
  {
    id: 'q2',
    status: 'ask',
    category: 'تصميم',
    title: 'تصميم منشورات سوشيال ميديا',
    desc: 'نشرتوا احتياجكم وردّ عليه ٣ من الجمهور — اختاروا مين هيقدّم الخدمة.',
    price: '٢٥',
    infoRows: [
      { kind: 'text', segs: [{ text: '٣ ردّوا', bold: true }, { text: ' على طلبكم' }] },
      {
        kind: 'text',
        segs: [{ text: 'أعلى تقييم: ' }, { avatar: 'ك' }, { text: 'كمال درويش', bold: true }],
      },
      { kind: 'text', segs: [{ text: 'المواعيد المطلوبة: من ١٥ سبتمبر' }] },
    ],
    actions: [
      { key: 'chooseProvider', variant: 'primary' },
      { key: 'seeReplies' },
      { key: 'withdraw', variant: 'danger' },
    ],
    detail: {
      type: 'تصميم · طلب على خلي خالص',
      title: 'تصميم منشورات سوشيال ميديا',
      desc: 'نشرتوا احتياجكم على خلي خالص وردّ عليه ٣ من الجمهور. اختاروا مين هيقدّم الخدمة وابدأوا الاتفاق معاه.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٥', currency: 'شهمهم' },
        restCards: [
          { header: 'الردود', description: '٣' },
          { header: 'المواعيد', description: 'من ١٥ سبتمبر' },
        ],
      },
      info: 'اللي ردّوا',
      data: [
        'كمال درويش — عامر · ١٢ خدمة مكتملة',
        'هدى سمير — عامر · ٧ خدمات',
        'سامي فتحي — كريم · ٣ خدمات',
      ],
      providerName: 'مشكاة',
      providerRate: 'عامر',
      request: 'اختر مقدِّم الخدمة',
      save: 'شوف الردود',
      close: 'اقفل',
    },
  },
  {
    id: 'q3',
    status: 'doing',
    category: 'دعم تقني',
    title: 'صيانة وإعداد أجهزة المكتب',
    desc: 'فحص وإعداد أجهزة الكمبيوتر والشبكة مع تدريب قصير للفريق.',
    price: '١٥',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'عند ' }, { avatar: 'ي' }, { text: 'يوسف حلمي', bold: true }],
      },
      {
        kind: 'text',
        segs: [{ text: 'المتابع من عندكم: ' }, { avatar: 'ط' }, { text: 'طارق منير', bold: true }],
      },
      {
        kind: 'text',
        segs: [{ text: 'التسليم ٨ سبتمبر', bold: true }, { text: ' — فاضل ٥ أيام' }],
      },
    ],
    actions: [
      { key: 'markDoneGot', variant: 'primary' },
      { key: 'changeWatcher' },
      { key: 'reproach', variant: 'danger' },
    ],
    detail: {
      type: 'دعم تقني · طلب على خلي خالص',
      title: 'صيانة وإعداد أجهزة المكتب',
      desc: 'فحص وإعداد أجهزة الكمبيوتر والشبكة مع تدريب قصير للفريق.',
      cards: {
        firstCard: { title: 'القيمة', price: '١٥', currency: 'شهمهم' },
        restCards: [
          { header: 'الحالة', description: 'بتحصل' },
          { header: 'التسليم', description: '٨ سبتمبر' },
        ],
      },
      info: 'تفاصيل التنفيذ',
      data: ['المتابع من عندكم: طارق منير', 'التسليم ٨ سبتمبر — فاضل ٥ أيام'],
      providerName: 'يوسف حلمي',
      providerRate: 'عامر',
      request: 'استلمنا — علِّم حصلت',
      save: 'غيّر المتابع',
      close: 'اقفل',
    },
  },
  {
    id: 'q4',
    status: 'doing',
    category: 'استشارات',
    title: 'استشارة في التخطيط الاستراتيجي',
    desc: 'جلستان لمراجعة خطة المؤسسة السنوية وتحديد الأولويات.',
    price: '٣٠',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'عند ' }, { avatar: 'ه' }, { text: 'هالة رمزي', bold: true }],
      },
      {
        kind: 'text',
        segs: [
          { text: 'المتابع من عندكم: ' },
          { avatar: 'م' },
          { text: 'منى إبراهيم', bold: true },
        ],
      },
      { kind: 'text', segs: [{ text: 'الجلسة التانية ١١ سبتمبر', bold: true }] },
    ],
    actions: [
      { key: 'markDoneGot', variant: 'primary' },
      { key: 'changeWatcher' },
      { key: 'reproach', variant: 'danger' },
    ],
    detail: {
      type: 'استشارات · طلب على خلي خالص',
      title: 'استشارة في التخطيط الاستراتيجي',
      desc: 'جلستان لمراجعة خطة المؤسسة السنوية وتحديد الأولويات.',
      cards: {
        firstCard: { title: 'القيمة', price: '٣٠', currency: 'شهمهم' },
        restCards: [
          { header: 'الحالة', description: 'بتحصل' },
          { header: 'الجلسة التانية', description: '١١ سبتمبر' },
        ],
      },
      info: 'تفاصيل التنفيذ',
      data: ['المتابع من عندكم: منى إبراهيم', 'الجلسة التانية ١١ سبتمبر'],
      providerName: 'هالة رمزي',
      providerRate: 'عامر',
      request: 'استلمنا — علِّم حصلت',
      save: 'غيّر المتابع',
      close: 'اقفل',
    },
  },
  {
    id: 'q5',
    status: 'done',
    category: 'تصوير',
    title: 'تصوير فوتوغرافي لفعالية الافتتاح',
    desc: 'تغطية فوتوغرافية كاملة مع تسليم ٤٠ صورة معدَّلة.',
    price: '٢٢',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'عند ' }, { avatar: 'م' }, { text: 'مروان صبحي', bold: true }],
      },
      {
        kind: 'text',
        segs: [{ text: 'اتقفلت ١٨ أغسطس · اتحوّل ' }, { text: '٢٢ شهمهم', bold: true }],
      },
      { kind: 'text', segs: [{ text: 'لسه ما قيّمتوهوش' }] },
    ],
    actions: [{ key: 'rate', variant: 'primary' }, { key: 'agreement' }],
    detail: {
      type: 'تصوير · طلب على خلي خالص',
      title: 'تصوير فوتوغرافي لفعالية الافتتاح',
      desc: 'تغطية فوتوغرافية كاملة مع تسليم ٤٠ صورة معدَّلة.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٢', currency: 'شهمهم' },
        restCards: [
          { header: 'اتقفلت', description: '١٨ أغسطس' },
          { header: 'التقييم', description: 'لسه ما قيّمتوهوش' },
        ],
      },
      info: 'بعد التسليم',
      data: ['اتحوّل ٢٢ شهمهم', 'التقييم متاح لمدة ١٤ يوم'],
      providerName: 'مروان صبحي',
      providerRate: 'عامر',
      request: 'قيّم التجربة',
      close: 'اقفل',
    },
  },
  {
    id: 'q6',
    status: 'done',
    category: 'كتابة',
    title: 'كتابة وتحرير المحتوى التعريفي',
    desc: 'صياغة نصوص الموقع والمواد التعريفية للمؤسسة.',
    price: '١٨',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'عند ' }, { avatar: 'د' }, { text: 'دينا فؤاد', bold: true }],
      },
      {
        kind: 'text',
        segs: [{ text: 'اتقفلت ٥ أغسطس · اتحوّل ' }, { text: '١٨ شهمهم', bold: true }],
      },
      { kind: 'text', segs: [{ text: 'قيّمتوها: ' }, { seal: 'عامر' }] },
    ],
    actions: [{ key: 'agreement' }, { key: 'seeRating' }],
    detail: {
      type: 'كتابة · طلب على خلي خالص',
      title: 'كتابة وتحرير المحتوى التعريفي',
      desc: 'صياغة نصوص الموقع والمواد التعريفية للمؤسسة.',
      cards: {
        firstCard: { title: 'القيمة', price: '١٨', currency: 'شهمهم' },
        restCards: [
          { header: 'اتقفلت', description: '٥ أغسطس' },
          { header: 'التقييم', description: 'عامر' },
        ],
      },
      info: 'بعد التسليم',
      data: ['اتحوّل ١٨ شهمهم', 'قيّمتوها: عامر'],
      providerName: 'دينا فؤاد',
      providerRate: 'عامر',
      request: 'شوف التقييم',
      close: 'اقفل',
    },
  },
]

export const myAsksCommunity: CommunityAsk[] = [
  {
    id: 'a1',
    type: 'svc',
    status: 'ask',
    category: 'تصوير',
    title: 'جلسة تصوير شخصية للمبدعين',
    desc: 'طلبتها من مشكاة — ساعة ونصف في الاستوديو وتسليم ١٥ صورة معدَّلة.',
    price: '٢٥',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'عند ' }, { avatar: 'م' }, { text: 'مشكاة', bold: true }],
      },
      { kind: 'text', segs: [{ text: 'بعتّه من يومين · لسه ما ردّوش' }] },
      { kind: 'text', segs: [{ text: 'لسه ينفع تلغي قبل ما يقبلوا' }] },
    ],
    actions: [{ key: 'conversation' }, { key: 'cancelRequest', variant: 'danger' }],
    detail: {
      type: 'تصوير · طلب على خلي خالص',
      title: 'جلسة تصوير شخصية للمبدعين',
      desc: 'طلبتها من مشكاة — ساعة ونصف في الاستوديو أو في مكانك، والتسليم ١٥ صورة معدَّلة خلال أسبوع.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٥', currency: 'شهمهم' },
        restCards: [
          { header: 'الحالة', description: 'بانتظار ردهم' },
          { header: 'الإلغاء', description: 'متاح قبل القبول' },
        ],
      },
      info: 'إيه اللي هتستلمه',
      data: ['جلسة في الاستوديو أو مكانك', '١٥ صورة معدَّلة', 'ملفات عالية الدقة'],
      providerName: 'مشكاة',
      providerRate: 'عامر',
      request: 'اطلب الخدمة',
      close: 'اقفل',
    },
  },
  {
    id: 'a2',
    type: 'svc',
    status: 'doing',
    category: 'صوت',
    title: 'تسجيل ومكساج لمشروع شخصي',
    desc: 'تسجيل ومكساج مقطع صوتي واحد في استوديو مشكاة.',
    price: '٢٠',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'عند ' }, { avatar: 'م' }, { text: 'مشكاة', bold: true }],
      },
      {
        kind: 'text',
        segs: [{ text: 'العضو المنفِّذ: ' }, { avatar: 'ي' }, { text: 'يوسف عادل', bold: true }],
      },
      { kind: 'text', segs: [{ text: 'التسليم ١٨ سبتمبر', bold: true }] },
    ],
    actions: [
      { key: 'markDoneReceived', variant: 'primary' },
      { key: 'conversation' },
      { key: 'reproach', variant: 'danger' },
    ],
    detail: {
      type: 'صوت · طلب على خلي خالص',
      title: 'تسجيل ومكساج لمشروع شخصي',
      desc: 'تسجيل ومكساج مقطع صوتي واحد في استوديو مشكاة.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٠', currency: 'شهمهم' },
        restCards: [
          { header: 'الحالة', description: 'بنتحرّك' },
          { header: 'التسليم', description: '١٨ سبتمبر' },
        ],
      },
      info: 'تفاصيل التنفيذ',
      data: ['العضو المنفِّذ: يوسف عادل', 'التسليم ١٨ سبتمبر'],
      providerName: 'مشكاة',
      providerRate: 'كريم',
      request: 'استلمت — علِّم حصلت',
      close: 'اقفل',
    },
  },
  {
    id: 'a3',
    type: 'svc',
    status: 'done',
    category: 'تدريب',
    title: 'ورشة تصوير بالموبايل — خاصة',
    desc: 'جلسة فردية في أساسيات التصوير بالموبايل والمونتاج السريع.',
    price: '١٥',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'عند ' }, { avatar: 'ص' }, { text: 'صوت وصورة', bold: true }],
      },
      {
        kind: 'text',
        segs: [{ text: 'اتقفلت ٢٢ أغسطس · اتخصم ' }, { text: '١٥ شهمهم', bold: true }],
      },
      { kind: 'text', segs: [{ text: 'لسه ما قيّمتهاش' }] },
    ],
    actions: [{ key: 'rate', variant: 'primary' }, { key: 'agreement' }],
    detail: {
      type: 'تدريب · طلب على خلي خالص',
      title: 'ورشة تصوير بالموبايل — خاصة',
      desc: 'جلسة فردية في أساسيات التصوير بالموبايل والمونتاج السريع.',
      cards: {
        firstCard: { title: 'القيمة', price: '١٥', currency: 'شهمهم' },
        restCards: [
          { header: 'اتقفلت', description: '٢٢ أغسطس' },
          { header: 'التقييم', description: 'لسه ما قيّمتهاش' },
        ],
      },
      info: 'بعد التسليم',
      data: ['اتخصم ١٥ شهمهم', 'التقييم متاح لمدة ١٤ يوم'],
      providerName: 'صوت وصورة',
      providerRate: 'كريم',
      request: 'قيّم التجربة',
      close: 'اقفل',
    },
  },
  {
    id: 'b1',
    type: 'res',
    status: 'ask',
    badgeVariant: 'gold',
    category: 'مساحات',
    title: 'قاعة للقراءة والعمل المشترك',
    desc: 'حجز نصف يوم للعمل على مشروع شخصي في قاعة حلقة.',
    price: '٥',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'عند ' }, { avatar: 'ح' }, { text: 'حلقة', bold: true }],
      },
      { kind: 'text', segs: [{ text: 'بعتّه إمبارح · لسه ما ردّوش' }] },
      { kind: 'text', segs: [{ text: 'المطلوب: ٤ سبتمبر · ١٠ ص — ٢ م' }] },
    ],
    actions: [{ key: 'conversation' }, { key: 'cancelRequest', variant: 'danger' }],
    detail: {
      type: 'مساحات · طلب على خلي خالص',
      title: 'قاعة للقراءة والعمل المشترك',
      desc: 'حجز نصف يوم للعمل على مشروع شخصي في قاعة حلقة.',
      cards: {
        firstCard: { title: 'القيمة', price: '٥', currency: 'شهمهم' },
        restCards: [
          { header: 'الحالة', description: 'بانتظار ردهم' },
          { header: 'المطلوب', description: '٤ سبتمبر · ١٠ ص — ٢ م' },
        ],
      },
      info: 'إيه اللي هتستلمه',
      data: ['قاعة هادئة', 'واي فاي', 'إضاءة طبيعية'],
      providerName: 'حلقة',
      providerRate: 'سارة',
      request: 'اطلب الخدمة',
      close: 'اقفل',
    },
  },
  {
    id: 'b2',
    type: 'res',
    status: 'doing',
    badgeVariant: 'gold',
    category: 'مساحات',
    title: 'قاعة للقراءة والعمل المشترك',
    desc: 'حجز مؤكَّد لنصف يوم في قاعة حلقة.',
    price: '٥',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'عند ' }, { avatar: 'ح' }, { text: 'حلقة', bold: true }],
      },
      {
        kind: 'text',
        segs: [{ text: 'المشرفة: ' }, { avatar: 'س' }, { text: 'سارة عبد الله', bold: true }],
      },
      {
        kind: 'text',
        segs: [{ text: 'الاستخدام ٤ سبتمبر', bold: true }, { text: ' · ١٠ ص — ٢ م' }],
      },
    ],
    actions: [
      { key: 'markDone', variant: 'primary' },
      { key: 'reproach', variant: 'danger' },
    ],
    detail: {
      type: 'مساحات · طلب على خلي خالص',
      title: 'قاعة للقراءة والعمل المشترك',
      desc: 'حجز مؤكَّد لنصف يوم في قاعة حلقة.',
      cards: {
        firstCard: { title: 'القيمة', price: '٥', currency: 'شهمهم' },
        restCards: [
          { header: 'المشرفة', description: 'سارة عبد الله' },
          { header: 'الاستخدام', description: '٤ سبتمبر · ١٠ ص — ٢ م' },
        ],
      },
      info: 'تفاصيل الحجز',
      data: ['المشرفة: سارة عبد الله', 'الاستخدام ٤ سبتمبر · ١٠ ص — ٢ م'],
      providerName: 'حلقة',
      providerRate: 'سارة',
      request: 'خلصت — علِّم حصلت',
      close: 'اقفل',
    },
  },
  {
    id: 'b3',
    type: 'res',
    status: 'done',
    badgeVariant: 'gold',
    category: 'معدات',
    title: 'كاميرا للتصوير الشخصي',
    desc: 'إعارة كاميرا ليومين لمشروع تصوير شخصي.',
    price: '٣٠',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'عند ' }, { avatar: 'ص' }, { text: 'صوت وصورة', bold: true }],
      },
      {
        kind: 'text',
        segs: [
          { text: 'اترجعت ١٤ أغسطس · اتخصم ' },
          { text: '٣٠ شهمهم', bold: true },
          { text: ' · التأمين اترد' },
        ],
      },
      { kind: 'text', segs: [{ text: 'قيّمتهم: ' }, { seal: 'عامر' }] },
    ],
    actions: [{ key: 'agreement' }, { key: 'seeRating' }],
    detail: {
      type: 'معدات · طلب على خلي خالص',
      title: 'كاميرا للتصوير الشخصي',
      desc: 'إعارة كاميرا ليومين لمشروع تصوير شخصي.',
      cards: {
        firstCard: { title: 'القيمة', price: '٣٠', currency: 'شهمهم' },
        restCards: [
          { header: 'اترجعت', description: '١٤ أغسطس' },
          { header: 'التقييم', description: 'عامر' },
        ],
      },
      info: 'بعد الإعارة',
      data: ['اتخصم ٣٠ شهمهم', 'التأمين اترد', 'قيّمتهم: عامر'],
      providerName: 'صوت وصورة',
      providerRate: 'كريم',
      request: 'شوف التقييم',
      close: 'اقفل',
    },
  },
]

// My offers
export type OrgOfferType = 'act' | 'svc' | 'res'
export type OrgOfferStatus = 'open' | 'closed' | 'done' | 'none' | 'ask' | 'doing'
export type CommunityAudience = 'org' | 'mem'
export type CommunityOfferStatus = 'none' | 'ask' | 'doing' | 'done'

type OfferAction = {
  key: CardActionKey
  variant?: ServiceCardAction['variant']
  href?: string
}

type OfferBase = {
  id: string
  category: string
  title: string
  desc: string
  price: string
  free?: boolean
  badgeVariant?: 'blue' | 'gold'
  infoRows: ServiceCardInfoRow[]
  actions: OfferAction[]
  detail: ServiceDetail
}

export type OrgOffer = OfferBase & { type: OrgOfferType; status: OrgOfferStatus }
export type CommunityOffer = OfferBase & {
  audience: CommunityAudience
  status: CommunityOfferStatus
}

const editUnpublishDelete: OfferAction[] = [
  { key: 'edit' },
  { key: 'unpublish' },
  { key: 'delete', variant: 'danger' },
]

export const myOffersOrg: OrgOffer[] = [
  {
    id: 'o1',
    type: 'act',
    status: 'open',
    category: 'ورشة',
    title: 'ورشة بودكاست للمبتدئين',
    desc: 'يومان في التسجيل والمونتاج الأساسي مع تطبيق عملي كامل في الاستوديو.',
    price: '٤٥',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: '٦', bold: true }, { text: ' مسجَّلين من ١٢ · فاضل ٦' }],
        seat: { pct: '50%' },
      },
      {
        kind: 'text',
        segs: [{ text: 'آخر موعد للتسجيل: ' }, { text: '٩ سبتمبر', bold: true }],
      },
      { kind: 'text', segs: [{ text: 'النشاط يوم ١٢ و١٣ سبتمبر' }] },
    ],
    actions: [
      { key: 'participants', variant: 'primary', href: '/khalli-khales/participants-attendance' },
      { key: 'edit' },
      { key: 'closeRegistration', variant: 'danger' },
    ],
    detail: {
      type: 'ورشة · الجيفت شوب',
      title: 'ورشة بودكاست للمبتدئين',
      desc: 'يومان في التسجيل والمونتاج الأساسي مع تطبيق عملي كامل داخل الاستوديو.',
      cards: {
        firstCard: { title: 'سعر المقعد', price: '٤٥', currency: 'شهمهم' },
        restCards: [
          { header: 'المقاعد', description: '١٢ — فاضل ٦' },
          { header: 'آخر موعد', description: '٩ سبتمبر' },
        ],
      },
      info: 'إدارة التسجيل',
      data: [
        'المشاركون بيتسجّلوا من حساباتهم',
        'تقدروا تقفلوا التسجيل قبل الموعد',
        'الحضور بيتعلّم من صفحة المشاركين',
      ],
      providerName: 'مشكاة',
      providerRate: 'عامر',
      request: 'المشاركون والحضور',
      close: 'اقفل',
    },
  },
  {
    id: 'o2',
    type: 'act',
    status: 'open',
    category: 'كورس',
    title: 'كورس التصوير الوثائقي',
    desc: 'ستة أسابيع في بناء القصة البصرية والتصوير في المواقع الحقيقية.',
    price: '٥٥',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: '١٠', bold: true }, { text: ' مسجَّلين من ١٠ · مكتمل' }],
        seat: { pct: '100%', full: true },
      },
      { kind: 'text', segs: [{ text: 'قائمة انتظار: ' }, { text: '٣', bold: true }] },
      { kind: 'text', segs: [{ text: 'يبدأ ٥ أكتوبر' }] },
    ],
    actions: [
      { key: 'participants', variant: 'primary', href: '/khalli-khales/participants-attendance' },
      { key: 'addSeats' },
      { key: 'closeRegistration', variant: 'danger' },
    ],
    detail: {
      type: 'كورس · الجيفت شوب',
      title: 'كورس التصوير الوثائقي',
      desc: 'ستة أسابيع في بناء القصة البصرية والتصوير في المواقع الحقيقية.',
      cards: {
        firstCard: { title: 'سعر المقعد', price: '٥٥', currency: 'شهمهم' },
        restCards: [
          { header: 'المقاعد', description: '١٠ — مكتمل' },
          { header: 'قائمة الانتظار', description: '٣' },
          { header: 'يبدأ', description: '٥ أكتوبر' },
        ],
      },
      info: 'إدارة التسجيل',
      data: [
        'المشاركون بيتسجّلوا من حساباتهم',
        'تقدروا تزوّدوا المقاعد قبل الموعد',
        'الحضور بيتعلّم من صفحة المشاركين',
      ],
      providerName: 'مشكاة',
      providerRate: 'عامر',
      request: 'المشاركون والحضور',
      close: 'اقفل',
    },
  },
  {
    id: 'o3',
    type: 'act',
    status: 'closed',
    category: 'فعالية',
    title: 'ليلة عروض أفلام قصيرة',
    desc: 'عرض لستة أفلام قصيرة مصرية مع نقاش مفتوح مع صنّاعها بعد العرض.',
    price: 'مجانًا',
    free: true,
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: '٣٧', bold: true }, { text: ' مسجَّلين من ٦٠' }],
        seat: { pct: '62%' },
      },
      { kind: 'text', segs: [{ text: 'التسجيل اتقفل ٢٦ سبتمبر' }] },
      { kind: 'text', segs: [{ text: 'الفعالية يوم ٢٨ سبتمبر' }] },
    ],
    actions: [
      { key: 'participants', variant: 'primary', href: '/khalli-khales/participants-attendance' },
      { key: 'reopen' },
    ],
    detail: {
      type: 'فعالية · الجيفت شوب',
      title: 'ليلة عروض أفلام قصيرة',
      desc: 'عرض لستة أفلام قصيرة مصرية مع نقاش مفتوح مع صنّاعها بعد العرض.',
      cards: {
        firstCard: { title: 'سعر التذكرة', price: '٠', currency: 'شهمهم' },
        restCards: [
          { header: 'المقاعد', description: '٦٠ — فاضل ٢٣' },
          { header: 'التسجيل', description: 'اتقفل ٢٦ سبتمبر' },
          { header: 'الفعالية', description: '٢٨ سبتمبر' },
        ],
      },
      info: 'إدارة التسجيل',
      data: [
        'المشاركون بيتسجّلوا من حساباتهم',
        'تقدروا تفتحوا التسجيل تاني',
        'الحضور بيتعلّم من صفحة المشاركين',
      ],
      providerName: 'مشكاة',
      providerRate: 'عامر',
      request: 'المشاركون والحضور',
      close: 'اقفل',
    },
  },
  {
    id: 'o4',
    type: 'act',
    status: 'done',
    category: 'ورشة',
    title: 'ورشة الكتابة للمنصات',
    desc: 'ثلاث جلسات في كتابة المحتوى الرقمي للمؤسسات الثقافية.',
    price: '٤٥',
    infoRows: [
      { kind: 'text', segs: [{ text: '١١', bold: true }, { text: ' حضروا من ١٢ مسجَّل' }] },
      {
        kind: 'text',
        segs: [{ text: 'اتقفلت ٣٠ أغسطس · اتحوّل ' }, { text: '٤٩٥ شهمهم', bold: true }],
      },
      { kind: 'text', segs: [{ text: 'قيّمها ٩ من الحاضرين' }] },
    ],
    actions: [
      { key: 'attendance', variant: 'primary', href: '/khalli-khales/participants-attendance' },
      { key: 'seeRatings' },
    ],
    detail: {
      type: 'ورشة · الجيفت شوب',
      title: 'ورشة الكتابة للمنصات',
      desc: 'ثلاث جلسات في كتابة المحتوى الرقمي للمؤسسات الثقافية.',
      cards: {
        firstCard: { title: 'سعر المقعد', price: '٤٥', currency: 'شهمهم' },
        restCards: [
          { header: 'الحضور', description: '١١ من ١٢' },
          { header: 'اتقفلت', description: '٣٠ أغسطس' },
        ],
      },
      info: 'إدارة النشاط',
      data: ['التقييمات متاحة للحاضرين', 'تقدر تشوف ملاحظات الحضور بعد التسليم'],
      providerName: 'مشكاة',
      providerRate: 'عامر',
      request: 'شوف الحضور',
      close: 'اقفل',
    },
  },
  {
    id: 'o5',
    type: 'svc',
    status: 'none',
    category: 'تصوير',
    title: 'جلسة تصوير شخصية للمبدعين',
    desc: 'ساعة ونصف في الاستوديو أو في مكانكم، والتسليم ١٥ صورة معدَّلة.',
    price: '٢٥',
    infoRows: [
      { kind: 'text', segs: [{ text: 'منشورة من ١٨ يومًا' }] },
      {
        kind: 'text',
        segs: [
          { text: '٣١', bold: true },
          { text: ' زيارة · ' },
          { text: '٧', bold: true },
          { text: ' حفظوها' },
        ],
      },
      {
        kind: 'text',
        segs: [{ text: 'العضو المسؤول: ' }, { avatar: 'ك' }, { text: 'كريم فوزي', bold: true }],
      },
    ],
    actions: editUnpublishDelete,
    detail: {
      type: 'تصوير · خدمة للجمهور',
      title: 'جلسة تصوير شخصية للمبدعين',
      desc: 'ساعة ونصف في الاستوديو أو في مكانكم، والتسليم ١٥ صورة معدَّلة.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٥', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: 'ساعة ونصف' },
          { header: 'التسليم', description: '١٥ صورة معدَّلة' },
        ],
      },
      info: 'مهم تعرفه',
      data: [
        'منشورة في الجيفت شوب',
        'الحجز بيتّم من حسابات الجمهور',
        'القيمة بتتحوّل بعد اعتماد التسليم',
      ],
      providerName: 'مشكاة',
      providerRate: 'عامر',
      request: 'اطلب الخدمة',
      close: 'اقفل',
    },
  },
  {
    id: 'o6',
    type: 'svc',
    status: 'ask',
    category: 'صوت',
    title: 'تسجيل ومكساج لمشروع شخصي',
    desc: 'تسجيل ومكساج مقطع صوتي واحد في الاستوديو، للأفراد.',
    price: '٢٠',
    infoRows: [
      {
        kind: 'text',
        segs: [
          { text: 'طلبها ' },
          { avatar: 'ن' },
          { text: 'نادية كمال', bold: true },
          { text: ' من ٣ ساعات' },
        ],
      },
      { kind: 'text', segs: [{ text: 'المطلوب: ١٨ سبتمبر' }] },
      { kind: 'text', segs: [{ text: 'مخصصها الشهري يكفّي' }] },
    ],
    actions: [
      { key: 'accept', variant: 'primary' },
      { key: 'reject', variant: 'danger' },
      { key: 'conversation' },
    ],
    detail: {
      type: 'صوت · خدمة للجمهور',
      title: 'تسجيل ومكساج لمشروع شخصي',
      desc: 'تسجيل ومكساج مقطع صوتي واحد في الاستوديو، للأفراد من الجمهور.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٠', currency: 'شهمهم' },
        restCards: [
          { header: 'الطالبة', description: 'نادية كمال' },
          { header: 'المطلوب', description: '١٨ سبتمبر' },
        ],
      },
      info: 'قبل ما تقبلوا',
      data: ['اتأكدوا إن العضو المكلَّف فاضي في الميعاد', 'الشهمهم بيتحوّل بعد اعتماد التسليم'],
      providerName: 'مشكاة',
      providerRate: 'عامر',
      request: 'اقبل',
      save: 'ارفض',
      close: 'اقفل',
    },
  },
  {
    id: 'o7',
    type: 'svc',
    status: 'doing',
    category: 'تصوير',
    title: 'جلسة تصوير شخصية للمبدعين',
    desc: 'ساعة ونصف في الاستوديو، والتسليم ١٥ صورة معدَّلة خلال أسبوع.',
    price: '٢٥',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'مع ' }, { avatar: 'ك' }, { text: 'كمال درويش', bold: true }],
      },
      {
        kind: 'text',
        segs: [{ text: 'العضو المكلَّف: ' }, { avatar: 'ك' }, { text: 'كريم فوزي', bold: true }],
      },
      { kind: 'text', segs: [{ text: 'التسليم ٢ سبتمبر', bold: true }] },
    ],
    actions: [
      { key: 'markDonePlain', variant: 'primary' },
      { key: 'changeMember' },
      { key: 'reproach', variant: 'danger' },
    ],
    detail: {
      type: 'تصوير · خدمة للجمهور',
      title: 'جلسة تصوير شخصية للمبدعين',
      desc: 'ساعة ونصف في الاستوديو، والتسليم ١٥ صورة معدَّلة خلال أسبوع.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٥', currency: 'شهمهم' },
        restCards: [
          { header: 'مع', description: 'كمال درويش' },
          { header: 'التسليم', description: '٢ سبتمبر' },
        ],
      },
      info: 'تفاصيل التنفيذ',
      data: ['العضو المكلَّف: كريم فوزي', 'التسليم خلال أسبوع من الجلسة'],
      providerName: 'مشكاة',
      providerRate: 'عامر',
      request: 'علِّم حصلت',
      save: 'غيّر العضو',
      close: 'اقفل',
    },
  },
  {
    id: 'o8',
    type: 'svc',
    status: 'done',
    category: 'تدريب',
    title: 'ورشة تصوير بالموبايل — خاصة',
    desc: 'جلسة فردية في أساسيات التصوير بالموبايل والمونتاج السريع.',
    price: '١٥',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'مع ' }, { avatar: 'ن' }, { text: 'نادية كمال', bold: true }],
      },
      {
        kind: 'text',
        segs: [{ text: 'اتقفلت ٢٢ أغسطس · اتحوّل ' }, { text: '١٥ شهمهم', bold: true }],
      },
      { kind: 'text', segs: [{ text: 'لسه ما قيّمتوهاش' }] },
    ],
    actions: [{ key: 'rate', variant: 'primary' }, { key: 'agreement' }],
    detail: {
      type: 'تدريب · خدمة للجمهور',
      title: 'ورشة تصوير بالموبايل — خاصة',
      desc: 'جلسة فردية في أساسيات التصوير بالموبايل والمونتاج السريع.',
      cards: {
        firstCard: { title: 'القيمة', price: '١٥', currency: 'شهمهم' },
        restCards: [
          { header: 'مع', description: 'نادية كمال' },
          { header: 'اتقفلت', description: '٢٢ أغسطس' },
        ],
      },
      info: 'بعد التسليم',
      data: ['التقييم متاح لمدة ١٤ يوم', 'الشهمهم اتحوّل بعد الاعتماد'],
      providerName: 'مشكاة',
      providerRate: 'عامر',
      request: 'قيّم التجربة',
      close: 'اقفل',
    },
  },
  {
    id: 'o9',
    type: 'res',
    status: 'none',
    badgeVariant: 'gold',
    category: 'مساحات',
    title: 'قاعة للقراءة والعمل المشترك',
    desc: 'مساحة هادئة للقراءة والعمل، متاحة بالساعة لأفراد الجمهور.',
    price: '٥',
    infoRows: [
      { kind: 'text', segs: [{ text: 'منشورة من شهر' }] },
      {
        kind: 'text',
        segs: [
          { text: '٢٢', bold: true },
          { text: ' زيارة · ' },
          { text: '٤', bold: true },
          { text: ' حفظوها' },
        ],
      },
      { kind: 'text', segs: [{ text: 'بالساعة · بحجز مسبق' }] },
    ],
    actions: editUnpublishDelete,
    detail: {
      type: 'مساحات · موارد',
      title: 'قاعة للقراءة والعمل المشترك',
      desc: 'مساحة هادئة للقراءة والعمل، متاحة بالساعة لأفراد الجمهور.',
      cards: {
        firstCard: { title: 'القيمة', price: '٥', currency: 'شهمهم' },
        restCards: [
          { header: 'الإتاحة', description: 'بالساعة' },
          { header: 'الحجز', description: 'مسبق' },
        ],
      },
      info: 'مهم تعرفه',
      data: ['متاحة لأفراد الجمهور', 'الحجز بالساعة', 'بحجز مسبق فقط'],
      providerName: 'مشكاة',
      providerRate: 'عامر',
      request: 'اطلب',
      save: 'أوقف النشر',
      close: 'اقفل',
    },
  },
  {
    id: 'o10',
    type: 'res',
    status: 'doing',
    badgeVariant: 'gold',
    category: 'مساحات',
    title: 'قاعة للقراءة والعمل المشترك',
    desc: 'حجز نصف يوم لفرد من الجمهور للعمل على مشروع شخصي.',
    price: '٥',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'مع ' }, { avatar: 'ي' }, { text: 'يوسف حلمي', bold: true }],
      },
      {
        kind: 'text',
        segs: [{ text: 'الاستخدام ٤ سبتمبر', bold: true }, { text: ' · ١٠ ص — ٢ م' }],
      },
      {
        kind: 'text',
        segs: [{ text: 'المشرف: ' }, { avatar: 'س' }, { text: 'سارة عبد الله', bold: true }],
      },
    ],
    actions: [
      { key: 'markDone', variant: 'primary' },
      { key: 'reproach', variant: 'danger' },
    ],
    detail: {
      type: 'مساحات · موارد',
      title: 'قاعة للقراءة والعمل المشترك',
      desc: 'حجز نصف يوم لفرد من الجمهور للعمل على مشروع شخصي.',
      cards: {
        firstCard: { title: 'القيمة', price: '٥', currency: 'شهمهم' },
        restCards: [
          { header: 'مع', description: 'يوسف حلمي' },
          { header: 'الاستخدام', description: '٤ سبتمبر' },
        ],
      },
      info: 'تفاصيل الحجز',
      data: ['١٠ ص — ٢ م', 'المشرف: سارة عبد الله'],
      providerName: 'مشكاة',
      providerRate: 'عامر',
      request: 'خلصت — علِّم حصلت',
      close: 'اقفل',
    },
  },
]

export const myOffersCommunity: CommunityOffer[] = [
  {
    id: 'c1',
    audience: 'org',
    status: 'none',
    category: 'ترجمة',
    title: 'ترجمة عربي ⇄ إنجليزي للمواد الثقافية',
    desc: 'ترجمة التقارير والمواد التعريفية والبيانات الصحفية، مع مراجعة لغوية نهائية.',
    price: '٢٠',
    infoRows: [
      { kind: 'text', segs: [{ text: 'منشورة من ١٢ يومًا' }] },
      {
        kind: 'text',
        segs: [
          { text: '٣٤', bold: true },
          { text: ' زيارة · ' },
          { text: '٦', bold: true },
          { text: ' حفظوها' },
        ],
      },
      { kind: 'text', segs: [{ text: '٤ ساعات × ٥ شهمهم' }] },
    ],
    actions: editUnpublishDelete,
    detail: {
      type: 'ترجمة · خدمة للمؤسسات',
      title: 'ترجمة عربي ⇄ إنجليزي للمواد الثقافية',
      desc: 'ترجمة التقارير والمواد التعريفية والبيانات الصحفية، مع مراجعة لغوية نهائية.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٠', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: 'شهر واحد' },
          { header: 'الإتاحة', description: 'متاح' },
        ],
      },
      info: 'إيه اللي هتستلمه',
      data: ['ملف مترجم ومنسّق', 'مراجعة لغوية نهائية', 'جولة تعديلات واحدة'],
      providerName: 'مشكاة',
      providerRate: 'عامر',
      request: 'اطلب الخدمة',
      save: 'احفظ في المحفوظات',
      close: 'اقفل',
    },
  },
  {
    id: 'c2',
    audience: 'org',
    status: 'ask',
    category: 'تصميم',
    title: 'تصميم منشورات سوشيال ميديا',
    desc: 'حزمة منشورات شهرية بهوية المؤسسة، مع ملفات مفتوحة قابلة للتعديل.',
    price: '٢٥',
    infoRows: [
      {
        kind: 'text',
        segs: [
          { text: 'طلبتها ' },
          { avatar: 'م' },
          { text: 'مشكاة', bold: true },
          { text: ' من ٣ ساعات' },
        ],
      },
      { kind: 'text', segs: [{ text: 'المواعيد المطلوبة: ١٥ — ٣٠ سبتمبر' }] },
      { kind: 'text', segs: [{ text: 'لو قبلت، هتبدأ بعد الاتفاق' }] },
    ],
    actions: [
      { key: 'accept', variant: 'primary' },
      { key: 'reject', variant: 'danger' },
      { key: 'conversation' },
    ],
    detail: {
      type: 'تصميم · خدمة للمؤسسات',
      title: 'تصميم منشورات سوشيال ميديا',
      desc: 'حزمة منشورات شهرية بهوية المؤسسة، مع ملفات مفتوحة قابلة للتعديل. مشكاة طلبتها وبتستنى ردك.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٥', currency: 'شهمهم' },
        restCards: [
          { header: 'الطالبة', description: 'مشكاة' },
          { header: 'المواعيد', description: '١٥ — ٣٠ سبتمبر' },
        ],
      },
      info: 'قبل ما تقبل',
      data: ['اتأكد إنك فاضي في المواعيد دي', 'القيمة بتوصلك بعد اعتماد التسليم'],
      providerName: 'مشكاة',
      providerRate: 'عامر',
      request: 'اقبل',
      save: 'ارفض',
      close: 'اقفل',
    },
  },
  {
    id: 'c3',
    audience: 'org',
    status: 'doing',
    category: 'ترجمة',
    title: 'ترجمة التقرير السنوي',
    desc: 'ترجمة ومراجعة لغوية لتقرير ٤٠ صفحة بمصطلحات القطاع الثقافي.',
    price: '٢٠',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'مع ' }, { avatar: 'م' }, { text: 'مشكاة', bold: true }],
      },
      {
        kind: 'text',
        segs: [{ text: 'التسليم ٢٠ سبتمبر', bold: true }, { text: ' — فاضل ٨ أيام' }],
      },
      { kind: 'text', segs: [{ text: 'اتفقتم على جولة تعديلات واحدة' }] },
    ],
    actions: [
      { key: 'markDoneDelivered', variant: 'primary' },
      { key: 'conversation' },
      { key: 'reproach', variant: 'danger' },
    ],
    detail: {
      type: 'ترجمة · خدمة للمؤسسات',
      title: 'ترجمة التقرير السنوي',
      desc: 'ترجمة ومراجعة لغوية لتقرير ٤٠ صفحة بمصطلحات القطاع الثقافي.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٠', currency: 'شهمهم' },
        restCards: [
          { header: 'مع', description: 'مشكاة' },
          { header: 'التسليم', description: '٢٠ سبتمبر' },
        ],
      },
      info: 'تفاصيل التنفيذ',
      data: ['فاضل ٨ أيام على التسليم', 'جولة تعديلات واحدة'],
      providerName: 'مشكاة',
      providerRate: 'عامر',
      request: 'سلّمت — علِّم حصلت',
      save: 'افتح المحادثة',
      close: 'اقفل',
    },
  },
  {
    id: 'c4',
    audience: 'org',
    status: 'done',
    category: 'دعم تقني',
    title: 'إعداد أجهزة وشبكة المكتب',
    desc: 'فحص وإعداد أجهزة الكمبيوتر والشبكة مع تدريب قصير للفريق.',
    price: '١٥',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'مع ' }, { avatar: 'ح' }, { text: 'حلقة', bold: true }],
      },
      {
        kind: 'text',
        segs: [{ text: 'اتقفلت ٢٢ أغسطس · وصلك ' }, { text: '١٥ شهمهم', bold: true }],
      },
      {
        kind: 'text',
        segs: [{ text: 'قيّمتك: ' }, { seal: 'عامر' }],
      },
    ],
    actions: [{ key: 'rate', variant: 'primary' }, { key: 'agreement' }],
    detail: {
      type: 'دعم تقني · خدمة للمؤسسات',
      title: 'إعداد أجهزة وشبكة المكتب',
      desc: 'فحص وإعداد أجهزة الكمبيوتر والشبكة مع تدريب قصير للفريق.',
      cards: {
        firstCard: { title: 'القيمة', price: '١٥', currency: 'شهمهم' },
        restCards: [
          { header: 'مع', description: 'حلقة' },
          { header: 'اتقفلت', description: '٢٢ أغسطس' },
        ],
      },
      info: 'بعد التسليم',
      data: ['وصلك ١٥ شهمهم', 'التقييم متاح لمدة ١٤ يوم'],
      providerName: 'حلقة',
      providerRate: 'عامر',
      request: 'قيّم التجربة',
      close: 'اقفل',
    },
  },
  {
    id: 'c5',
    audience: 'mem',
    status: 'none',
    category: 'تعليم',
    title: 'دروس لغة إنجليزية للمبتدئين',
    desc: 'أربع جلسات أسبوعية أونلاين، بمجموعات صغيرة أو فردي.',
    price: '١٦',
    infoRows: [
      { kind: 'text', segs: [{ text: 'منشورة من ٣ أسابيع' }] },
      {
        kind: 'text',
        segs: [
          { text: '١٩', bold: true },
          { text: ' زيارة · ' },
          { text: '٢', bold: true },
          { text: ' حفظوها' },
        ],
      },
      { kind: 'text', segs: [{ text: '٤ ساعات × ٤ شهمهم' }] },
    ],
    actions: editUnpublishDelete,
    detail: {
      type: 'تعليم · خدمة لأعضاء الفرق',
      title: 'دروس لغة إنجليزية للمبتدئين',
      desc: 'أربع جلسات أسبوعية أونلاين، بمجموعات صغيرة أو فردي.',
      cards: {
        firstCard: { title: 'القيمة', price: '١٦', currency: 'شهمهم' },
        restCards: [
          { header: 'المدة', description: '٤ جلسات' },
          { header: 'الإتاحة', description: 'متاح' },
        ],
      },
      info: 'مهم تعرفه',
      data: ['المؤسسة ما بتحجزش نيابةً عن أعضائها', 'القيمة بتتخصم من مخصص العضو الشهري'],
      providerName: 'مشكاة',
      providerRate: 'عامر',
      request: 'شارك مع الفريق',
      save: 'أوقف النشر',
      close: 'اقفل',
    },
  },
  {
    id: 'c6',
    audience: 'mem',
    status: 'doing',
    category: 'تعليم',
    title: 'دروس لغة إنجليزية للمبتدئين',
    desc: 'أربع جلسات أسبوعية أونلاين لعضو من فريق صوت وصورة.',
    price: '١٦',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'مع ' }, { avatar: 'ك' }, { text: 'كريم فوزي', bold: true }],
      },
      { kind: 'text', segs: [{ text: 'الجلسة التالتة ٩ سبتمبر', bold: true }] },
      { kind: 'text', segs: [{ text: '٢ من ٤ جلسات خلصوا' }] },
    ],
    actions: [
      { key: 'markDone', variant: 'primary' },
      { key: 'conversation' },
      { key: 'reproach', variant: 'danger' },
    ],
    detail: {
      type: 'تعليم · خدمة لأعضاء الفرق',
      title: 'دروس لغة إنجليزية للمبتدئين',
      desc: 'أربع جلسات أسبوعية أونلاين لعضو من فريق صوت وصورة.',
      cards: {
        firstCard: { title: 'القيمة', price: '١٦', currency: 'شهمهم' },
        restCards: [
          { header: 'مع', description: 'كريم فوزي' },
          { header: 'الجلسة التالتة', description: '٩ سبتمبر' },
        ],
      },
      info: 'تفاصيل التنفيذ',
      data: ['٢ من ٤ جلسات خلصوا', 'باقي جلستين'],
      providerName: 'صوت وصورة',
      providerRate: 'عامر',
      request: 'خلصت — علِّم حصلت',
      save: 'افتح المحادثة',
      close: 'اقفل',
    },
  },
  {
    id: 'c7',
    audience: 'mem',
    status: 'done',
    category: 'صحة',
    title: 'جلسة دعم نفسي فردية',
    desc: 'جلسة أونلاين لعضو من فريق مؤسسة، بإشراف أخصائية.',
    price: '٢٠',
    infoRows: [
      {
        kind: 'text',
        segs: [{ text: 'مع ' }, { avatar: 'س' }, { text: 'سلمى فؤاد', bold: true }],
      },
      {
        kind: 'text',
        segs: [{ text: 'اتقفلت ١٠ أغسطس · وصلك ' }, { text: '٢٠ شهمهم', bold: true }],
      },
      { kind: 'text', segs: [{ text: 'لسه ما قيّمتهاش' }] },
    ],
    actions: [{ key: 'rate', variant: 'primary' }, { key: 'agreement' }],
    detail: {
      type: 'صحة · خدمة لأعضاء الفرق',
      title: 'جلسة دعم نفسي فردية',
      desc: 'جلسة أونلاين لعضو من فريق مؤسسة، بإشراف أخصائية.',
      cards: {
        firstCard: { title: 'القيمة', price: '٢٠', currency: 'شهمهم' },
        restCards: [
          { header: 'مع', description: 'سلمى فؤاد' },
          { header: 'اتقفلت', description: '١٠ أغسطس' },
        ],
      },
      info: 'بعد التسليم',
      data: ['وصلك ٢٠ شهمهم', 'التقييم متاح لمدة ١٤ يوم'],
      providerName: 'سلمى فؤاد',
      providerRate: 'عامر',
      request: 'قيّم التجربة',
      close: 'اقفل',
    },
  },
]

// My registrations
export type RegistrationStatus = 'reg' | 'wait' | 'att' | 'cx'

type RegistrationAction = {
  key: CardActionKey
  variant?: ServiceCardAction['variant']
  href?: string
}

type RegistrationBase = {
  id: string
  category: string
  title: string
  desc: string
  price: string
  free?: boolean
  badgeVariant?: 'blue' | 'gold'
  infoRows: ServiceCardInfoRow[]
  actions: RegistrationAction[]
  detail: ServiceDetail
}

export type KhalliKhalesRegistration = RegistrationBase & { status: RegistrationStatus }

export const myRegistrations: KhalliKhalesRegistration[] = [
  {
    id: 'r1',
    status: 'reg',
    category: 'ورشة',
    title: 'ورشة بودكاست للمبتدئين',
    desc: 'يومان في التسجيل والمونتاج الأساسي مع تطبيق عملي في الاستوديو.',
    price: '٤٥',
    infoRows: [
      { kind: 'text', segs: [{ avatar: 'ص' }, { text: 'صوت وصورة', bold: true }] },
      {
        kind: 'text',
        segs: [{ text: '١٢ و١٣ سبتمبر', bold: true }, { text: ' · ٥ — ٩ مساءً' }],
      },
      { kind: 'pill', text: 'الإلغاء متاح لحد ٩ سبتمبر' },
    ],
    actions: [
      { key: 'viewActivity', href: '/khalli-khales/activities/g1' },
      { key: 'cancelRegistration', variant: 'danger' },
    ],
    detail: {
      type: 'ورشة · تسجيلاتي',
      title: 'ورشة بودكاست للمبتدئين',
      desc: 'يومان في التسجيل والمونتاج الأساسي مع تطبيق عملي في الاستوديو.',
      cards: {
        firstCard: { title: 'سعر المقعد', price: '٤٥', currency: 'شهمهم' },
        restCards: [
          { header: 'التاريخ', description: '١٢ و١٣ سبتمبر' },
          { header: 'الإلغاء', description: 'متاح لحد ٩ سبتمبر' },
        ],
      },
      info: 'مهم تعرفه',
      data: ['اليوم الأول: الفكرة والسكريبت والصوت', 'اليوم التاني: التسجيل والمونتاج'],
      providerName: 'صوت وصورة',
      providerRate: 'عامر',
      request: 'شوف النشاط',
      close: 'اقفل',
    },
  },
  {
    id: 'r2',
    status: 'reg',
    category: 'كورس',
    title: 'كورس التصوير الوثائقي',
    desc: 'ستة أسابيع في بناء القصة البصرية والتصوير في المواقع الحقيقية.',
    price: '٥٥',
    infoRows: [
      { kind: 'text', segs: [{ avatar: 'ص' }, { text: 'صوت وصورة', bold: true }] },
      {
        kind: 'text',
        segs: [{ text: 'يبدأ ٥ أكتوبر', bold: true }, { text: ' · ٦ أسابيع' }],
      },
      { kind: 'pill', text: 'الإلغاء متاح لحد ١ أكتوبر' },
    ],
    actions: [
      { key: 'viewActivity', href: '/khalli-khales/activities/g1' },
      { key: 'cancelRegistration', variant: 'danger' },
    ],
    detail: {
      type: 'ورشة · تسجيلاتي',
      title: 'كورس التصوير الوثائقي',
      desc: 'ستة أسابيع في بناء القصة البصرية والتصوير في المواقع الحقيقية.',
      cards: {
        firstCard: { title: 'القيمة', price: '٥٥', currency: 'شهمهم' },
        restCards: [
          { header: 'التاريخ', description: 'يبدأ ٥ أكتوبر' },
          { header: 'الإلغاء', description: 'متاح لحد ١ أكتوبر' },
        ],
      },
      info: 'مهم تعرفه',
      data: ['بناء القصة البصرية', 'ورش تطبيقية', 'مراجعة'],
      providerName: 'صوت وصورة',
      providerRate: 'عامر',
      request: 'شوف النشاط',
      close: 'اقفل',
    },
  },
  {
    id: 'r3',
    status: 'wait',
    category: 'ورشة',
    title: 'ورشة الكتابة للمنصات',
    desc: 'ثلاث جلسات في كتابة المحتوى الرقمي للمؤسسات الثقافية.',
    price: '٤٥',
    infoRows: [
      { kind: 'text', segs: [{ avatar: 'ح' }, { text: 'حلقة', bold: true }] },
      {
        kind: 'text',
        segs: [{ text: '٢٠ سبتمبر', bold: true }, { text: ' · مكانك ٣ في القائمة' }],
      },
      { kind: 'pill', text: 'هنبلّغك لو فضي مكان', soft: true },
    ],
    actions: [
      { key: 'viewActivity', href: '/khalli-khales/activities/g1' },
      { key: 'leaveWaitlist', variant: 'danger' },
    ],
    detail: {
      type: 'ورشة · تسجيلاتي',
      title: 'ورشة الكتابة للمنصات',
      desc: 'ثلاث جلسات في كتابة المحتوى الرقمي للمؤسسات الثقافية.',
      cards: {
        firstCard: { title: 'سعر المقعد', price: '٤٥', currency: 'شهمهم' },
        restCards: [
          { header: 'التاريخ', description: '٢٠ سبتمبر' },
          { header: 'الإلغاء', description: 'هنبلّغك لو فضي مكان' },
        ],
      },
      info: 'مهم تعرفه',
      data: ['ورش تطبيقية', 'مراجعة أعمال'],
      providerName: 'حلقة',
      providerRate: 'عامر',
      request: 'شوف النشاط',
      close: 'اقفل',
    },
  },
  {
    id: 'r4',
    status: 'att',
    category: 'ورشة',
    title: 'ورشة تصوير بالموبايل — يوم واحد',
    desc: 'يوم في أساسيات التصوير بالموبايل والمونتاج السريع.',
    price: '١٥',
    infoRows: [
      { kind: 'text', segs: [{ avatar: 'ح' }, { text: 'حلقة', bold: true }] },
      {
        kind: 'text',
        segs: [
          { text: 'حضرتِها ' },
          { text: '٢٠ أغسطس', bold: true },
          { text: ' · اتخصم ١٥ شهمهم' },
        ],
      },
      { kind: 'text', segs: [{ text: 'لسه ما قيّمتيهاش' }] },
    ],
    actions: [
      { key: 'rate', variant: 'primary' },
      { key: 'viewActivity', href: '/khalli-khales/activities/g1' },
    ],
    detail: {
      type: 'ورشة · تسجيلاتي',
      title: 'ورشة تصوير بالموبايل — يوم واحد',
      desc: 'يوم في أساسيات التصوير بالموبايل والمونتاج السريع.',
      cards: {
        firstCard: { title: 'القيمة', price: '١٥', currency: 'شهمهم' },
        restCards: [
          { header: 'التاريخ', description: '٢٠ أغسطس' },
          { header: 'التقييم', description: 'لسه ما قيّمتيهاش' },
        ],
      },
      info: 'مهم تعرفه',
      data: ['جلسة في الاستوديو', '١٥ صورة', 'مود بسيطة'],
      providerName: 'حلقة',
      providerRate: 'كريم',
      request: 'شوف النشاط',
      close: 'اقفل',
    },
  },
  {
    id: 'r5',
    status: 'att',
    category: 'فعالية',
    title: 'ليلة عروض أفلام قصيرة',
    desc: 'عرض لستة أفلام قصيرة مصرية مع نقاش مفتوح مع صنّاعها.',
    price: 'مجانًا',
    free: true,
    infoRows: [
      { kind: 'text', segs: [{ avatar: 'م' }, { text: 'ملحة', bold: true }] },
      { kind: 'text', segs: [{ text: 'حضرتِها ' }, { text: '٢ أغسطس', bold: true }] },
      { kind: 'text', segs: [{ text: 'قيّمتيها: ' }, { seal: 'عامر' }] },
    ],
    actions: [{ key: 'seeRating' }, { key: 'viewActivity', href: '/khalli-khales/activities/g1' }],
    detail: {
      type: 'ورشة · تسجيلاتي',
      title: 'ليلة عروض أفلام قصيرة',
      desc: 'عرض لستة أفلام قصيرة مصرية مع نقاش مفتوح مع صنّاعها.',
      cards: {
        firstCard: { title: 'القيمة', price: 'مجانًا', currency: '' },
        restCards: [],
      },
      info: 'مهم تعرفه',
      data: ['عرض ٦ أفلام قصيرة', 'نقاش مفتوح'],
      providerName: 'ملحة',
      providerRate: 'عامر',
      request: 'شوف النشاط',
      close: 'اقفل',
    },
  },
  {
    id: 'r6',
    status: 'cx',
    category: 'برنامج',
    title: 'برنامج الأرشفة الصوتية',
    desc: 'برنامج تدريبي في أرشفة التسجيلات وتوثيقها على ٦ أسابيع.',
    price: '٦٠',
    infoRows: [
      { kind: 'text', segs: [{ avatar: 'ح' }, { text: 'حلقة', bold: true }] },
      { kind: 'text', segs: [{ text: 'ألغيتِ التسجيل ' }, { text: '١٨ أغسطس', bold: true }] },
      { kind: 'text', segs: [{ text: 'رجعلك ٦٠ شهمهم لمخصصك' }] },
    ],
    actions: [{ key: 'viewActivity', href: '/khalli-khales/activities/g1' }],
    detail: {
      type: 'ورشة · تسجيلاتي',
      title: 'برنامج الأرشفة الصوتية',
      desc: 'برنامج تدريبي في أرشفة التسجيلات وتوثيقها على ٦ أسابيع.',
      cards: {
        firstCard: { title: 'القيمة', price: '٦٠', currency: 'شهمهم' },
        restCards: [],
      },
      info: 'مهم تعرفه',
      data: ['ورش تدريبية', 'توثيق', 'شهادة إتمام'],
      providerName: 'حلقة',
      providerRate: 'كريم',
      request: 'شوف النشاط',
      close: 'اقفل',
    },
  },
]
