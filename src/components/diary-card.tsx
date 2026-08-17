import { EmojiBadge } from "@/components/emoji-scale";
import type { DiaryEntry } from "@/db/schema";
import { formatShortDate } from "@/lib/format";
import Link from "next/link";

export function DiaryCard({
  entry,
  featured = false,
}: {
  entry: DiaryEntry;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/tagebuch/${entry.id}`}
      className={`group glass relative overflow-hidden rounded-[2rem] transition hover:-translate-y-1 hover:border-aurora/30 ${
        featured ? "md:col-span-7 min-h-[420px]" : "md:col-span-5 min-h-[320px]"
      }`}
    >
      <div className="absolute inset-0">
        {entry.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.imageUrl}
            alt=""
            className="h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-70"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(62,240,210,0.18),transparent_45%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#3b2750] via-[#3b2750]/55 to-transparent" />
      </div>

      <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs tracking-[0.18em] text-mint uppercase">
          <span>{entry.day}</span>
          <span className="text-white/50">•</span>
          <span>{formatShortDate(entry.date)}</span>
        </div>
        <h3 className="font-display text-3xl leading-none text-white md:text-4xl">
          {entry.title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">
          {entry.location}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-white">
          <EmojiBadge emoji={entry.emoji} />
          {entry.highlights[0] ? (
            <span className="text-sm text-white/85">{entry.highlights[0]}</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
