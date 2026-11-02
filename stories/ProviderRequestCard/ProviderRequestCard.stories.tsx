// ProviderRequestCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { NextIntlClientProvider } from 'next-intl'
import { expect, userEvent, within } from 'storybook/test'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ProviderRequestCard } from '@/components/ProviderRequestCard'

// Replace with your real messages file if you have one, e.g. import messages from '@/messages/ar.json'
const messages = {
  statusBadge: { empty: '', veryGood: 'عامر', good: 'جيد' },
  satisfactionIndex: {
    title: 'مؤشر الرضا',
    rate: 'تقييمات الأعضاء',
    dialog: [{ header: 'تقييم المؤسسة', provider: 'المؤسسة المقدِّمة' }],
    reviewHeader: 'آراء الأعضاء',
    reviewContent: [
      {
        reviewerName: 'سارة',
        exchangeText: 'تبادل تصوير',
        badge: 'عامر',
        reviewText: 'تعامل ممتاز وتسليم في الميعاد.',
      },
    ],
  },
}

const meta = {
  title: 'Components/ProviderRequestCard',
  component: ProviderRequestCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card that summarizes a service provider. Every section is optional: pass only the props you need and the rest are not rendered.\n\n' +
          '- `provider`: header with avatar, name and an optional profile link.\n' +
          '- `satisfaction`: rating row. Its badge opens the `SatisfactionIndex` dialog by default.\n' +
          '- `member`: the executing member (name link is required), with an optional badge.\n' +
          '- `request` / `save`: action buttons. Save is a toggle that keeps its own state.',
      },
    },
  },
  argTypes: {
    provider: {
      description:
        'Provider header. `name` is required; `initial`, `imageSrc`, `profileHref` and `profileLabel` are optional. The profile link shows only when both `profileHref` and `profileLabel` are set.',
      table: { type: { summary: 'ProviderInfo' } },
    },
    satisfaction: {
      description:
        'Rating row. `title` and `badge` are required. `dialog` defaults to `<SatisfactionIndex />`; pass `null` for a plain badge, or your own dialog content.',
      table: { type: { summary: 'SatisfactionInfo' } },
    },
    member: {
      description:
        'Executing member. `name` and `href` are required; `role`, `initial`, `imageSrc` and `badge` are optional.',
      table: { type: { summary: 'MemberInfo' } },
    },
    request: {
      description: 'Request link. `label` is required; `href` defaults to `#`.',
      table: { type: { summary: 'RequestAction' } },
    },
    save: {
      description:
        'Save toggle. `label` is required; `defaultSaved` sets the initial state. The state is managed inside the component.',
      table: { type: { summary: 'SaveAction' } },
    },
    className: { description: 'Extra classes for the root `Card`.', control: 'text' },
  },
  args: {
    provider: {
      name: 'صوت وصورة',
      profileHref: '/providers/sawt',
      profileLabel: 'افتح الملف العام',
    },
    satisfaction: {
      title: 'مؤشر الرضا',
      subtitle: 'قيّمها ٤٨ عضوًا',
      badge: 'عامر',
    },
    member: {
      name: 'كريم فوزي',
      href: '/members/karim',
      role: 'العضو المنفِّذ · مصوّر ومدير إنتاج',
      badge: 'عامر',
    },
    request: { label: 'اطلب', href: '/request' },
    save: { label: 'احفظ' },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="ar" messages={messages}>
        <div className="w-105 max-w-full">
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
} satisfies Meta<typeof ProviderRequestCard>

export default meta
type Story = StoryObj<typeof meta>

export const Full: Story = {
  parameters: {
    docs: { description: { story: 'All sections passed.' } },
  },
}

export const ProviderOnly: Story = {
  args: { satisfaction: undefined, member: undefined, save: undefined },
  parameters: {
    docs: {
      description: {
        story: 'Only `provider` and `request`. Sections without props are not rendered.',
      },
    },
  },
}

export const WithoutMember: Story = {
  args: { member: undefined },
}

export const RequestOnly: Story = {
  args: { save: undefined },
  parameters: {
    docs: { description: { story: 'Without `save`, the request button takes the full row.' } },
  },
}

export const SavedByDefault: Story = {
  args: { save: { label: 'احفظ', defaultSaved: true } },
  parameters: {
    docs: { description: { story: '`defaultSaved` starts the toggle in its red, filled state.' } },
  },
}

export const PlainSatisfactionBadge: Story = {
  args: {
    satisfaction: { title: 'مؤشر الرضا', subtitle: 'قيّمها ٤٨ عضوًا', badge: 'عامر', dialog: null },
  },
  parameters: {
    docs: { description: { story: '`dialog: null` renders the badge without opening anything.' } },
  },
}

export const CustomDialog: Story = {
  args: {
    satisfaction: {
      title: 'مؤشر الرضا',
      badge: 'عامر',
      dialog: (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>محتوى مخصص</DialogTitle>
          </DialogHeader>
        </DialogContent>
      ),
    },
  },
  parameters: {
    docs: {
      description: { story: 'Pass your own dialog content in place of `SatisfactionIndex`.' },
    },
  },
}

export const ToggleSave: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interaction test: clicking save turns it on, clicking again turns it off.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const saveButton = await canvas.findByRole('button', { name: 'احفظ' })

    await userEvent.click(saveButton)
    await expect(saveButton).toHaveAttribute('aria-pressed', 'true')

    await userEvent.click(saveButton)
    await expect(saveButton).toHaveAttribute('aria-pressed', 'false')
  },
}
