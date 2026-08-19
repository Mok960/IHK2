"use server";

import { db } from "@/db";
import { sponsors } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function readSponsor(formData: FormData) {
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

export async function createSponsor(formData: FormData) {
  await requireUser();
  await db.insert(sponsors).values(readSponsor(formData));
  revalidatePath("/");
  revalidatePath("/sponsoren");
  redirect("/sponsoren");
}

export async function updateSponsor(id: number, formData: FormData) {
  await requireUser();
  await db.update(sponsors).set(readSponsor(formData)).where(eq(sponsors.id, id));
  revalidatePath("/");
  revalidatePath("/sponsoren");
  redirect("/sponsoren");
}

export async function deleteSponsor(id: number) {
  await requireUser();
  await db.delete(sponsors).where(eq(sponsors.id, id));
  revalidatePath("/");
  revalidatePath("/sponsoren");
  redirect("/sponsoren");
}
