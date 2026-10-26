'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import StarIcon from '@/icons/star.svg'
import { Link } from '@/i18n/navigation'
import { formatNumber } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { use, useState } from 'react'
import { findAlaeshRequest } from '../../data'

export default function AlaeshRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const request = findAlaeshRequest(id)
  const t = useTranslations('alaesh')
  const global = useTranslations('global')
  const locale = useLocale()
  const [saved, setSaved] = useState(false)

  if (!request) notFound()

  const n = (value: number) => formatNumber(value, { locale })
  const provider = global(
    request.providerKind === 'organization'
      ? `organizations.${request.provider}`
      : `members.${request.provider}`,
  )
  const profileHref =
    request.providerKind === 'organization'
      ? `/organization/${request.provider}`
      : `/member/${request.provider}`
  const requirements = t.raw('detail.requirements') as string[]
  const supplied = t.raw('detail.supplied') as string[]

  return (
    <div className="grid items-start gap-6 min-[981px]:grid-cols-[1.6fr_1fr]">
      <section className="rounded-panel border-[3px] border-ink bg-surface px-7.5 py-7 shadow-[6px_6px_0] shadow-ink max-[520px]:px-5">
        <div className="mb-3.5 flex flex-wrap items-center gap-3">
          <span className="rounded-full border-[2.5px] border-ink bg-blue px-3.5 py-1 font-body text-[13px] font-bold text-surface">
            {t(`requests.${request.id}.category`)}
          </span>
          <span className="rounded-full border-[2.5px] border-ink bg-paper px-3.5 py-1 font-body text-[13px] font-bold">
            {t(`markets.${request.market}`)}
          </span>
          <span className="rounded-full border-[2.5px] border-ink bg-gold px-3.5 py-1 font-body text-[13px] font-extrabold">
            {t('card.replySummary', { count: n(request.replies) })}
          </span>
        </div>

        <h1 className="font-display text-[clamp(30px,4.2vw,44px)]/[1.2]">
          {t(`requests.${request.id}.title`)}
        </h1>
        <p className="mt-3 font-body text-[17.5px]/[2] font-medium text-soft">
          {t(`requests.${request.id}.detailDescription`)}
        </p>

        <div className="mt-6 grid gap-3.5 min-[621px]:grid-cols-3">
          <Fact label={t('detail.value')} highlighted>
            {n(request.value)} {global('currency')}
          </Fact>
          <Fact label={t('detail.timeframe')}>{t(`requests.${request.id}.timeframeShort`)}</Fact>
          <Fact label={t('detail.market')}>{t(`markets.${request.market}Short`)}</Fact>
        </div>

        <DetailList title={t('detail.requested')} items={requirements} />
        <DetailList title={t('detail.suppliedTitle')} items={supplied} />
      </section>

      <aside>
        <section className="mb-5.5 rounded-panel border-[3px] border-ink bg-red px-6.5 py-6 text-center text-surface shadow-[6px_6px_0] shadow-ink">
          <span className="block font-body text-[15px] font-bold text-surface/90">
            {t('detail.value')}
          </span>
          <strong className="mt-1 block font-display text-[56px]/[1.05] font-normal">
            {n(request.value)}
            <small className="ms-1.5 text-xl text-gold">{global('currency')}</small>
          </strong>
          <span className="mt-1.5 block font-body text-[12.5px] font-semibold text-surface/85">
            {t('card.taxLong', { percent: n(request.taxPercent) })}
          </span>
        </section>

        <section className="rounded-panel border-[3px] border-ink bg-surface px-6.5 py-6 shadow-[6px_6px_0] shadow-ink">
          <div className="mb-4 flex flex-wrap items-center gap-3.5">
            <span className="grid size-15 place-items-center rounded-field border-[2.5px] border-ink bg-gold font-display text-[26px] shadow-[3px_3px_0] shadow-ink">
              {provider.charAt(0)}
            </span>
            <span>
              <strong className="block font-display text-2xl/[1.2] font-normal">
                <Link href={profileHref} className="hover:text-red">
                  {provider}
                </Link>
              </strong>
              <Link
                href={profileHref}
                className="font-body text-sm font-bold text-blue hover:text-red"
              >
                {t('detail.openProfile')}
              </Link>
            </span>
          </div>

          <div className="flex items-center gap-3 border-t-[2.5px] border-dashed border-ink/25 py-3.5">
            <span className="min-w-0 flex-1">
              <strong className="block font-display text-[19px]/[1.25] font-normal">
                {t('detail.satisfaction')}
              </strong>
              <span className="font-body text-sm font-semibold text-soft">
                {t('detail.ratedBy', { count: n(48) })}
              </span>
            </span>
            {request.badge && (
              <span className="inline-flex items-center gap-1 rounded-full border-[2.5px] border-ink bg-gold px-2.5 py-1 font-body text-xs font-extrabold">
                <Image src={StarIcon} alt="" className="size-4" />
                {global(`badges.${request.badge}`)}
              </span>
            )}
          </div>

          <div className="border-t-[2.5px] border-dashed border-ink/25 py-3.5">
            <strong className="block font-display text-[19px]/[1.25] font-normal">
              {t('detail.replies')}
            </strong>
            <span className="font-body text-sm font-semibold text-soft">
              {t('detail.replyStatus', { count: n(request.replies) })}
            </span>
          </div>

          <div className="mt-1 flex flex-wrap gap-3">
            <Button
              className="min-w-38 flex-1"
              onClick={() => toast.add({ title: t('feedback.replySaved') })}
            >
              {t('actions.iHaveFull')}
            </Button>
            <Button
              variant="outline"
              effect="flat"
              className="min-w-30 flex-1"
              aria-pressed={saved}
              onClick={() => setSaved((value) => !value)}
            >
              {t(saved ? 'actions.saved' : 'actions.save')}
            </Button>
          </div>

          <div className="mt-4.5 rounded-card border-[2.5px] border-dashed border-ink bg-paper px-5 py-4">
            <strong className="block font-display text-lg font-normal">
              {t('detail.howTitle')}
            </strong>
            <ol className="mt-2 space-y-1.5">
              {[1, 2, 3].map((step) => (
                <li
                  key={step}
                  className="relative ps-6.5 font-body text-[14.5px]/[1.9] font-medium text-soft"
                >
                  <span className="absolute top-1.5 start-0 grid size-5 place-items-center rounded-full border-2 border-ink bg-red font-display text-xs text-surface">
                    {n(step)}
                  </span>
                  {t(`detail.howSteps.${step}`)}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </aside>
    </div>
  )
}

function Fact({
  label,
  highlighted = false,
  children,
}: {
  label: string
  highlighted?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={`rounded-card border-[2.5px] border-ink p-4 ${highlighted ? 'bg-gold' : 'bg-paper'}`}
    >
      <span className="block font-body text-[13px] font-bold text-soft">{label}</span>
      <strong className="mt-1 block font-display text-[22px]/[1.3] font-normal">{children}</strong>
    </div>
  )
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-6.5">
      <h2 className="font-display text-2xl text-red">{title}</h2>
      <ul className="mt-2">
        {items.map((item) => (
          <li
            key={item}
            className="relative mb-1.5 ps-6 font-body text-[16.5px]/[2] font-medium text-soft before:absolute before:top-3.25 before:start-0.5 before:size-2.5 before:rounded-full before:border-[2.5px] before:border-ink before:bg-gold"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
