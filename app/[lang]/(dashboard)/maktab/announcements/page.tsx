'use client'

import { RoleRouteGuard } from '@/components/RoleRouteGuard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/toast'
import CirclesIcon from '@/icons/circles.svg'
import LanternIcon from '@/icons/lantern.svg'
import WaveIcon from '@/icons/wave.svg'
import {
  type Announcement,
  type AnnouncementAudience,
  type AnnouncementStatus,
  useAnnouncementsQuery,
  useSaveAnnouncement,
} from '@/services/notifications'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState, type FormEvent } from 'react'

const audiences: AnnouncementAudience[] = ['organizations', 'team_members', 'public']
const tabs = ['new', 'history', 'meetings'] as const
type Tab = (typeof tabs)[number]
const tabHashes: Record<Tab, string> = { new: 'new', history: 'past', meetings: 'meet' }

const meetingHosts = [
  { key: 'storyHouse', status: 'past' },
  { key: 'cityVoice', status: 'past' },
  { key: 'noonHouse', status: 'past' },
  { key: 'mishkah', status: 'current' },
  { key: 'workshopStudio', status: 'next' },
  { key: 'bigNight', status: 'next' },
] as const

export default function AnnouncementsPage() {
  const t = useTranslations('announcements')
  const locale = useLocale()
  const { data = [], isPending } = useAnnouncementsQuery()
  const saveAnnouncement = useSaveAnnouncement()
  const [tab, setTab] = useState<Tab>('new')
  const [draftId, setDraftId] = useState<string>()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [selected, setSelected] = useState<AnnouncementAudience[]>(['organizations'])

  useEffect(() => {
    const syncHash = () => {
      const entry = Object.entries(tabHashes).find(([, hash]) => hash === location.hash.slice(1))
      if (entry) setTab(entry[0] as Tab)
    }
    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  const selectTab = (value: Tab) => {
    setTab(value)
    window.history.replaceState(null, '', `#${tabHashes[value]}`)
  }

  const reset = () => {
    setDraftId(undefined)
    setTitle('')
    setBody('')
    setSelected(['organizations'])
  }

  const edit = (announcement: Announcement) => {
    setDraftId(announcement.announcementId)
    setTitle(announcement.title)
    setBody(announcement.body)
    setSelected(announcement.audiences)
    selectTab('new')
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const status = (event.nativeEvent as SubmitEvent).submitter?.getAttribute(
      'value',
    ) as AnnouncementStatus
    if (!title.trim() || !body.trim() || !selected.length) return

    try {
      await saveAnnouncement.mutateAsync({
        id: draftId,
        input: { title: title.trim(), body: body.trim(), audiences: selected, status },
      })
      toast.add({ title: status === 'draft' ? t('savedTitle') : t('publishedTitle') })
      reset()
      selectTab('history')
    } catch {
      toast.add({ title: t('errorTitle'), type: 'error' })
    }
  }

  return (
    <RoleRouteGuard roles={['emtedad_admin']}>
      <div className="mx-auto max-w-[980px]">
        <header className="mb-[26px] flex flex-wrap items-end gap-5">
          <h1 className="font-display text-[clamp(44px,5.4vw,70px)]/[1.14]">{t('title')}</h1>
          <p className="pb-1.5 font-body text-[17px] font-medium text-soft">{t('description')}</p>
        </header>

        <nav
          aria-label={t('tabsLabel')}
          className="mb-[26px] flex flex-wrap gap-2.5"
          role="tablist"
        >
          {tabs.map((value) => (
            <button
              key={value}
              type="button"
              aria-selected={tab === value}
              role="tab"
              onClick={() => selectTab(value)}
              className={cn(
                'inline-flex cursor-pointer items-center rounded-full border-[2.5px] border-ink bg-surface px-[19px] py-[9px] font-body text-[14.5px] font-extrabold text-ink shadow-[3px_3px_0] shadow-ink transition hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue',
                tab === value && 'bg-ink text-surface',
              )}
            >
              {t(`${value}Tab`)}
            </button>
          ))}
        </nav>

        {tab === 'new' ? (
          <section className="mb-[22px] rounded-panel border-3 border-ink bg-surface px-7 py-[26px] shadow-[6px_6px_0] shadow-ink max-[620px]:px-[18px] max-[620px]:py-[22px]">
            <h2 className="flex items-center gap-[13px] font-display text-[25px]/[1.25]">
              <span className="grid h-[34px] w-8 shrink-0 place-items-center overflow-hidden">
                <Image src={LanternIcon} alt="" className="max-h-full max-w-full object-contain" />
              </span>
              {t('formTitle')}
            </h2>
            <form onSubmit={submit}>
              <label className="mb-5 block">
                <span className="mb-[9px] block font-body text-[15px] font-bold text-soft">
                  {t('titleLabel')}
                </span>
                <Input
                  required
                  maxLength={180}
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder={t('titlePlaceholder')}
                />
              </label>
              <label className="mb-5 block">
                <span className="mb-[9px] block font-body text-[15px] font-bold text-soft">
                  {t('bodyLabel')}
                </span>
                <Textarea
                  required
                  maxLength={5000}
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  placeholder={t('bodyPlaceholder')}
                  className="min-h-[150px]"
                />
              </label>

              <fieldset className="mb-5">
                <legend className="mb-[9px] font-body text-[15px] font-bold text-soft">
                  {t('audienceLabel')}
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {audiences.map((audience) => {
                    const checked = selected.includes(audience)
                    return (
                      <label
                        key={audience}
                        className={cn(
                          'inline-flex cursor-pointer items-center gap-[9px] rounded-full border-[2.5px] border-ink bg-surface px-[18px] py-[9px] font-body text-sm font-bold',
                          checked && 'bg-ink text-surface',
                        )}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() =>
                            setSelected((current) =>
                              checked
                                ? current.filter((value) => value !== audience)
                                : [...current, audience],
                            )
                          }
                        />
                        <span
                          className={cn(
                            'relative block size-[19px] shrink-0 rounded-md border-[2.5px] border-ink bg-surface',
                            checked &&
                              'after:absolute after:inset-[3px_5px_6px_5px] after:-rotate-45 after:border-b-[3px] after:border-l-[3px] after:border-ink',
                          )}
                        />
                        {t(`audiences.${audience}`)}
                      </label>
                    )
                  })}
                </div>
                <p className="mt-[7px] font-body text-[13.5px]/[1.7] font-semibold text-soft">
                  {t('audienceHint')}
                </p>
              </fieldset>

              <section className="mt-5 rounded-panel border-3 border-dashed border-ink bg-paper px-6 py-[22px]">
                <span className="mb-3 block font-body text-[12.5px] font-extrabold text-soft">
                  {t('previewLabel')}
                </span>
                <h3 className="font-display text-[23px]/[1.3]">
                  {title.trim() || t('previewTitle')}
                </h3>
                <p className="mt-2.5 font-body text-[15.5px]/[1.95] font-medium text-soft">
                  {body.trim().length > 120
                    ? `${body.trim().slice(0, 120)}…`
                    : body.trim() || t('previewBody')}
                </p>
              </section>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button value="published" disabled={!selected.length || saveAnnouncement.isPending}>
                  {t('publish')}
                </Button>
                <Button
                  value="draft"
                  variant="outline"
                  disabled={!selected.length || saveAnnouncement.isPending}
                >
                  {t('saveDraft')}
                </Button>
                {draftId && (
                  <Button type="button" variant="link" onClick={reset}>
                    {t('newAfterEdit')}
                  </Button>
                )}
              </div>
            </form>
          </section>
        ) : tab === 'history' ? (
          <div>
            {isPending && (
              <p className="py-8 text-center font-body font-bold text-soft">{t('loading')}</p>
            )}
            {!isPending && !data.length && (
              <p className="rounded-panel border-3 border-dashed border-ink bg-paper px-[26px] py-10 text-center font-body text-[16.5px]/[1.95] font-semibold text-soft">
                {t('emptyHistory')}
              </p>
            )}
            {data.map((announcement) => (
              <article
                key={announcement.announcementId}
                className="mb-4 rounded-panel border-3 border-ink bg-surface px-[22px] py-5 shadow-[5px_5px_0] shadow-ink transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-[3px] hover:shadow-[8px_9px_0]"
              >
                <div className="flex flex-wrap items-start gap-3">
                  <h2 className="min-w-[170px] flex-1 font-display text-[22px]/[1.3]">
                    {announcement.title}
                  </h2>
                  {announcement.audiences.map((audience) => (
                    <span
                      key={audience}
                      className={cn(
                        'whitespace-nowrap rounded-full border-[2.5px] border-ink bg-paper px-[13px] py-1 font-body text-[12.5px] font-extrabold',
                        audience === 'organizations' && 'bg-blue text-surface',
                      )}
                    >
                      {t(`audiences.${audience}`)}
                    </span>
                  ))}
                </div>
                <div className="mt-2.5 flex flex-wrap items-center gap-2.5 font-body text-sm font-semibold text-soft">
                  <span>{t(announcement.status)}</span>
                  <span className="size-1 rounded-full bg-ink/35" />
                  <time>
                    {new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(
                      new Date(announcement.publishedAt ?? announcement.updatedAt),
                    )}
                  </time>
                  {announcement.status === 'draft' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="ms-auto"
                      onClick={() => edit(announcement)}
                    >
                      {t('editDraft')}
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div>
            <aside className="mb-6 flex items-start gap-[15px] rounded-panel border-3 border-ink bg-blue px-6 py-5 text-surface shadow-[6px_6px_0] shadow-ink">
              <span className="grid h-[34px] w-8 shrink-0 place-items-center overflow-hidden">
                <Image src={WaveIcon} alt="" className="max-h-full max-w-full object-contain" />
              </span>
              <div>
                <h2 className="font-display text-[21px]/[1.3]">{t('meetingsNoticeTitle')}</h2>
                <p className="mt-1.5 font-body text-[14.5px]/[1.9] font-semibold">
                  {t('meetingsNoticeBody')}
                </p>
              </div>
            </aside>

            <section className="mb-[22px] rounded-panel border-3 border-ink bg-surface px-7 py-[26px] shadow-[6px_6px_0] shadow-ink max-[620px]:px-[18px] max-[620px]:py-[22px]">
              <h2 className="flex items-center gap-[13px] font-display text-[25px]/[1.25]">
                <span className="grid h-[34px] w-8 shrink-0 place-items-center overflow-hidden">
                  <Image
                    src={CirclesIcon}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                  />
                </span>
                {t('meetingsOrderTitle')}
              </h2>
              <p className="mt-[9px] mb-5 font-body text-base/[1.95] font-medium text-soft">
                {t('meetingsOrderDescription')}
              </p>
              {meetingHosts.map((host, index) => (
                <div
                  key={host.key}
                  className={cn(
                    'mb-3 flex items-center gap-3.5 rounded-card border-[2.5px] border-ink bg-surface px-[17px] py-3.5',
                    host.status === 'past' && 'border-dashed opacity-60',
                    host.status === 'current' && 'border-3 bg-gold shadow-[4px_4px_0] shadow-ink',
                  )}
                >
                  <span
                    className={cn(
                      'grid size-[38px] shrink-0 place-items-center rounded-[11px] border-[2.5px] border-ink bg-paper font-display text-lg/[1]',
                      host.status === 'current' && 'bg-ink text-surface',
                    )}
                  >
                    {new Intl.NumberFormat(locale).format(index + 1)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="block font-body text-[15.5px]/[1.4] font-extrabold">
                      <span className="inline border-b-[2.5px] border-red pb-px hover:text-red">
                        {t(`meetingHosts.${host.key}.name`)}
                      </span>
                    </strong>
                    <span
                      className={cn(
                        'mt-1 block font-body text-[12.5px] font-semibold text-soft',
                        host.status === 'current' && 'text-ink/75',
                      )}
                    >
                      {t(`meetingHosts.${host.key}.detail`)}
                    </span>
                  </span>
                </div>
              ))}
            </section>
          </div>
        )}
      </div>
    </RoleRouteGuard>
  )
}
