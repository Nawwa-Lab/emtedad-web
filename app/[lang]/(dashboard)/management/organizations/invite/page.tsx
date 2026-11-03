import { InvitationIssueForm } from '@/components/InvitationIssueForm'
import { Card } from '@/components/ui/card'
import { getTranslations } from 'next-intl/server'

export default async function OrganizationInvitePage() {
  const t = await getTranslations('management.organizationInvite')
  const steps = t.raw('steps') as string[]

  return (
    <>
      <header className="mb-6">
        <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1.14] text-ink">{t('title')}</h1>
        <p className="mt-2 font-body text-[17px] font-medium text-soft">{t('description')}</p>
      </header>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,.65fr)]">
        <InvitationIssueForm kind="organization" backHref="/management/organizations" />
        <Card className="bg-gold p-6">
          <h2 className="font-display text-[28px]">{t('nextTitle')}</h2>
          <ol className="mt-5 space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-3 font-body text-[15px]/[1.7] font-semibold">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border-2 border-ink bg-surface font-display">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  )
}
