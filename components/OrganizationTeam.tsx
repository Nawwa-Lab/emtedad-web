import { teamRatings } from '@/app/[lang]/(dashboard)/organization/[id]/data'
import { StatusBadge, getVariantFromLabel } from '@/components/StatusBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Carousel } from '@/components/ui/carousel'
import { Link } from '@/i18n/navigation'
import { formatNumber } from '@/lib/utils/formatter'
import type { OrganizationPublicProfile } from '@/services/organizations'
import { getLocale, getTranslations } from 'next-intl/server'

export async function OrganizationTeam({ members }: Pick<OrganizationPublicProfile, 'members'>) {
  const locale = await getLocale()
  const t = await getTranslations('organizationProfile')

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
        {members.map((member) => {
          const rating = member.name ? teamRatings[member.name] : undefined
          return (
            <Link
              key={member.accountId}
              href={`/member/${member.accountId}`}
              className="rounded-card border-[2.5px] border-ink bg-surface p-5 text-center shadow-[4px_4px_0_#1A1714] transition hover:-translate-y-1"
            >
              <Avatar color="gold" effect="3d" className="mx-auto size-18">
                <AvatarImage src={member.profilePhotoUrl ?? ''} alt={member.name ?? ''} />
                <AvatarFallback className="font-display text-3xl">
                  {member.name?.charAt(0) || '—'}
                </AvatarFallback>
              </Avatar>
              <strong className="mt-3 block font-display text-xl">{member.name || '—'}</strong>
              <p className="my-1 font-body text-sm font-semibold text-soft">
                {t(`roles.${member.role}`)}
              </p>
              {rating && <StatusBadge variant={getVariantFromLabel(rating)} label={rating} />}
            </Link>
          )
        })}
      </Carousel>
    </section>
  )
}
