import { StatusBadge } from '@/components/StatusBadge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useMessages, useTranslations } from 'next-intl'

type DialogCard = {
  header: string
  provider?: string
  client?: string
  activities?: string
}

type Review = {
  reviewerName: string
  exchangeText: string
  badge: string
  reviewText: string
}

const ROW_KEYS = ['provider', 'client', 'activities'] as const

export function SatisfactionIndex() {
  const t = useTranslations('satisfactionIndex')
  const s = useTranslations('statusBadge')
  const messages = useMessages()

  // statusBadge is an object of { key: label }, so drop the "empty" placeholder
  const rateEntries = Object.entries(
    messages.statusBadge as unknown as Record<string, string>,
  ).filter(([key]) => key !== 'empty')

  const dialogCards = t.raw('dialog') as DialogCard[]
  const reviews = t.raw('reviewContent') as Review[]

  return (
    <DialogContent>
      <DialogHeader>
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5.5">
          <StatusBadge
            label={s('veryGood')}
            className="w-14 h-14 sm:w-16 sm:h-16 text-[17px] sm:text-[19px] shrink-0"
          />
          <DialogTitle className="min-w-0">
            <span className="font-display font-bold text-[18px] sm:text-[21px] text-ink">
              {t('title')}
            </span>
            <p className="font-semibold text-[12.5px] text-ink-soft mt-2 font-cairo">{t('rate')}</p>
          </DialogTitle>
        </div>
      </DialogHeader>

      {dialogCards.map((card, index) => (
        <Card key={index} className="bg-paper py-4 px-3.5 sm:px-4.5 mb-3">
          <CardHeader className="text-[15px] mb-2.5">{card.header}</CardHeader>

          {ROW_KEYS.map((key) =>
            card[key] ? (
              <CardContent key={key} className="flex items-center gap-2.5 py-1.75 px-0 flex-wrap">
                <span className="font-bold text-[12.5px] text-ink-soft min-w-24 sm:min-w-30 font-cairo">
                  {card[key]}
                </span>
                <div className="flex-wrap flex gap-2">
                  {rateEntries.map(([variant, label]) => (
                    <StatusBadge key={variant} label={label} shape="pill" />
                  ))}
                </div>
              </CardContent>
            ) : null,
          )}
        </Card>
      ))}

      <Card className="bg-paper py-4 px-3.5 sm:px-4.5 mb-3">
        <CardHeader className="text-[15px] mb-2.5">{t('reviewHeader')}</CardHeader>

        {reviews.map((r, index) => (
          <CardContent key={index} className="border-b border-b-line-soft py-3.5 px-0">
            <CardTitle className="flex items-center gap-2.5 gap-y-1.5 mb-1.5 flex-wrap">
              <Avatar className="w-7.5 h-7.5 bg-sage shrink-0">
                <AvatarImage src="" />
                <AvatarFallback className="font-semibold text-[11px] text-ink-soft">
                  {r.reviewerName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="font-extrabold text-[12.5px] truncate max-w-[45%] sm:max-w-none">
                {r.reviewerName}
              </span>
              <span className="font-semibold text-[11px] text-ink-soft truncate max-w-[35%] sm:max-w-none">
                {r.exchangeText}
              </span>
              <StatusBadge label={r.badge} shape="pill" />
            </CardTitle>
            <CardDescription className="font-medium text-[13px] leading-[1.95] text-ink-soft">
              {r.reviewText}
            </CardDescription>
          </CardContent>
        ))}
      </Card>
    </DialogContent>
  )
}
