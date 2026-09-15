import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "@/i18n/navigation";
import { StatusBadge, getVariantFromLabel } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";

interface EntityCardProps {
    title: string;
    entity: string;
    entityFirstLetter: string;
    viewProfileHref: string;
    viewProfileLabel: string;
    viewProfileBadge?: string;
    className?: string;
}

export function EntityCard({
    title,
    entity,
    entityFirstLetter,
    viewProfileHref,
    viewProfileLabel,
    viewProfileBadge,
    className,
}: EntityCardProps) {
    return (
        <Card className={cn("p-4 sm:p-6 bg-surface border border-line rounded-[22px]", className)}>
            <CardHeader className="font-display font-bold text-lg text-green-deep mb-0 p-0">
                {title}
            </CardHeader>
            <CardContent className="flex items-center gap-3.5 py-3.25 px-0 pb-0">
                <Avatar className="bg-green text-ink w-11 h-11 shrink-0">
                    <AvatarFallback className="font-bold text-[17px]">
                        {entityFirstLetter}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <span className="block font-extrabold text-[13.5px] font-cairo">
                        {entity}
                    </span>
                    <Link
                        href={viewProfileHref}
                        className="font-bold text-[11.5px] font-cairo hover:underline text-green-deep"
                    >
                        {viewProfileLabel}
                    </Link>
                </div>
                {viewProfileBadge && (
                    <StatusBadge
                        variant={getVariantFromLabel(viewProfileBadge)}
                        label={viewProfileBadge}
                        shape="pill"
                        className="text-ink! ms-auto"
                    />
                )}
            </CardContent>
        </Card>
    );
}