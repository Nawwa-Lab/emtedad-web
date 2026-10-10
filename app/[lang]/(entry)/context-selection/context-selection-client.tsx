'use client'

import maktab from '@/app/maktab.svg'
import namliya from '@/app/namliya.svg'
import { Button } from '@/components/ui/button'
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemDescription,
  RadioGroupItemIcon,
  RadioGroupItemTitle,
} from '@/components/ui/radio-group'
import { useUser } from '@/components/UserContext'
import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

export default function ContextSelectionClient() {
  const { user, setUser } = useUser()
  const [context, setContext] = useState(user?.context || 'org')
  const t = useTranslations('contextSelection')
  const router = useRouter()

  return (
    <>
      <RadioGroup value={context} onValueChange={setContext}>
        <RadioGroupItem value="org" aria-label={t('orgTitle')}>
          <RadioGroupItemIcon>
            <Image src={maktab} alt="" className="size-full" />
          </RadioGroupItemIcon>
          <RadioGroupItemTitle>{t('orgTitle')}</RadioGroupItemTitle>
          <RadioGroupItemDescription>{t('orgDesc')}</RadioGroupItemDescription>
        </RadioGroupItem>

        <RadioGroupItem value="community" aria-label={t('pubTitle')}>
          <RadioGroupItemIcon>
            <Image src={namliya} alt="" className="size-full" />
          </RadioGroupItemIcon>
          <RadioGroupItemTitle>{t('pubTitle')}</RadioGroupItemTitle>
          <RadioGroupItemDescription>{t('pubDesc')}</RadioGroupItemDescription>
        </RadioGroupItem>
      </RadioGroup>

      <Button
        onClick={() => {
          if (user) setUser({ ...user, context })
          router.push('/')
        }}
      >
        {t('submit')}
      </Button>
    </>
  )
}
