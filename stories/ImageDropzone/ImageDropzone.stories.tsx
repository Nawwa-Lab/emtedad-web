import { ImageDropzone, type AttachedImage } from '@/components/ImageDropzone'
import ar from '@/i18n/dictionary/ar.json'
import en from '@/i18n/dictionary/en.json'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { NextIntlClientProvider } from 'next-intl'
import * as React from 'react'

function createDemoImage(id: string, name: string, color: string, isMain = false): AttachedImage {
  const preview = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320"><rect width="320" height="320" fill="${color}"/><circle cx="160" cy="118" r="52" fill="#fff8e8"/><path d="M48 286l80-90 50 48 35-38 59 80z" fill="#fff8e8"/></svg>`,
  )

  return {
    id,
    file: new File([], name, { type: 'image/svg+xml' }),
    previewUrl: `data:image/svg+xml,${preview}`,
    isMain,
  }
}

function ImageDropzoneDemo({
  initialImages = [],
  ...props
}: React.ComponentProps<typeof ImageDropzone> & { initialImages?: AttachedImage[] }) {
  const [images, setImages] = React.useState(initialImages)

  return <ImageDropzone {...props} value={images} onChange={setImages} />
}

const meta = {
  title: 'Forms/ImageDropzone',
  component: ImageDropzone,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    maxImages: { control: { type: 'number', min: 1, max: 8 } },
    invalid: { control: 'boolean' },
  },
  args: {
    maxImages: 5,
    invalid: false,
  },
  decorators: [
    (Story, context) => {
      const locale = context.globals.locale === 'en' ? 'en' : 'ar'

      return (
        <NextIntlClientProvider locale={locale} messages={locale === 'en' ? en : ar}>
          <div className="mx-auto w-full max-w-2xl">
            <Story />
          </div>
        </NextIntlClientProvider>
      )
    },
  ],
  render: (args) => <ImageDropzoneDemo {...args} />,
} satisfies Meta<typeof ImageDropzone>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithImages: Story = {
  render: (args) => (
    <ImageDropzoneDemo
      {...args}
      initialImages={[
        createDemoImage('main', 'مورد-رئيسي.svg', '#e6a62f', true),
        createDemoImage('second', 'مورد-ثانٍ.svg', '#69a7c8'),
        createDemoImage('third', 'مورد-ثالث.svg', '#e96b5a'),
      ]}
    />
  ),
}

export const Invalid: Story = {
  args: {
    invalid: true,
  },
}
