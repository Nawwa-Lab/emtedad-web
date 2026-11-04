import { publicToMembers, type KhalliKhalesOffer } from '../browse/data'

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

export const totalOffers = 11
