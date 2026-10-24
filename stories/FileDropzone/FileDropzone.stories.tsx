import { FileDropzone, type AttachedFile } from '@/components/FileDropzone'
import { dictionaries } from '@/i18n/dictionary'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { NextIntlClientProvider } from 'next-intl'
import * as React from 'react'

function createDemoFile(
  id: string,
  name: string,
  isMain = false,
  sizeBytes?: number,
): AttachedFile {
  const isImage = name.endsWith('.svg') || name.endsWith('.png') || name.endsWith('.jpg')
  const content = new Uint8Array(
    isImage ? 2048 : sizeBytes || Math.floor(Math.random() * 500000) + 100000,
  )
  for (let i = 0; i < content.length; i++) content[i] = Math.floor(Math.random() * 255)
  const file = new File([content.buffer], name, {
    type: isImage ? 'image/svg+xml' : 'application/pdf',
  })
  return {
    id,
    file,
    previewUrl: isImage
      ? `data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20320%22%20width%3D%22320%22%20height%3D%22320%22%3E%3Crect%20width%3D%22320%22%20height%3D%22320%22%20fill%3D%22%23e6a62f%22%2F%3E%3Ctext%20x%3D%22160%22%20y%3D%22170%22%20text-anchor%3D%22middle%22%20font-size%3D%2220%22%20fill%3D%22%231A1714%22%3EImage%3C%2Ftext%3E%3C%2Fsvg%3E`
      : undefined,
    isMain,
  }
}

function FileDropzoneDemo({
  initialImages = [],
  ...props
}: React.ComponentProps<typeof FileDropzone> & { initialImages?: AttachedFile[] }) {
  const [images, setImages] = React.useState(initialImages)
  return <FileDropzone {...props} value={images} onChange={setImages} />
}

const meta = {
  title: 'Forms/FileDropzone',
  component: FileDropzone,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    maxFiles: { control: { type: 'number', min: 1, max: 8 } },
    design: { control: { type: 'radio', options: ['preview', 'list'] } },
    invalid: { control: 'boolean' },
  },
  args: {
    maxFiles: 5,
    design: 'preview',
    invalid: false,
  },
  decorators: [
    (Story, context) => {
      const locale = context.globals.locale === 'en' ? 'en' : 'ar'

      return (
        <NextIntlClientProvider locale={locale} messages={dictionaries[locale]}>
          <div className="mx-auto w-full max-w-2xl">
            <Story />
          </div>
        </NextIntlClientProvider>
      )
    },
  ],
  render: (args) => <FileDropzoneDemo {...args} />,
} satisfies Meta<typeof FileDropzone>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPreview: Story = {
  args: { design: 'preview' },
  render: (args) => (
    <FileDropzoneDemo
      {...args}
      initialImages={[
        createDemoFile('main', 'مورد-رئيسي.svg', true),
        createDemoFile('second', 'مورد-ثانٍ.svg', false),
        createDemoFile('third', 'مورد-ثالث.svg', false),
      ]}
    />
  ),
}

export const WithFiles: Story = {
  args: {
    design: 'list',
    acceptedTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
  },
  render: (args) => (
    <FileDropzoneDemo
      {...args}
      initialImages={[
        createDemoFile('main', 'Cycle 9–11 cap analysis.pdf', true),
        createDemoFile('second', 'Exchange data by team size.xlsx', false),
      ]}
    />
  ),
}

export const Invalid: Story = {
  args: { invalid: true },
}
