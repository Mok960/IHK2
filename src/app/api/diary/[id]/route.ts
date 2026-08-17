import { removeDiary, saveDiary } from "@/lib/mutations";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    if (!Number.isInteger(numericId)) {
      return NextResponse.json({ ok: false, error: "Ungültige ID." }, { status: 400 });
    }
    const formData = await request.formData();
    await saveDiary(numericId, formData);
    return NextResponse.json({ ok: true, next: `/tagebuch/${numericId}` });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Speichern fehlgeschlagen.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    if (!Number.isInteger(numericId)) {
      return NextResponse.json({ ok: false, error: "Ungültige ID." }, { status: 400 });
    }
    await removeDiary(numericId);
    return NextResponse.json({ ok: true, next: "/tagebuch" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Löschen fehlgeschlagen.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
