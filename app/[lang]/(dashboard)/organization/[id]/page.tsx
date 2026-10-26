import { OrganizationOfferCarousel } from '@/components/OrganizationOfferCarousel'
import { OrganizationProfileHeader } from '@/components/OrganizationProfileHeader'
import { OrganizationTeam } from '@/components/OrganizationTeam'
import { organizationApi } from '@/services/organizations'
import { getTranslations } from 'next-intl/server'
import { humanServices, materialResources } from './data'

export default async function OrganizationPage({ params }: PageProps<'/[lang]/organization/[id]'>) {
  const { id } = await params
  const t = await getTranslations('organizationProfile')
  const organization = await organizationApi.getPublicProfile(id)
  return (
    <div className="w-full pb-10">
      <OrganizationProfileHeader organization={organization} />
      <section>
        <OrganizationOfferCarousel
          title={t('humanServices')}
          countLabel={t('humanServicesCount')}
          href={`/organization/${id}/human-services`}
          listings={humanServices.slice(0, 5)}
        />
        <OrganizationOfferCarousel
          title={t('materialResources')}
          countLabel={t('materialResourcesCount')}
          href={`/organization/${id}/material-resources`}
          listings={materialResources.slice(0, 4)}
        />
      </section>
      <OrganizationTeam members={organization.members} />
    </div>
  )
}
