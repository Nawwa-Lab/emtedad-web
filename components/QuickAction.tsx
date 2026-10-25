'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Link } from '@/i18n/navigation'
import CirclesIcon from '@/icons/circles.svg'
import PlantIcon from '@/icons/plant.svg'
import TargetIcon from '@/icons/target.svg'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { buttonVariants } from './ui/button'

const destinations = [
  {
    id: 'namliya',
    icon: CirclesIcon,
    actions: [
      ['humanService', '/namliya/service-offers/create'],
      ['materialResource', '/namliya/resource-offers/create'],
    ],
  },
  {
    id: 'khalliKhales',
    icon: PlantIcon,
    actions: [
      ['activity', '/khalli-khales/offers/create'],
      ['service', '/khalli-khales/offers/create'],
      ['resource', '/khalli-khales/offers/create'],
    ],
  },
  {
    id: 'alaesh',
    icon: TargetIcon,
    actions: [['request', '/alaesh-andak/request/create']],
  },
] as const

export function QuickAction() {
  const t = useTranslations('quickAction')
  const header = useTranslations('header')
  const dialog = useTranslations('dialog')
  const portalContainer =
    typeof document === 'undefined' ? null : document.getElementById('dashboard-content-region')

  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants(), 'hidden sm:block')}>
        {header('quickAction')}
      </DialogTrigger>
      <DialogContent
        portalContainer={portalContainer}
        overlayClassName="absolute bg-ink/55"
        closeLabel={dialog('close')}
        className="absolute top-7 left-1/2 max-h-[calc(100%-56px)] w-[calc(100%-44px)] max-w-220 translate-y-0 px-8 pt-8.5 pb-7.5 sm:absolute sm:w-[calc(100%-44px)]"
      >
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4.5 min-[821px]:grid-cols-3">
          {destinations.map((destination) => (
            <section
              key={destination.id}
              className="flex flex-col rounded-panel border-[3px] border-ink bg-paper px-5.5 py-6 shadow-[6px_6px_0] shadow-ink transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-1 hover:-rotate-[0.3deg] hover:shadow-[9px_11px_0]"
            >
              <Image src={destination.icon} alt="" className="mb-3.5 size-16 shrink-0" />
              <h3 className="font-display text-[27px]/[1.25]">
                {t(`destinations.${destination.id}.title`)}
              </h3>
              <p className="mt-2 flex-1 font-body text-[15px]/[1.85] font-medium text-soft">
                {t(`destinations.${destination.id}.description`)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 border-t-[2.5px] border-dashed border-ink pt-3.5">
                {destination.actions.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className="rounded-full border-[2.5px] border-ink bg-surface px-[15px] py-1.75 font-body text-sm font-bold text-ink hover:bg-red hover:text-surface"
                  >
                    {t(`actions.${label}`)}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
