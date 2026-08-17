import type { Sponsor } from "@/db/schema";

export function SponsorCarousel({ sponsors }: { sponsors: Sponsor[] }) {
  if (sponsors.length === 0) {
    return (
      <div className="glass rounded-3xl px-6 py-10 text-center text-muted">
        Noch keine Sponsoren hinterlegt.
      </div>
    );
  }

  const loop = [...sponsors, ...sponsors];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#120d18] to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#120d18] to-transparent md:w-24" />
      <div className="marquee-track flex w-max gap-4">
        {loop.map((sponsor, index) => (
          <article
            key={`${sponsor.id}-${index}`}
            className="glass w-[300px] shrink-0 rounded-3xl p-5 md:w-[340px]"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sponsor.logoUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[11px] tracking-[0.22em] text-aurora uppercase">
                  Partner
                </p>
                <h3 className="font-display text-lg leading-tight">
                  {sponsor.name}
                </h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{sponsor.info}</p>
            {sponsor.website ? (
              <a
                href={sponsor.website}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm text-aurora/90 hover:text-aurora"
              >
                Mehr erfahren →
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
