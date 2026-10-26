import { OrganizationSatisfaction } from '@/components/OrganizationSatisfaction'
import { StatusBadge } from '@/components/StatusBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from '@/i18n/navigation'
import { formatNumber } from '@/lib/utils/formatter'
import { organizationApi } from '@/services/organizations'
import { getLocale, getTranslations } from 'next-intl/server'

export default async function SatisfactionPage({
  params,
}: PageProps<'/[lang]/organization/[id]/satisfaction'>) {
  const { id } = await params
  const locale = await getLocale()
  const t = await getTranslations('organizationProfile')
  const global = await getTranslations('global')
  const organization = await organizationApi.getPublicProfile(id)
  return (
    <div className="w-full pb-10">
      <Link
        href={`/organization/${organization.organizationId}`}
        className="mb-4 inline-flex items-center gap-2 font-body text-base font-bold hover:text-red"
      >
        <span className="grid size-9 place-items-center rounded-full border-[2.5px] border-ink bg-surface shadow-[3px_3px_0_#1A1714] rtl:rotate-0 ltr:rotate-180">
          →
        </span>
        {t('back', { name: organization.legalName })}
      </Link>
      <h1 className="font-display text-[clamp(2.75rem,5.4vw,4.375rem)] leading-none">
        {t('satisfactionTitle')}
      </h1>
      <div className="mb-6 mt-5 flex flex-wrap items-center gap-4 rounded-panel border-3 border-ink bg-surface px-6 py-5 shadow-[6px_6px_0_#1A1714]">
        <Avatar color="gold" effect="3d" shape="square" className="size-18">
          <AvatarImage src={organization.logoUrl ?? ''} alt={organization.legalName} />
          <AvatarFallback className="font-display text-3xl">
            {organization.legalName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-50 flex-1">
          <h2 className="font-display text-[28px] leading-tight">{organization.legalName}</h2>
          <p className="font-body text-sm font-semibold text-soft">
            {t('ratedByNetwork', { count: formatNumber(48, { locale }) })}
          </p>
        </div>
        <StatusBadge variant="veryGood" label={global('badges.amer')} />
      </div>
      <section>
        <OrganizationSatisfaction />
      </section>
    </div>
  )
}
