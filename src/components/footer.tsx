import { CAMP } from "@/lib/constants";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-lilac/15">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl">{CAMP.title}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            Ein buntes Labor-Tagebuch für fünf Tage Neugier.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <Link href="/tagebuch" className="hover:text-lilac">
            Tagebuch
          </Link>
          <Link href="/sponsoren" className="hover:text-lilac">
            Sponsoren
          </Link>
          <Link href="/anmelden" className="hover:text-lilac">
            Anmelden
          </Link>
          <span>
            {CAMP.dates} · {CAMP.city}
          </span>
        </div>
      </div>
    </footer>
  );
}
