import { saveNewDiary } from "@/lib/mutations";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const created = await saveNewDiary(formData);
    return NextResponse.json({ ok: true, id: created.id, next: `/tagebuch/${created.id}` });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Speichern fehlgeschlagen.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
