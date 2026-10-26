'use client'

import CommunityIcon from '@/icons/circles.svg'
import OrgIcon from '@/icons/gate.svg'
import TargetIcon from '@/icons/target.svg'
import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemDescription,
  RadioGroupItemIcon,
  RadioGroupItemTitle,
} from '@/components/ui/radio-group'
import { useRouter } from '@/i18n/navigation'
import { useContextSwitchMutation } from '@/services/auth'
import { toast } from '@/components/ui/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Controller } from 'react-hook-form'
import { z } from 'zod'

const contextSelectionSchema = z.object({
  context: z.enum(['org', 'community']),
})

type ContextSelectionFormValues = z.infer<typeof contextSelectionSchema>

function getReturnTo(redirect: string | null) {
  if (!redirect || !redirect.startsWith('/') || redirect.startsWith('//')) {
    return '/'
  }

  const url = new URL(redirect, window.location.origin)
  if (url.origin !== window.location.origin || url.pathname === '/context-selection') {
    return '/'
  }

  return `${url.pathname}${url.search}${url.hash}`
}

export default function ContextSelectionPage() {
  const t = useTranslations('contextSelection')
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = getReturnTo(searchParams.get('redirect'))
  const contextSwitch = useContextSwitchMutation()

  const onSubmit = ({ context }: ContextSelectionFormValues) => {
    contextSwitch.mutate(
      { context },
      {
        onSuccess: () => router.replace(returnTo),
        onError: () => toast.add({ title: t('switchFailed'), type: 'error', priority: 'high' }),
      },
    )
  }

  return (
    <div className="relative w-[min(760px,100%)] text-center">
      <h1 className="font-display font-bold text-[clamp(30px,4.6vw,42px)]/[1.3]">{t('title')}</h1>
      <p className="font-body font-medium text-[16.5px] text-soft mt-2 mb-7">{t('subtitle')}</p>

      <Form<ContextSelectionFormValues>
        resolver={zodResolver(contextSelectionSchema)}
        defaultValues={{ context: undefined }}
        onSubmit={onSubmit}
      >
        <Controller
          name="context"
          render={({ field }) => (
            <>
              <RadioGroup
                value={field.value ?? ''}
                onValueChange={field.onChange}
                aria-label={t('selectionLabel')}
              >
                <RadioGroupItem value="org" aria-label={t('orgTitle')}>
                  <RadioGroupItemIcon>
                    <Image src={OrgIcon} alt="" className="size-full" />
                  </RadioGroupItemIcon>
                  <RadioGroupItemTitle>{t('orgTitle')}</RadioGroupItemTitle>
                  <RadioGroupItemDescription>{t('orgDesc')}</RadioGroupItemDescription>
                </RadioGroupItem>

                <RadioGroupItem value="community" aria-label={t('pubTitle')}>
                  <RadioGroupItemIcon>
                    <Image src={CommunityIcon} alt="" className="size-full" />
                  </RadioGroupItemIcon>
                  <RadioGroupItemTitle>{t('pubTitle')}</RadioGroupItemTitle>
                  <RadioGroupItemDescription>{t('pubDesc')}</RadioGroupItemDescription>
                </RadioGroupItem>
              </RadioGroup>

              <div className="mt-5.5 flex items-center gap-3 rounded-panel border-[2.5px] border-ink bg-surface px-5 py-4 text-start shadow-ink shadow-[4px_4px_0]">
                <Image src={TargetIcon} alt="" className="size-10 shrink-0" />
                <p className="font-body text-[15px]/[1.85] font-semibold text-ink">
                  <strong className="font-display text-[17px] font-normal">{t('noteTitle')}</strong>{' '}
                  {t('noteDescription')}
                </p>
              </div>

              <Button
                type="submit"
                className="mt-6 min-w-55"
                disabled={!field.value}
                loading={contextSwitch.isPending}
              >
                {t('submit')}
              </Button>
              <p className="mt-4 font-body text-[14.5px] font-semibold text-soft">
                {t('switchHint')}
              </p>
            </>
          )}
        />
      </Form>
    </div>
  )
}
