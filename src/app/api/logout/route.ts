import { clearSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  await clearSession();
  return new NextResponse(null, {
    status: 303,
    headers: { Location: "/" },
  });
}
