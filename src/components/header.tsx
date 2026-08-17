import { AuthControls } from "@/components/auth-controls";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/tagebuch", label: "Tagebuch" },
  { href: "/sponsoren", label: "Sponsoren" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#120d18]/78 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative grid h-10 w-10 place-items-center rounded-2xl border border-mint/30 bg-mint/10">
            <span className="absolute inset-0 rounded-2xl pulse-ring border border-lilac/40" />
            <svg viewBox="0 0 32 32" className="h-5 w-5 text-lilac" aria-hidden>
              <circle cx="16" cy="16" r="2.2" fill="currentColor" />
              <ellipse cx="16" cy="16" rx="11" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <ellipse cx="16" cy="16" rx="11" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 16 16)" />
              <ellipse cx="16" cy="16" rx="11" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" transform="rotate(120 16 16)" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm tracking-[0.22em] text-lilac uppercase">
              Aurora
            </span>
            <span className="block text-sm text-ink/80">MINT-Ferienwoche</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-ink md:px-4"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-50 flex items-center gap-2">
          <AuthControls />
        </div>
      </div>
    </header>
  );
}
