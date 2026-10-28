'use client'
import { useState } from 'react'
import { SubLinks } from '@/components/SubLinks'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import circles from '@/icons/circles.svg'
import Image from 'next/image'
import { formatNumber } from '@/lib/utils'
import { offers, type OfferStatus, type OfferType } from './data'
import { DataCard } from '@/components/DataCard'
import { Card } from '@/components/ui/card'

const chipBase = 'rounded-full px-5 h-10 text-[15px] font-body font-bold'
const chipSelected = '!bg-ink !text-white hover:!bg-ink'
const chipClass = (selected: boolean) => (selected ? `${chipBase} ${chipSelected}` : chipBase)

export default function NamliyaMyOffersPage() {
  const t = useTranslations('namliyaMyOffers')
  const tBrowse = useTranslations('namliyaBrowse')
  const [type, setType] = useState<OfferType>('h')
  const [status, setStatus] = useState<OfferStatus>('none')

  const filtered = offers.filter((o) => o.type === type && o.status === status)
  const count = filtered.length

  const statusLabel = (s: OfferStatus) => {
    if (s === 'none') return t('statusNone')
    if (s === 'ask') return t('statusAsk')
    if (s === 'doing') return t('statusDoing')
    return t('statusDone')
  }
  const typeLabel = (ty: OfferType) => (ty === 'h' ? t('serviceHuman') : t('materialResources'))

  const typeOptions: { key: OfferType; label: string }[] = [
    { key: 'h', label: t('serviceHuman') },
    { key: 'm', label: t('materialResources') },
  ]

  const statusOptions: { key: OfferStatus; label: string }[] = [
    { key: 'none', label: t('statusNone') },
    { key: 'ask', label: t('statusAsk') },
    { key: 'doing', label: t('statusDoing') },
    { key: 'done', label: t('statusDone') },
  ]

  const actionLabel = (key: string) => {
    const map: Record<string, string> = {
      edit: t('edit'),
      stopPublishing: t('stopPublishing'),
      delete: t('delete'),
      accept: t('accept'),
      reject: t('reject'),
      openChat: t('openChat'),
      markDone: t('markDone'),
      changeMember: t('changeMember'),
      warn: t('warn'),
      deliverAndCheck: t('deliverAndCheck'),
      rateExperience: t('rateExperience'),
      viewAgreement: t('viewAgreement'),
      viewRating: t('viewRating'),
    }
    return map[key] || key
  }

  return (
    <>
      <div className="flex items-end gap-5 mb-2">
        <h1 className="font-display text-[55px] leading-none">{tBrowse('title')}</h1>
        <p className="font-medium text-[17px] text-soft pt-2.5 font-body">{t('subtitle')}</p>
      </div>
      <SubLinks
        linkClassName="relative py-3 px-6.5 text-[21px] h-12 font-body"
        separatorAfter={0}
        links={[
          { href: '/namliya/service-offers', label: tBrowse('link1') },
          { href: '/namliya/my-offers', label: tBrowse('link2') },
          { href: '/namliya/my-asks', label: tBrowse('link3') },
          { href: '/namliya/drafts', label: tBrowse('link4') },
        ]}
      />

      <Card className="border-[3px] border-ink p-5 mb-6 mt-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-[18px] text-soft w-20">{t('typeLabel')}</span>
          {typeOptions.map((opt) => (
            <Button
              key={opt.key}
              variant={type === opt.key ? 'primary' : 'outline'}
              onClick={() => setType(opt.key)}
              className={chipClass(type === opt.key)}
              effect="flat"
            >
              {opt.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t-[2.5px] border-dashed border-ink/30">
          <span className="font-display text-[18px] text-soft w-20">{t('statusLabel')}</span>
          {statusOptions.map((opt) => (
            <Button
              key={opt.key}
              variant={status === opt.key ? 'primary' : 'outline'}
              onClick={() => setStatus(opt.key)}
              className={chipClass(status === opt.key)}
              effect="flat"
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </Card>

      <div className="flex items-center gap-3 mb-5 font-semibold text-[16px] text-soft font-body">
        <Image src={circles} alt="circles" width={30} height={30} />
        <span>
          {count > 0 ? (
            <>
              <b className="font-display text-[22px] text-ink">
                {formatNumber(count, { locale: 'ar' })}
              </b>{' '}
              {t('resultIn')} «{statusLabel(status)}» {t('resultFor')} {typeLabel(type)}
            </>
          ) : (
            <>{t('noResultsFor', { type: typeLabel(type), status: statusLabel(status) })}</>
          )}
        </span>
      </div>

      {count === 0 ? (
        <div className="bg-surface border-[3px] border-dashed border-ink rounded-panel p-10 text-center">
          <Image src={circles} alt="empty" width={70} height={70} className="mx-auto mb-4" />
          <h3 className="font-display text-[26px]">{t('noResultsTitle')}</h3>
          <p className="font-body text-[16px] text-soft mt-2">{t('noResultsDesc')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((offer) => (
            <DataCard
              key={offer.id}
              id={offer.id}
              type={offer.type}
              status={offer.status}
              category={offer.category}
              title={offer.title}
              desc={offer.desc}
              price={offer.price}
              info={offer.info}
              actions={offer.actions.map((a) => ({
                key: a.key,
                label: actionLabel(a.key),
                variant: a.variant,
              }))}
              details={offer.details}
              typeLabel={typeLabel(offer.type)}
              statusLabel={statusLabel(offer.status)}
              currencyLabel={tBrowse('currency')}
              expandAriaLabel={t('expandAria')}
              valueLabel={t('value')}
              statusTextLabel={t('status')}
              typeTextLabel={t('type')}
              institutionLabel={t('institution')}
              openChatLabel={t('openChat')}
              closeLabel={t('close')}
              whatTheyAskedLabel="اللي طلبوه"
              vatNote={t('vatNote')}
              infoLabels={{
                offeredBy: `${t('offeredBy')} `,
                responsibleMember: `${t('responsibleMember')}: `,
                requestedBy: `${t('requestedBy')} `,
                requiredDates: `${t('requiredDates')}: `,
                monthlyLimitAfterAccept: `${t('monthlyLimitAfterAccept')}: `,
                suggestedMember: `${t('suggestedMember')}: `,
                with: `${t('with')} `,
                assignedMember: `${t('assignedMember')}: `,
                delivery: `${t('delivery')} `,
                supervisor: `${t('supervisor')}: `,
                returnDate: `${t('returnDate')}: `,
                securityDeposit: `${t('securityDeposit')} `,
                closed: `${t('closed')} `,
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}
