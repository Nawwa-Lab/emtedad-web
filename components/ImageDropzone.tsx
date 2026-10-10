'use client'
import maktab from '@/app/maktab.svg'
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentPrimary,
  AttachmentTrigger,
} from '@/components/ui/attachment'
import { XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import * as React from 'react'

import { cn } from 'cn'

export interface AttachedImage {
  id: string
  file: File
  previewUrl: string
  isMain?: boolean
}

interface ImageDropzoneProps {
  maxImages?: number
  value?: AttachedImage[]
  onChange?: (images: AttachedImage[]) => void
  invalid?: boolean
}

export function ImageDropzone({ maxImages = 5, value, onChange, invalid }: ImageDropzoneProps) {
  const [internalImages, setInternalImages] = React.useState<AttachedImage[]>([])
  const [isDraggingFiles, setIsDraggingFiles] = React.useState(false)
  const dragDepth = React.useRef(0)
  const t = useTranslations('postResourceNamliya')
  const images = value ?? internalImages
  const mainImageId = images.find((image) => image.isMain)?.id ?? images[0]?.id

  const updateImages = (next: AttachedImage[]) => {
    if (value === undefined) {
      setInternalImages(next)
    }
    onChange?.(next)
  }

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return

    const incoming = Array.from(fileList).filter((file) => file.type.startsWith('image/'))
    const room = maxImages - images.length
    if (room <= 0) return

    const accepted = incoming.slice(0, room).map((file, index) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      isMain: images.length === 0 && index === 0,
    }))

    updateImages([...images, ...accepted])
  }

  const selectMainImage = (id: string) => {
    updateImages(images.map((image) => ({ ...image, isMain: image.id === id })))
  }

  const removeImage = (id: string) => {
    const target = images.find((image) => image.id === id)
    if (target) URL.revokeObjectURL(target.previewUrl)

    const next = images.filter((image) => image.id !== id)
    const shouldPromoteFirstImage = id === mainImageId && next.length > 0
    updateImages(
      shouldPromoteFirstImage
        ? next.map((image, index) => ({ ...image, isMain: index === 0 }))
        : next,
    )
  }

  React.useEffect(() => {
    return () => images.forEach((image) => URL.revokeObjectURL(image.previewUrl))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const canAddMore = images.length < maxImages

  const isFileDrag = (event: React.DragEvent<HTMLLabelElement>) =>
    Array.from(event.dataTransfer.types).includes('Files')

  const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
    if (!isFileDrag(event)) return

    event.preventDefault()
    dragDepth.current += 1
    setIsDraggingFiles(true)
  }

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    if (!isFileDrag(event)) return

    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  }

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    if (!isFileDrag(event)) return

    dragDepth.current -= 1
    if (dragDepth.current <= 0) {
      dragDepth.current = 0
      setIsDraggingFiles(false)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    if (!isFileDrag(event)) return

    event.preventDefault()
    dragDepth.current = 0
    setIsDraggingFiles(false)
    addFiles(event.dataTransfer.files)
  }

  return (
    <div dir="rtl" aria-invalid={invalid} className="flex w-full flex-col gap-4">
      {canAddMore && (
        <label
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'cursor-pointer rounded-panel border-[3px] border-dashed border-ink bg-paper px-6 py-8.5 text-center transition-colors hover:bg-gold',
            isDraggingFiles && 'bg-gold',
            invalid && 'border-red-dark',
          )}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(event) => {
              addFiles(event.target.files)
              event.target.value = ''
            }}
          />
          <Image src={maktab} alt="Uplaod images" className="mx-auto mb-3.5 size-15.5" />
          <span
            className={cn(
              'block font-display text-[23px]/[1.3] font-bold text-ink',
              invalid && 'text-red-dark',
            )}
          >
            {t('addPhotos')}
          </span>
          <span className="mt-1.5 block font-body text-[15px]/[1.85] font-medium text-soft">
            {t('photoDesc')}
          </span>
        </label>
      )}

      {images.length > 0 && (
        <AttachmentGroup>
          {images.map((image) => {
            const isMain = image.id === mainImageId

            return (
              <Attachment key={image.id} selected={isMain}>
                <AttachmentMedia>
                  <Image
                    fill
                    unoptimized
                    src={image.previewUrl}
                    alt={image.file.name}
                    className="object-cover"
                  />
                </AttachmentMedia>
                <AttachmentTrigger
                  aria-label={t('selectMainImage', { name: image.file.name })}
                  aria-pressed={isMain}
                  onClick={() => selectMainImage(image.id)}
                />
                <AttachmentActions>
                  <AttachmentAction
                    aria-label={t('removeImage', { name: image.file.name })}
                    onClick={() => removeImage(image.id)}
                  >
                    <XIcon className="size-3.5" strokeWidth={3} />
                  </AttachmentAction>
                </AttachmentActions>
                {isMain && <AttachmentPrimary>{t('mainImage')}</AttachmentPrimary>}
              </Attachment>
            )
          })}
        </AttachmentGroup>
      )}
    </div>
  )
}
