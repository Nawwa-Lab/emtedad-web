'use client'

import CommunityIcon from '@/app/circles.svg'
import OrgIcon from '@/app/gate.svg'
import { Button } from '@/components/ui/button'
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemDescription,
  RadioGroupItemIcon,
  RadioGroupItemTitle,
} from '@/components/ui/radio-group'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

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

export default function ContextSelectionClient() {
  const { user, setUser } = useUser()
  const [context, setContext] = useState(user?.context || 'org')
  const t = useTranslations('contextSelection')
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = getReturnTo(searchParams.get('redirect'))

  return (
    <>
      <RadioGroup value={context} onValueChange={setContext}>
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

      <Button
        onClick={() => {
          if (user) setUser({ ...user, context })
          router.replace(returnTo)
        }}
      >
        {t('submit')}
      </Button>
    </>
  )
}
