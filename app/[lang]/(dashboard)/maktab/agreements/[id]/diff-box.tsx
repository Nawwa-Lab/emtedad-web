import { cn } from 'cn'

/**
 * Before/after diff box shared by the agreement detail (panel-22) and the
 * amendments review (panel-22_1) rows.
 */
export function DiffBox({
  label,
  text,
  tone = 'surface',
  state,
}: {
  label: React.ReactNode
  text: React.ReactNode
  /** `surface` = panel-22 boxes, `paper` = panel-22_1 boxes. */
  tone?: 'surface' | 'paper'
  state?: 'old' | 'new'
}) {
  const paper = tone === 'paper'

  return (
    <div
      className={cn(
        'rounded-field border-[2.5px] border-ink',
        paper ? 'bg-paper p-3.5 px-4' : 'bg-surface py-3 px-[15px]',
        state === 'new' && 'border-red',
        state === 'new' && paper && 'bg-surface',
      )}
    >
      <span
        className={cn(
          'block text-[12.5px] font-extrabold text-soft',
          paper ? 'mb-1.5' : 'mb-[5px]',
        )}
      >
        {label}
      </span>
      <p
        className={cn(
          'font-medium leading-[1.85]',
          paper ? 'text-[16px]' : 'text-[15.5px]',
          state === 'old' && (paper ? 'line-through opacity-60' : 'line-through opacity-[0.62]'),
        )}
      >
        {text}
      </p>
    </div>
  )
}
