"use client";

import type { Sponsor } from "@/db/schema";
import { submitForm } from "@/lib/submit-form";
import { useState, type FormEvent, type ReactNode } from "react";

export function SponsorForm({ sponsor }: { sponsor?: Sponsor }) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const formData = new FormData(event.currentTarget);
      if (sponsor) {
        await submitForm(`/api/sponsors/${sponsor.id}`, formData, "POST");
      } else {
        await submitForm("/api/sponsors", formData, "POST");
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Speichern fehlgeschlagen.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass space-y-5 rounded-[2rem] p-6">
      <Field label="Name" htmlFor={`name-${sponsor?.id ?? "new"}`}>
        <input
          id={`name-${sponsor?.id ?? "new"}`}
          name="name"
          required
          defaultValue={sponsor?.name}
          className="field"
        />
      </Field>
      <Field label="Info" htmlFor={`info-${sponsor?.id ?? "new"}`}>
        <textarea
          id={`info-${sponsor?.id ?? "new"}`}
          name="info"
          required
          rows={4}
          defaultValue={sponsor?.info}
          className="field resize-y"
        />
      </Field>
      <Field label="Logo-URL" htmlFor={`logoUrl-${sponsor?.id ?? "new"}`}>
        <input
          id={`logoUrl-${sponsor?.id ?? "new"}`}
          name="logoUrl"
          required
          defaultValue={sponsor?.logoUrl}
          className="field"
        />
      </Field>
      <Field label="Website" htmlFor={`website-${sponsor?.id ?? "new"}`}>
        <input
          id={`website-${sponsor?.id ?? "new"}`}
          name="website"
          defaultValue={sponsor?.website ?? ""}
          className="field"
        />
      </Field>
      <Field label="Reihenfolge" htmlFor={`sortOrder-${sponsor?.id ?? "new"}`}>
        <input
          id={`sortOrder-${sponsor?.id ?? "new"}`}
          name="sortOrder"
          type="number"
          defaultValue={sponsor?.sortOrder ?? 0}
          className="field"
        />
      </Field>
      {error ? (
        <p className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-mint px-5 py-3 text-sm font-semibold text-[#23162f] disabled:opacity-60"
      >
        {pending ? "Speichere …" : sponsor ? "Sponsor speichern" : "Sponsor anlegen"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block text-sm text-muted">{label}</span>
      {children}
    </label>
  );
}
