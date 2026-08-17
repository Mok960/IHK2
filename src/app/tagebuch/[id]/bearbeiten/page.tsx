import { DiaryForm } from "@/components/diary-form";
import { db } from "@/db";
import { diaryEntries } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Eintrag bearbeiten",
};

export default async function EditDiaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (id === "neu") {
    redirect("/tagebuch/neu");
  }
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    notFound();
  }

  const [entry] = await db
    .select()
    .from(diaryEntries)
    .where(eq(diaryEntries.id, numericId))
    .limit(1);

  if (!entry) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14">
      <Link
        href={`/tagebuch/${entry.id}`}
        className="text-sm text-muted hover:text-aurora"
      >
        ← Zurück zum Eintrag
      </Link>
      <h1 className="mt-5 mb-8 font-display text-5xl">Eintrag bearbeiten</h1>
      <DiaryForm entry={entry} />
    </main>
  );
}
