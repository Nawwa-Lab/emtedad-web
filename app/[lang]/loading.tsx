import { Loader } from '@/components/ui/loader'
import { getTranslations } from 'next-intl/server'

export default async function Loading() {
  const t = await getTranslations('global.loading')

  return <Loader description={t('description')} />
}
