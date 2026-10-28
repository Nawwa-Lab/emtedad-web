import { memberReviews, memberServices } from '@/app/[lang]/(dashboard)/organization/[id]/data'
import { OrganizationOfferCarousel } from '@/components/OrganizationOfferCarousel'
import { StatusBadge } from '@/components/StatusBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardDescription } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { formatNumber } from '@/lib/utils/formatter'
import { memberApi } from '@/services/members'
import { getLocale, getTranslations } from 'next-intl/server'

export default async function MemberProfilePage({ params }: PageProps<'/[lang]/member/[id]'>) {
  const { id } = await params
  const locale = await getLocale()
  const t = await getTranslations('memberProfile')
  const global = await getTranslations('global')
  const member = await memberApi.getPublicProfile(id)
  const organization = member.organization ?? member.org
  const name =
    [member.firstName ?? member.first, member.lastName ?? member.last].filter(Boolean).join(' ') ||
    t('fallbackName')
  const skills = [...(member.skills ?? []), ...(member.areasOfExpertise ?? [])]

  return (
    <div className="w-full pb-10">
      {organization && (
        <Link
          href={`/organization/${organization.organizationId}`}
          className="mb-4 inline-flex items-center gap-2 font-body text-base font-bold hover:text-red"
        >
          <span className="grid size-9 place-items-center rounded-full border-[2.5px] border-ink bg-surface shadow-[3px_3px_0_#1A1714] rtl:rotate-0 ltr:rotate-180">
            →
          </span>
          {t('back', { name: organization.legalName })}
        </Link>
      )}

      <section className="flex flex-wrap items-start gap-6 rounded-panel border-3 border-ink bg-surface px-7 py-7 shadow-[7px_7px_0_#1A1714] sm:px-8">
        <Avatar color="gold" size="xl" effect="3d" className="size-33">
          <AvatarImage src={member.profilePhotoUrl ?? ''} alt={name} />
          <AvatarFallback className="font-display text-6xl">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-62 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-[clamp(2.25rem,4.6vw,3.125rem)] leading-none">
              {name}
            </h1>
            <StatusBadge label={global('badges.amer')} />
            {organization && (
              <Link
                href={`/organization/${organization.organizationId}`}
                className="inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-paper py-1.5 ps-2 pe-4 font-body text-sm font-bold hover:bg-gold"
              >
                <Avatar color="paper" size="sm" effect="flat">
                  <AvatarImage src={organization.logoUrl ?? ''} alt={organization.legalName} />
                  <AvatarFallback>{organization.legalName.charAt(0)}</AvatarFallback>
                </Avatar>
                {organization.legalName}
              </Link>
            )}
          </div>
          <p className="mt-4 max-w-162 font-body text-[17px] font-medium leading-8 text-soft">
            {member.bio || t('fallbackBio')}
          </p>
          {skills.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border-[2.5px] border-ink bg-paper px-4 py-2 font-body text-sm font-bold"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <OrganizationOfferCarousel
        title={t('servicesTitle')}
        countLabel={t('servicesCount')}
        href={organization ? `/organization/${organization.organizationId}/human-services` : '#'}
        listings={memberServices}
        showActions={false}
      />

      <section className="mt-8">
        <div className="mb-4 flex items-baseline gap-3">
          <h2 className="font-display text-3xl">{t('reviews')}</h2>
          <span className="font-body text-sm font-semibold text-soft">
            {t('reviewsCount', {
              shown: formatNumber(memberReviews.length, { locale }),
              total: formatNumber(19, { locale }),
            })}
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {memberReviews.map((review) => (
            <Card key={`${review.name}-${review.context}`} className="p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Avatar className="size-11 bg-gold">
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <strong className="min-w-30 flex-1 font-display text-xl">{review.name}</strong>
                <StatusBadge label={review.rating} shape="pill" />
                <p className="w-full font-body text-[13.5px] font-semibold text-soft">
                  {review.context}
                </p>
              </div>
              <CardDescription className="mb-0 mt-3 text-[16.5px] leading-8 text-ink">
                {review.text}
              </CardDescription>
              <p className="mt-3 border-t-[2.5px] border-dashed border-ink/30 pt-3 font-body text-sm font-semibold text-soft">
                {review.source}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
