'use client'

import { Form } from '@/components/Form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Link, useRouter } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import CircleIcon from '@/icons/circles.svg'
import DNAIcon from '@/icons/dna.svg'
import GateIcon from '@/icons/gate.svg'
import KeyIcon from '@/icons/key.svg'
import LanternIcon from '@/icons/lantern.svg'
import StarTwoIcon from '@/icons/star-2.svg'
import StarIcon from '@/icons/star.svg'
import WaveIcon from '@/icons/wave.svg'
import { formatNumber } from '@/lib/utils'
import { createExchangeComplaintSchema, type ExchangeComplaintFormValues } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { exchangeComplaintExchanges, exchangeComplaintFiles } from '../../../data'

export default function ExchangeComplaintPage() {
  const t = useTranslations('etabat.home.exchangeComplaint')
  const global = useTranslations('global')
  const locale = useLocale()
  const router = useRouter()
  const [exchange, setExchange] = useState('workshop')
  const [files, setFiles] = useState<File[]>([])
  const schema = useMemo(
    () =>
      createExchangeComplaintSchema({
        exchangeRequired: t('validation.exchangeRequired'),
        titleRequired: t('validation.titleRequired'),
        detailsRequired: t('validation.detailsRequired'),
        detailsMin: t('validation.detailsMin'),
        requestRequired: t('validation.requestRequired'),
      }),
    [t],
  )
  const selected = exchangeComplaintExchanges.find((item) => item.id === exchange)!
  const addFiles = (list: FileList | null) =>
    list && setFiles((current) => [...current, ...Array.from(list)].slice(0, 5))
  const submit = async (data: ExchangeComplaintFormValues) => {
    await Promise.resolve(data)
    router.push('/etabat/cases/1052')
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
      <div className="mb-5 flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1]">{t('title')}</h1>
        <p className="mb-2.5 font-body text-[17px] font-medium text-soft">{t('subtitle')}</p>
      </div>
      <Form<ExchangeComplaintFormValues>
        variant="multi-step"
        steps={[
          { id: 'choose', title: t('chooseTitle'), fields: ['exchange'] },
          { id: 'attachments', title: t('attachmentsTitle'), fields: [] },
          { id: 'story', title: t('storyTitle'), fields: ['title', 'details', 'request'] },
        ]}
        resolver={zodResolver(schema)}
        defaultValues={{
          exchange: 'workshop',
          title: selected.complaintTitle,
          details: '',
          request: '',
        }}
        onSubmit={submit}
      >
        <Form.Progress />
        <Form.Step id="choose">
          <section className="mb-5 rounded-panel border-[3px] border-ink bg-surface px-7 py-6 shadow-[6px_6px_0] shadow-ink max-sm:px-4.5">
            <Title icon={CircleIcon}>{t('chooseTitle')}</Title>
            <p className="mt-2 font-body text-base/[1.95] font-medium text-soft">
              {t('chooseIntro')}
            </p>
            <Form.Control name="exchange" label="" className="mb-0!">
              {(field) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value)
                    setExchange(value)
                  }}
                  className="flex flex-col text-start"
                >
                  {exchangeComplaintExchanges.map((item) => (
                    <RadioGroupItem
                      key={item.id}
                      value={item.id}
                      className="min-h-0! items-stretch! justify-start! rounded-card! bg-paper! p-4! text-start! shadow-none! hover:translate-none! hover:rotate-0! data-checked:bg-gold! data-checked:translate-none! data-checked:shadow-[4px_4px_0]! **:data-[slot=radio-group-indicator]:hidden"
                    >
                      <div className="flex w-full flex-wrap items-start gap-3">
                        <span className="relative mt-0.5 size-6.5 shrink-0 rounded-lg border-[2.5px] border-ink bg-surface after:absolute after:inset-s-1.75 after:top-1 after:h-2.5 after:w-1.25 after:rotate-45 rtl:after:rotate-y-180 after:border-b-[3px] after:border-e-[3px] after:border-ink after:opacity-0  group-data-checked/radio-group-item:after:opacity-100" />
                        <b className="min-w-42.5 flex-1 font-display text-xl/[1.3] font-normal">
                          {item.title}
                        </b>
                        <Badge
                          color="surface"
                          size="sm"
                          effect="flat"
                          className="px-3! py-0.75! text-xs!"
                        >
                          {item.state}
                        </Badge>
                      </div>
                      <p className="mt-2 w-full ps-9.5 font-body text-sm/[1.8] font-semibold text-soft">
                        {t('with')}{' '}
                        <Link
                          href="#"
                          className="border-b-[2.5px] border-red font-extrabold text-ink hover:text-red"
                        >
                          {item.party}
                        </Link>{' '}
                        · {formatNumber(item.value, { locale })}{' '}
                        <span className="">{global('currency')}</span> · {item.detail}
                      </p>
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              )}
            </Form.Control>
            <p className="mt-4 flex gap-3 rounded-card border-[2.5px] border-dashed border-ink bg-paper p-4 font-body text-sm/[1.85] font-semibold text-soft">
              <Image src={KeyIcon} alt="" className="size-7 shrink-0" />
              {t.rich('generalNote', {
                strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
                link: (chunks) => (
                  <Link
                    href="/etabat/complaints/general/create"
                    className="border-b-2 border-red font-extrabold text-ink"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
            <div className="mt-5 flex gap-3">
              <Form.Next>{t('continue')}</Form.Next>
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
        </Form.Step>
        <Form.Step id="attachments">
          <section className="mb-5 rounded-panel border-[3px] border-ink bg-surface px-7 py-6 shadow-[6px_6px_0] shadow-ink max-sm:px-4.5">
            <Title icon={DNAIcon}>{t('attachmentsTitle')}</Title>
            <p className="mt-2 font-body text-base/[1.95] font-medium text-soft">
              {t('attachmentsIntro')}
            </p>
            <div className="mt-5">
              {exchangeComplaintFiles.map(([name, detail], index) => (
                <FileRow
                  key={name}
                  icon={[BalanceIcon, WaveIcon, LanternIcon, StarTwoIcon, StarIcon][index]}
                  name={name}
                  detail={detail}
                  badge={t('locked')}
                />
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <Form.Next>{t('continue')}</Form.Next>
              <Form.Back>{t('backStep')}</Form.Back>
            </div>
          </section>
        </Form.Step>
        <Form.Step id="story">
          <section className="mb-5 rounded-panel border-[3px] border-ink bg-surface px-7 py-6 shadow-[6px_6px_0] shadow-ink max-sm:px-4.5">
            <Title icon={LanternIcon}>{t('storyTitle')}</Title>
            <Form.Control
              name="title"
              label={t('complaintTitle')}
              labelFor="title"
              className="mt-5"
            >
              {(field, state) => (
                <input
                  id="title"
                  className="w-full rounded-field border-[2.5px] border-ink bg-paper px-4.5 py-3.5 font-body text-[17px] font-semibold"
                  {...field}
                  aria-invalid={state.invalid}
                />
              )}
            </Form.Control>
            <Form.Control name="details" label={t('details')} labelFor="details">
              {(field, state) => (
                <>
                  <Textarea
                    id="details"
                    className="min-h-37.5"
                    placeholder={t('detailsHint')}
                    {...field}
                    aria-invalid={state.invalid}
                  />
                  <p className="mt-1.75 font-body text-[13.5px]/[1.7] font-semibold text-soft">
                    {t('detailsHelp')}
                  </p>
                </>
              )}
            </Form.Control>
            <Form.Control name="request" label={t('request')} labelFor="request">
              {(field, state) => (
                <Textarea
                  id="request"
                  className="min-h-25"
                  placeholder={t('requestHint')}
                  {...field}
                  aria-invalid={state.invalid}
                />
              )}
            </Form.Control>
            <div className="mb-4.5">
              <label htmlFor="files" className="mb-2.5 block font-body text-sm font-bold">
                {t('evidence')} <span className="font-semibold text-soft">({t('optional')})</span>
              </label>
              <label className="block cursor-pointer rounded-card border-[3px] border-dashed border-ink bg-paper px-6 py-6 text-center font-body font-bold text-soft hover:bg-gold">
                <input
                  id="files"
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={(event) => {
                    addFiles(event.target.files)
                    event.target.value = ''
                  }}
                />
                <span>{t('upload')}</span>
                <span className="mt-1 block text-sm">{t('uploadHint')}</span>
              </label>
              {files.length > 0 && (
                <p className="mt-2 font-body text-sm font-bold">
                  {files.map((file) => file.name).join(' · ')}
                </p>
              )}
            </div>
            <p className="flex gap-3 rounded-card border-[2.5px] border-dashed border-red bg-tint p-4 font-body text-sm/[1.85] font-semibold">
              <Image src={KeyIcon} alt="" className="size-7 shrink-0" />
              {t.rich('deadline', { strong: (chunks) => <strong>{chunks}</strong> })}
            </p>
            <div className="mt-5 flex gap-3">
              <Button type="submit">{t('submit')}</Button>
              <Form.Back>{t('backStep')}</Form.Back>
            </div>
          </section>
          <section className="mb-5 rounded-panel border-[3px] border-ink bg-surface px-7 py-6 shadow-[6px_6px_0] shadow-ink max-sm:px-4.5">
            <Title icon={GateIcon}>{t('nextTitle')}</Title>
            <ol className="mt-5">
              {(t.raw('nextSteps') as [string, string][]).map(([title, description], index) => (
                <li
                  key={title}
                  className="relative flex gap-4 pb-5 last:pb-0 before:absolute before:top-8 before:bottom-0 before:start-4 before:w-0.75 before:bg-ink/20 last:before:hidden"
                >
                  <span className="z-10 grid size-8 place-items-center rounded-full bg-ink font-display text-surface">
                    {formatNumber(index + 1, { locale })}
                  </span>
                  <div>
                    <h3 className="font-display text-[19px]/[1.35]">{title}</h3>
                    <p className="mt-1 font-body text-[14.5px]/[1.85] font-semibold text-soft">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </Form.Step>
      </Form>
    </div>
  )
}

function Title({ icon, children }: { icon: typeof KeyIcon; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 font-display text-[26px]/[1.25]">
      <Image src={icon} alt="" className="size-8.5" />
      {children}
    </h2>
  )
}
function FileRow({
  icon,
  name,
  detail,
  badge,
}: {
  icon: typeof KeyIcon
  name: string
  detail: string
  badge: string
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-3 rounded-card border-[2.5px] border-ink bg-paper px-4 py-3">
      <Image src={icon} alt="" className="size-6.5" />
      <b className="flex-1 font-body text-[15px]">{name}</b>
      <span className="font-body text-[13px] font-semibold text-soft">{detail}</span>
      <Badge color="surface" size="sm" effect="flat">
        {badge}
      </Badge>
    </div>
  )
}
