import { OrganizationListings } from '@/components/OrganizationListings'
import { OrganizationProfileHeader } from '@/components/OrganizationProfileHeader'
import { organizationApi } from '@/services/organizations'
import { getTranslations } from 'next-intl/server'
import { humanServices } from '../data'

export default async function HumanServicesPage({
  params,
}: PageProps<'/[lang]/organization/[id]/human-services'>) {
  const { id } = await params
  const t = await getTranslations('organizationProfile')
  const organization = await organizationApi.getPublicProfile(id)
  return (
    <div className="w-full pb-10">
      <OrganizationProfileHeader
        organization={organization}
        section={t('humanServicesTitle')}
        sectionDescription={t('humanServicesDescription', { name: organization.legalName })}
      />
      <section className="mt-8">
        <OrganizationListings listings={humanServices} variant="human" />
      </section>
    </div>
  )
}
