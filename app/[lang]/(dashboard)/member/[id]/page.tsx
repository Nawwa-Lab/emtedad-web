import type { OrganizationListing } from '@/app/[lang]/(dashboard)/organization/[id]/data'
import { MemberSatisfactionDialog } from '@/components/MemberSatisfactionDialog'
import { OrganizationOfferCarousel } from '@/components/OrganizationOfferCarousel'
import { StatusBadge } from '@/components/StatusBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardDescription } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { badgeKey, badgeSealClass } from '@/lib/utils/badge'
import { formatNumber } from '@/lib/utils/formatter'
import { memberApi } from '@/services/members'
import type { Offer } from '@/services/members/types'
import { getLocale, getTranslations } from 'next-intl/server'

/** Convert an API Offer to the OrganizationListing shape consumed by OrganizationOfferCarousel. */
function offerToListing(offer: Offer): OrganizationListing {
  return {
    title: offer.title,
    category: offer.tags[0]?.name ?? '',
    description: offer.description,
    owner: offer.organization?.name ?? '',
    ownerAvatarUrl: offer.organization?.logoUrl ?? undefined,
    market: offer.market === 'namlya' ? 'namliya' : (offer.market as OrganizationListing['market']),
    price: offer.shahamhamValue,
    kind: offer.kind === 'human_service' ? 'service' : 'resource',
  }
}

export default async function MemberProfilePage({ params }: PageProps<'/[lang]/member/[id]'>) {
  const { id } = await params
  const locale = await getLocale()
  const t = await getTranslations('memberProfile')
  const global = await getTranslations('global')

  const response = await memberApi.getPublicProfile(id)
  const { member, reviews, offers, satisfaction } = response.data

  const organization = member.organization
  const name = member.name || t('fallbackName')
  const skills = [...(member.skills ?? []), ...(member.areasOfExpertise ?? [])]

  const offerListings: OrganizationListing[] = (offers?.items ?? []).map(offerToListing)
  const reviewItems = reviews?.items ?? []
  const reviewsTotal = reviews?.total ?? 0

  const formatReviewDate = (value: string) =>
    new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
      day: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    }).format(new Date(value))

  return (
    <div className="w-full pb-10">
      {organization && (
        <Link
          href={`/organization/${organization.organizationId}`}
          className="mb-4 inline-flex items-center gap-2.5 font-body text-[15.5px] font-bold hover:text-red"
        >
          <span className="grid size-11.5 place-items-center rounded-full border-[2.5px] border-ink bg-surface shadow-[3px_3px_0_#1A1714] rtl:rotate-0 ltr:rotate-180">
            →
          </span>
          {t('back', { name: organization.legalName })}
        </Link>
      )}

      <section className="flex flex-wrap items-start gap-[26px] rounded-panel border-3 border-ink bg-surface px-[30px] py-7 shadow-[7px_7px_0_#1A1714]">
        <Avatar
          color="gold"
          size="xl"
          effect="3d"
          className="size-33 border-3 shadow-[5px_5px_0_#1A1714]"
        >
          <AvatarImage src={member.profilePhotoUrl ?? ''} alt={name} />
          <AvatarFallback className="font-display text-6xl">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-62 flex-1">
          <div className="flex flex-wrap items-center gap-3.5">
            <h1 className="font-display text-[clamp(2.25rem,4.6vw,3.125rem)] leading-[1.12]">
              {name}
            </h1>
            {satisfaction && <MemberSatisfactionDialog satisfaction={satisfaction} />}
            {organization && (
              <Link
                href={`/organization/${organization.organizationId}`}
                className="inline-flex items-center gap-2.5 rounded-full border-[2.5px] border-ink bg-paper py-[7px] ps-2 pe-4 font-body text-[15px] font-bold hover:bg-gold"
              >
                <Avatar color="paper" size="sm" effect="flat">
                  <AvatarImage src={organization.logoUrl ?? ''} alt={organization.legalName} />
                  <AvatarFallback>{organization.legalName.charAt(0)}</AvatarFallback>
                </Avatar>
                {organization.legalName}
              </Link>
            )}
          </div>
          {member.headline && (
            <p className="mt-2 font-body text-sm font-semibold text-soft">{member.headline}</p>
          )}
          <p className="mt-3.5 max-w-[650px] font-body text-[17px] font-medium leading-[2] text-soft">
            {member.bio || t('fallbackBio')}
          </p>
          {skills.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2.25">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border-[2.5px] border-ink bg-paper px-[17px] py-2 font-body text-[14.5px] font-bold"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {offerListings.length > 0 ? (
        <OrganizationOfferCarousel
          title={t('servicesTitle')}
          countLabel={t('servicesCount', { count: formatNumber(offerListings.length, { locale }) })}
          href={organization ? `/organization/${organization.organizationId}/human-services` : '#'}
          listings={offerListings}
          showActions={false}
          showExpand={false}
          inlineVat
          itemClassName="w-[clamp(290px,31%,370px)] max-[560px]:w-[86%]"
        />
      ) : (
        <section className="mt-9">
          <h2 className="mb-2 border-b-4 border-red pb-1 font-display text-[clamp(1.75rem,3.4vw,2.375rem)] leading-none">
            {t('servicesTitle')}
          </h2>
          <p className="font-body text-sm font-semibold text-soft">{t('noServices')}</p>
        </section>
      )}

      <section id="reviews" className="mt-8">
        <div className="mb-4 flex items-baseline gap-3.5">
          <h2 className="font-display text-3xl">{t('reviews')}</h2>
          <span className="font-body text-[15px] font-semibold text-soft">
            {t('reviewsCount', {
              shown: formatNumber(reviewItems.length, { locale }),
              total: formatNumber(reviewsTotal, { locale }),
            })}
          </span>
        </div>
        {reviewItems.length === 0 ? (
          <p className="font-body text-sm font-semibold text-soft">{t('noReviews')}</p>
        ) : (
          <div className="grid gap-4.5 min-[901px]:grid-cols-2">
            {reviewItems.map((review) => (
              <Card key={review.reviewId} effect="flat" className="p-6 shadow-[5px_5px_0_#1A1714]">
                <div className="flex flex-wrap items-center gap-3">
                  <Avatar className="size-11 bg-gold">
                    <AvatarImage
                      src={review.profilePhotoUrl ?? review.logoUrl ?? ''}
                      alt={review.evaluatorName}
                    />
                    <AvatarFallback>{review.evaluatorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <strong className="min-w-30 flex-1 font-display text-[21px] leading-none">
                    {review.evaluatorName}
                  </strong>
                  <StatusBadge
                    label={global(`badges.${badgeKey(review.badge)}`)}
                    shape="pill"
                    className={badgeSealClass(review.badge)}
                  />
                  <p className="w-full font-body text-[13.5px] font-semibold text-soft">
                    {review.exchangeTitle
                      ? t('reviewAfter', {
                          title: review.exchangeTitle,
                          date: formatReviewDate(review.createdAt),
                        })
                      : formatReviewDate(review.createdAt)}
                  </p>
                </div>
                <CardDescription className="mb-0 mt-3 text-[16.5px] leading-[2] text-ink">
                  {review.content}
                </CardDescription>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
