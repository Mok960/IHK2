import { LoginForm } from "@/components/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anmelden",
};

export default function AnmeldenPage() {
  return (
    <main className="mx-auto grid min-h-[70vh] w-full max-w-md place-items-center px-5 py-16">
      <div className="w-full">
        <p className="text-xs tracking-[0.28em] text-lilac uppercase">Nur für dich</p>
        <h1 className="mt-3 font-display text-5xl">Anmelden</h1>
        <p className="mt-3 mb-8 text-sm leading-7 text-muted">
          Nach dem Anmelden kannst du Homepage, Tagebuch und Sponsoren ändern.
        </p>
        <LoginForm next="/" />
      </div>
    </main>
  );
}
