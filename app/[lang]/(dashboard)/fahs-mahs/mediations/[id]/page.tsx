import { notFound } from 'next/navigation'
import { closedMediations, mediations } from '../../data'
import MediationWorkspace from './workspace'

export default async function MediationPage({
  params,
}: PageProps<'/[lang]/fahs-mahs/mediations/[id]'>) {
  const { id } = await params
  const item = [...mediations, ...closedMediations].find((entry) => entry.id === id)
  if (!item) notFound()
  return <MediationWorkspace item={item} />
}
