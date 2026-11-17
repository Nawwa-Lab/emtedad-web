'use client'

import { use } from 'react'
import { Conversation } from './conversation'
import { threads } from './data'

export default function ConversationPage({ params }: PageProps<'/[lang]/maktab/messages/[id]'>) {
  const { id } = use(params)
  const thread = threads[id] ?? threads.halqa

  return <Conversation id={id} thread={thread} />
}
