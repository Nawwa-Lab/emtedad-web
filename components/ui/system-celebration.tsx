import { cn } from 'cn'
import Image, { type StaticImageData } from 'next/image'

export function SystemCelebration({
  icon,
  title,
  description,
  className,
}: {
  icon: StaticImageData
  title: React.ReactNode
  description: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-panel border-[3px] border-ink bg-surface px-7 py-10 text-center shadow-[8px_8px_0] shadow-gold',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="dot-grid-bg dot-grid-bg-mask absolute inset-0 opacity-22"
      />
      <div className="relative z-10">
        <Image
          src={icon}
          alt=""
          className="mx-auto mb-4.5 size-18 animate-in zoom-in-50 duration-500"
        />
        <h2 className="font-display text-3xl/[1.2] font-normal">{title}</h2>
        <p className="mx-auto mt-2.75 max-w-160 font-body text-[15.5px]/[1.9] font-semibold text-soft">
          {description}
        </p>
      </div>
    </section>
  )
}
