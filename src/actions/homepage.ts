"use server";

import { db } from "@/db";
import { homepage, homepageFacts } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function asList(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .map((value) => (typeof value === "string" ? value.trim() : ""));
}

export async function updateHomepage(formData: FormData) {
  await requireUser();

  const id = Number(asString(formData.get("id")) || "1");
  const values = {
    title: asString(formData.get("title")),
    edition: asString(formData.get("edition")),
    tagline: asString(formData.get("tagline")),
    intro: asString(formData.get("intro")),
    dates: asString(formData.get("dates")),
    place: asString(formData.get("place")),
    city: asString(formData.get("city")),
    ages: asString(formData.get("ages")),
    hours: asString(formData.get("hours")),
    aboutTitle: asString(formData.get("aboutTitle")),
    aboutBody: asString(formData.get("aboutBody")),
    scheduleNote: asString(formData.get("scheduleNote")),
    startDate: asString(formData.get("startDate")),
    endDate: asString(formData.get("endDate")),
    ctaKicker: asString(formData.get("ctaKicker")),
    ctaTitle: asString(formData.get("ctaTitle")),
    ctaBody: asString(formData.get("ctaBody")),
    ctaLabel: asString(formData.get("ctaLabel")),
    heroImageUrl: asString(formData.get("heroImageUrl")) || "/images/hero.jpg",
    updatedAt: new Date(),
  };

  if (!values.title || !values.intro || !values.aboutTitle) {
    throw new Error("Titel, Intro und Camp-Text sind Pflichtfelder.");
  }

  const existing = await db.select({ id: homepage.id }).from(homepage).limit(1);

  if (existing[0]) {
    await db.update(homepage).set(values).where(eq(homepage.id, existing[0].id));
  } else {
    await db.insert(homepage).values(values);
  }

  const kickers = asList(formData, "factKicker");
  const titles = asList(formData, "factTitle");
  const bodies = asList(formData, "factBody");

  await db.delete(homepageFacts);
  const factRows = titles
    .map((title, index) => ({
      kicker: kickers[index] || "Info",
      title,
      body: bodies[index] || "",
      sortOrder: index + 1,
    }))
    .filter((fact) => fact.title.length > 0);

  if (factRows.length > 0) {
    await db.insert(homepageFacts).values(factRows);
  }

  void id;
  revalidatePath("/");
  redirect("/?saved=1");
}
