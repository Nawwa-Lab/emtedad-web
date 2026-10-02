import type { AlaeshMarket, AlaeshReplyStatus } from '@/components/AlaeshRequestCard'

export type BrowseRequest = {
  id: string
  category: string
  title: string
  note: string
  meta: string
  orgInitial: string
  replyStatus: AlaeshReplyStatus
  replyCount?: number
  market: AlaeshMarket
}

export const namliyaRequests: BrowseRequest[] = [
  {
    id: 'motion-1',
    category: 'تصميم وموشن',
    title: 'محتاجين تصميم موشن جرافيك لحملة توعية',
    note: 'فيديوهان قصيران لحملة عن الحرف اليدوية.',
    meta: 'ملحة · نُشر من ٣ أيام · الإطار الزمني: قبل ١٥ سبتمبر',
    orgInitial: 'م',
    replyStatus: 'replies',
    replyCount: 2,
    market: 'namliya',
  },
  {
    id: 'lighting-1',
    category: 'صيانة',
    title: 'فني صيانة إضاءة مسرح',
    note: 'صيانة دورية لمسرح الحلقة الصغير.',
    meta: 'حلقة · نُشر من أسبوع · الإطار الزمني: مفتوح',
    orgInitial: 'ح',
    replyStatus: 'replies',
    replyCount: 1,
    market: 'namliya',
  },
  {
    id: 'rehearsal-1',
    category: 'مساحات',
    title: 'قاعة بروفات شهرية — احتياج متكرر',
    note: 'قاعة تتّسع ١٥ فردًا، ليلتان في الأسبوع.',
    meta: 'صوت وصورة · نُشر إمبارح · الإطار الزمني: من أكتوبر',
    orgInitial: 'ص',
    replyStatus: 'none',
    market: 'namliya',
  },
]

export const khalisRequests: BrowseRequest[] = [
  {
    id: 'yoga-1',
    category: 'تدريب',
    title: 'مدرّبة يوجا لفريقنا — صباح الخميس',
    note: 'جلسة أسبوعية للفريق — قيمة الجلسة بالاتفاق.',
    meta: 'ملحة · نُشر من ٤ أيام · الإطار الزمني: يبدأ سبتمبر',
    orgInitial: 'م',
    replyStatus: 'replies',
    replyCount: 1,
    market: 'khalis',
  },
  {
    id: 'tax-1',
    category: 'محاسبة',
    title: 'محاسب ضرائب مستقل للمؤسسات الأهلية',
    note: 'إقرارات سنوية واستشارة ربع سنوية.',
    meta: 'حلقة · نُشر من يومين · الإطار الزمني: قبل نهاية السنة المالية',
    orgInitial: 'ح',
    replyStatus: 'none',
    market: 'khalis',
  },
]

export const filterButtons = [
  { id: 'all', labelKey: 'filter.all' as const, count: 5 },
  { id: 'namliya', labelKey: 'filter.namliya' as const, count: 3 },
  { id: 'khalis', labelKey: 'filter.khalis' as const, count: 2 },
]
