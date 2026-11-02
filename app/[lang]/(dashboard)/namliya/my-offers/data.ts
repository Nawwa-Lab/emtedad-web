import type { ReactNode } from 'react'

export type OfferType = 'h' | 'm'
export type OfferStatus = 'none' | 'ask' | 'doing' | 'done'

export interface OfferInfo {
  key: string
  values?: Array<{ text: string; bold?: boolean }>
  custom?: ReactNode
}

export interface Offer {
  id: string
  type: OfferType
  status: OfferStatus
  categoryKey: string
  category: string
  title: string
  desc: string
  price: string
  info: OfferInfo[]
  details?: {
    value?: string
    availability?: string
    due?: string
    insurance?: string
    status?: string
    secondFact?: { header: string; description: string }
    thirdFact?: { header: string; description: string }
    listTitle?: string
    items?: string[]
    whatYouGet?: string[]
    whatTheyAsked?: string[]
    whatsLeft?: string[]
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

export const offers: Offer[] = [
  {
    id: 'a1',
    type: 'h',
    status: 'none',
    categoryKey: 'production',
    category: 'إنتاج',
    title: 'تصوير وتوثيق فعاليات بالفيديو',
    desc: 'تغطية كاملة لفعاليتكم من التحضير للقطة الأخيرة — تصوير بكاميرتين وصوت نظيف.',
    price: '٣٥',
    info: [
      { key: 'offeredBy', values: [{ text: '١٢', bold: true }, { text: 'يومًا' }] },
      {
        key: 'visitsSaved',
        values: [
          { text: '٢٤', bold: true },
          { text: 'زيارة ·' },
          { text: '٣', bold: true },
          { text: 'حفظوه' },
        ],
      },
      { key: 'responsibleMember', values: [{ text: 'كريم فوزي' }] },
    ],
    details: {
      value: '٣٥ شهمهم',
      secondFact: { header: 'الإتاحة', description: 'متاح أي مدة' },
      thirdFact: { header: 'الحالة', description: 'منشور بلا طلبات' },
      listTitle: 'إيه اللي بتقدّموه',
      items: ['مادة خام منظمة في مجلدات', 'مقطع ملخّص ٩٠ ثانية', 'ملف صوت منفصل'],
      org: { name: 'مشكاة', initials: 'م', seal: true },
    },
    actions: [
      { key: 'edit', variant: 'outline' },
      { key: 'stopPublishing', variant: 'outline' },
      { key: 'delete', variant: 'destructive' },
    ],
  },
  {
    id: 'a2',
    type: 'h',
    status: 'none',
    categoryKey: 'training',
    category: 'تدريب',
    title: 'تدريب إدارة مالية للمؤسسات الصغيرة',
    desc: 'أربع جلسات في الميزانيات والتقارير والتدفق النقدي للمؤسسات الثقافية.',
    price: '٥٠',
    info: [
      { key: 'offeredBy', values: [{ text: '٣', bold: true }, { text: 'أسابيع' }] },
      { key: 'visitsSaved', values: [{ text: '٩', bold: true }, { text: 'زيارات · محدش حفظه' }] },
      { key: 'responsibleMember', values: [{ text: 'هدى سمير' }] },
    ],
    details: {
      value: '٥٠ شهمهم',
      secondFact: { header: 'الإتاحة', description: 'أربع جلسات' },
      thirdFact: { header: 'الحالة', description: 'منشور بلا طلبات' },
      listTitle: 'إيه اللي بتقدّموه',
      items: [
        '٤ ورش عمل تفاعلية',
        'نماذج ميزانيات وتدفق نقدي جاهزة',
        'متابعة واستشارات لمدة أسبوعين',
      ],
      org: { name: 'مشكاة', initials: 'م', seal: true },
    },
    actions: [
      { key: 'edit', variant: 'outline' },
      { key: 'stopPublishing', variant: 'outline' },
      { key: 'delete', variant: 'destructive' },
    ],
  },
  {
    id: 'b1',
    type: 'h',
    status: 'ask',
    categoryKey: 'design',
    category: 'تصميم',
    title: 'تصميم أدلة ومطبوعات تعليمية',
    desc: 'تصميم أدلة الورش والمطبوعات التعليمية من الفكرة لملف الطباعة.',
    price: '٥٥',
    info: [
      { key: 'requestedBy', values: [{ text: 'حلقة' }, { text: 'من ساعتين' }] },
      { key: 'requiredDates', values: [{ text: '١ — ٢٢ سبتمبر' }] },
      { key: 'monthlyLimitAfterAccept', values: [{ text: '٣١٥ / ٤٠٠' }] },
    ],
    details: {
      value: '٥٥ شهمهم',
      secondFact: { header: 'الطالب', description: 'حلقة' },
      thirdFact: { header: 'الحالة', description: 'بانتظار قراركم' },
      listTitle: 'اللي طلبوه',
      items: ['دليل ٢٨ صفحة', '٦ أيقونات أصلية', 'التسليم قبل ٢٢ سبتمبر'],
      org: { name: 'مشكاة', initials: 'م', seal: true },
    },
    actions: [
      { key: 'accept', variant: 'primary' },
      { key: 'reject', variant: 'destructive' },
      { key: 'openChat', variant: 'outline' },
    ],
  },
  {
    id: 'b2',
    type: 'h',
    status: 'ask',
    categoryKey: 'translation',
    category: 'ترجمة',
    title: 'ترجمة تقرير سنوي عربي ⇄ إنجليزي',
    desc: 'ترجمة ومراجعة لغوية لتقرير ٤٠ صفحة بمصطلحات القطاع الثقافي.',
    price: '٤٠',
    info: [
      { key: 'requestedBy', values: [{ text: 'ملحة' }, { text: 'إمبارح' }] },
      { key: 'requiredDates', values: [{ text: 'من ٥ سبتمبر — أسبوعان' }] },
      { key: 'suggestedMember', values: [{ text: 'سلمى فؤاد' }] },
    ],
    details: {
      value: '٤٠ شهمهم',
      secondFact: { header: 'الطالب', description: 'ملحة' },
      thirdFact: { header: 'الحالة', description: 'بانتظار قراركم' },
      listTitle: 'اللي طلبوه',
      items: [
        'ترجمة تقرير ٤٠ صفحة كاملاً',
        'مراجعة لغوية وتدقيق مصطلحات',
        'التسليم خلال أسبوعين من الموافقة',
      ],
      org: { name: 'مشكاة', initials: 'م', seal: true },
    },
    actions: [
      { key: 'accept', variant: 'primary' },
      { key: 'reject', variant: 'destructive' },
      { key: 'openChat', variant: 'outline' },
    ],
  },
  {
    id: 'c1',
    type: 'h',
    status: 'doing',
    categoryKey: 'montage',
    category: 'مونتاج',
    title: 'مونتاج فيديو تعريفي',
    desc: 'مونتاج كامل من المادة الخام لنسخة جاهزة للنشر، مع تصحيح ألوان ومكساج.',
    price: '٤٥',
    info: [
      { key: 'with', values: [{ text: 'صوت وصورة' }] },
      { key: 'assignedMember', values: [{ text: 'نور علي' }] },
      { key: 'delivery', values: [{ text: '٣٠ أغسطس' }, { text: '— فاضل ٤ أيام', bold: true }] },
    ],
    details: {
      value: '٤٥ شهمهم',
      secondFact: { header: 'المدة', description: 'أسبوعان' },
      thirdFact: { header: 'الحالة', description: 'بيحصل' },
      listTitle: 'اللي فاضل',
      items: ['جولة ملاحظات أخيرة', 'تسليم الملفات المفتوحة'],
      org: { name: 'مشكاة', initials: 'م', seal: true },
    },
    actions: [
      { key: 'markDone', variant: 'primary' },
      { key: 'changeMember', variant: 'outline' },
      { key: 'warn', variant: 'destructive' },
    ],
  },
  {
    id: 'c2',
    type: 'h',
    status: 'doing',
    categoryKey: 'design',
    category: 'تصميم',
    title: 'تصميم هوية بصرية لفعالية',
    desc: 'هوية كاملة لفعالية واحدة: بوستر وبانر ومطبوعات وقوالب سوشيال.',
    price: '٥٥',
    info: [
      { key: 'with', values: [{ text: 'حلقة' }] },
      { key: 'assignedMember', values: [{ text: 'عمر السيد' }] },
      { key: 'delivery', values: [{ text: '٢ سبتمبر' }, { text: '· جولة ملاحظات واحدة فاضلة' }] },
    ],
    details: {
      value: '٥٥ شهمهم',
      secondFact: { header: 'التسليم', description: '٢ سبتمبر' },
      thirdFact: { header: 'الحالة', description: 'بيحصل' },
      listTitle: 'اللي فاضل',
      items: ['جولة ملاحظات واحدة أخيرة', 'تسليم قوالب السوشيال ميديا وملفات الطباعة'],
      org: { name: 'مشكاة', initials: 'م', seal: true },
    },
    actions: [
      { key: 'markDone', variant: 'primary' },
      { key: 'changeMember', variant: 'outline' },
      { key: 'warn', variant: 'destructive' },
    ],
  },
  {
    id: 'd1',
    type: 'h',
    status: 'done',
    categoryKey: 'production',
    category: 'إنتاج',
    title: 'تصوير حفل ختام البرنامج',
    desc: 'تغطية كاملة لليلة الختام بكاميرتين وصوت من المنصة.',
    price: '٣٥',
    info: [
      { key: 'with', values: [{ text: 'حلقة' }] },
      { key: 'closed', values: [{ text: '٢٠ أغسطس' }, { text: '· اتحوّلت ٣٥ شهمهم', bold: true }] },
      { key: 'notRatedYet' },
    ],
    details: {
      value: '٣٥ شهمهم',
      secondFact: { header: 'مع', description: 'حلقة' },
      thirdFact: { header: 'الحالة', description: 'حصل · مكتمل' },
      listTitle: 'تفاصيل التسليم',
      items: [
        'تسليم الفيديو النهائي والصور بالكامل',
        'اتحوّلت ٣٥ شهمهم للحساب',
        'بانتظار التقييم المتبادل',
      ],
      org: { name: 'مشكاة', initials: 'م', seal: true },
    },
    actions: [
      { key: 'rateExperience', variant: 'primary' },
      { key: 'viewAgreement', variant: 'outline' },
    ],
  },
  {
    id: 'd2',
    type: 'h',
    status: 'done',
    categoryKey: 'training',
    category: 'تدريب',
    title: 'ورشة كتابة المقترحات',
    desc: 'جلستان في كتابة مقترحات التمويل وبناء الموازنة.',
    price: '٣٠',
    info: [
      { key: 'with', values: [{ text: 'ملحة' }] },
      { key: 'closed', values: [{ text: '٨ أغسطس' }, { text: '· اتحوّلت ٣٠ شهمهم', bold: true }] },
      { key: 'ratedBy', values: [{ text: 'عامر' }] },
    ],
    details: {
      value: '٣٠ شهمهم',
      secondFact: { header: 'مع', description: 'ملحة' },
      thirdFact: { header: 'الحالة', description: 'حصل · مكتمل' },
      listTitle: 'تفاصيل التسليم',
      items: [
        'إتمام الجلستين التدريبيتين بنجاح',
        'اتحوّلت ٣٠ شهمهم للحساب',
        'تم التقييم بواسطة ملحة: عامر',
      ],
      org: { name: 'مشكاة', initials: 'م', seal: true },
    },
    actions: [
      { key: 'viewAgreement', variant: 'outline' },
      { key: 'viewRating', variant: 'outline' },
    ],
  },
  {
    id: 'e1',
    type: 'm',
    status: 'none',
    categoryKey: 'equipment',
    category: 'معدات',
    title: 'كاميرا سينمائية مع عدستين',
    desc: 'كاميرا بحالة ممتازة مع عدستين وثلاث بطاريات وحقيبة صلبة.',
    price: '٣٠',
    info: [
      { key: 'offeredBy', values: [{ text: 'شهر' }] },
      {
        key: 'visitsSaved',
        values: [
          { text: '١٨', bold: true },
          { text: 'زيارة ·' },
          { text: '٥', bold: true },
          { text: 'حفظوه' },
        ],
      },
      { key: 'securityDeposit', values: [{ text: '١٬٠٠٠ جنيه · بإشراف كريم فوزي' }] },
    ],
    details: {
      value: '٣٠ شهمهم',
      secondFact: { header: 'الإتاحة', description: 'حتى ٣ أيام' },
      thirdFact: { header: 'تأمين نقدي', description: '١٬٠٠٠ جنيه' },
      listTitle: 'شروط الاستخدام',
      items: ['بإشراف مشغّل من الفريق — ١٠ شهمهم', 'الإرجاع بنفس حالة الاستلام'],
      org: { name: 'مشكاة', initials: 'م', seal: true },
    },
    actions: [
      { key: 'edit', variant: 'outline' },
      { key: 'stopPublishing', variant: 'outline' },
      { key: 'delete', variant: 'destructive' },
    ],
  },
  {
    id: 'e2',
    type: 'm',
    status: 'ask',
    categoryKey: 'spaces',
    category: 'مساحات',
    title: 'قاعة ورش تتسع ٢٥ فرد',
    desc: 'قاعة بإضاءة طبيعية وكراسي متحركة وشاشة عرض.',
    price: '٢٥',
    info: [
      { key: 'requestedBy', values: [{ text: 'ضي' }, { text: 'من ٣ أيام' }] },
      { key: 'requiredDates', values: [{ text: '٦ سبتمبر — يوم كامل' }] },
      { key: 'securityDeposit', values: [{ text: '٥٠٠ جنيه' }] },
    ],
    details: {
      value: '٢٥ شهمهم',
      secondFact: { header: 'الطالب', description: 'ضي' },
      thirdFact: { header: 'تأمين نقدي', description: '٥٠٠ جنيه' },
      listTitle: 'اللي طلبوه',
      items: ['حجز يوم كامل — ٦ سبتمبر', 'تجهيز شاشة العرض والصوتيات', 'سداد تأمين نقدي ٥٠٠ جنيه'],
      org: { name: 'مشكاة', initials: 'م', seal: true },
    },
    actions: [
      { key: 'accept', variant: 'primary' },
      { key: 'reject', variant: 'destructive' },
      { key: 'openChat', variant: 'outline' },
    ],
  },
  {
    id: 'e3',
    type: 'm',
    status: 'doing',
    categoryKey: 'equipment',
    category: 'معدات',
    title: 'طقم إضاءة للتصوير',
    desc: 'ثلاث وحدات إضاءة مع حوامل وفلاتر للتصوير الداخلي.',
    price: '١٥',
    info: [
      { key: 'with', values: [{ text: 'صوت وصورة' }] },
      { key: 'supervisor', values: [{ text: 'يوسف عادل' }] },
      { key: 'returnDate', values: [{ text: '٢٨ أغسطس' }, { text: '· التأمين متحصَّل' }] },
    ],
    details: {
      value: '١٥ شهمهم',
      secondFact: { header: 'مع', description: 'صوت وصورة' },
      thirdFact: { header: 'الإرجاع', description: '٢٨ أغسطس' },
      listTitle: 'شروط الاستخدام',
      items: ['التأمين النقدي متحصَّل', 'بإشراف يوسف عادل', 'الإرجاع بنفس حالة الاستلام'],
      org: { name: 'مشكاة', initials: 'م', seal: true },
    },
    actions: [
      { key: 'deliverAndCheck', variant: 'primary' },
      { key: 'warn', variant: 'destructive' },
    ],
  },
  {
    id: 'e4',
    type: 'm',
    status: 'done',
    categoryKey: 'spaces',
    category: 'مساحات',
    title: 'استوديو تسجيل مجهّز',
    desc: 'غرفة معالَجة صوتيًّا مع ميكروفونات ومكسر.',
    price: '٢٠',
    info: [
      { key: 'with', values: [{ text: 'ملحة' }] },
      {
        key: 'closed',
        values: [{ text: '١٢ أغسطس' }, { text: '· اتحوّلت ٢٠ شهمهم · التأمين اترد', bold: true }],
      },
      { key: 'notRatedYet' },
    ],
    details: {
      value: '٢٠ شهمهم',
      secondFact: { header: 'مع', description: 'ملحة' },
      thirdFact: { header: 'الحالة', description: 'حصل · مكتمل' },
      listTitle: 'تفاصيل التسليم',
      items: [
        'استخدام الاستوديو ٤ ساعات',
        'فحص الأجهزة والتأكد من سلامتها',
        'اتحوّلت ٢٠ شهمهم والتأمين اترد بالكامل',
      ],
      org: { name: 'مشكاة', initials: 'م', seal: true },
    },
    actions: [
      { key: 'rateExperience', variant: 'primary' },
      { key: 'viewAgreement', variant: 'outline' },
    ],
  },
]

export const statusLabels: Record<OfferStatus, string> = {
  none: 'بلا طلبات',
  ask: 'هيحصل؟',
  doing: 'بيحصل',
  done: 'حصل',
}

export const typeLabels: Record<OfferType, string> = {
  h: 'خدمات بشرية',
  m: 'موارد مادية',
}
