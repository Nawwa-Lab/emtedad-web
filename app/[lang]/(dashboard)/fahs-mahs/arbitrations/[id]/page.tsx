import { notFound } from 'next/navigation'
import { appeals, arbitrations } from '../../data'
import ArbitrationWorkspace from './workspace'

export default async function ArbitrationPage({
  params,
}: PageProps<'/[lang]/fahs-mahs/arbitrations/[id]'>) {
  const { id } = await params
  const item = [...arbitrations, ...appeals].find((entry) => entry.id === id)
  if (!item) notFound()
  return <ArbitrationWorkspace item={item} />
}
