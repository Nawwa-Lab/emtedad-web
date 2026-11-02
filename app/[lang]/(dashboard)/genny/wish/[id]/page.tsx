import { WishForm } from '@/components/WishForm'
import { wishServerApi } from '@/services/wishes/server'

export default async function EditWishPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const wish = await wishServerApi.get('network', id)

  return (
    <WishForm
      family="genny"
      mode="edit"
      wishId={id}
      suggestions={[]}
      initialWish={{
        title: wish.title,
        category: wish.category,
        description: wish.description,
        impact: wish.impact ?? '',
      }}
    />
  )
}
