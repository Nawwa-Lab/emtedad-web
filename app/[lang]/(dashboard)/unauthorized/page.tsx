import { Card } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import KeyIcon from '@/icons/key.svg'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function UnauthorizedPage() {
  const t = await getTranslations('unauthorized')

  return (
    <div className="flex min-h-full items-center justify-center py-8">
      <Card className="w-full max-w-[620px] px-8 py-10 text-center shadow-[8px_8px_0] max-sm:px-5">
        <span className="mx-auto grid size-20 place-items-center rounded-full border-3 border-ink bg-gold shadow-[4px_4px_0] shadow-ink">
          <Image src={KeyIcon} alt="" className="size-10" />
        </span>
        <p className="mt-5 font-body text-[13px] font-extrabold tracking-[0.18em] text-soft uppercase">
          {t('eyebrow')}
        </p>
        <h1 className="mt-2 font-display text-[clamp(28px,3.4vw,38px)]/[1.25]">{t('title')}</h1>
        <p className="mx-auto mt-3 max-w-[46ch] font-body text-[16.5px]/[1.95] font-medium text-soft">
          {t('description')}
        </p>
        <Link
          href="/"
          className={buttonVariants({
            className: 'mt-6 h-auto min-w-55 px-6 py-3 text-[16px]',
          })}
        >
          {t('home')}
        </Link>
      </Card>
    </div>
  )
}
