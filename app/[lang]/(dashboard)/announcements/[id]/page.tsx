'use client'

import { RoleRouteGuard } from '@/components/RoleRouteGuard'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import LanternIcon from '@/icons/lantern.svg'
import { useAnnouncementQuery } from '@/services/notifications'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { use } from 'react'

export default function AnnouncementDetailPage({
  params,
}: PageProps<'/[lang]/announcements/[id]'>) {
  const { id } = use(params)
  const t = useTranslations('announcements')
  const locale = useLocale()
  const { data: announcement, isPending, isError } = useAnnouncementQuery(id)

  return (
    <RoleRouteGuard roles={['emtedad_admin', 'org_admin', 'team_worker', 'community_member']}>
      <div className="mx-auto max-w-[760px]">
        <header className="mb-[26px] flex flex-wrap items-end gap-5">
          <h1 className="font-display text-[clamp(36px,4.4vw,56px)]/[1.14]">{t('detailTitle')}</h1>
          <p className="pb-1.5 font-body text-[17px] font-medium text-soft">
            {t('detailDescription')}
          </p>
        </header>

        {isPending && (
          <p className="py-10 text-center font-body font-bold text-soft">{t('detailLoading')}</p>
        )}
        {isError && (
          <p className="py-10 text-center font-body font-bold text-red">{t('detailError')}</p>
        )}

        {announcement && (
          <article className="rounded-panel border-3 border-ink bg-surface px-7 py-[26px] shadow-[6px_6px_0] shadow-ink max-[620px]:px-[18px] max-[620px]:py-[22px]">
            <span className="mb-4 grid size-12 aspect-square rounded-[13px] border-[2.5px] border-ink bg-paper p-2 shadow-[2px_2px_0] shadow-ink">
              <Image
                src={LanternIcon}
                alt=""
                className="max-h-full max-w-full aspect-square object-contain"
              />
            </span>
            <h2 className="font-display text-[25px]/[1.3]">{announcement.title}</h2>
            <time className="mt-2 block font-body text-[13.5px] font-semibold text-soft">
              {announcement.publishedAt &&
                new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(
                  new Date(announcement.publishedAt),
                )}
            </time>
            <p className="mt-4 font-body text-[16.5px]/[1.95] font-medium whitespace-pre-line text-ink/80">
              {announcement.body}
            </p>
          </article>
        )}

        <div className="mt-6">
          <Link
            href="/notifications"
            className={buttonVariants({ variant: 'outline', class: 'bg-surface' })}
          >
            {t('detailBack')}
          </Link>
        </div>
      </div>
    </RoleRouteGuard>
  )
}
