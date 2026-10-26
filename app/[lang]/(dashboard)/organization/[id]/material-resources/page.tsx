import { OrganizationListings } from '@/components/OrganizationListings'
import { OrganizationProfileHeader } from '@/components/OrganizationProfileHeader'
import { organizationApi } from '@/services/organizations'
import { getTranslations } from 'next-intl/server'
import { materialResources } from '../data'

export default async function MaterialResourcesPage({
  params,
}: PageProps<'/[lang]/organization/[id]/material-resources'>) {
  const { id } = await params
  const t = await getTranslations('organizationProfile')
  const organization = await organizationApi.getPublicProfile(id)
  return (
    <div className="w-full pb-10">
      <OrganizationProfileHeader
        organization={organization}
        section={t('materialResourcesTitle')}
        sectionDescription={t('materialResourcesDescription', { name: organization.legalName })}
      />
      <section className="mt-8">
        <OrganizationListings listings={materialResources} variant="material" />
      </section>
    </div>
  )
}
