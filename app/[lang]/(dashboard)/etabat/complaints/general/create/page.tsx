'use client'

import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Link, useRouter } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import HandIcon from '@/icons/hand.svg'
import KeyIcon from '@/icons/key.svg'
import LanternIcon from '@/icons/lantern.svg'
import WaveIcon from '@/icons/wave.svg'
import { createGeneralComplaintSchema, type GeneralComplaintFormValues } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { generalComplaintTarget, submitGeneralComplaint } from '../../../data'

const complaintKinds = ['harassment', 'fraud', 'rules', 'exclusion'] as const

export default function GeneralComplaintPage() {
  const t = useTranslations('etabat.home.generalComplaint')
  const global = useTranslations('global')
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const schema = useMemo(
    () =>
      createGeneralComplaintSchema({
        kindRequired: t('validation.kindRequired'),
        targetRequired: t('validation.targetRequired'),
        titleRequired: t('validation.titleRequired'),
        detailsRequired: t('validation.detailsRequired'),
        detailsMin: t('validation.detailsMin'),
        requestRequired: t('validation.requestRequired'),
      }),
    [t],
  )

  const submit = async (data: GeneralComplaintFormValues) => {
    await submitGeneralComplaint(data)
    router.push('/etabat/cases/1052')
  }

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return
    const accepted = Array.from(fileList).filter((file) =>
      ['application/pdf', 'image/png', 'image/jpeg'].includes(file.type),
    )
    setFiles((current) => [...current, ...accepted].slice(0, 5))
  }

  return (
    <div className="mx-auto max-w-245">
      <Link
        href="/etabat"
        className="mb-4 inline-flex items-center gap-2 font-body text-[15px] font-extrabold text-ink hover:text-red"
      >
        <span className="grid size-9.5 place-items-center rounded-full border-[2.5px] border-ink bg-surface text-xl rtl:rotate-180">
          ›
        </span>
        {t('back')}
      </Link>

      <div className="mb-2 flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1] max-[520px]:text-[40px]">
          {t('title')}
        </h1>
        <p className="mb-2.5 font-body text-[17px] font-medium text-soft">{t('subtitle')}</p>
      </div>

      <div className="mb-6 flex items-start gap-4 rounded-panel border-[3px] border-ink bg-blue px-6 py-5 text-surface shadow-[6px_6px_0] shadow-ink">
        <Image src={HandIcon} alt="" className="mt-0.5 size-8.5 shrink-0" />
        <p className="font-body text-[15.5px]/[1.9] font-semibold">
          {t.rich('intro', {
            strong: (chunks) => (
              <strong className="font-display text-lg font-normal">{chunks}</strong>
            ),
            link: (chunks) => (
              <Link
                href="/etabat/complaints/exchange/create"
                className="border-b-[2.5px] border-gold font-extrabold text-gold"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>

      <Form<GeneralComplaintFormValues>
        resolver={zodResolver(schema)}
        defaultValues={{
          kind: 'harassment',
          target: generalComplaintTarget,
          title: '',
          details: '',
          request: '',
        }}
        onSubmit={submit}
      >
        <section className="mb-5 rounded-panel border-[3px] border-ink bg-surface px-7 py-6 shadow-[6px_6px_0] shadow-ink max-sm:px-4.5">
          <SectionTitle icon={BalanceIcon}>{t('kindTitle')}</SectionTitle>
          <p className="mt-2 mb-4.5 font-body text-base/[1.95] font-medium text-soft">
            {t('kindIntro')}
          </p>
          <Form.Control name="kind" label="" className="mb-1.5!">
            {(field) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="grid grid-cols-2 gap-3.5 text-start max-[620px]:grid-cols-1"
              >
                {complaintKinds.map((kind) => (
                  <RadioGroupItem
                    key={kind}
                    value={kind}
                    className="min-h-0! items-stretch! justify-start! rounded-card! bg-paper! px-5! py-4.5! text-start! shadow-none! hover:translate-none! hover:rotate-0! data-checked:bg-gold! data-checked:translate-none! data-checked:shadow-[4px_4px_0]! **:data-[slot=radio-group-indicator]:hidden"
                  >
                    <div className="flex w-full items-start gap-3">
                      <span className="relative mt-0.5 size-6.5 shrink-0 rounded-lg border-[2.5px] border-ink bg-surface after:absolute after:inset-s-1.75 after:top-1 after:h-2.5 after:w-1.25 after:rotate-45 rtl:after:rotate-y-180 after:border-b-[3px] after:border-e-[3px] after:border-ink after:opacity-0 group-data-checked/radio-group-item:after:opacity-100" />
                      <b className="font-display text-xl/[1.3] font-normal">
                        {t(`kinds.${kind}.title`)}
                      </b>
                    </div>
                    <p className="mt-1.75 ps-9.5 font-body text-[13.5px]/[1.8] font-semibold text-soft group-data-checked/radio-group-item:text-ink/75">
                      {t(`kinds.${kind}.description`)}
                    </p>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            )}
          </Form.Control>
          <InfoNote icon={KeyIcon}>
            {t.rich('membershipNote', {
              strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
              link: (chunks) => (
                <Link
                  href="/governance/membership"
                  className="border-b-[2.5px] border-red font-extrabold text-ink hover:text-red"
                >
                  {chunks}
                </Link>
              ),
            })}
          </InfoNote>
        </section>

        <section className="mb-5 rounded-panel border-[3px] border-ink bg-surface px-7 py-6 shadow-[6px_6px_0] shadow-ink max-sm:px-4.5">
          <SectionTitle icon={LanternIcon}>{t('detailsTitle')}</SectionTitle>
          <Form.Control
            name="target"
            label={t('target')}
            labelFor="general-target"
            className="mt-5"
          >
            {(field, state) => (
              <>
                <Input
                  id="general-target"
                  placeholder={t('targetPlaceholder')}
                  {...field}
                  aria-invalid={state.invalid}
                />
                <p className="mt-1.75 font-body text-[13.5px]/[1.7] font-semibold text-soft">
                  {t('targetHint')}
                </p>
              </>
            )}
          </Form.Control>
          <Form.Control name="title" label={t('complaintTitle')} labelFor="general-title">
            {(field, state) => (
              <Input
                id="general-title"
                placeholder={t('titlePlaceholder')}
                {...field}
                aria-invalid={state.invalid}
              />
            )}
          </Form.Control>
          <Form.Control name="details" label={t('details')} labelFor="general-details">
            {(field, state) => (
              <Textarea
                id="general-details"
                className="min-h-40"
                placeholder={t('detailsPlaceholder')}
                {...field}
                aria-invalid={state.invalid}
              />
            )}
          </Form.Control>
          <Form.Control name="request" label={t('request')} labelFor="general-request">
            {(field, state) => (
              <Textarea
                id="general-request"
                className="min-h-25"
                placeholder={t('requestPlaceholder')}
                {...field}
                aria-invalid={state.invalid}
              />
            )}
          </Form.Control>
          <div className="mb-0.5">
            <label htmlFor="general-evidence" className="mb-2.5 block font-body text-sm font-bold">
              {t('evidence')} <span className="font-semibold text-soft">({t('optional')})</span>
            </label>
            <label className="block cursor-pointer rounded-card border-[3px] border-dashed border-ink bg-paper px-6 py-6 text-center font-body text-[15px]/[1.9] font-bold text-soft hover:bg-gold hover:text-ink">
              <input
                id="general-evidence"
                type="file"
                accept="application/pdf,image/png,image/jpeg"
                multiple
                className="sr-only"
                disabled={files.length >= 5}
                onChange={(event) => {
                  addFiles(event.target.files)
                  event.target.value = ''
                }}
              />
              <span className="block">{t('upload')}</span>
              <span className="block text-[13.5px] font-semibold">{t('uploadHint')}</span>
            </label>
            {files.length > 0 && (
              <p className="mt-2 font-body text-sm font-bold">
                {files.map((file) => file.name).join(' · ')}
              </p>
            )}
          </div>
        </section>

        <section className="mb-5 rounded-panel border-[3px] border-ink bg-surface px-7 py-6 shadow-[6px_6px_0] shadow-ink max-sm:px-4.5">
          <SectionTitle icon={WaveIcon}>{t('differenceTitle')}</SectionTitle>
          <div className="mt-4.5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [t('facts.duration'), t('facts.durationValue')],
              [t('facts.arbitrators'), t('facts.arbitratorsValue')],
              [
                t('facts.deposit'),
                <>
                  {t('facts.depositValue')}{' '}
                  <small className="text-sm text-red">{global('currency')}</small>
                </>,
              ],
              [t('facts.mediation'), t('facts.mediationValue')],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="rounded-card border-[2.5px] border-ink bg-paper px-4 py-3.5"
              >
                <span className="block font-body text-[12.5px] font-bold text-soft">{label}</span>
                <span className="mt-1 block font-display text-[22px]/[1.3]">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-card border-[2.5px] border-dashed border-red bg-tint px-4.5 py-3.5">
            <Image src={KeyIcon} alt="" className="size-7 shrink-0" />
            <p className="font-body text-[14.5px]/[1.85] font-semibold">
              {t.rich('warning', { strong: (chunks) => <strong>{chunks}</strong> })}
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button type="submit">{t('submit')}</Button>
            <Button
              type="button"
              variant="outline"
              effect="flat"
              onClick={() => router.push('/etabat')}
            >
              {t('cancel')}
            </Button>
          </div>
        </section>
      </Form>
    </div>
  )
}

function SectionTitle({ icon, children }: { icon: typeof KeyIcon; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 font-display text-[26px]/[1.25]">
      <Image src={icon} alt="" className="size-8.5" />
      {children}
    </h2>
  )
}

function InfoNote({ icon, children }: { icon: typeof KeyIcon; children: React.ReactNode }) {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-card border-[2.5px] border-dashed border-ink bg-paper px-4.5 py-3.5">
      <Image src={icon} alt="" className="size-7 shrink-0" />
      <p className="font-body text-[14.5px]/[1.85] font-semibold text-soft">{children}</p>
    </div>
  )
}
