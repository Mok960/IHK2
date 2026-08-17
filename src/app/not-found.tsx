import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[60vh] w-full max-w-3xl place-items-center px-5 py-20 text-center">
      <div>
        <p className="text-xs tracking-[0.3em] text-aurora uppercase">404</p>
        <h1 className="mt-4 font-display text-5xl">Seite nicht gefunden</h1>
        <p className="mt-4 text-sm text-muted">
          Diese Adresse gibt es nicht. Zurück zur Startseite oder ins Tagebuch.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex rounded-full border border-white/10 px-5 py-3 text-sm hover:border-aurora/40"
          >
            Startseite
          </Link>
          <Link
            href="/tagebuch"
            className="inline-flex rounded-full bg-mint px-5 py-3 text-sm font-semibold text-[#23162f]"
          >
            Zum Tagebuch
          </Link>
        </div>
      </div>
    </main>
  );
}
