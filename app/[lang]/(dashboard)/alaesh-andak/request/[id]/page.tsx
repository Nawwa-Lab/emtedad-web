import { EntityCard } from '@/components/EntityCard'
import { RequestActionCard } from '@/components/RequestActionCard'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { getDictionary } from '@/i18n/dictionary/get-dictionary'
import { requestDetail, sidebar } from './data'

export default async function AlaeshRequestDetailPage() {
  const dict = await getDictionary()
  const detail = dict.alaesh.detail

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start pb-36 lg:pb-0">
      <Card className="p-4 sm:p-7 bg-surface border border-line rounded-[22px] col-span-full lg:col-span-2">
        <span className="inline-block font-bold text-[11px] text-gold-deep bg-[rgba(217,184,122,0.2)] rounded-full py-1 px-3 mb-3 font-cairo">
          {requestDetail.category}
        </span>
        <CardTitle className="font-display font-bold text-[26px]/[1.5]">
          {requestDetail.title}
        </CardTitle>
        <CardDescription className="mt-3.5 mb-0 font-medium text-[14.5px] leading-[2.1] text-ink-soft">
          {requestDetail.description}
        </CardDescription>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5.5 p-0">
          <Card className="bg-paper border border-line-soft rounded-2xl p-4">
            <CardTitle className="font-bold text-[11px] text-ink-soft font-cairo">
              {detail.facts.market}
            </CardTitle>
            <div className="font-extrabold font-cairo text-[15.5px] mt-1.25 leading-[1.6]">
              {requestDetail.facts.market}
            </div>
          </Card>
          <Card className="bg-paper border border-line-soft rounded-2xl p-4">
            <CardTitle className="font-bold text-[11px] text-ink-soft font-cairo">
              {detail.facts.timeframe}
            </CardTitle>
            <div className="font-extrabold font-cairo text-[15.5px] mt-1.25 leading-[1.6]">
              {requestDetail.facts.timeframe}
            </div>
          </Card>
          <Card className="bg-paper border border-line-soft rounded-2xl p-4">
            <CardTitle className="font-bold text-[11px] text-ink-soft font-cairo">
              {detail.facts.replies}
            </CardTitle>
            <div className="font-extrabold font-cairo text-[15.5px] mt-1.25 leading-[1.6]">
              {requestDetail.facts.replies}
            </div>
          </Card>
        </CardContent>
        <div className="mt-5.5 bg-paper border border-line-soft rounded-2xl py-4 px-4.5">
          <h2 className="font-display font-bold text-[15px] text-green-deep mb-1">
            {detail.howItWorksTitle}
          </h2>
          <p className="font-semibold text-[12.5px] text-ink-soft leading-[1.9] font-cairo">
            {detail.howItWorksBody}
          </p>
        </div>
      </Card>

      <aside className="w-full lg:col-span-1">
        <div className="mb-4">
          {sidebar.map((item) => (
            <EntityCard
              key={item.id}
              title={detail[item.titleKey]}
              entity={item.name}
              entityFirstLetter={item.name.charAt(0)}
              viewProfileHref="#"
              viewProfileLabel={item.viewProfileLabel}
              viewProfileBadge={item.viewProfileBadge}
              className="mb-4"
            />
          ))}
        </div>
        <RequestActionCard
          requestLabel={detail.iHaveCta}
          saveLabel={detail.saveForTeam}
          note={detail.ctaNote}
        />
      </aside>
    </div>
  )
}
