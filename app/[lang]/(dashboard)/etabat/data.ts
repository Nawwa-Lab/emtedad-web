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
    date: 'قُدِّم ١٨ سبتمبر',
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
    date: 'قُدِّم ٢ سبتمبر',
    deadline: 'فاضل ٤ أيام عمل',
    status: 'arbitration',
    open: true,
  },
  {
    id: '1028',
    title: 'بلاغ عن استخدام اسم الشبكة في إعلان تجاري',
    role: 'claimant',
    opponent: 'دار نون للنشر',
    date: 'قُدِّم ١٤ أغسطس',
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
