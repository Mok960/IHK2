import { removeSponsor, saveSponsor } from "@/lib/mutations";
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
    await saveSponsor(numericId, formData);
    return NextResponse.json({ ok: true, next: "/sponsoren" });
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
    await removeSponsor(numericId);
    return NextResponse.json({ ok: true, next: "/sponsoren" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Löschen fehlgeschlagen.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
