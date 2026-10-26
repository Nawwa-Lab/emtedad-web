'use client'
import { SubLinks } from '@/components/SubLinks'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { formatNumber } from '@/lib/utils'
import { cardContent } from './data'
import circles from '@/icons/circles.svg'
import keyIcon from '@/icons/key.svg'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function DraftsPage() {
  const t = useTranslations('namliyaDrafts')
  const locale = useLocale()

  return (
    <>
      <div className="flex items-end gap-5 mb-2">
        <h1 className="font-display text-[55px] leading-none">{t('title')}</h1>
        <p className=" font-medium text-[17px] text-soft pt-2.5 font-body">{t('description')}</p>
      </div>
      <SubLinks
        linkClassName="relative py-3 px-6.5 text-[21px] h-12"
        separatorAfter={0}
        links={[
          { href: '/namliya/service-offers', label: t('link1') },
          { href: '/namliya/my-requests', label: t('link2') },
          { href: '/namliya/my-asks', label: t('link3') },
          { href: '/namliya/drafts', label: t('link4') },
        ]}
      />
      <div className="flex items-center gap-3 mb-4.5 font-semibold text-[16px] text-soft font-body">
        <Image src={circles} alt="circles" width={30} height={30} />
        <span>
          <b className="font-display text-[22px] text-ink">
            {formatNumber(cardContent.length, { locale })}
          </b>{' '}
          {t('draftsCount', { count: cardContent.length }).replace(/^\d+\s*/, '')}
        </span>
      </div>
      <div className="mt-5.5">
        {cardContent.map((card, index) => (
          <Card key={index} className="px-6.5 py-6 mb-4.5">
            <CardHeader className="flex items-start gap-3.5 flex-wrap mb-3">
              <CardTitle className="text-[26px] font-display leading-[1.3] min-w-55 flex-1 text-ink">
                {card.title}
              </CardTitle>
              <span className="font-body text-[18px] leading-[1.75] font-extralight">
                {card.category}
              </span>
            </CardHeader>
            <CardDescription className="font-medium font-body leading-[1.9] text-[16px] text-soft">
              {card.description}
            </CardDescription>
            <div className="flex gap-3 flex-wrap mt-4 pt-4 border-t-[2.5px] border-dashed border-soft">
              <Card effect="flat" className="bg-paper py-2.75 px-4 flex-1 min-w-37.5">
                <CardTitle className=" block font-bold font-body text-[12.5px] text-soft">
                  {card.cards.firstCard.title}
                </CardTitle>
                <div className="flex items-center gap-2 font-display text-[19px] mt-1 leading-[1.3]">
                  <Avatar size="sm" effect="flat" className="bg-paper">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback>
                      {card.cards.firstCard.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{card.cards.firstCard.name}</span>
                </div>
              </Card>
              {card.cards.restCards.map((card, index) => (
                <Card
                  effect="flat"
                  className="bg-paper py-2.75 px-4 flex-1 min-w-37.5 "
                  key={index}
                >
                  <CardTitle className=" block font-bold font-body text-[12.5px] text-soft">
                    {card.header}
                  </CardTitle>
                  <div className="font-display text-[19px] mt-1 leading-[1.3]">
                    {card.description}
                  </div>
                </Card>
              ))}
            </div>
            <CardAction className="flex items-center gap-2.5 mt-4  ">
              <Button variant="primary" size="sm">
                {t('postButton')}
              </Button>
              <Link
                href=""
                className="border-[2.5px] border-ink text-ink bg-surface rounded-full font-body font-bold text-[14px] px-4 h-9 cursor-pointer hover:bg-gold"
              >
                {t('link5')}
              </Link>
              <Link
                href="/namliya/service-offers/create"
                className="border-[2.5px] border-ink text-ink bg-surface rounded-full font-body font-bold text-[14px] px-4 h-9 cursor-pointer hover:bg-gold"
              >
                {t('link6')}
              </Link>
              <Button variant="destructive" size="sm" effect="flat">
                {t('deleteButton')}
              </Button>
            </CardAction>
          </Card>
        ))}
      </div>
      <Card className="flex items-center gap-4 bg-gold py-5 px-6 mt-5.5">
        <Image src={keyIcon} alt="keyIcon" width={42} height={42} />
        <p className=" font-semibold font-body text-[16px] leading-[1.9] flex-1 min-w-50">
          {t.rich('note', { b: (chunks) => <b>{chunks}</b> })}
        </p>
      </Card>
    </>
  )
}
