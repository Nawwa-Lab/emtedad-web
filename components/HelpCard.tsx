import { Card } from '@/components/ui/card'

interface HelpCardProps {
  title: string
  tips: string[]
}

export function HelpCard({ title, tips }: HelpCardProps) {
  return (
    <Card className="p-5.5 hidden lg:block w-full">
      <h2 className="font-display font-bold text-[15px] text-green-deep mb-2.5">{title}</h2>
      <ul className="list-none space-y-0">
        {tips.map((tip) => (
          <li
            key={tip}
            className="relative font-cairo font-semibold text-[12.5px] text-ink-soft leading-[1.95] ps-5 mb-2 last:mb-0"
          >
            <span className="absolute start-0.5 top-2.5 w-[7px] h-[7px] rounded-full bg-green" />
            {tip}
          </li>
        ))}
      </ul>
    </Card>
  )
}
