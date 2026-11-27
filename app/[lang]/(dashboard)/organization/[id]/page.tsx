import { OrganizationOfferCarousel } from '@/components/OrganizationOfferCarousel'
import { OrganizationProfileHeader } from '@/components/OrganizationProfileHeader'
import { OrganizationTeam } from '@/components/OrganizationTeam'
import { formatNumber } from '@/lib/utils/formatter'
import { organizationApi } from '@/services/organizations'
import type { Organization, OrganizationOffer } from '@/services/organizations'
import { getLocale, getTranslations } from 'next-intl/server'
import type { Market, OrganizationListing } from './data'

const MARKET_BY_API_VALUE: Record<string, Market> = {
  namlya: 'namliya',
  khalli: 'khalli',
  alaesh: 'alaesh',
}

function toListing(
  offer: OrganizationOffer,
  organization: Organization,
  kind: 'service' | 'resource',
): OrganizationListing {
  return {
    title: offer.title,
    category: offer.tags[0]?.name ?? '',
    description: offer.description,
    owner: organization.legalName,
    ownerAvatarUrl: organization.logoUrl ?? undefined,
    market: MARKET_BY_API_VALUE[offer.market] ?? 'namliya',
    price: offer.shahamhamValue,
    kind,
    badge: offer.rating,
    provider: {
      name: organization.legalName,
      logoUrl: organization.logoUrl,
      badge: offer.rating,
    },
  }
}

export default async function OrganizationPage({ params }: PageProps<'/[lang]/organization/[id]'>) {
  const { id } = await params
  const locale = await getLocale()
  const t = await getTranslations('organizationProfile')
  const { data } = await organizationApi.getPublicProfile(id)
  const { organization, offers, members } = data

  const humanServices = offers.humanServices.items.map((offer) =>
    toListing(offer, organization, 'service'),
  )
  const materialResources = offers.materialResources.items.map((offer) =>
    toListing(offer, organization, 'resource'),
  )

  return (
    <div className="w-full pb-10">
      <OrganizationProfileHeader profile={data} />
      <section>
        <OrganizationOfferCarousel
          title={t('humanServices')}
          countLabel={t('humanServicesCount', {
            count: formatNumber(offers.humanServices.total, { locale }),
          })}
          href={`/organization/${id}/human-services`}
          listings={humanServices.slice(0, 5)}
        />
        <OrganizationOfferCarousel
          title={t('materialResources')}
          countLabel={t('materialResourcesCount', {
            count: formatNumber(offers.materialResources.total, { locale }),
          })}
          href={`/organization/${id}/material-resources`}
          listings={materialResources.slice(0, 4)}
        />
      </section>
      <OrganizationTeam members={members} />
    </div>
  )
}
