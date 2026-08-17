import { AdminOnly } from "@/components/auth-controls";
import { DiaryCard } from "@/components/diary-card";
import { db } from "@/db";
import { diaryEntries } from "@/db/schema";
import { seedIfEmpty } from "@/db/seed";
import { desc } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tagebuch",
};

export default async function DiaryPage() {
  await seedIfEmpty();
  const entries = await db
    .select()
    .from(diaryEntries)
    .orderBy(desc(diaryEntries.date), desc(diaryEntries.id));

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-14">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs tracking-[0.28em] text-aurora uppercase">
            Laborprotokoll
          </p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">Tagebuch</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
            Ort, Datum, Stimmung, Gepäck und die Szenen, die bleiben. Jeder Tag
            der Ferienwoche bekommt hier eine eigene Seite.
          </p>
        </div>
        <AdminOnly>
          <Link
            href="/tagebuch/neu"
            className="rounded-full bg-mint px-5 py-3 text-sm font-semibold text-[#23162f]"
          >
            Neuer Eintrag
          </Link>
        </AdminOnly>
      </div>

      {entries.length === 0 ? (
        <div className="glass mt-12 rounded-[2rem] px-6 py-16 text-center">
          <p className="font-display text-3xl">Noch ist das Heft leer.</p>
          <p className="mt-3 text-sm text-muted">
            Der erste Eintrag macht aus der Woche ein Protokoll.
          </p>
        </div>
      ) : (
        <div className="mt-12 grid gap-5 md:grid-cols-12">
          {entries.map((entry, index) => (
            <DiaryCard key={entry.id} entry={entry} featured={index % 3 === 0} />
          ))}
        </div>
      )}
    </main>
  );
}
