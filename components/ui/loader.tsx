import Star from '@/icons/star.svg'
import Image from 'next/image'

export function Loader({ description }: { description: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="grid min-h-dvh w-full place-items-center bg-paper"
    >
      <div className="flex flex-col items-center gap-5 px-6 text-center">
        <Image src={Star} alt="" priority className="size-24 animate-spin" />
        <p className="max-w-sm font-body text-lg font-semibold leading-relaxed text-soft">
          {description}
        </p>
      </div>
    </div>
  )
}
