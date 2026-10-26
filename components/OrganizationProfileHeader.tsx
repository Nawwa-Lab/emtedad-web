import { Link } from '@/i18n/navigation'
import OrgCover from '@/icons/org-cover.svg'
import { formatNumber } from '@/lib/utils/formatter'
import type { OrganizationPublicProfile } from '@/services/organizations'
import { cn } from 'cn'
import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

type Props = {
  organization: OrganizationPublicProfile
  section?: string
  sectionDescription?: string
}

export async function OrganizationProfileHeader({
  organization,
  section,
  sectionDescription,
}: Props) {
  const locale = await getLocale()
  const t = await getTranslations('organizationProfile')
  const global = await getTranslations('global')
  const location = [organization.city, organization.country].filter(Boolean).join(' — ')
  const baseHref = `/organization/${organization.organizationId}`

  if (section) {
    return (
      <>
        <Link
          href={baseHref}
          className="mb-4 inline-flex items-center gap-2 font-body text-base font-bold text-ink hover:text-red"
        >
          <span className="grid size-9 place-items-center rounded-full border-[2.5px] border-ink bg-surface shadow-[3px_3px_0_#1A1714] rtl:rotate-0 ltr:rotate-180">
            →
          </span>
          {t('back', { name: organization.legalName })}
        </Link>
        <div className="mb-5 flex flex-wrap items-end gap-5">
          <h1 className="font-display text-[clamp(2.75rem,5.4vw,4.375rem)] leading-none">
            {section}
          </h1>
          <p className="pb-2 font-body text-base font-medium text-soft">
            {sectionDescription ?? t('sectionDescription', { name: organization.legalName })}
          </p>
        </div>
        <div className="mb-6 flex flex-wrap gap-2">
          <a
            href="#namliya"
            className="rounded-full border-[2.5px] border-ink bg-ink px-5 py-2 font-body text-sm font-bold text-surface shadow-[3px_3px_0_#1A1714]"
          >
            {t('markets.all')}
          </a>
          <a
            href="#namliya"
            className="rounded-full border-[2.5px] border-ink bg-surface px-5 py-2 font-body text-sm font-bold shadow-[3px_3px_0_#1A1714]"
          >
            {t('markets.namliya')}
          </a>
          <a
            href="#khalli"
            className="rounded-full border-[2.5px] border-ink bg-surface px-5 py-2 font-body text-sm font-bold shadow-[3px_3px_0_#1A1714]"
          >
            {t('markets.khalli')}
          </a>
          <a
            href="#alaesh"
            className="rounded-full border-[2.5px] border-ink bg-surface px-5 py-2 font-body text-sm font-bold shadow-[3px_3px_0_#1A1714]"
          >
            {t('markets.alaesh')}
          </a>
        </div>
      </>
    )
  }

  return (
    <>
      <section className="relative h-45 overflow-hidden rounded-panel border-3 border-ink bg-blue shadow-[8px_8px_0_#1A1714]">
        {organization.coverImageUrl ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${organization.coverImageUrl})` }}
          />
        ) : (
          <Image src={OrgCover} alt="" fill className="object-cover" priority />
        )}
      </section>
      <div className="relative z-10 mx-4 mt-5 flex flex-wrap items-start gap-6 sm:mx-7">
        <Avatar
          color="gold"
          size="xl"
          effect="3d"
          shape="square"
          className="-mt-23 size-31 overflow-hidden"
        >
          <AvatarImage src={organization.logoUrl ?? ''} alt={organization.legalName} />
          <AvatarFallback className="text-5xl!">{organization.legalName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-65 flex-1">
          <h1 className="font-display text-[clamp(2.25rem,4.6vw,3.25rem)] leading-[1.15]">
            {organization.legalName}
          </h1>
          <p className="mt-2 max-w-160 font-body text-soft text-[17.5px] font-medium leading-8 text-soft">
            {organization.description || t('defaults.description')}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Badge size="lg" className="font-display">
              {global('badges.amer')}
            </Badge>
            <Link
              href={`${baseHref}/satisfaction`}
              className="border-b-[2.5px] border-red font-body text-[15px] font-bold hover:text-red"
            >
              {t('ratingSummary', { count: formatNumber(48, { locale }) })}
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Info label={t('facts.city')} value={location} emptyLabel={t('defaults.unpublished')} />
        <Info
          label={t('facts.founded')}
          value={organization.foundationDate?.slice(0, 4)}
          emptyLabel={t('defaults.unpublished')}
          locale={locale}
        />
        <Info
          label={t('facts.website')}
          value={organization.websiteUrl}
          emptyLabel={t('defaults.unpublished')}
          href={organization.websiteUrl}
        />
        <Info
          label={t('facts.contact')}
          value={Object.values(organization.socialLinks ?? {})[0]}
          emptyLabel={t('defaults.unpublished')}
          href={Object.values(organization.socialLinks ?? {})[0]}
        />
      </div>
      <section className="mt-8">
        <h2 className="w-fit border-b-4 border-red pb-1 font-display text-[clamp(1.75rem,3.4vw,2.375rem)]">
          {t('mission')}
        </h2>
        <p className="mt-4 max-w-205 font-body text-[17px] font-medium leading-8 text-soft">
          {organization.mission || t('defaults.mission')}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {organization.areasOfWork?.map((area) => (
            <span
              key={area}
              className="rounded-full border-[2.5px] border-ink bg-surface px-4 py-2 font-body text-sm font-bold"
            >
              {area}
            </span>
          ))}
        </div>
      </section>
    </>
  )
}

function Info({
  label,
  value,
  emptyLabel,
  href,
  locale,
}: {
  label: string
  value: string | undefined | null
  emptyLabel: string
  href?: string | null
  locale?: string
}) {
  const numericValue = value && /^\d+$/.test(value) ? formatNumber(value, { locale }) : value

  return (
    <div className="rounded-card border-[2.5px] border-ink bg-surface px-4.5 py-4 shadow-[4px_4px_0_#1A1714]">
      <p className="font-body text-sm font-bold text-soft">{label}</p>
      {href ? (
        <a
          href={href}
          className="mt-1 inline-block break-all border-b-[2.5px] border-blue font-display text-xl leading-snug text-blue"
          dir="ltr"
          target="_blank"
          rel="noreferrer"
        >
          {numericValue}
        </a>
      ) : (
        <p className={cn('mt-1 font-display text-xl leading-snug')}>{numericValue || emptyLabel}</p>
      )}
    </div>
  )
}
