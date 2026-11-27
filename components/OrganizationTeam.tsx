import { StatusBadge } from '@/components/StatusBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Carousel } from '@/components/ui/carousel'
import { Link } from '@/i18n/navigation'
import { formatNumber } from '@/lib/utils/formatter'
import type { OrganizationMember } from '@/services/organizations'
import { getLocale, getTranslations } from 'next-intl/server'

export async function OrganizationTeam({ members }: { members: OrganizationMember[] }) {
  const locale = await getLocale()
  const t = await getTranslations('organizationProfile')
  const global = await getTranslations('global')

  if (!members.length) return null

  return (
    <section className="mt-9">
      <div className="mb-4 flex items-baseline gap-4">
        <h2 className="border-b-4 border-red pb-1 font-display text-[clamp(1.75rem,3.4vw,2.375rem)] leading-none">
          {t('team')}
        </h2>
        <span className="font-body text-sm font-bold text-soft">
          {t('membersCount', { count: formatNumber(members.length, { locale }) })}
        </span>
      </div>
      <Carousel
        ariaLabel={t('team')}
        previousLabel={t('previous')}
        nextLabel={t('next')}
        itemClassName="w-[min(62vw,250px)]"
        scrollAmount={270}
      >
        {members.map((member) => (
          <Link
            key={member.accountId}
            href={`/member/${member.accountId}`}
            className="rounded-card border-[2.5px] border-ink bg-surface p-5 text-center shadow-[4px_4px_0_#1A1714] transition hover:-translate-y-1"
          >
            <Avatar color="gold" effect="3d" className="mx-auto size-18">
              <AvatarImage src={member.avatarUrl ?? ''} alt={member.fullName} />
              <AvatarFallback className="font-display text-3xl">
                {member.fullName.charAt(0) || '—'}
              </AvatarFallback>
            </Avatar>
            <strong className="mt-3 block font-display text-xl">{member.fullName || '—'}</strong>
            {member.headline && (
              <p className="my-1 font-body text-sm font-semibold text-soft">{member.headline}</p>
            )}
            <StatusBadge
              badge={member.rating}
              label={global(`badges.${member.rating}`)}
              className="mx-auto"
            />
          </Link>
        ))}
      </Carousel>
    </section>
  )
}
