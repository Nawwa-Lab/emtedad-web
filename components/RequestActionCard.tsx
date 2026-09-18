import { Card, CardDescription } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'

interface RequestActionCardProps {
    requestLabel: string
    requestHref?: string
    saveLabel: string
    saveHref?: string
    note: string
    className?: string
}

export function RequestActionCard({
    requestLabel,
    requestHref = '#',
    saveLabel,
    saveHref = '#',
    note,
    className,
}: RequestActionCardProps) {
    return (
        <Card
            className={`
        flex flex-col items-center justify-center gap-0 lg:gap-2.5 p-5.5
        fixed inset-x-0 bottom-0 z-40 rounded-none border-x-0 border-b-0
        sm:inset-s-52.5
        pb-[calc(1.375rem+env(safe-area-inset-bottom))]
        lg:static lg:z-auto lg:bottom-auto lg:inset-x-auto lg:inset-s-auto lg:rounded-2xl lg:border lg:mb-4
        lg:items-stretch lg:justify-start
        ${className ?? ''}
      `}
        >
            <div className="flex flex-row gap-2.5 lg:flex-col">
                <Link
                    href={requestHref}
                    className="text-center text-[14px] py-3 px-4 sm:px-5 flex-1 lg:flex-none lg:w-full bg-green text-ink border-0 rounded-[999px] cursor-pointer font-cairo font-extrabold inline-block"
                >
                    {requestLabel}
                </Link>
                <Link
                    href={saveHref}
                    className="text-center text-[13px] py-2.75 px-4 sm:px-5 flex-1 lg:flex-none lg:w-full text-green-deep border border-green-deep hover:bg-green rounded-[999px] cursor-pointer font-cairo font-extrabold inline-block"
                >
                    {saveLabel}
                </Link>
            </div>
            <CardDescription className="font-semibold text-[11.5px] text-ink-soft text-center leading-[1.8] mb-0 mt-2">
                {note}
            </CardDescription>
        </Card>
    )
}