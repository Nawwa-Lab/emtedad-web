export type EtabatCase = {
  id: string
  title: string
  role: 'claimant' | 'respondent'
  opponent: string
  amount?: number
  date: string
  deadline?: string
  status: 'mediation' | 'arbitration' | 'decision' | 'closed'
  open: boolean
}

export const etabatCases: EtabatCase[] = [
  {
    id: '1047',
    title: 'تسليم الورشة اتأخّر ١٢ يوم عن الاتفاق',
    role: 'claimant',
    opponent: 'استوديو الورشة',
    amount: 500,
    date: '١٨ سبتمبر',
    deadline: 'فاضل ٩ أيام عمل',
    status: 'mediation',
    open: true,
  },
  {
    id: '1039',
    title: 'خلاف على عدد المقاعد المتفق عليها في الكورس',
    role: 'respondent',
    opponent: 'مركز صوت المدينة',
    amount: 320,
    date: '٢ سبتمبر',
    deadline: 'فاضل ٤ أيام عمل',
    status: 'arbitration',
    open: true,
  },
  {
    id: '1028',
    title: 'بلاغ عن استخدام اسم الشبكة في إعلان تجاري',
    role: 'claimant',
    opponent: 'دار نون للنشر',
    date: '١٤ أغسطس',
    deadline: 'نافذة الاستئناف: ٣ أيام',
    status: 'decision',
    open: true,
  },
  {
    id: '0986',
    title: 'المورد اترجّع في حالة مش اللي اتسلّم بيها',
    role: 'respondent',
    opponent: 'بيت الحكاية',
    amount: 180,
    date: 'اتقفل ٢ أغسطس',
    status: 'closed',
    open: false,
  },
]

export const etabatCaseDetail = {
  id: '1052',
  title: 'تسليم الكورس اتوقف بعد الجلسة التانية',
  claimant: 'مركز صوت المدينة',
  role: 'respondent' as const,
  amount: 280,
  filedAt: '٣٠ سبتمبر',
  deadline: 'باقي يومين للرد',
  exchange: 'كورس كتابة · ٤ جلسات',
  duration: 15,
  mediators: 'ما اتختاروش لسه',
  statement:
    'اتفقنا على كورس كتابة ٤ جلسات يبدأ ٥ سبتمبر وينتهي ٢٦ سبتمبر، بـ ٢٨٠ شهمهم (١٤ ساعة × ٢٠). الجلستين الأولانيين اتعملوا في معادهم. الجلسة التالتة اتأجّلت مرتين من غير معاد بديل، والرابعة ما اتحدّدش خالص. آخر رسالة منهم كانت ١٨ سبتمبر وبعدها مفيش رد. الـ ١٢ مشارك عندنا مستنيين، واحنا حجزنا القاعة وأعلنّا المواعيد.',
  request:
    'إتمام الجلستين الباقيين خلال أسبوعين من تاريخ العتاب، أو ردّ ١٤٠ شهمهم (نص القيمة) وإغلاق التبادل.',
  evidence: [
    ['لقطات من المحادثة', '٣ صور'],
    ['كشف حضور الجلستين', 'PDF · صفحتين'],
  ],
  exchangeFiles: [
    ['الاتفاق المكتوب', 'نسخة ٢ · آخر تعديل ٣ سبتمبر'],
    ['الجدول الزمني', '٤ جلسات · ٢ اتعملوا'],
    ['الرسائل', '٣١ رسالة · آخرها ١٨ سبتمبر'],
    ['التسليمات', '٢ من ٤'],
    ['قيمة الشهمهم', '٢٨٠ شهمهم · ١٤ ساعة × ٢٠'],
  ],
} as const

export async function saveCaseResponseDraft() {
  return Promise.resolve()
}

export async function submitCaseResponse(response: { response: string; proposal: string }) {
  return Promise.resolve(response)
}
