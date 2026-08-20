import { AdminOnly, GuestOnly } from "@/components/auth-controls";
import { LoginForm } from "@/components/login-form";
import { SponsorCarousel } from "@/components/sponsor-carousel";
import { db } from "@/db";
import { diaryEntries, sponsors } from "@/db/schema";
import { formatShortDate } from "@/lib/format";
import { getSiteContent } from "@/lib/site";
import { asc, desc } from "drizzle-orm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; welcome?: string }>;
}) {
  const [{ saved }, { page, facts }, partner, latest] = await Promise.all([
    searchParams,
    getSiteContent(),
    db.select().from(sponsors).orderBy(asc(sponsors.sortOrder), asc(sponsors.id)),
    db.select().from(diaryEntries).orderBy(desc(diaryEntries.date)).limit(3),
  ]);

  return (
    <main>
      {saved ? (
        <p className="mx-auto mt-6 w-full max-w-6xl px-5">
          <span className="block rounded-2xl border border-mint/40 bg-mint/20 px-4 py-3 text-sm">
            Die Startseite wurde gespeichert.
          </span>
        </p>
      ) : null}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {page.heroImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={page.heroImageUrl}
              alt=""
              className="h-full w-full object-cover opacity-35"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-[#120d18]/30 via-[#120d18]/70 to-[#120d18]" />
        </div>

        <div className="relative mx-auto flex min-h-[86vh] w-full max-w-6xl flex-col justify-end px-5 pb-20 pt-28">
          <p className="text-xs tracking-[0.34em] text-lilac uppercase">
            {page.edition} · {page.city}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.88] md:text-8xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/80 md:text-xl">
            {page.tagline} {page.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-white/10 bg-white/8 px-4 py-2">
              {page.dates}
            </span>
            <span className="rounded-full border border-peach/30 bg-peach/15 px-4 py-2">
              {page.place}
            </span>
            <span className="rounded-full border border-sky/30 bg-sky/15 px-4 py-2">
              {page.ages}
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tagebuch"
              className="rounded-full bg-mint px-6 py-3 text-sm font-semibold text-[#23162f] shadow-[0_10px_24px_rgba(142,240,200,0.25)]"
            >
              {page.ctaLabel}
            </Link>
            <AdminOnly>
              <Link
                href="/homepage/bearbeiten"
                className="rounded-full border border-lilac/30 px-6 py-3 text-sm font-semibold"
              >
                Homepage bearbeiten
              </Link>
            </AdminOnly>
            <GuestOnly>
              <Link
                href="/anmelden"
                className="rounded-full bg-peach px-6 py-3 text-sm font-semibold text-[#23162f]"
              >
                Anmelden
              </Link>
            </GuestOnly>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pt-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.28em] text-lilac uppercase">
              Getragen von
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Sponsoren</h2>
          </div>
          <Link href="/sponsoren" className="text-sm text-muted hover:text-lilac">
            Alle Partner →
          </Link>
        </div>
        <SponsorCarousel sponsors={partner} />
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-24">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs tracking-[0.28em] text-peach uppercase">Das Camp</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">{page.aboutTitle}</h2>
          <p className="mt-4 text-base leading-7 text-muted">{page.aboutBody}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {facts.map((fact, index) => (
            <article
              key={`${fact.id}-${fact.title}`}
              className={`glass rounded-[2rem] p-6 md:p-7 ${
                index % 4 === 1
                  ? "bg-lilac/15"
                  : index % 4 === 2
                    ? "bg-peach/20"
                    : index % 4 === 3
                      ? "bg-sky/20"
                      : "bg-mint/15"
              }`}
            >
              <p className="text-xs tracking-[0.24em] text-lilac uppercase">
                {fact.kicker}
              </p>
              <h3 className="mt-3 font-display text-2xl">{fact.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{fact.body}</p>
            </article>
          ))}
        </div>

        <div className="glass mt-4 rounded-[2rem] p-6 md:flex md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-xs tracking-[0.24em] text-lilac uppercase">Ablauf</p>
            <p className="mt-2 max-w-xl text-sm leading-7 text-muted">
              Täglich {page.hours}. {page.scheduleNote}
            </p>
          </div>
          <div className="mt-6 flex flex-col items-start gap-2 text-sm text-muted md:mt-0 md:items-end">
            <span>Start {formatShortDate(page.startDate)}</span>
            <span>Finale {formatShortDate(page.endDate)}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-8">
        <div className="relative overflow-hidden rounded-[2.2rem] border border-lilac/20 bg-[linear-gradient(135deg,rgba(203,182,255,0.16),rgba(255,194,182,0.12)_50%,rgba(142,240,200,0.1))] px-6 py-12 text-center md:px-12">
          <p className="text-xs tracking-[0.3em] text-lilac uppercase">
            {page.ctaKicker}
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl md:text-6xl">
            {page.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted">
            {page.ctaBody}
          </p>
          <Link
            href="/tagebuch"
            className="mt-8 inline-flex rounded-full bg-mint px-8 py-4 text-sm font-semibold text-[#23162f] shadow-[0_0_40px_rgba(142,240,200,0.2)]"
          >
            {page.ctaLabel}
          </Link>
        </div>
      </section>

      <GuestOnly>
        <section id="anmelden" className="mx-auto w-full max-w-md px-5 pb-8">
          <h2 className="mb-4 text-center font-display text-3xl">Anmelden</h2>
          <LoginForm next="/" />
        </section>
      </GuestOnly>

      {latest.length > 0 ? (
        <section className="mx-auto w-full max-w-6xl px-5 py-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-3xl">Letzte Einträge</h2>
            <Link href="/tagebuch" className="text-sm text-muted hover:text-lilac">
              Alle öffnen →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {latest.map((entry) => (
              <Link
                key={entry.id}
                href={`/tagebuch/${entry.id}`}
                className="glass rounded-[1.8rem] p-5 transition hover:border-lilac/40"
              >
                <p className="text-xs tracking-[0.2em] text-lilac uppercase">
                  {entry.day}
                </p>
                <h3 className="mt-3 font-display text-2xl">{entry.title}</h3>
                <p className="mt-2 text-sm text-muted">{entry.location}</p>
                <p className="mt-5 text-2xl">{entry.emoji}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
