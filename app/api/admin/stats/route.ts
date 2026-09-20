import { NextRequest, NextResponse } from "next/server";
import {
  getAnalytics,
  getSiteConfig,
  isAdminAuthorized,
  updateSiteConfig,
} from "@/lib/analytics";

export async function GET(request: NextRequest) {
  if (!isAdminAuthorized(request.headers.get("authorization"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [analytics, config] = await Promise.all([getAnalytics(), getSiteConfig()]);
  return NextResponse.json({ analytics, config });
}

export async function PATCH(request: NextRequest) {
  if (!isAdminAuthorized(request.headers.get("authorization"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const config = await updateSiteConfig(body);
  return NextResponse.json({ config });
}
