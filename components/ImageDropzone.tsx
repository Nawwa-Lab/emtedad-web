'use client'
import Image from 'next/image'
import * as React from 'react'
import { Field, FieldLabel } from '@/components/ui/field'
import { PlusIcon, XIcon } from 'lucide-react'
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from '@/components/ui/attachment'
import { useTranslations } from 'next-intl'

interface AttachedImage {
  id: string
  file: File
  previewUrl: string
}

interface ImageDropzoneProps {
  maxImages?: number
  onChange?: (images: AttachedImage[]) => void
}

export function ImageDropzone({ maxImages = 5, onChange }: ImageDropzoneProps) {
  const [images, setImages] = React.useState<AttachedImage[]>([])

  const updateImages = (next: AttachedImage[]) => {
    setImages(next)
    onChange?.(next)
  }

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return
    const incoming = Array.from(fileList).filter((f) => f.type.startsWith('image/'))
    const room = maxImages - images.length
    if (room <= 0) return

    const accepted = incoming.slice(0, room).map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
    }))

    updateImages([...images, ...accepted])
  }

  const removeImage = (id: string) => {
    const target = images.find((img) => img.id === id)
    if (target) URL.revokeObjectURL(target.previewUrl)
    updateImages(images.filter((img) => img.id !== id))
  }

  React.useEffect(() => {
    return () => images.forEach((img) => URL.revokeObjectURL(img.previewUrl))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const canAddMore = images.length < maxImages

  const formatSize = (bytes: number) =>
    bytes >= 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
      : `${(bytes / 1024).toFixed(0)} KB`

  const t = useTranslations("postResourceNamliya")

  return (
    <div
      dir="rtl"
      className="border-[1.5px] border-dashed border-line rounded-2xl bg-paper p-3 sm:p-4 flex flex-col gap-3 w-full hover:border-green-deep"
    >
      {images.length > 0 && (
        <AttachmentGroup className="w-full">
          {images.map((img, index) => (
            <Attachment
              key={img.id}
              orientation="vertical"
              className="w-24 sm:w-28 md:w-32 shrink-0"
            >
              <AttachmentMedia variant="image">
                <Image
                  fill
                  unoptimized
                  src={img.previewUrl}
                  alt={img.file.name}
                  className="object-cover"
                />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle className="text-[11px] sm:text-[12px] truncate">
                  {img.file.name}
                </AttachmentTitle>
                <AttachmentDescription className="text-[10px] sm:text-[11px]">
                  {index === 0 ? 'الصورة الرئيسية' : formatSize(img.file.size)}
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction
                  aria-label={`إزالة ${img.file.name}`}
                  onClick={() => removeImage(img.id)}
                >
                  <XIcon className="h-4 w-4 text-white drop-shadow-sm" strokeWidth={2.2} />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          ))}
        </AttachmentGroup>
      )}

      {canAddMore && (
        <Field>
          <FieldLabel className="flex flex-col items-center justify-center text-center gap-1 sm:gap-1.5 cursor-pointer py-3 sm:py-4">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                addFiles(e.target.files)
                e.target.value = ''
              }}
            />
            <span className="flex items-center gap-1 font-extrabold text-[12px] sm:text-[13.5px] text-green-deep font-cairo">
              <PlusIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={3} />
              {t('addPhotos')}
            </span>
            {images.length === 0 && (
              <span className="font-semibold text-[10.5px] sm:text-[11.5px] text-ink-soft font-cairo px-2">
                {t('photoDesc')}
              </span>
            )}
          </FieldLabel>
        </Field>
      )}
    </div>
  )
}
