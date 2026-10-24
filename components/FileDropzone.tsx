'use client'
import gate from '@/icons/gate.svg'
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentMedia,
  AttachmentPrimary,
  AttachmentTrigger,
} from '@/components/ui/attachment'
import { XIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import * as React from 'react'

import { cn } from 'cn'
import { Input } from './ui/input'

export interface AttachedFile {
  id: string
  file: File
  previewUrl?: string
  isMain?: boolean
}

function formatFileSize(bytes: number, locale: string): string {
  if (bytes === 0) return locale === 'ar' ? '٠ ب' : '0 B'
  const k = 1024
  const sizes = locale === 'ar' ? ['ب', 'كيلو', 'ميجا', 'جيجا'] : ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)
  const formatted = value.toFixed(i === 0 ? 0 : 1).replace(/\.0$/, '')
  return `${formatted} ${sizes[i] || sizes[sizes.length - 1]}`
}

interface FileDropzoneProps {
  maxFiles?: number
  value?: AttachedFile[]
  onChange?: (files: AttachedFile[]) => void
  invalid?: boolean
  acceptedTypes?: string[]
  design?: 'preview' | 'list'
  title?: string
  description?: string
}

export function FileDropzone({
  maxFiles = 5,
  value,
  onChange,
  invalid,
  acceptedTypes = ['image/*'],
  design = 'preview',
  title,
  description,
}: FileDropzoneProps) {
  const [internalFiles, setInternalFiles] = React.useState<AttachedFile[]>([])
  const [isDraggingFiles, setIsDraggingFiles] = React.useState(false)
  const dragDepth = React.useRef(0)
  const locale = useLocale()
  const files = value ?? internalFiles
  const mainFileId = files.find((file) => file.isMain)?.id ?? files[0]?.id

  const t = useTranslations('postResourceNamliya')

  const updateFiles = (next: AttachedFile[]) => {
    if (value === undefined) {
      setInternalFiles(next)
    }
    onChange?.(next)
  }

  const matchesAccepted = (file: File) => {
    return acceptedTypes.some((type) => {
      if (type === 'image/*') return file.type.startsWith('image/')
      if (type === '.xlsx') return file.name.endsWith('.xlsx') || file.type.includes('spreadsheet')
      if (type === 'application/pdf') return file.type === 'application/pdf'
      return file.type === type || file.name.endsWith(type.replace('*', ''))
    })
  }

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return

    const incoming = Array.from(fileList).filter(matchesAccepted)
    const room = maxFiles - files.length
    if (room <= 0) return

    const accepted = incoming.slice(0, room).map((file, index) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      isMain: files.length === 0 && index === 0 && design === 'preview',
    }))

    updateFiles([...files, ...accepted])
  }

  const selectMainFile = (id: string) => {
    if (design !== 'preview') return
    updateFiles(files.map((file) => ({ ...file, isMain: file.id === id })))
  }

  const removeFile = (id: string) => {
    const target = files.find((file) => file.id === id)
    if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl)

    const next = files.filter((file) => file.id !== id)
    const shouldPromoteFirstImage = id === mainFileId && next.length > 0 && design === 'preview'
    updateFiles(
      shouldPromoteFirstImage
        ? next.map((file, index) => ({ ...file, isMain: index === 0 }))
        : next,
    )
  }

  React.useEffect(() => {
    return () => files.forEach((file) => file.previewUrl && URL.revokeObjectURL(file.previewUrl))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const canAddMore = files.length < maxFiles

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

  const uploadTitle = title ?? t('addPhotos')
  const uploadDesc = description ?? t('photoDesc')

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
          <Input
            type="file"
            accept={acceptedTypes.join(',')}
            multiple
            className="sr-only"
            onChange={(event) => {
              addFiles(event.target.files)
              event.target.value = ''
            }}
          />
          <Image src={gate} alt="Upload files" className="mx-auto mb-3.5 size-15.5" />
          <span
            className={cn(
              'block font-display text-[23px]/[1.3] font-bold text-ink',
              invalid && 'text-red-dark',
            )}
          >
            {uploadTitle}
          </span>
          <span className="mt-1.5 block font-body text-[15px]/[1.85] font-medium text-soft">
            {uploadDesc}
          </span>
        </label>
      )}

      {files.length > 0 && (
        <>
          {design === 'preview' ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {files.map((file) => {
                const isMain = file.id === mainFileId

                return (
                  <Attachment key={file.id} selected={isMain}>
                    <AttachmentMedia>
                      {file.previewUrl ? (
                        <Image
                          fill
                          unoptimized
                          src={file.previewUrl}
                          alt={file.file.name}
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center bg-paper font-display text-xl font-bold text-soft">
                          {file.file.name.split('.').pop()?.toUpperCase()}
                        </div>
                      )}
                    </AttachmentMedia>
                    <AttachmentTrigger
                      aria-label={t('selectMainImage', { name: file.file.name })}
                      aria-pressed={isMain}
                      onClick={() => selectMainFile(file.id)}
                    />
                    <AttachmentActions>
                      <AttachmentAction
                        aria-label={t('removeImage', { name: file.file.name })}
                        onClick={() => removeFile(file.id)}
                      >
                        <XIcon className="size-3.5" strokeWidth={3} />
                      </AttachmentAction>
                    </AttachmentActions>
                    {isMain && <AttachmentPrimary>{t('mainImage')}</AttachmentPrimary>}
                  </Attachment>
                )
              })}
            </div>
          ) : (
            <div className="grid gap-3 min-[621px]:grid-cols-2">
              {files.map((file) => {
                const ext = file.file.name.split('.').pop()?.toUpperCase() || ''
                const isPdf = file.file.type === 'application/pdf'

                return (
                  <div
                    key={file.id}
                    className="flex min-w-0 items-center gap-3 rounded-card border-[2.5px] border-ink bg-paper px-3.75 py-3"
                  >
                    <span className="grid size-10.5 shrink-0 place-items-center rounded-[10px] border-[2.5px] border-ink bg-red font-body text-xs font-extrabold text-surface">
                      {isPdf ? 'PDF' : ext}
                    </span>
                    <span className="min-w-0 font-body">
                      <strong className="block text-[15px] font-extrabold wrap-anywhere">
                        {file.file.name}
                      </strong>
                      <span className="block text-[13px] font-semibold text-soft">
                        {formatFileSize(file.file.size, locale)}
                      </span>
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}
