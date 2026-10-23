'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Link, useRouter } from '@/i18n/navigation'
import TargetIcon from '@/icons/target.svg'
import { formatNumber } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { FahsHeader, FahsNav, FahsNote } from '../components'
import { invitationTerms, mediationPartyProfiles, useInvitations, type Invite } from './data'

export default function InvitationsPage() {
  const t = useTranslations('fahsMahs')
  const global = useTranslations('global')
  const locale = useLocale()
  const router = useRouter()
  const { remaining, respond } = useInvitations()
  const [confirm, setConfirm] = useState(false)

  const accept = (kind: Invite) => {
    respond(kind)
    router.push(kind === 'mediation' ? '/fahs-mahs/my-mediations' : '/fahs-mahs/my-arbitrations')
  }

  return (
    <div className="mx-auto max-w-245">
      <FahsHeader back title={t('nav.invitations')} subtitle={t('invitations.subtitle')} />
      <FahsNav />

      <div className="mb-6 flex items-start gap-[13px] rounded-panel border-[3px] border-ink bg-blue px-[22px] py-[19px] text-surface shadow-[6px_6px_0] shadow-ink">
        <Image src={TargetIcon} alt="" className="h-[34px] w-8 shrink-0" />
        <p className="font-body text-[15px]/[1.9] font-semibold">
          {t.rich('invitations.privacy', {
            strong: (chunks) => (
              <strong className="font-display text-[17.5px] font-normal">{chunks}</strong>
            ),
          })}
        </p>
      </div>

      {remaining.length === 0 && (
        <p className="rounded-panel border-[3px] border-dashed border-ink bg-paper px-[26px] py-10 text-center font-body text-[16.5px]/[1.95] font-semibold text-soft">
          {t('invitations.empty')}
        </p>
      )}

      {remaining.map((kind) => {
        const mediation = kind === 'mediation'
        const expectations = t.raw(
          `invitations.${mediation ? 'mediationExpectations' : 'arbitrationExpectations'}`,
        ) as string[]

        return (
          <article
            key={kind}
            className="mb-5 rounded-panel border-[3px] border-ink bg-surface px-[26px] py-6 shadow-[6px_6px_0] shadow-ink max-sm:px-[18px]"
          >
            <div className="flex flex-wrap items-start gap-3">
              <h2 className="min-w-45 flex-1 font-display text-[24px]/[1.3]">
                {t(`invitations.${kind}`)}
              </h2>
              <span
                className={`whitespace-nowrap rounded-full border-[2.5px] border-ink px-[14px] py-1 font-body text-[12.5px] font-extrabold ${mediation ? 'bg-gold' : 'bg-blue text-surface'}`}
              >
                {t(mediation ? 'invitations.mediationKind' : 'invitations.arbitrationKind')}
              </span>
            </div>

            <div className="mt-[10px] flex flex-wrap items-center gap-[10px] font-body text-sm font-semibold text-soft">
              <span>
                {t(mediation ? 'invitations.receivedTwoDays' : 'invitations.receivedToday')}
              </span>
              <span aria-hidden="true" className="h-[22px] w-[3px] shrink-0 rounded-sm bg-ink/20" />
              <span
                className={`inline-flex items-center rounded-full border-[2.5px] border-ink px-[14px] py-1 font-body text-[13px] font-extrabold ${mediation ? 'bg-red text-surface' : 'bg-surface text-ink'}`}
              >
                {t(mediation ? 'invitations.oneDay' : 'invitations.twoDays')}
              </span>
            </div>

            <div className="mt-[17px] rounded-card border-[2.5px] border-ink bg-paper px-[18px] py-4">
              <h3 className="mb-[10px] font-body text-[13px] font-extrabold text-soft">
                {t('invitations.expectations')}
              </h3>
              <ul className="space-y-[9px]">
                {expectations.map((text) => (
                  <li
                    key={text}
                    className="flex items-start gap-[11px] font-body text-[14.5px]/[1.75] font-semibold"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-[9px] shrink-0 rounded-full bg-ink"
                    />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-[15px] grid gap-3 min-[621px]:grid-cols-2">
              {([1, 2] as const).map((number) => (
                // Visible mediation identities link to their profiles; arbitration identities stay inert.
                <div
                  key={number}
                  className={`flex min-w-0 items-center gap-[11px] rounded-card border-[2.5px] border-ink bg-paper px-[15px] py-3 ${mediation ? '' : 'border-dashed opacity-80'}`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-[34px] shrink-0 place-items-center rounded-full border-[2.5px] border-ink font-display text-[15px]/[1] ${mediation ? 'bg-paper text-ink' : 'bg-ink text-surface'}`}
                  >
                    {mediation
                      ? t(`invitations.${mediationPartyProfiles[number - 1].initialKey}`)
                      : '؟'}
                  </span>
                  <div className="min-w-0">
                    {mediation ? (
                      <Link
                        href={mediationPartyProfiles[number - 1].href}
                        className="inline-block border-b-[2.5px] border-red pb-px font-body text-[14.5px]/[1.4] font-extrabold text-ink hover:text-red"
                      >
                        {t(`invitations.${mediationPartyProfiles[number - 1].nameKey}`)}
                      </Link>
                    ) : (
                      <b className="block font-body text-[14.5px]/[1.4] font-extrabold">
                        {t(number === 1 ? 'invitations.hiddenOne' : 'invitations.hiddenTwo')}
                      </b>
                    )}
                    <span className="block font-body text-[12.5px] font-semibold text-soft">
                      {mediation
                        ? t(`invitations.${mediationPartyProfiles[number - 1].roleKey}`)
                        : t('invitations.hidden')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-[7px] font-body text-[13.5px]/[1.7] font-semibold text-soft">
              {t(mediation ? 'invitations.conflict' : 'invitations.withdraw')}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => (mediation ? accept(kind) : setConfirm(true))}
                className="rounded-full border-[2.5px] border-ink bg-red px-[26px] py-[11px] font-body text-base font-extrabold text-surface shadow-[4px_4px_0] shadow-ink transition-[transform,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue"
              >
                {t('invitations.accept')}
              </button>
              <button
                type="button"
                onClick={() => respond(kind)}
                className="rounded-full border-[2.5px] border-ink bg-surface px-[22px] py-[10px] font-body text-[15px] font-bold text-ink hover:bg-gold focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue"
              >
                {t('invitations.reject')}
              </button>
              <span className="inline-flex items-baseline gap-2 rounded-full border-[2.5px] border-ink bg-gold px-[17px] py-1.5 font-body text-[13.5px] font-extrabold">
                {t(mediation ? 'invitations.rewardMediation' : 'invitations.rewardArbitration')}
                <b className="font-display text-[19px] font-normal">
                  +{formatNumber(invitationTerms.reward, { locale })}
                </b>
                {global('currency')}
              </span>
            </div>
          </article>
        )
      })}

      <FahsNote>
        <span className="text-soft [&_strong]:text-ink">
          {t.rich('invitations.automatic', {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </span>
      </FahsNote>

      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent
          showCloseButton={false}
          className="px-[30px] pb-[26px] pt-[30px] sm:w-[min(560px,94vw)]"
        >
          <DialogClose
            aria-label={t('invitations.close')}
            className="absolute top-[15px] end-[15px] grid size-[42px] place-items-center rounded-full border-[2.5px] border-ink bg-red font-body text-[19px] font-extrabold text-surface shadow-[3px_3px_0] shadow-ink"
          >
            ×
          </DialogClose>
          <DialogTitle className="pe-12 text-[27px]/[1.25]">
            {t('invitations.confirmTitle')}
          </DialogTitle>
          <DialogDescription className="mb-0 mt-[13px] text-base/[1.95]">
            {t('invitations.confirmText')}
          </DialogDescription>
          <div className="mt-5 flex flex-wrap items-baseline gap-[11px] rounded-card bg-ink px-[19px] py-4 text-surface">
            <span className="min-w-32 flex-1 font-body text-[14.5px] font-bold">
              {t('invitations.confirmDepositLabel')}
            </span>
            <b className="font-display text-[30px] font-normal text-gold">
              {formatNumber(invitationTerms.arbitrationSecurity, { locale })}
              <small className="ms-[5px] font-body text-[15px] text-surface">
                {global('currency')}
              </small>
            </b>
          </div>
          <div className="mt-[18px]">
            <FahsNote warning>
              {t.rich('invitations.confirmFine', {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </FahsNote>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setConfirm(false)
                accept('arbitration')
              }}
              className="rounded-full border-[2.5px] border-ink bg-red px-[26px] py-[11px] font-body text-base font-extrabold text-surface shadow-[4px_4px_0] shadow-ink hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0]"
            >
              {t('invitations.confirm')}
            </button>
            <DialogClose className="rounded-full border-[2.5px] border-ink bg-surface px-[22px] py-[10px] font-body text-[15px] font-bold hover:bg-gold">
              {t('invitations.cancel')}
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
