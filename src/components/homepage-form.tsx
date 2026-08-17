"use client";

import type { Homepage, HomepageFact } from "@/db/schema";
import { submitForm } from "@/lib/submit-form";
import { useState, type FormEvent, type ReactNode } from "react";

export function HomepageForm({
  page,
  facts,
}: {
  page: Homepage;
  facts: HomepageFact[];
}) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const editableFacts =
    facts.length > 0
      ? facts
      : [
          { id: 0, kicker: "", title: "", body: "", sortOrder: 1 },
          { id: 0, kicker: "", title: "", body: "", sortOrder: 2 },
          { id: 0, kicker: "", title: "", body: "", sortOrder: 3 },
          { id: 0, kicker: "", title: "", body: "", sortOrder: 4 },
        ];

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      await submitForm("/api/homepage", new FormData(event.currentTarget), "POST");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Speichern fehlgeschlagen.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass space-y-8 rounded-[2rem] p-6 md:p-8">
      <input type="hidden" name="id" value={page.id} />

      <section className="grid gap-5 md:grid-cols-2">
        <Field label="Titel" htmlFor="title">
          <input id="title" name="title" required defaultValue={page.title} className="field" />
        </Field>
        <Field label="Edition" htmlFor="edition">
          <input id="edition" name="edition" required defaultValue={page.edition} className="field" />
        </Field>
        <Field label="Tagline" htmlFor="tagline">
          <input id="tagline" name="tagline" required defaultValue={page.tagline} className="field" />
        </Field>
        <Field label="Stadt" htmlFor="city">
          <input id="city" name="city" required defaultValue={page.city} className="field" />
        </Field>
      </section>

      <Field label="Intro unter dem Titel" htmlFor="intro">
        <textarea id="intro" name="intro" required rows={4} defaultValue={page.intro} className="field resize-y" />
      </Field>

      <section className="grid gap-5 md:grid-cols-2">
        <Field label="Zeitraum" htmlFor="dates">
          <input id="dates" name="dates" required defaultValue={page.dates} className="field" />
        </Field>
        <Field label="Ort" htmlFor="place">
          <input id="place" name="place" required defaultValue={page.place} className="field" />
        </Field>
        <Field label="Alter" htmlFor="ages">
          <input id="ages" name="ages" required defaultValue={page.ages} className="field" />
        </Field>
        <Field label="Uhrzeiten" htmlFor="hours">
          <input id="hours" name="hours" required defaultValue={page.hours} className="field" />
        </Field>
        <Field label="Startdatum" htmlFor="startDate">
          <input id="startDate" name="startDate" type="date" required defaultValue={page.startDate} className="field" />
        </Field>
        <Field label="Enddatum" htmlFor="endDate">
          <input id="endDate" name="endDate" type="date" required defaultValue={page.endDate} className="field" />
        </Field>
      </section>

      <Field label="Hero-Bild URL" htmlFor="heroImageUrl">
        <input id="heroImageUrl" name="heroImageUrl" defaultValue={page.heroImageUrl ?? ""} className="field" />
      </Field>

      <Field label="Camp-Überschrift" htmlFor="aboutTitle">
        <input id="aboutTitle" name="aboutTitle" required defaultValue={page.aboutTitle} className="field" />
      </Field>
      <Field label="Camp-Text" htmlFor="aboutBody">
        <textarea id="aboutBody" name="aboutBody" required rows={5} defaultValue={page.aboutBody} className="field resize-y" />
      </Field>
      <Field label="Ablauf-Hinweis" htmlFor="scheduleNote">
        <textarea id="scheduleNote" name="scheduleNote" required rows={4} defaultValue={page.scheduleNote} className="field resize-y" />
      </Field>

      <div>
        <h2 className="mb-4 font-display text-2xl">Infokarten</h2>
        <div className="space-y-5">
          {editableFacts.map((fact, index) => (
            <div key={`${fact.id}-${index}`} className="rounded-3xl border border-lilac/20 bg-white/5 p-4">
              <p className="mb-3 text-xs tracking-[0.2em] text-lilac uppercase">Karte {index + 1}</p>
              <div className="grid gap-3 md:grid-cols-2">
                <input name="factKicker" defaultValue={fact.kicker} placeholder="Kicker" className="field" />
                <input name="factTitle" defaultValue={fact.title} placeholder="Titel" className="field" />
              </div>
              <textarea name="factBody" defaultValue={fact.body} rows={3} placeholder="Text" className="field mt-3 resize-y" />
            </div>
          ))}
        </div>
      </div>

      <section className="grid gap-5 md:grid-cols-2">
        <Field label="CTA-Kicker" htmlFor="ctaKicker">
          <input id="ctaKicker" name="ctaKicker" required defaultValue={page.ctaKicker} className="field" />
        </Field>
        <Field label="CTA-Button" htmlFor="ctaLabel">
          <input id="ctaLabel" name="ctaLabel" required defaultValue={page.ctaLabel} className="field" />
        </Field>
      </section>
      <Field label="CTA-Titel" htmlFor="ctaTitle">
        <input id="ctaTitle" name="ctaTitle" required defaultValue={page.ctaTitle} className="field" />
      </Field>
      <Field label="CTA-Text" htmlFor="ctaBody">
        <textarea id="ctaBody" name="ctaBody" required rows={3} defaultValue={page.ctaBody} className="field resize-y" />
      </Field>

      {error ? (
        <p className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-mint px-6 py-3 text-sm font-semibold text-[#23162f] disabled:opacity-60"
        >
          {pending ? "Speichere …" : "Startseite speichern"}
        </button>
      </div>
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
