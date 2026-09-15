"use client";

import { Link, usePathname } from "@/i18n/navigation";

interface NavLink {
    href: string;
    label: string;
}

const activeClass =
    "bg-green font-cairo border-transparent text-ink inline-block rounded-[999px] font-bold text-[11.5px] sm:text-[12px] py-1.5 sm:py-1.75 px-3 sm:px-3.75";

const inactiveClass =
    "border border-line font-cairo bg-surface text-ink inline-block rounded-[999px] font-bold text-[11.5px] sm:text-[12px] py-1.5 sm:py-1.75 px-3 sm:px-3.75 hover:border-green-deep";

export function SupLinks({ links }: { links: NavLink[] }) {
    const pathname = usePathname();

    return (
        <div className="mt-4 mx-0 mb-2 flex flex-wrap gap-2">
            {links.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={pathname === href ? activeClass : inactiveClass}
                >
                    {label}
                </Link>
            ))}
        </div>
    );
}