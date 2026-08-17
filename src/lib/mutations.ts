import { db } from "@/db";
import { diaryEntries, homepage, homepageFacts, sponsors } from "@/db/schema";
import { weekdayFromIso } from "@/lib/format";
import { eq } from "drizzle-orm";

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

export function isAdminRequest(formData: FormData, request?: Request) {
  return (
    formData.get("adminToken") === "Mok960-ok" ||
    request?.headers.get("x-aurora-token") === "Mok960-ok"
  );
}

export function readDiaryInput(formData: FormData) {
  const title = asString(formData.get("title"));
  const location = asString(formData.get("location"));
  const date = asString(formData.get("date"));
  const description = asString(formData.get("description"));

  if (!title || !location || !date || !description) {
    throw new Error("Titel, Ort, Datum und Beschreibung sind Pflichtfelder.");
  }

  return {
    title,
    location,
    date,
    day: date ? weekdayFromIso(date) : asString(formData.get("day")) || "Montag",
    description,
    imageUrl: optionalUrl(asString(formData.get("imageUrl"))),
    linkUrl: optionalUrl(asString(formData.get("linkUrl"))),
    linkLabel: optionalUrl(asString(formData.get("linkLabel"))),
    emoji: asString(formData.get("emoji")) || "🙂",
    itemsBrought: asList(formData.get("itemsBrought")),
    highlights: asList(formData.get("highlights")),
  };
}

export async function saveNewDiary(formData: FormData) {
  const [created] = await db
    .insert(diaryEntries)
    .values(readDiaryInput(formData))
    .returning({ id: diaryEntries.id });
  return created;
}

export async function saveDiary(id: number, formData: FormData) {
  await db
    .update(diaryEntries)
    .set({ ...readDiaryInput(formData), updatedAt: new Date() })
    .where(eq(diaryEntries.id, id));
}

export async function removeDiary(id: number) {
  await db.delete(diaryEntries).where(eq(diaryEntries.id, id));
}

export function readSponsorInput(formData: FormData) {
  const name = asString(formData.get("name"));
  const info = asString(formData.get("info"));
  const logoUrl = asString(formData.get("logoUrl"));
  const website = asString(formData.get("website"));
  const sortOrder = Number(asString(formData.get("sortOrder")) || "0");

  if (!name || !info || !logoUrl) {
    throw new Error("Name, Info und Logo sind Pflichtfelder.");
  }

  return {
    name,
    info,
    logoUrl,
    website: website || null,
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
  };
}

export async function saveNewSponsor(formData: FormData) {
  const [created] = await db
    .insert(sponsors)
    .values(readSponsorInput(formData))
    .returning({ id: sponsors.id });
  return created;
}

export async function saveSponsor(id: number, formData: FormData) {
  await db.update(sponsors).set(readSponsorInput(formData)).where(eq(sponsors.id, id));
}

export async function removeSponsor(id: number) {
  await db.delete(sponsors).where(eq(sponsors.id, id));
}

export async function saveHomepage(formData: FormData) {
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

  const kickers = formData.getAll("factKicker").map((value) => asString(value));
  const titles = formData.getAll("factTitle").map((value) => asString(value));
  const bodies = formData.getAll("factBody").map((value) => asString(value));

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
}
