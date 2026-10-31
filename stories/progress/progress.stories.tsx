import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Progress } from '../../components/ui/progress'

const meta = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A pill-shaped progress bar built on Base UI's \`Progress\` primitive.

- The filled bar is **gold** by default.
- Pass \`indicatorClassName\` to change the bar color, and \`className\` to style the outer pill.
- Pass \`value={null}\` for an indeterminate state.

\`\`\`tsx
import { Progress } from '@/components/ui/progress'

<Progress value={60} />
<Progress value={60} indicatorClassName="bg-red" />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress from 0 to 100. Use `null` for indeterminate.',
      table: {
        type: { summary: 'number | null' },
        defaultValue: { summary: 'null' },
      },
    },
    indicatorClassName: {
      control: 'text',
      description: 'Tailwind classes for the filled bar. Overrides the default `bg-gold`.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bg-gold' },
      },
    },
    className: {
      control: 'text',
      description: 'Tailwind classes for the outer pill.',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    value: 60,
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: 'Default gold bar. Drag the `value` control to change it.' },
    },
  },
}

export const Empty: Story = {
  args: { value: 0 },
  parameters: {
    docs: { description: { story: 'No progress yet.' } },
  },
}

export const Half: Story = {
  args: { value: 50 },
}

export const Full: Story = {
  args: { value: 100 },
  parameters: {
    docs: { description: { story: 'Completed state.' } },
  },
}

export const CustomColor: Story = {
  args: {
    value: 70,
    indicatorClassName: 'bg-red',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use `indicatorClassName` to override the default gold color.',
      },
    },
  },
}

export const Indeterminate: Story = {
  args: { value: null },
  parameters: {
    docs: {
      description: { story: 'Pass `value={null}` when the amount of progress is unknown.' },
    },
  },
}

export const AllStates: Story = {
  parameters: {
    docs: {
      description: { story: 'Overview of the common values and the color override.' },
      source: { type: 'code' },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {[0, 25, 50, 75, 100].map((v) => (
        <Progress key={v} value={v} />
      ))}
      <Progress value={60} indicatorClassName="bg-red" />
    </div>
  ),
}
