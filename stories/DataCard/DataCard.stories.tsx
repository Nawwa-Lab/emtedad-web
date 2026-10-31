import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { NextIntlClientProvider } from 'next-intl'
import { DataCard } from '@/components/DataCard'

const messages = {
  namliyaMyOffers: {
    notRatedYet: 'لسه ما اتقيّمش',
    ratedBy: 'تقييم من',
  },
}

const infoLabels = {
  offeredBy: 'مقدَّم من ',
  responsibleMember: 'العضو المسؤول: ',
  requestedBy: 'طلبتها ',
  requiredDates: 'المواعيد المطلوبة: ',
  monthlyLimitAfterAccept: 'سقفكم الشهري بعد القبول: ',
  suggestedMember: 'العضو المقترح: ',
  with: 'مع ',
  assignedMember: 'العضو المكلّف: ',
  delivery: 'التسليم ',
  supervisor: 'المشرف: ',
  returnDate: 'تاريخ الإرجاع: ',
  securityDeposit: 'تأمين نقدي ',
  closed: 'اتقفل ',
}

const meta = {
  title: 'Components/DataCard',
  component: DataCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'بطاقة عرض/طلب في صفحة "عروضي". تعرض التصنيف والعنوان والوصف ومعلومات الحالة والسعر وأزرار الإجراءات، ' +
          'وفيها زر لفتح نافذة التفاصيل الكاملة (`CardDetails`).\n\n' +
          '- `type`: `h` خدمات بشرية، `m` موارد مادية (يغيّر لون الشارة).\n' +
          '- `status`: `none` | `ask` | `doing` | `done` (يحدد عناوين القوائم والحقائق الافتراضية).\n' +
          '- الأزرار: `primary` تأخذ تأثير 3D، والباقي `flat`.\n' +
          '- `infoLabels` تمرر نصوص المفاتيح المترجمة لصفوف المعلومات.',
      },
    },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="ar" messages={messages}>
        <div dir="rtl" className="w-115 max-w-full">
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
  argTypes: {
    id: { control: 'text', description: 'معرّف العرض، يُمرَّر إلى `onAction`.' },
    type: {
      control: 'inline-radio',
      options: ['h', 'm'],
      description: 'نوع العرض: خدمة بشرية (`h`) أو موارد مادية (`m`).',
    },
    status: {
      control: 'select',
      options: ['none', 'ask', 'doing', 'done'],
      description: 'حالة العرض.',
    },
    category: { control: 'text', description: 'التصنيف الظاهر في الشارة.' },
    title: { control: 'text', description: 'عنوان البطاقة.' },
    desc: { control: 'text', description: 'الوصف (سطران كحد أقصى).' },
    price: { control: 'text', description: 'السعر المعروض.' },
    info: { control: 'object', description: 'صفوف المعلومات (`key` + `values`).' },
    actions: {
      control: 'object',
      description: 'الأزرار: `key` و`label` و`variant` (`primary` | `outline` | `destructive`).',
    },
    details: { control: 'object', description: 'بيانات نافذة التفاصيل (اختيارية).' },
    infoLabels: { control: 'object', description: 'نصوص مفاتيح `info` المترجمة.' },
    animated: { control: 'boolean', description: 'تفعيل حركة الكارد.' },
    onAction: { action: 'onAction', description: 'يُستدعى بـ `(key, id)` عند الضغط على زر.' },
  },
  args: {
    id: 'offer-1',
    type: 'h',
    status: 'ask',
    category: 'تصميم',
    title: 'تصميم أدلة ومطبوعات تعليمية',
    desc: 'تصميم أدلة الورش والمطبوعات التعليمية من الفكرة لملف الطباعة.',
    price: '٥٥',
    typeLabel: 'خدمات بشرية',
    statusLabel: 'بيحصل طلب',
    currencyLabel: 'شهمهم',
    valueLabel: 'القيمة',
    statusTextLabel: 'الحالة',
    openChatLabel: 'افتح المحادثة',
    closeLabel: 'اقفل',
    whatTheyAskedLabel: 'اللي طلبوه',
    vatNote: '+ ١٤٪ ض.ق.م',
    infoLabels,
    info: [
      {
        key: 'requestedBy',
        values: [{ text: 'حلقة', bold: true }, { text: 'من ساعتين' }],
      },
      { key: 'requiredDates', values: [{ text: '١ — ٢٢ سبتمبر' }] },
      { key: 'monthlyLimitAfterAccept', values: [{ text: '٣١٥ / ٤٠٠' }] },
    ],
    actions: [
      { key: 'accept', label: 'اقبل', variant: 'primary' },
      { key: 'reject', label: 'ارفض', variant: 'destructive' },
      { key: 'openChat', label: 'افتح المحادثة', variant: 'outline' },
    ],
    details: {
      whatTheyAsked: ['ملف مصدر قابل للتعديل', 'نسخة جاهزة للطباعة', 'مراجعتان على التصميم'],
      org: { name: 'مشكاة', initials: 'م', seal: true },
    },
    onAction: fn(),
    animated: true,
  },
} satisfies Meta<typeof DataCard>

