'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { use } from 'react'
import { Conversation } from '../../conversation'
import { contractThreads } from '../../data'

const fieldClass = 'py-3 px-4 text-[15.5px] font-medium'
const labelClass = 'mb-[7px] block font-display text-[18px]'
const duoClass = 'grid grid-cols-2 gap-3.5 max-[620px]:grid-cols-1'

export default function CreateContractPage({
  params,
}: PageProps<'/[lang]/maktab/messages/[id]/contract/create'>) {
  const { id } = use(params)
  const t = useTranslations('messages.contractForm')
  const router = useRouter()
  const thread = contractThreads[id] ?? contractThreads.halqa

  const back = () => router.push(`/maktab/messages/${id}`)

  return (
    <div>
      <Conversation id={id} thread={thread} />

      <Dialog open onOpenChange={(open) => !open && back()}>
        <DialogContent
          className="sm:w-[min(760px,94vw)] px-[30px] pt-8 pb-7"
          overlayClassName="bg-[rgba(26,23,20,0.55)]"
          closeLabel={t('close')}
        >
          <DialogTitle className="text-[31px] leading-[1.25]">{t('title')}</DialogTitle>
          <DialogDescription className="mb-[22px] text-[16px]">{t('subtitle')}</DialogDescription>

          <div className="mb-4">
            <label htmlFor="deliverables" className={labelClass}>
              {t('fields.deliverables')}
            </label>
            <Textarea
              id="deliverables"
              rows={3}
              placeholder={t('placeholders.deliverables')}
              className={`min-h-0 ${fieldClass}`}
            />
          </div>

          <div className={duoClass}>
            <div className="mb-4">
              <label htmlFor="quantity" className={labelClass}>
                {t('fields.quantity')}
              </label>
              <Input
                id="quantity"
                type="text"
                placeholder={t('placeholders.quantity')}
                className={fieldClass}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className={labelClass}>
                {t('fields.duration')}
              </label>
              <Input
                id="duration"
                type="text"
                placeholder={t('placeholders.duration')}
                className={fieldClass}
              />
            </div>
          </div>

          <div className={duoClass}>
            <div className="mb-4">
              <label htmlFor="startDate" className={labelClass}>
                {t('fields.startDate')}
              </label>
              <Input
                id="startDate"
                type="text"
                placeholder={t('placeholders.startDate')}
                className={fieldClass}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="endDate" className={labelClass}>
                {t('fields.endDate')}
              </label>
              <Input
                id="endDate"
                type="text"
                placeholder={t('placeholders.endDate')}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="value" className={labelClass}>
              {t('fields.value')}
            </label>
            <Input id="value" type="text" defaultValue="٥٥" className={fieldClass} />
            <div className="mt-1.5 flex items-start gap-3 rounded-card border-[2.5px] border-ink bg-paper px-4 py-[13px]">
              <b className="shrink-0 font-display text-[16px]">{t('vat.label')}</b>
              <p className="font-body text-[14.5px]/[1.8] font-medium text-soft">{t('vat.text')}</p>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="specialTerms" className={labelClass}>
              {t('fields.specialTerms')}{' '}
              <span className="font-body text-[14px] font-medium text-soft">
                {t('fields.specialTermsOptional')}
              </span>
            </label>
            <Textarea
              id="specialTerms"
              rows={2}
              placeholder={t('placeholders.specialTerms')}
              className={`min-h-0 ${fieldClass}`}
            />
          </div>

          <div className="mt-[22px] flex flex-wrap gap-3 border-t-[3px] border-dashed border-ink pt-[18px]">
            <Button
              variant="primary"
              shape="round"
              effect="3d"
              className="font-extrabold"
              onClick={() => router.push('/maktab/agreements/1')}
            >
              {t('actions.send')}
            </Button>
            <Button variant="outline" shape="round" effect="flat" onClick={back}>
              {t('actions.saveDraft')}
            </Button>
            <Button variant="outline" shape="round" effect="flat" onClick={back}>
              {t('actions.cancel')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
