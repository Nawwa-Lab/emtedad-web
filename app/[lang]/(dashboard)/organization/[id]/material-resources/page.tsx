import { OrganizationListings } from '@/components/OrganizationListings'
import { OrganizationProfileHeader } from '@/components/OrganizationProfileHeader'
import { organizationApi } from '@/services/organizations'
import { getTranslations } from 'next-intl/server'
import { toCatalogListings } from '../catalog-listings'

export default async function MaterialResourcesPage({
  params,
}: PageProps<'/[lang]/organization/[id]/material-resources'>) {
  const { id } = await params
  const t = await getTranslations('organizationProfile')
  const [{ data }, { data: catalog }] = await Promise.all([
    organizationApi.getPublicProfile(id),
    organizationApi.getMaterialResources(id),
  ])
  const { organization } = data
  const provider = {
    name: organization.legalName,
    logoUrl: organization.logoUrl,
    badge: data.satisfaction,
  }
  const listings = toCatalogListings(catalog, organization, provider, t('details.materialResource'))
  return (
    <div className="w-full pb-10">
      <OrganizationProfileHeader
        profile={data}
        section={t('materialResourcesTitle')}
        sectionDescription={t('materialResourcesDescription', {
          name: organization.legalName,
          count: listings.length,
        })}
      />
      <section className="mt-8">
        <OrganizationListings listings={listings} variant="material" />
      </section>
    </div>
  )
}
