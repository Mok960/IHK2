import { AdminOnly } from "@/components/auth-controls";
import { DeleteButton } from "@/components/delete-button";
import { SponsorForm } from "@/components/sponsor-form";
import { db } from "@/db";
import { sponsors } from "@/db/schema";
import { seedIfEmpty } from "@/db/seed";
import { asc } from "drizzle-orm";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sponsoren",
};

export default async function SponsorsPage() {
  await seedIfEmpty();
  const partner = await db
    .select()
    .from(sponsors)
    .orderBy(asc(sponsors.sortOrder), asc(sponsors.id));

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-14">
      <p className="text-xs tracking-[0.28em] text-violet uppercase">Partner</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">Sponsoren</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
        Die Woche steht auf vielen Schultern. Hier erscheinen Name, kurze Info
        und Logo – genau so, wie auf der Startseite im Karussell.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {partner.map((sponsor) => (
          <article key={sponsor.id} className="glass rounded-[2rem] p-5">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sponsor.logoUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-2xl">{sponsor.name}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{sponsor.info}</p>
                {sponsor.website ? (
                  <a
                    href={sponsor.website}
                    className="mt-3 inline-block text-sm text-aurora"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {sponsor.website.replace(/^https?:\/\//, "")}
                  </a>
                ) : null}
              </div>
            </div>
            <AdminOnly>
              <div className="mt-5">
                <DeleteButton
                  label="Entfernen"
                  confirmText={`${sponsor.name} wirklich entfernen?`}
                  href={`/api/sponsors/${sponsor.id}`}
                  className="text-sm text-danger hover:underline"
                />
              </div>
              <div className="mt-5 border-t border-white/8 pt-5">
                <p className="mb-3 text-xs tracking-[0.2em] text-muted uppercase">
                  Bearbeiten
                </p>
                <SponsorForm sponsor={sponsor} />
              </div>
            </AdminOnly>
          </article>
        ))}
      </div>

      <AdminOnly>
        <section className="mt-12">
          <h2 className="mb-5 font-display text-3xl">Neuen Sponsor anlegen</h2>
          <div className="max-w-xl">
            <SponsorForm />
          </div>
        </section>
      </AdminOnly>
    </main>
  );
}
