"use client";

import { credentialsAreValid, persistLogin } from "@/lib/client-auth";
import { useState, type FormEvent } from "react";

export function LoginForm({ next = "/" }: { next?: string }) {
  const [error, setError] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");

    if (!credentialsAreValid(username, password)) {
      setError(true);
      return;
    }

    persistLogin();
    const target = next.startsWith("/") ? next : "/";
    window.location.href = target === "/anmelden" || target === "/login" ? "/" : target;
  }

  return (
    <form onSubmit={onSubmit} className="glass space-y-5 rounded-[2rem] p-6 md:p-8">
      <label htmlFor="username" className="block">
        <span className="mb-2 block text-sm text-muted">Nutzername</span>
        <input
          id="username"
          name="username"
          autoComplete="username"
          required
          defaultValue="Mok960"
          className="field"
        />
      </label>

      <label htmlFor="password" className="block">
        <span className="mb-2 block text-sm text-muted">Passwort</span>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          defaultValue="12345678"
          className="field"
        />
      </label>

      {error ? (
        <p className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          Nutzername oder Passwort stimmt nicht.
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-full bg-mint px-5 py-3 text-sm font-semibold text-[#23162f]"
      >
        Anmelden
      </button>
    </form>
  );
}
