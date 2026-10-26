import { cn } from 'cn'
import Image, { type StaticImageData } from 'next/image'

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon: StaticImageData
  title: React.ReactNode
  description: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'rounded-panel border-[3px] border-dashed border-ink bg-paper px-6 py-6.5 text-center',
        className,
      )}
    >
      <Image src={icon} alt="" className="mx-auto mb-4 size-13.5 opacity-50" />
      <h2 className="font-display text-[22px]/[1.3] font-normal">{title}</h2>
      <p className="mx-auto mt-2.25 max-w-140 font-body text-[14.5px]/[1.85] font-semibold text-soft">
        {description}
      </p>
      {action && <div className="mt-4.5">{action}</div>}
    </section>
  )
}
