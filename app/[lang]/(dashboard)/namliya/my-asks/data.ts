export type AskType = 'h' | 'm'
export type AskStatus = 'ask' | 'doing' | 'done'

export interface AskInfo {
  key: string
  values?: Array<{ text: string; bold?: boolean }>
}

export interface Ask {
  id: string
  type: AskType
  status: AskStatus
  category: string
  title: string
  desc: string
  price: string
  info: AskInfo[]
  details?: {
    secondFact?: { header: string; description: string }
    thirdFact?: { header: string; description: string }
    listTitle?: string
    items?: string[]
    org?: {
      name: string
      initials: string
      seal?: boolean
    }
  }
  actions: Array<{
    key: string
    variant?: 'primary' | 'outline' | 'destructive'
  }>
}

export const asks: Ask[] = [
  {
    id: 'f1',
    type: 'h',
    status: 'ask',
    category: 'تصميم',
    title: 'تصميم أدلة ومطبوعات تعليمية',
    desc: 'طلبتوه من حلقة — تصميم دليل ورشة كامل جاهز للطباعة.',
    price: '٥٥',
    info: [
      { key: 'with', values: [{ text: 'حلقة' }] },
      { key: 'sentAgo', values: [{ text: 'بعتّوه من ٣ أيام · لسه ما ردّوش' }] },
      { key: 'requestedWindow', values: [{ text: '١ — ٢٢ سبتمبر' }] },
    ],
    details: {
      secondFact: { header: 'الحالة', description: 'بانتظار رد حلقة' },
      thirdFact: { header: 'المواعيد', description: '١ — ٢٢ سبتمبر' },
      listTitle: 'اللي طلبتوه',
      items: ['دليل ٢٨ صفحة', '٦ أيقونات أصلية', 'ملفات مفتوحة مع التسليم'],
      org: { name: 'حلقة', initials: 'ح', seal: true },
    },
    actions: [
      { key: 'openChat', variant: 'outline' },
      { key: 'withdraw', variant: 'destructive' },
    ],
  },
  {
    id: 'f2',
    type: 'h',
    status: 'ask',
    category: 'صوت',
    title: 'تسجيل ومكساج بودكاست',
    desc: 'طلبتوه من صوت وصورة — تسجيل حلقتين ومكساج جاهز للنشر.',
    price: '٣٠',
    info: [
      { key: 'with', values: [{ text: 'صوت وصورة' }] },
      { key: 'sentAgo', values: [{ text: 'بعتّوه إمبارح · لسه ما ردّوش' }] },
      { key: 'required', values: [{ text: 'أسبوع أول أكتوبر' }] },
    ],
    details: {
      secondFact: { header: 'الحالة', description: 'بانتظار رد صوت وصورة' },
      thirdFact: { header: 'المطلوب', description: 'أسبوع أول أكتوبر' },
      listTitle: 'اللي طلبتوه',
      items: ['تسجيل حلقتين كاملتين', 'مكساج جاهز للنشر'],
      org: { name: 'صوت وصورة', initials: 'ص', seal: true },
    },
    actions: [
      { key: 'openChat', variant: 'outline' },
      { key: 'withdraw', variant: 'destructive' },
    ],
  },
  {
    id: 'g1',
    type: 'h',
    status: 'doing',
    category: 'ترجمة',
    title: 'ترجمة تقرير سنوي',
    desc: 'ترجمة ومراجعة لغوية لتقرير ٤٠ صفحة بمصطلحات القطاع.',
    price: '٤٠',
    info: [
      { key: 'with', values: [{ text: 'ملحة' }] },
      { key: 'ourMember', values: [{ text: 'سلمى فؤاد' }] },
      { key: 'delivery', values: [{ text: '٥ سبتمبر', bold: true }, { text: '— فاضل ٩ أيام' }] },
    ],
    details: {
      secondFact: { header: 'الحالة', description: 'بيحصل' },
      thirdFact: { header: 'التسليم', description: '٥ سبتمبر' },
      listTitle: 'اللي فاضل',
      items: ['مراجعة لغوية نهائية', 'تسليم النسخة المنسّقة'],
      org: { name: 'ملحة', initials: 'م', seal: true },
    },
    actions: [
      { key: 'markReceived', variant: 'primary' },
      { key: 'changeFollower', variant: 'outline' },
      { key: 'complain', variant: 'destructive' },
    ],
  },
  {
    id: 'g2',
    type: 'h',
    status: 'doing',
    category: 'قانوني',
    title: 'مراجعة عقود وتراخيص',
    desc: 'مراجعة قانونية لعقود التعاون وتراخيص الأماكن مع مذكرة توصيات.',
    price: '٦٠',
    info: [
      { key: 'with', values: [{ text: 'حلقة' }] },
      { key: 'ourMember', values: [{ text: 'عمر السيد' }] },
      { key: 'delivery', values: [{ text: '٧ سبتمبر', bold: true }] },
    ],
    details: {
      secondFact: { header: 'الحالة', description: 'بيحصل' },
      thirdFact: { header: 'التسليم', description: '٧ سبتمبر' },
      listTitle: 'اللي فاضل',
      items: ['مذكرة التوصيات النهائية', 'جولة مراجعة أخيرة'],
      org: { name: 'حلقة', initials: 'ح', seal: true },
    },
    actions: [
      { key: 'markReceived', variant: 'primary' },
      { key: 'changeFollower', variant: 'outline' },
      { key: 'complain', variant: 'destructive' },
    ],
  },
  {
    id: 'h1',
    type: 'h',
    status: 'done',
    category: 'إنتاج',
    title: 'تصوير وتوثيق فعاليات',
    desc: 'تغطية ليلة الافتتاح بكاميرتين وصوت من المنصة.',
    price: '٣٥',
    info: [
      { key: 'with', values: [{ text: 'صوت وصورة' }] },
      {
        key: 'closed',
        values: [{ text: '١٢ أغسطس · اتحوّلت' }, { text: '٣٥ شهمهم', bold: true }],
      },
      { key: 'notRatedYet' },
    ],
    details: {
      secondFact: { header: 'الحالة', description: 'حصل' },
      thirdFact: { header: 'اتقفل', description: '١٢ أغسطس' },
      listTitle: 'تفاصيل التسليم',
      items: ['تغطية ليلة الافتتاح كاملة', 'اتحوّلت ٣٥ شهمهم للحساب', 'بانتظار التقييم المتبادل'],
      org: { name: 'صوت وصورة', initials: 'ص', seal: true },
    },
    actions: [
      { key: 'rateExperience', variant: 'primary' },
      { key: 'viewAgreement', variant: 'outline' },
    ],
  },
  {
    id: 'h2',
    type: 'h',
    status: 'done',
    category: 'تدريب',
    title: 'تدريب إدارة مالية',
    desc: 'أربع جلسات في الميزانيات والتقارير والتدفق النقدي.',
    price: '٥٠',
    info: [
      { key: 'with', values: [{ text: 'صوت وصورة' }] },
      {
        key: 'closed',
        values: [{ text: '٢ أغسطس · اتحوّلت' }, { text: '٥٠ شهمهم', bold: true }],
      },
      { key: 'ratedBy', values: [{ text: 'عامر' }] },
    ],
    details: {
      secondFact: { header: 'الحالة', description: 'حصل' },
      thirdFact: { header: 'اتقفل', description: '٢ أغسطس' },
      listTitle: 'تفاصيل التسليم',
      items: ['إتمام الجلسات الأربع', 'اتحوّلت ٥٠ شهمهم للحساب', 'قيّمتوهم: عامر'],
      org: { name: 'صوت وصورة', initials: 'ص', seal: true },
    },
    actions: [
      { key: 'viewAgreement', variant: 'outline' },
      { key: 'viewRating', variant: 'outline' },
    ],
  },
  {
    id: 'i1',
    type: 'm',
    status: 'ask',
    category: 'معدات',
    title: 'كاميرا سينمائية مع عدستين',
    desc: 'طلبتوها من صوت وصورة لتوثيق برنامج الخريف.',
    price: '٣٠',
    info: [
      { key: 'with', values: [{ text: 'صوت وصورة' }] },
      { key: 'sentAgo', values: [{ text: 'بعتّوه من يومين · لسه ما ردّوش' }] },
      {
        key: 'required',
        values: [{ text: '٣ أيام من ١٠ سبتمبر · تأمين ١٬٠٠٠ جنيه' }],
      },
    ],
    details: {
      secondFact: { header: 'تأمين نقدي', description: '١٬٠٠٠ جنيه' },
      thirdFact: { header: 'الإشراف', description: '١٠ شهمهم' },
      listTitle: 'شروط الاستخدام',
      items: ['بإشراف مشغّل من صوت وصورة', 'الإرجاع بنفس حالة الاستلام'],
      org: { name: 'صوت وصورة', initials: 'ص', seal: true },
    },
    actions: [
      { key: 'openChat', variant: 'outline' },
      { key: 'withdraw', variant: 'destructive' },
    ],
  },
  {
    id: 'i2',
    type: 'm',
    status: 'doing',
    category: 'مساحات',
    title: 'قاعة ورش تتسع ٢٥ فرد',
    desc: 'قاعة بإضاءة طبيعية وشاشة عرض لورشة الكتابة.',
    price: '٢٥',
    info: [
      { key: 'with', values: [{ text: 'حلقة' }] },
      { key: 'ourMember', values: [{ text: 'سارة عبد الله' }] },
      { key: 'usageDate', values: [{ text: '٦ سبتمبر · التأمين مدفوع' }] },
    ],
    details: {
      secondFact: { header: 'الحالة', description: 'بيحصل' },
      thirdFact: { header: 'الاستخدام', description: '٦ سبتمبر' },
      listTitle: 'اللي فاضل',
      items: ['تجهيز القاعة وشاشة العرض', 'استلام المفتاح صباح الاستخدام'],
      org: { name: 'حلقة', initials: 'ح', seal: true },
    },
    actions: [
      { key: 'markReturned', variant: 'primary' },
      { key: 'complain', variant: 'destructive' },
    ],
  },
  {
    id: 'i3',
    type: 'm',
    status: 'done',
    category: 'معدات',
    title: 'طقم إضاءة للتصوير',
    desc: 'ثلاث وحدات إضاءة مع حوامل وفلاتر.',
    price: '١٥',
    info: [
      { key: 'with', values: [{ text: 'صوت وصورة' }] },
      {
        key: 'closed',
        values: [
          { text: '٣٠ يوليو · اتحوّلت' },
          { text: '١٥ شهمهم', bold: true },
          { text: '· التأمين اترد' },
        ],
      },
      { key: 'notRatedYet' },
    ],
    details: {
      secondFact: { header: 'الحالة', description: 'حصل' },
      thirdFact: { header: 'اتقفل', description: '٣٠ يوليو' },
      listTitle: 'تفاصيل التسليم',
      items: [
        'إرجاع طقم الإضاءة كاملًا',
        'اتحوّلت ١٥ شهمهم والتأمين اترد',
        'بانتظار التقييم المتبادل',
      ],
      org: { name: 'صوت وصورة', initials: 'ص', seal: true },
    },
    actions: [
      { key: 'rateExperience', variant: 'primary' },
      { key: 'viewAgreement', variant: 'outline' },
    ],
  },
]

export const statusLabels: Record<AskStatus, string> = {
  ask: 'هيحصل؟',
  doing: 'بيحصل',
  done: 'حصل',
}

export const typeLabels: Record<AskType, string> = {
  h: 'خدمات بشرية',
  m: 'موارد مادية',
}
