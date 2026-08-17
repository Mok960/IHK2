"use client";

import { clearLogin, isClientLoggedIn } from "@/lib/client-auth";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

export function AuthControls() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isClientLoggedIn());
  }, []);

  if (!loggedIn) {
    return (
      <Link
        href="/anmelden"
        className="rounded-full bg-peach px-5 py-2.5 text-sm font-semibold text-[#23162f]"
      >
        Anmelden
      </Link>
    );
  }

  return (
    <>
      <button
        type="button"
        className="rounded-full px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-ink"
        onClick={() => {
          clearLogin();
          window.location.href = "/";
        }}
      >
        Abmelden
      </button>
      <Link
        href="/homepage/bearbeiten"
        className="rounded-full border border-lilac/30 px-4 py-2 text-sm font-medium text-ink"
      >
        Homepage
      </Link>
      <Link
        href="/tagebuch/neu"
        className="rounded-full bg-mint px-4 py-2 text-sm font-semibold text-[#23162f]"
      >
        <span className="md:hidden">Neu</span>
        <span className="hidden md:inline">Neuer Eintrag</span>
      </Link>
    </>
  );
}

export function AdminOnly({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isClientLoggedIn());
  }, []);

  if (!loggedIn) {
    return null;
  }

  return <>{children}</>;
}

export function GuestOnly({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLoggedIn(isClientLoggedIn());
    setReady(true);
  }, []);

  if (!ready || loggedIn) {
    return null;
  }

  return <>{children}</>;
}
