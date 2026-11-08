'use client'

import { InvitationIssueForm } from '@/components/InvitationIssueForm'
import { RoleRouteGuard } from '@/components/RoleRouteGuard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from '@/components/ui/toast'
import { useUser } from '@/contexts/UserContext'
import CirclesIcon from '@/icons/circles.svg'
import TargetIcon from '@/icons/target.svg'
import { Link } from '@/i18n/navigation'
import { formatNumber } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { pendingInvitations as initialInvitations } from './data'

const officeLinks = [
  { key: 'balances', href: '/maktab/balances' },
  { key: 'favorites', href: '/maktab/favourites' },
  { key: 'team' },
  { key: 'notifications', href: '/notifications' },
  { key: 'messages', href: '/maktab/messages' },
] as const

const teamLinks = [
  { key: 'members', href: '/maktab/team', count: 5 },
  { key: 'invite' },
  { key: 'admins', href: '/maktab/admins', count: 2 },
  { key: 'assignments', href: '/maktab/assignments', count: 4 },
] as const

const officeTabClass =
  'inline-flex rounded-full border-[2.5px] border-ink bg-surface px-[22px] py-[11px] font-display text-[19px]/[1] text-ink shadow-[4px_4px_0] shadow-ink transition-[transform,box-shadow,background-color] hover:translate-x-px hover:translate-y-px hover:bg-gold hover:shadow-[2px_2px_0]'
const teamTabClass =
  'relative inline-flex rounded-full border-[2.5px] border-ink bg-surface px-[18px] py-2 font-body text-[15px] font-bold text-ink hover:bg-gold'

function TeamInviteContent() {
  const t = useTranslations('teamInvite')
  const locale = useLocale()
  const { user } = useUser()
  const [invitations, setInvitations] = useState(initialInvitations)
  const organization = user?.org?.legalName ?? ''
  const backHref = user?.org ? `/organization/${user.org.organizationId}` : '/maktab'
  const localize = (value: { ar: string; en: string }) =>
    locale.startsWith('ar') ? value.ar : value.en
  const steps = t.raw('steps') as Array<{ title: string; description: string }>

  return (
    <div className="-mx-1.5 -mt-1 -mb-1.5">
      <header className="mb-2 flex flex-wrap items-end gap-5">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1] text-ink max-[520px]:text-[40px]">
          {t('title')}
        </h1>
        <p className="pb-2.5 font-body text-[17px] font-medium text-soft">
          {t('description', { organization, count: 5 })}
        </p>
      </header>

      <nav aria-label={t('officeNavLabel')} className="my-5 mb-[22px] flex flex-wrap gap-2.5">
        {officeLinks.map((item) =>
          item.key === 'team' ? (
            <span
              key={item.key}
              aria-current="page"
              className={cn(officeTabClass, 'bg-red text-surface')}
            >
              {t(`officeNav.${item.key}`)}
            </span>
          ) : (
            <Link key={item.key} href={item.href} className={officeTabClass}>
              {t(`officeNav.${item.key}`)}
            </Link>
          ),
        )}
      </nav>

      <nav aria-label={t('teamNavLabel')} className="mb-[26px] flex flex-wrap gap-[9px]">
        {teamLinks.map((item) =>
          item.key === 'invite' ? (
            <span
              key={item.key}
              aria-current="page"
              className={cn(teamTabClass, 'bg-ink text-surface')}
            >
              {t(`teamNav.${item.key}`)}
            </span>
          ) : (
            <Link key={item.key} href={item.href} className={teamTabClass}>
              {t(`teamNav.${item.key}`)}
              <span className="absolute -top-3 -end-1 grid size-[23px] place-items-center rounded-full border-2 border-ink bg-red font-display text-[13px]/[1] text-surface">
                {formatNumber(item.count, { locale })}
              </span>
            </Link>
          ),
        )}
      </nav>

      <div className="grid items-start gap-[22px] min-[1001px]:grid-cols-[1.15fr_1fr]">
        <InvitationIssueForm
          kind="member"
          organization={organization}
          backHref={backHref}
          matchTeamDesign
        />

        <div>
          <Card className="mb-6 p-[28px_30px] shadow-[6px_6px_0]">
            <h2 className="flex items-center gap-[13px] font-display text-[29px]/[1.2]">
              <Image src={CirclesIcon} alt="" className="size-[38px] shrink-0" />
              {t('nextTitle')}
            </h2>
            <ol className="mt-5">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="relative mb-4 min-h-8 ps-[46px] font-body text-[16px]/[1.95] font-medium text-soft"
                >
                  <span className="absolute start-0 top-0 grid size-8 place-items-center rounded-full border-[2.5px] border-ink bg-red font-display text-[17px]/[1] text-surface shadow-[2px_2px_0] shadow-ink">
                    {formatNumber(index + 1, { locale })}
                  </span>
                  <strong className="block font-display text-[20px]/[1.3] font-normal text-ink">
                    {step.title}
                  </strong>
                  {step.description}
                </li>
              ))}
            </ol>
          </Card>

          <Card className="mb-6 p-[28px_30px] shadow-[6px_6px_0]">
            <h2 className="flex items-center gap-[13px] font-display text-[29px]/[1.2]">
              <Image src={TargetIcon} alt="" className="size-[38px] shrink-0" />
              {t('pendingTitle')}
            </h2>
            <p className="mt-2 font-body text-[16.5px]/[1.95] font-medium text-soft">
              {t('pendingDescription')}
            </p>
            <div className="mt-3.5">
              {invitations.map((invitation) => (
                <article
                  key={invitation.id}
                  className="flex flex-wrap items-center gap-3.5 border-b-[2.5px] border-dashed border-ink/25 py-[15px] last:border-0"
                >
                  <span className="flex min-w-[190px] flex-1 flex-wrap items-center gap-2.5">
                    <strong className="font-display text-[20px]/[1.2] font-normal">
                      {localize(invitation.name)}
                    </strong>
                    <span className="font-body font-bold text-soft">·</span>
                    <span
                      className="font-body text-[14.5px]/[1.2] font-semibold text-soft"
                      dir="ltr"
                    >
                      {invitation.email}
                    </span>
                  </span>
                  <span
                    dir="rtl"
                    className={cn(
                      'flex items-center gap-3.5',
                      invitation.daysLeft <= 0 && 'max-[520px]:flex-row-reverse',
                    )}
                  >
                    <span
                      className={cn(
                        'shrink-0 rounded-full border-[2.5px] border-ink px-3.5 py-1 font-body text-[13.5px] font-extrabold',
                        invitation.daysLeft > 0
                          ? 'border-dashed bg-surface text-soft'
                          : 'bg-red text-surface',
                      )}
                    >
                      {invitation.daysLeft > 0
                        ? t('daysLeft', { count: invitation.daysLeft })
                        : t('expired')}
                    </span>
                    <Button
                      type="button"
                      size="sm"
                      effect="flat"
                      variant={invitation.daysLeft > 0 ? 'destructive' : 'outline'}
                      className="h-auto px-[18px] py-[9px] text-[14.5px]/[18px]"
                      onClick={() => {
                        if (invitation.daysLeft > 0) {
                          setInvitations((items) => items.filter(({ id }) => id !== invitation.id))
                        }
                        toast.add({ title: t('mockFeedback') })
                      }}
                    >
                      {t(invitation.daysLeft > 0 ? 'withdraw' : 'resend')}
                    </Button>
                  </span>
                </article>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function TeamInvitePage() {
  return (
    <RoleRouteGuard roles={['org_admin']}>
      <TeamInviteContent />
    </RoleRouteGuard>
  )
}
