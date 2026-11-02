'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { CardDetails, type ServiceDetail } from '@/components/CardDetail'
import { MoveDiagonal2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card } from './ui/card'
import { Avatar } from './ui/avatar'

const memberInfoKeys = new Set([
  'responsibleMember',
  'requestedBy',
  'assignedMember',
  'supervisor',
  'with',
  'suggestedMember',
])

export interface MyOfferCardAction {
  key: string
  label: string
  variant?: 'primary' | 'outline' | 'destructive'
}

export interface MyOfferCardInfo {
  key: string
  values?: Array<{ text: string; bold?: boolean }>
}

export interface MyOfferCardOrg {
  name: string
  initials: string
  seal?: boolean
}

export interface MyOfferCardProps {
  id: string
  type: 'h' | 'm'
  status: string
  category: string
  title: string
  desc: string
  price: string
  info: MyOfferCardInfo[]
  actions: MyOfferCardAction[]
  details?: {
    secondFact?: { header: string; description: string }
    thirdFact?: { header: string; description: string }
    listTitle?: string
    items?: string[]
    whatTheyAsked?: string[]
    whatYouGet?: string[]
    whatsLeft?: string[]
    availability?: string
    insurance?: string
    due?: string
    status?: string
    org?: MyOfferCardOrg
  }
  typeLabel: string
  statusLabel: string
  currencyLabel?: string
  expandAriaLabel?: string
  valueLabel?: string
  statusTextLabel?: string
  typeTextLabel?: string
  institutionLabel?: string
  openChatLabel?: string
  closeLabel?: string
  whatTheyAskedLabel?: string
  vatNote?: string
  infoLabels?: Record<string, string>
  onAction?: (key: string, id: string) => void
  animated?: boolean
}

