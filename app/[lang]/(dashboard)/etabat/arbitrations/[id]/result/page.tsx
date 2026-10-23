import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import BalanceIcon from '@/icons/balance.svg'
import CirclesIcon from '@/icons/circles.svg'
import KeyIcon from '@/icons/key.svg'
import WaveIcon from '@/icons/wave.svg'
import { formatNumber } from '@/lib/utils'
import { getLocale, getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArbitrationHeading, ArbitrationNote, ArbitrationSection } from '../../components'
import { arbitration } from '../../data'

export default async function ArbitrationResultPage({
  params,
}: PageProps<'/[lang]/etabat/arbitrations/[id]/result'>) {
  const { id } = await params
  if (id !== arbitration.id) notFound()

  const t = await getTranslations('etabat.arbitration')
  const global = await getTranslations('global')
  const locale = await getLocale()
  const currency = global('currency')
  const n = (value: number) => formatNumber(value, { locale })
  const money = (value: number) => `${n(value)} ${currency}`
  const steps = t.raw('result.nextSteps') as [string, string][]
  const settlements = [
    {
      initials: arbitration.counterpartyInitial,
      title: arbitration.counterparty,
      detail: t('result.winnerLine'),
      amount: `+${n(arbitration.firstDeposit)}`,
      className: 'text-[#2F7A3E]',
    },
    {
      initials: arbitration.claimantInitial,
      title: arbitration.claimant,
      detail: t('result.loserLine'),
      amount: `−${n(arbitration.firstDeposit)}`,
      className: 'text-red',
    },
    {
      initials: t('result.arbitratorInitial', { index: n(1) }),
      title: t('result.matchedLineTitle', { count: n(arbitration.agreeingArbitrators) }),
      detail: t('result.matchedLine', {
        share: n(arbitration.firstDeposit / arbitration.agreeingArbitrators),
        reward: n(10),
        security: n(10),
      }),
      amount: `+${n(arbitration.firstDeposit / arbitration.agreeingArbitrators + 10)}`,
      className: 'text-[#2F7A3E]',
    },
    {
      initials: t('result.arbitratorInitial', { index: n(arbitration.firstPanelSize) }),
      title: t('result.dissentLineTitle'),
      detail: t('result.dissentLine', { currency }),
      amount: n(0),
      className: 'opacity-60 border-dashed',
    },
  ]

  return (
    <div className="mx-auto max-w-245">
      <ArbitrationHeading
        backHref="/etabat"
        back={t('backHome')}
        title={t('result.title')}
        subtitle={t('caseSubtitle', {
          id: n(Number(arbitration.id)),
          title: arbitration.caseTitle,
        })}
      />

      <div className="mb-6 rounded-panel border-[3px] border-ink bg-ink px-8 py-7.5 text-surface shadow-[8px_8px_0] shadow-red max-sm:px-5">
        <span className="inline-block rounded-full border-2 border-gold px-3.25 py-0.75 font-body text-xs font-extrabold text-gold">
          {t('result.verdictBadge')}
        </span>
        <h2 className="mt-3 font-display text-[clamp(28px,4vw,40px)]/[1.2]">
          {t('result.verdict', { party: arbitration.counterparty })}
        </h2>
        <div className="mt-4.5 flex flex-wrap items-center gap-3">
          <span className="flex gap-1.75" aria-hidden="true">
            {Array.from({ length: arbitration.firstPanelSize }, (_, index) => (
              <i
                key={index}
                className={`size-5.5 rounded-full border-[2.5px] border-gold ${index < arbitration.agreeingArbitrators ? 'bg-gold' : 'bg-transparent'}`}
              />
            ))}
          </span>
          <b className="font-body text-[15px] font-extrabold">
            {t('result.schelling', {
              agreed: n(arbitration.agreeingArbitrators),
              total: n(arbitration.firstPanelSize),
            })}
          </b>
        </div>
        <span className="mt-4.5 inline-flex flex-wrap items-baseline gap-2 rounded-full border-[2.5px] border-gold px-4.5 py-1.5">
          <span className="font-body text-[13px] font-bold text-surface/80">
            {t('result.penaltyCategory')}
          </span>
          <b className="font-display text-[21px] text-gold">{t('result.penaltyValue')}</b>
        </span>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-panel border-[3px] border-ink bg-gold px-6 py-5 shadow-[6px_6px_0] shadow-ink">
        <Image src={KeyIcon} alt="" className="size-8.5 shrink-0" />
        <div className="min-w-50 flex-1">
          <h2 className="font-display text-[22px]/[1.25]">{t('result.appealWindow')}</h2>
          <p className="mt-1 font-body text-[14.5px]/[1.85] font-semibold">
            {t('result.appealNote', { currency, amount: n(arbitration.disputeValue) })}
          </p>
        </div>
        <Link href={`/etabat/arbitrations/${arbitration.id}/appeal`} className={buttonVariants()}>
          {t('result.appealAction')}
        </Link>
      </div>

      <ArbitrationSection
        icon={<Image src={BalanceIcon} alt="" className="size-8.5" />}
        title={t('result.reasonsTitle')}
        description={t('result.reasonsIntro')}
      >
        <div className="mt-4.5 rounded-card border-[2.5px] border-ink bg-paper px-5 py-4.5">
          <p className="font-body text-[15.5px]/[2] font-medium text-soft">{t('result.reasons')}</p>
        </div>
        <ArbitrationNote>
          {t.rich('result.dissentNote', {
            party: arbitration.claimant,
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </ArbitrationNote>
      </ArbitrationSection>

      <ArbitrationSection
        icon={<Image src={CirclesIcon} alt="" className="size-8.5" />}
        title={t('result.depositFateTitle')}
        description={t('result.depositFateIntro')}
      >
        <div className="mt-4 flex flex-wrap items-center gap-3.5 rounded-card border-[2.5px] border-ink bg-paper px-5 py-4">
          {[
            [
              t('result.losingDeposit', { party: arbitration.claimant }),
              money(arbitration.firstDeposit),
            ],
            [
              t('result.matchingArbitrators', { count: n(arbitration.agreeingArbitrators) }),
              t('result.perArbitrator', {
                share: n(arbitration.firstDeposit / arbitration.agreeingArbitrators),
              }),
            ],
            [t('result.rewardLabel'), money(10)],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`min-w-0 pe-3.5 ${index < 2 ? 'border-e-[2.5px] border-dashed border-ink/30' : ''}`}
            >
              <span className="block font-body text-[12.5px] font-bold text-soft">{label}</span>
              <b className="font-display text-[21px] font-normal">{value}</b>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-3">
          {settlements.map((item) => (
            <div
              key={item.title}
              className={`flex items-center gap-3.5 rounded-card border-[2.5px] border-ink bg-paper px-4.5 py-3.75 ${item.className.includes('border-dashed') ? 'border-dashed opacity-60' : ''}`}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-[11px] bg-ink font-display text-[17px] text-surface">
                {item.initials}
              </span>
              <div className="min-w-0 flex-1">
                <b className="block font-body text-[15px]/[1.4] font-extrabold text-ink">
                  {item.title}
                </b>
                <span className="block font-body text-[13px] font-semibold text-soft">
                  {item.detail}
                </span>
              </div>
              <b
                className={`whitespace-nowrap font-display text-[22px] ${item.className.split(' ')[0]}`}
              >
                {item.amount}
              </b>
            </div>
          ))}
        </div>
      </ArbitrationSection>

      <ArbitrationSection
        icon={<Image src={WaveIcon} alt="" className="size-8.5" />}
        title={t('result.nextTitle')}
      >
        <ol className="mt-4.5">
          {steps.map(([title, description], index) => (
            <li
              key={title}
              className="relative flex gap-3.75 pb-5 last:pb-0 before:absolute before:top-8 before:bottom-0 before:inset-s-3.75 before:w-0.75 before:bg-ink/20 last:before:hidden"
            >
              <span className="z-10 grid size-8 shrink-0 place-items-center rounded-full bg-ink font-display text-[15px] text-surface">
                {n(index + 1)}
              </span>
              <div>
                <h3 className="font-display text-[19px]/[1.35]">{title}</h3>
                <p className="mt-1 font-body text-[14.5px]/[1.85] font-semibold text-soft">
                  {description
                    .replaceAll('{currency}', currency)
                    .replaceAll('{party}', arbitration.claimant)
                    .replaceAll('{amount}', n(arbitration.disputeValue))}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </ArbitrationSection>
    </div>
  )
}
