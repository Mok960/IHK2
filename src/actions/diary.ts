"use server";

import { db } from "@/db";
import { diaryEntries } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { weekdayFromIso } from "@/lib/format";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function asList(value: FormDataEntryValue | null) {
  return asString(value)
    .split(/\r?\n|,/) 
    .map((item) => item.trim())
    .filter(Boolean);
}

function optionalUrl(value: string) {
  return value.length > 0 ? value : null;
}

function readEntry(formData: FormData) {
  const title = asString(formData.get("title"));
  const location = asString(formData.get("location"));
  const date = asString(formData.get("date"));
  const description = asString(formData.get("description"));
  const imageUrl = optionalUrl(asString(formData.get("imageUrl")));
  const linkUrl = optionalUrl(asString(formData.get("linkUrl")));
  const linkLabel = optionalUrl(asString(formData.get("linkLabel")));
  const emoji = asString(formData.get("emoji")) || "🙂";
  const itemsBrought = asList(formData.get("itemsBrought"));
  const highlights = asList(formData.get("highlights"));
  const day = date ? weekdayFromIso(date) : asString(formData.get("day"));

  if (!title || !location || !date || !description) {
    throw new Error("Titel, Ort, Datum und Beschreibung sind Pflichtfelder.");
  }

  return {
    title,
    location,
    date,
    day,
    description,
    imageUrl,
    linkUrl,
    linkLabel,
    emoji,
    itemsBrought,
    highlights,
  };
}

export async function createDiaryEntry(formData: FormData) {
  await requireUser();
  const values = readEntry(formData);
  const [created] = await db.insert(diaryEntries).values(values).returning({
    id: diaryEntries.id,
  });

  revalidatePath("/");
  revalidatePath("/tagebuch");
  redirect(`/tagebuch/${created.id}`);
}

export async function updateDiaryEntry(id: number, formData: FormData) {
  await requireUser();
  const values = readEntry(formData);

  await db
    .update(diaryEntries)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(diaryEntries.id, id));

  revalidatePath("/");
  revalidatePath("/tagebuch");
  revalidatePath(`/tagebuch/${id}`);
  redirect(`/tagebuch/${id}`);
}

export async function deleteDiaryEntry(id: number) {
  await requireUser();
  await db.delete(diaryEntries).where(eq(diaryEntries.id, id));
  revalidatePath("/");
  revalidatePath("/tagebuch");
  redirect("/tagebuch");
}
