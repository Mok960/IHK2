"use client";

import { EmojiScale } from "@/components/emoji-scale";
import type { DiaryEntry } from "@/db/schema";
import { WEEKDAYS } from "@/lib/constants";
import { submitForm } from "@/lib/submit-form";
import { useState, type FormEvent, type ReactNode } from "react";

export function DiaryForm({ entry }: { entry?: DiaryEntry }) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const formData = new FormData(event.currentTarget);
      if (entry) {
        await submitForm(`/api/diary/${entry.id}`, formData, "POST");
      } else {
        await submitForm("/api/diary", formData, "POST");
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Speichern fehlgeschlagen.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass space-y-6 rounded-[2rem] p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Titel" htmlFor="title">
          <input
            id="title"
            name="title"
            required
            defaultValue={entry?.title}
            placeholder="Der Roboter wacht auf"
            className="field"
          />
        </Field>
        <Field label="Ort" htmlFor="location">
          <input
            id="location"
            name="location"
            required
            defaultValue={entry?.location}
            placeholder="Makerhalle, Campus Aurora"
            className="field"
          />
        </Field>
        <Field label="Datum" htmlFor="date">
          <input
            id="date"
            name="date"
            type="date"
            required
            defaultValue={entry?.date}
            className="field"
          />
        </Field>
        <Field label="Tag" htmlFor="day">
          <select id="day" name="day" defaultValue={entry?.day ?? "Montag"} className="field">
            {WEEKDAYS.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Beschreibung" htmlFor="description">
        <textarea
          id="description"
          name="description"
          required
          rows={7}
          defaultValue={entry?.description}
          placeholder="Was ist passiert, was hat überrascht, was bleibt hängen?"
          className="field min-h-40 resize-y"
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Bild-URL" htmlFor="imageUrl">
          <input
            id="imageUrl"
            name="imageUrl"
            defaultValue={entry?.imageUrl ?? ""}
            placeholder="/images/entries/robotik.jpg"
            className="field"
          />
        </Field>
        <Field label="Link-Adresse" htmlFor="linkUrl">
          <input
            id="linkUrl"
            name="linkUrl"
            defaultValue={entry?.linkUrl ?? ""}
            placeholder="https://"
            className="field"
          />
        </Field>
      </div>

      <Field label="Link-Beschriftung" htmlFor="linkLabel">
        <input
          id="linkLabel"
          name="linkLabel"
          defaultValue={entry?.linkLabel ?? ""}
          placeholder="Weiterlesen, Video, Quelle …"
          className="field"
        />
      </Field>

      <EmojiScale value={entry?.emoji} />

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Mitgenommen" htmlFor="itemsBrought" hint="Ein Gegenstand pro Zeile">
          <textarea
            id="itemsBrought"
            name="itemsBrought"
            rows={5}
            defaultValue={(entry?.itemsBrought ?? []).join("\n")}
            placeholder={"Laborkittel\nNotizheft"}
            className="field resize-y"
          />
        </Field>
        <Field label="Highlights" htmlFor="highlights" hint="Ein Highlight pro Zeile">
          <textarea
            id="highlights"
            name="highlights"
            rows={5}
            defaultValue={(entry?.highlights ?? []).join("\n")}
            placeholder={"Erste Testfahrt\nTeamname gefunden"}
            className="field resize-y"
          />
        </Field>
      </div>

      {error ? (
        <p className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-mint px-6 py-3 text-sm font-semibold text-[#23162f] disabled:opacity-60"
        >
          {pending ? "Speichere …" : entry ? "Eintrag speichern" : "Eintrag anlegen"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 flex items-baseline justify-between gap-3 text-sm text-muted">
        <span>{label}</span>
        {hint ? <span className="text-xs text-muted/70">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}
