import { NextResponse } from "next/server";
import { getSiteConfig } from "@/lib/analytics";

export async function GET() {
  const config = await getSiteConfig();
  return NextResponse.json(config);
}
