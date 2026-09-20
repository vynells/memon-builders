import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const COUNTER_KEY = "memon:visitor-count";

export async function GET() {
  try {
    const count = await redis.incr(COUNTER_KEY);
    return NextResponse.json({ count });
  } catch (err) {
    // Hide gracefully if Redis isn't configured yet — site keeps working.
    return NextResponse.json({ count: null, error: "redis-error" });
  }
}
