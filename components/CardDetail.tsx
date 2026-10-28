import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { DialogContent, DialogDescription, DialogHeader, DialogClose } from '@/components/ui/dialog'
import { usePathname } from '@/i18n/navigation'
import { StatusBadge } from './StatusBadge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from './ui/card'

export type ServiceDetailCards = {
  firstCard: {
    title: string
    price: string
    currency: string
  }
  restCards: Array<{
    header: string
    description: string
  }>
}

export type ServiceDetail = {
  type: string
  title: string
  desc: string
  cards: ServiceDetailCards
  info: string
  data: string[]
  providerName: string
  providerRate: string
  request: string
  save?: string
  close: string
}

type CardDetailsProps = {
  detail?: ServiceDetail
  badgeVariant?: 'blue' | 'gold'
}

export function CardDetails({ detail, badgeVariant }: CardDetailsProps) {
  // Hooks must run on every render, before any early return
  const pathname = usePathname()

  if (!detail) return null

  const resolvedBadgeVariant =
    badgeVariant ?? (pathname.startsWith('/namliya/service-offers') ? 'blue' : 'gold')

  const { firstCard, restCards } = detail.cards
  const providerInitial = Array.from(detail.providerName.trim())[0] ?? '-'

  return (
    <DialogContent className="w-full">
      <Badge
        color={resolvedBadgeVariant}
        effect="flat"
        className="inline-block font-bold text-[13px] text-surface rounded-[999px] px-3.75 py-1.25 mb-3"
      >
        {detail.type}
      </Badge>

      <DialogHeader className="font-normal text-[40px] leading-tight font-display text-ink pe-14">
        {detail.title}
      </DialogHeader>

      <DialogDescription className="font-medium font-cairo text-[17px] text-soft leading-loose mt-3.5">
        {detail.desc}
      </DialogDescription>

      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5.5">
        <Card className="bg-paper p-4 min-w-0" effect="flat">
          <CardTitle className="text-[13px] text-soft">{firstCard.title}</CardTitle>
          <div className="font-display text-[22px] mt-1.25 leading-[1.3]">
            {firstCard.price} <span className="font-display text-[22px]">{firstCard.currency}</span>
          </div>
        </Card>

        {restCards.map((card) => (
          <Card key={card.header} className="bg-paper p-4 min-w-0" effect="flat">
            <CardTitle className="text-[13px] text-soft">{card.header}</CardTitle>
            <div className="font-display text-[22px] mt-1.25 leading-[1.3]">{card.description}</div>
          </Card>
        ))}
      </CardContent>

      {detail.data && detail.data.length > 0 && (
        <div className="mt-6">
          <h3 className="font-display text-[22px] text-red mb-2">{detail.info}</h3>
          <ul className="space-y-1.5">
            {detail.data.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 font-medium font-cairo text-[16px] text-soft leading-[1.95]"
              >
                <span className="size-2.5 shrink-0 rounded-full border-2 border-ink bg-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        {detail.providerName && (
          <>
            <h3 className="font-display text-[22px] text-red mb-2">المؤسسة المقدِّمة</h3>
            <Card className="flex flex-wrap bg-paper items-center gap-3.5 p-4" effect="flat">
              <Avatar>
                <AvatarImage src="#" />
                <AvatarFallback>{providerInitial}</AvatarFallback>
              </Avatar>
              <span className="font-display text-[22px] leading-none flex-1">
                {detail.providerName}
              </span>
              {detail.providerRate && (
                <StatusBadge
                  className="text-ink!"
                  shape="pill"
                  label={detail.providerRate}
                  size="default"
                />
              )}
            </Card>
          </>
        )}

        <div className="flex flex-wrap gap-3 mt-6.5 pt-5 border-t-[3px] border-dashed border-ink">
          <Button variant="primary" size="sm">
            {detail.request}
          </Button>
          {detail.save ? (
            <Button variant="outline" size="sm" effect="flat">
              {detail.save}
            </Button>
          ) : null}
          <DialogClose render={<Button variant="outline" size="sm" effect="flat" />}>
            {detail.close}
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  )
}