export function DataCard({
  id,
  type,
  status,
  category,
  title,
  desc,
  price,
  info,
  actions,
  details,
  typeLabel,
  statusLabel,
  currencyLabel = 'شهمهم',
  expandAriaLabel = 'افتح التفاصيل الكاملة',
  valueLabel = 'القيمة',
  statusTextLabel = 'الحالة',
  typeTextLabel = 'النوع',
  institutionLabel = 'المؤسسة المقدِّمة',
  openChatLabel = 'افتح المحادثة',
  closeLabel = 'اقفل',
  whatTheyAskedLabel = 'اللي طلبوه',
  vatNote = '+ ١٤٪ ض.ق.م',
  infoLabels = {},
  animated = true,
  onAction,
}: MyOfferCardProps) {
  const t = useTranslations('namliyaMyOffers')

  const listItems =
    details?.items || details?.whatTheyAsked || details?.whatYouGet || details?.whatsLeft || []

  const resolvedListTitle =
    details?.listTitle ||
    (details?.whatTheyAsked
      ? whatTheyAskedLabel
      : details?.whatYouGet
        ? type === 'h'
          ? 'إيه اللي بتقدّموه'
          : 'شروط الاستخدام'
        : details?.whatsLeft
          ? 'اللي فاضل'
          : status === 'ask'
            ? whatTheyAskedLabel
            : status === 'doing'
              ? 'اللي فاضل'
              : status === 'done'
                ? 'تفاصيل التسليم'
                : type === 'h'
                  ? 'إيه اللي بتقدّموه'
                  : 'شروط الاستخدام')

  const secondFact = details?.secondFact || {
    header: status === 'ask' ? 'الطالب' : status === 'doing' ? 'المدة' : 'الإتاحة',
    description:
      details?.availability ||
      (status === 'ask'
        ? 'حلقة'
        : status === 'doing'
          ? 'أسبوعان'
          : type === 'h'
            ? 'متاح أي مدة'
            : 'حتى ٣ أيام'),
  }

  const thirdFact = details?.thirdFact || {
    header: details?.insurance ? 'تأمين نقدي' : statusTextLabel,
    description:
      details?.insurance ||
      details?.status ||
      (status === 'none' ? 'منشور بلا طلبات' : status === 'ask' ? 'بانتظار قراركم' : statusLabel),
  }

  const org = details?.org || { name: 'مشكاة', initials: 'م', seal: true }

  return (
    <Card
      animated={animated}
      className="relative bg-surface border-[3px] border-ink p-6 flex flex-col min-h-75"
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className={`px-4 py-1 rounded-full border-[2.5px] border-ink text-[13px] font-bold ${
            type === 'm' ? 'bg-gold text-ink' : 'bg-blue text-surface'
          }`}
        >
          {category}
        </span>

        <Dialog>
          <DialogTrigger
            render={
              <Button
                size="icon"
                variant="outline"
                shape="square"
                className="group bg-paper hover:bg-gold border-ink"
              >
                <MoveDiagonal2
                  size={15}
                  strokeWidth={2}
                  className="fill-paper text-black group-hover:fill-gold"
                />
              </Button>
            }
          />
          <CardDetails
            detail={
              {
                type: `${category} · ${typeLabel}`,
                title: title,
                desc: desc,
                cards: {
                  firstCard: {
                    title: valueLabel,
                    price: price,
                    currency: currencyLabel,
                  },
                  restCards: [secondFact, thirdFact],
                },
                info: resolvedListTitle,
                data: listItems,
                providerName: org.name,
                providerRate: org.seal ? 'عامر' : '',
                request: openChatLabel,
                save: '',
                close: closeLabel,
              } as ServiceDetail
            }
            badgeVariant={type === 'm' ? 'gold' : 'blue'}
          />
        </Dialog>
      </div>
      <h3 className="font-display text-[28px] leading-[1.3]">{title}</h3>
      <p className="font-body text-[16px] border-b-[2.5px] border-dashed border-soft text-soft leading-[1.85] mt-2 line-clamp-2">
        {desc}
      </p>

      <div className="mt-auto pt-4 flex flex-col gap-2">
        {info.map((infoItem, idx) => (
          <div
            key={idx}
            className="font-body font-semibold text-[14.5px] text-soft flex items-center gap-2 flex-wrap"
          >
            <span>
              {infoLabels[infoItem.key] && <>{infoLabels[infoItem.key]} </>}
              {memberInfoKeys.has(infoItem.key) && (
                <Avatar
                  size="sm"
                  effect="flat"
                  className="inline-grid align-middle gap-1 me-1 bg-paper place-items-center text-[13px] font-display"
                >
                  {(infoItem.values?.[0]?.text || '').charAt(0)}
                </Avatar>
              )}
              {infoItem.values?.map((v, vi) => (
                <span
                  key={vi}
                  className={
                    v.bold || (memberInfoKeys.has(infoItem.key) && vi === 0)
                      ? 'font-bold text-ink'
                      : ''
                  }
                >
                  {v.text}{' '}
                </span>
              ))}
              {infoItem.key === 'notRatedYet' && <>{t('notRatedYet')}</>}
              {infoItem.key === 'ratedBy' && (
                <>
                  {t('ratedBy')}:{' '}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold border border-ink text-[13px]">
                    {infoItem.values?.[0]?.text}
                  </span>
                </>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-4 pt-1 border-t-[2.5px] border-dashed border-ink">
        <span className="font-display text-[34px]">
          {price}
          <small className="text-[16px] text-red ms-1">{currencyLabel}</small>
        </span>
        <span className="text-[17px] text-ink font-body">{vatNote}</span>
      </div>

      <div className="flex flex-wrap gap-2 mt-1">
        {actions.map((action, idx) => (
          <Button
            key={idx}
            variant={action.variant || 'outline'}
            size="sm"
            effect={action.variant === 'primary' ? '3d' : 'flat'}
            onClick={() => onAction?.(action.key, id)}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </Card>
  )
}
