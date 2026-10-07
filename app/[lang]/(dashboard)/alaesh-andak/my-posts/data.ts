import type { AlaeshMarket, AlaeshReplyStatus } from '@/components/AlaeshRequestCard'

export type MyPost = {
  id: string
  category: string
  categoryTone?: 'gold' | 'green'
  title: string
  note?: string
  meta: string
  replyStatus: AlaeshReplyStatus
  replyCount?: number
  market: AlaeshMarket
  section: 'published' | 'history'
}

export const myPosts: MyPost[] = [
  {
    id: 'storage-1',
    category: 'مساحات',
    title: 'مساحة تخزين لديكورات مسرح',
    note: 'جرّبي توسيع الوصف — أو استني دورة انضمام مؤسسات جديدة.',
    meta: 'نملية · نُشر من أسبوعين',
    replyStatus: 'none',
    market: 'namliya',
    section: 'published',
  },
  {
    id: 'voice-1',
    category: 'تدريب',
    title: 'مدرّب صوتيات لفريقنا — جلستان شهريًّا',
    note: 'في «عندي» واحدة مستنية — افتحيها وكمّلوا الاتفاق.',
    meta: 'خلي خالص · نُشر من ٥ أيام · آخر رد: إمبارح',
    replyStatus: 'replies',
    replyCount: 1,
    market: 'khalis',
    section: 'published',
  },
  {
    id: 'translate-1',
    category: 'ترجمة',
    categoryTone: 'green',
    title: 'ترجمة كتيّب تعريفي',
    meta: 'قالت نادية كمال «عندي» واتفقتوا — بقى تبادلًا على خلي خالص (بتحصل) · ١٠ أغسطس',
    replyStatus: 'converted',
    market: 'khalis',
    section: 'history',
  },
  {
    id: 'mics-1',
    category: 'معدات',
    title: 'طقم ميكروفونات للفعاليات',
    meta: 'سحبتوه بعد ما لقيتوه معروضًا على النملية · ٢٨ يوليو',
    replyStatus: 'withdrawn',
    market: 'namliya',
    section: 'history',
  },
]

export const filterButtons = [
  { id: 'namliya', labelKey: 'filter.namliya' as const, count: 1 },
  { id: 'khalis', labelKey: 'filter.khalis' as const, count: 1 },
]
