import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return new NextResponse(null, {
    status: 303,
    headers: { Location: "/anmelden" },
  });
}

export async function POST() {
  return new NextResponse(null, {
    status: 303,
    headers: { Location: "/anmelden" },
  });
}
