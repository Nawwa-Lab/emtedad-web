"use client";
import { CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useTranslations } from "next-intl";

type InfoRowKey = "countryCity" | "foundingYear" | "website" | "socialMedia";

type InfoRow = {
  key: InfoRowKey;
  isLink?: boolean;
};

const infoRows: InfoRow[] = [
  { key: "countryCity" },
  { key: "foundingYear" },
  { key: "website", isLink: true },
  { key: "socialMedia", isLink: true },
];

const isLinkValue = (value: string) => /^https?:\/\//.test(value);

export function InfoCardList() {
  const t = useTranslations("infoCard");

  return (
    <>
      {infoRows.map((row) => {
        const label = t(`${row.key}.label`);
        const value = t(`${row.key}.value`);
        const linked = row.isLink ?? isLinkValue(value);

        return (
          <CardContent
            key={row.key}
            className="flex justify-between gap-3 border-b border-line-soft py-2.5 px-0 text-[12.5px] font-cairo"
          >
            <span className="font-semibold text-ink-soft font-cairo">
              {label}
            </span>

            {linked ? (
              <Link
                href={value.startsWith("http") ? value : `https://${value}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-extrabold text-start text-green-deep font-cairo"
              >
                {value}
              </Link>
            ) : (
              <span className="font-extrabold text-start font-cairo">
                {value}
              </span>
            )}
          </CardContent>
        );
      })}
    </>
  );
}