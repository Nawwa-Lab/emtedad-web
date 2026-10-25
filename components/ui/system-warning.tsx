import { cn } from 'cn'
import Image, { type StaticImageData } from 'next/image'

const tones = {
  gold: 'bg-gold text-ink',
  red: 'bg-red text-surface',
  blue: 'bg-blue text-surface',
} as const

export function SystemWarning({
  tone,
  icon,
  title,
  description,
  progress,
  className,
}: {
  tone: keyof typeof tones
  icon: StaticImageData
  title: React.ReactNode
  description: React.ReactNode
  progress?: number
  className?: string
}) {
  return (
    <aside
      className={cn(
        'flex items-start gap-3.75 rounded-panel border-[3px] border-ink px-6 py-5 shadow-[5px_5px_0] shadow-ink',
        tones[tone],
        className,
      )}
    >
      <Image src={icon} alt="" className="h-8.5 w-8 shrink-0" />
      <div className="min-w-0 flex-1">
        <h2 className="font-display text-[21px]/[1.3] font-normal">{title}</h2>
        <p className="mt-1.5 font-body text-[14.5px]/[1.9] font-semibold">{description}</p>
        {progress !== undefined && (
          <span
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="mt-3.25 block h-3 overflow-hidden rounded-full border-[2.5px] border-ink bg-surface"
          >
            <i className="block h-full bg-ink" style={{ width: `${progress}%` }} />
          </span>
        )}
      </div>
    </aside>
  )
}
