import { HomepageForm } from "@/components/homepage-form";
import { getSiteContent } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Homepage bearbeiten",
};

export default async function EditHomepagePage() {
  const { page, facts } = await getSiteContent();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14">
      <Link href="/" className="text-sm text-muted hover:text-lilac">
        ← Zurück zur Startseite
      </Link>
      <h1 className="mt-5 mb-3 font-display text-5xl">Homepage bearbeiten</h1>
      <p className="mb-8 text-sm leading-7 text-muted">
        Titel, Infos, Ablauf und die bunten Karten – alles hier änderbar.
      </p>
      <HomepageForm page={page} facts={facts} />
    </main>
  );
}
