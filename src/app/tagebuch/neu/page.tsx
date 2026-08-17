import { DiaryForm } from "@/components/diary-form";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Neuer Eintrag",
};

export default function NewDiaryPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14">
      <Link href="/tagebuch" className="text-sm text-muted hover:text-lilac">
        ← Zurück zum Tagebuch
      </Link>
      <h1 className="mt-5 font-display text-5xl">Neuer Eintrag</h1>
      <p className="mt-3 mb-8 max-w-xl text-sm leading-7 text-muted">
        Halte fest, wo ihr wart, was ihr mitgenommen habt und welcher Moment den
        Tag geprägt hat.
      </p>
      <DiaryForm />
    </main>
  );
}
