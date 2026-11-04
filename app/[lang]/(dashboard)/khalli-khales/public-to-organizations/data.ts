import { publicToOrganizations, type KhalliKhalesOffer } from '../browse/data'

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

export const totalOffers = 24
