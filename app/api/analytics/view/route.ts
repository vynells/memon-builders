import { NextRequest, NextResponse } from "next/server";
import { recordPageView } from "@/lib/analytics";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const visitorId =
      typeof body.visitorId === "string" ? body.visitorId : undefined;
    const snapshot = await recordPageView(visitorId);
    return NextResponse.json({ ok: true, snapshot });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