export default meta
type Story = StoryObj<typeof meta>

/** طلب وارد بانتظار القرار: أزرار قبول ورفض وفتح المحادثة. */
export const Ask: Story = {}

/** عرض منشور بلا طلبات: زر تعديل ووقف النشر وحذف. */
export const Published: Story = {
  args: {
    status: 'none',
    statusLabel: 'منشور بلا طلبات',
    info: [
      { key: 'offeredBy', values: [{ text: 'مشكاة', bold: true }] },
      { key: 'responsibleMember', values: [{ text: 'سلمى أحمد' }] },
    ],
    actions: [
      { key: 'edit', label: 'عدّل', variant: 'primary' },
      { key: 'stopPublishing', label: 'وقف النشر', variant: 'outline' },
      { key: 'delete', label: 'احذف', variant: 'destructive' },
    ],
    details: {
      whatYouGet: ['تصميم شعار', 'هوية بصرية مبسطة'],
      availability: 'متاح أي مدة',
      org: { name: 'مشكاة', initials: 'م', seal: true },
    },
  },
}

/** عرض قيد التنفيذ: الحقائق الافتراضية "المدة" و"اللي فاضل". */
export const InProgress: Story = {
  args: {
    status: 'doing',
    statusLabel: 'بيتنفّذ',
    info: [
      { key: 'assignedMember', values: [{ text: 'محمد علي', bold: true }] },
      { key: 'requiredDates', values: [{ text: '١ — ٢٢ سبتمبر' }] },
    ],
    actions: [
      { key: 'markDone', label: 'تم التنفيذ', variant: 'primary' },
      { key: 'changeMember', label: 'غيّر العضو', variant: 'outline' },
      { key: 'warn', label: 'تنبيه', variant: 'destructive' },
    ],
    details: { whatsLeft: ['تسليم الملف النهائي', 'مراجعة الطباعة'] },
  },
}

/** عرض منتهٍ: التقييم وعرض الاتفاق. */
export const Done: Story = {
  args: {
    status: 'done',
    statusLabel: 'حصل',
    info: [
      { key: 'supervisor', values: [{ text: 'ليلى حسن', bold: true }] },
      { key: 'closed', values: [{ text: '٢٢ سبتمبر' }] },
      { key: 'ratedBy', values: [{ text: '★ ٥' }] },
    ],
    actions: [
      { key: 'viewRating', label: 'شوف التقييم', variant: 'primary' },
      { key: 'viewAgreement', label: 'شوف الاتفاق', variant: 'outline' },
    ],
  },
}

/** مورد مادي: الشارة ذهبية وعناوين "شروط الاستخدام". */
export const MaterialResource: Story = {
  args: {
    type: 'm',
    status: 'none',
    category: 'معدات',
    title: 'جهاز عرض ضوئي (بروجكتور)',
    desc: 'جهاز عرض بدقة عالية للورش والمحاضرات، مع شاشة وحامل.',
    price: '٣٠',
    typeLabel: 'موارد مادية',
    statusLabel: 'منشور بلا طلبات',
    info: [
      { key: 'responsibleMember', values: [{ text: 'خالد سمير', bold: true }] },
      { key: 'returnDate', values: [{ text: 'خلال ٣ أيام' }] },
      { key: 'securityDeposit', values: [{ text: '٥٠٠ شهمهم' }] },
    ],
    actions: [
      { key: 'edit', label: 'عدّل', variant: 'primary' },
      { key: 'delete', label: 'احذف', variant: 'destructive' },
    ],
    details: {
      whatYouGet: ['يُرجع نظيفاً وبكامل ملحقاته', 'الاستخدام داخل المؤسسة فقط'],
      insurance: '٥٠٠ شهمهم',
    },
  },
}

/** عنوان ووصف طويلان: الوصف يقتصر على سطرين. */
export const LongContent: Story = {
  args: {
    title: 'تصميم وتنفيذ سلسلة كاملة من الأدلة والمطبوعات التعليمية لورش الأطفال والشباب',
    desc: 'وصف طويل جداً يوضح تفاصيل الخدمة المقدمة بالكامل من مرحلة الفكرة الأولية مروراً بالتصميم والمراجعات وصولاً إلى تجهيز ملفات الطباعة النهائية وتسليمها بجميع الصيغ المطلوبة.',
  },
}

/** بدون حركة الكارد. */
export const NotAnimated: Story = {
  args: { animated: false },
}

/** اتجاه LTR: الشارة يسار وزر التوسيع يمين. */
export const LTR: Story = {
  decorators: [
    (Story) => (
      <div dir="ltr">
        <Story />
      </div>
    ),
  ],
}
