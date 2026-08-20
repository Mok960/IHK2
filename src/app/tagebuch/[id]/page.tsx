import { AdminOnly } from "@/components/auth-controls";
import { DeleteButton } from "@/components/delete-button";
import { EmojiBadge } from "@/components/emoji-scale";
import { db } from "@/db";
import { diaryEntries } from "@/db/schema";
import { formatLongDate } from "@/lib/format";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const entry = await getEntry(id);
  return { title: entry?.title ?? "Eintrag" };
}

async function getEntry(id: string) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) {
    return null;
  }
  const [entry] = await db
    .select()
    .from(diaryEntries)
    .where(eq(diaryEntries.id, numericId))
    .limit(1);
  return entry ?? null;
}

export default async function DiaryDetailPage({ params }: PageProps) {
  const { id } = await params;
  if (id === "neu") {
    redirect("/tagebuch/neu");
  }
  const entry = await getEntry(id);

  if (!entry) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/tagebuch" className="text-sm text-muted hover:text-aurora">
          ← Alle Einträge
        </Link>
        <AdminOnly>
          <div className="flex gap-2">
            <Link
              href={`/tagebuch/${entry.id}/bearbeiten`}
              className="rounded-full border border-white/10 px-4 py-2 text-sm hover:border-aurora/40"
            >
              Bearbeiten
            </Link>
            <DeleteButton
              label="Löschen"
              confirmText="Diesen Eintrag wirklich löschen?"
              href={`/api/diary/${entry.id}`}
              className="rounded-full border border-danger/30 px-4 py-2 text-sm text-danger hover:bg-danger/10"
            />
          </div>
        </AdminOnly>
      </div>

      <article className="overflow-hidden rounded-[2.2rem] border border-lilac/15">
        <div className="relative min-h-[360px] bg-lilac/10">
          {entry.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={entry.imageUrl}
              alt={entry.title}
              className="h-[420px] w-full object-cover"
            />
          ) : (
            <div className="grid h-[320px] place-items-center text-muted">
              Noch kein Bild hinterlegt
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3b2750] via-transparent to-lilac/20" />
          <div className="absolute right-6 bottom-6 left-6 text-white">
            <p className="text-xs tracking-[0.28em] text-mint uppercase">
              {entry.day} · {formatLongDate(entry.date)}
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl">{entry.title}</h1>
          </div>
        </div>

        <div className="tagebuch-description-container grid gap-6 p-6 md:grid-cols-[1.4fr_0.8fr] md:p-8">
          <div>
            <p className="text-xs tracking-[0.22em] text-muted uppercase">
              Beschreibung
            </p>
            <p className="mt-4 text-base leading-8 text-ink/88">{entry.description}</p>

            {entry.highlights.length > 0 ? (
              <div className="mt-10">
                <p className="text-xs tracking-[0.22em] text-amber uppercase">
                  Highlights
                </p>
                <ul className="mt-4 space-y-3">
                  {entry.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-amber/40 bg-amber/15 px-4 py-3"
                    >
                      <span className="mt-0.5 text-amber">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside className="space-y-4">
            <div className="rounded-[1.6rem] border border-peach/40 bg-peach/20 p-5">
              <p className="text-xs tracking-[0.2em] text-muted uppercase">Ort</p>
              <p className="mt-2 font-display text-2xl">{entry.location}</p>
            </div>
            <div className="rounded-[1.6rem] border border-lilac/30 bg-lilac/15 p-5">
              <p className="text-xs tracking-[0.2em] text-muted uppercase">
                Stimmung
              </p>
              <div className="mt-3">
                <EmojiBadge emoji={entry.emoji} />
              </div>
            </div>
            <div className="rounded-[1.6rem] border border-mint/40 bg-mint/15 p-5">
              <p className="text-xs tracking-[0.2em] text-muted uppercase">
                Mitgenommen
              </p>
              {entry.itemsBrought.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.itemsBrought.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-aurora/20 bg-aurora/8 px-3 py-1 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted">Nichts notiert.</p>
              )}
            </div>
            {entry.linkUrl ? (
              <a
                href={entry.linkUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded-[1.6rem] border border-violet/25 bg-violet/10 p-5 transition hover:bg-violet/16"
              >
                <p className="text-xs tracking-[0.2em] text-violet uppercase">
                  Link
                </p>
                <p className="mt-2 text-lg">{entry.linkLabel || entry.linkUrl}</p>
                <p className="mt-2 text-sm text-muted">Extern öffnen →</p>
              </a>
            ) : null}
          </aside>
        </div>
      </article>
    </main>
  );
}
