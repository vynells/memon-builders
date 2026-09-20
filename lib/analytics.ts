import { Redis } from "@upstash/redis";
import fs from "fs";
import path from "path";

const ANALYTICS_FILE = path.join(process.cwd(), "data", "analytics-store.json");

export interface AnalyticsSnapshot {
  totalViews: number;
  todayViews: number;
  uniqueVisitors: number;
  lastUpdated: string;
  daily: Record<string, number>;
}

export interface SiteConfig {
  bannerText: string;
  bannerEnabled: boolean;
  phoneDisplay: string;
}

const defaultAnalytics: AnalyticsSnapshot = {
  totalViews: 0,
  todayViews: 0,
  uniqueVisitors: 0,
  lastUpdated: new Date().toISOString(),
  daily: {},
};

const defaultConfig: SiteConfig = {
  bannerText: "",
  bannerEnabled: false,
  phoneDisplay: "0301 8256618",
};

const globalForAnalytics = globalThis as typeof globalThis & {
  __memonAnalytics?: AnalyticsSnapshot;
  __memonConfig?: SiteConfig;
  __memonVisitors?: Set<string>;
};

function getMemoryStore() {
  if (!globalForAnalytics.__memonAnalytics) {
    globalForAnalytics.__memonAnalytics = { ...defaultAnalytics };
    globalForAnalytics.__memonConfig = { ...defaultConfig };
    globalForAnalytics.__memonVisitors = new Set();
  }
  return {
    analytics: globalForAnalytics.__memonAnalytics!,
    config: globalForAnalytics.__memonConfig!,
    visitors: globalForAnalytics.__memonVisitors!,
  };
}
function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return Redis.fromEnv();
}

function readLocalStore(): { analytics: AnalyticsSnapshot; config: SiteConfig } {
  try {
    if (fs.existsSync(ANALYTICS_FILE)) {
      return JSON.parse(fs.readFileSync(ANALYTICS_FILE, "utf-8"));
    }
  } catch {
    /* ignore */
  }
  return { analytics: defaultAnalytics, config: defaultConfig };
}

function writeLocalStore(data: { analytics: AnalyticsSnapshot; config: SiteConfig }) {
  fs.mkdirSync(path.dirname(ANALYTICS_FILE), { recursive: true });
  fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2));
}

export async function getAnalytics(): Promise<AnalyticsSnapshot> {
  const redis = getRedis();
  if (redis) {
    const data = await redis.get<AnalyticsSnapshot>("memon:analytics");
    return data ?? defaultAnalytics;
  }
  try {
    return readLocalStore().analytics;
  } catch {
    return getMemoryStore().analytics;
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const redis = getRedis();
  if (redis) {
    const data = await redis.get<SiteConfig>("memon:config");
    return data ?? defaultConfig;
  }
  try {
    return readLocalStore().config;
  } catch {
    return getMemoryStore().config;
  }
}

export async function recordPageView(visitorId?: string): Promise<AnalyticsSnapshot> {
  const today = new Date().toISOString().slice(0, 10);
  const redis = getRedis();

  if (redis) {
    const current = (await redis.get<AnalyticsSnapshot>("memon:analytics")) ?? {
      ...defaultAnalytics,
    };
    const isNewVisitor =
      visitorId && !(await redis.sismember("memon:visitors", visitorId));

    if (visitorId && isNewVisitor) {
      await redis.sadd("memon:visitors", visitorId);
    }

    const prevToday = current.daily[today] ?? 0;

    const updated: AnalyticsSnapshot = {
      totalViews: current.totalViews + 1,
      todayViews: prevToday + 1,
      uniqueVisitors: current.uniqueVisitors + (isNewVisitor ? 1 : 0),
      lastUpdated: new Date().toISOString(),
      daily: {
        ...current.daily,
        [today]: (current.daily[today] ?? 0) + 1,
      },
    };

    await redis.set("memon:analytics", updated);
    return updated;
  }

  const mem = getMemoryStore();
  const isNewVisitor = visitorId ? !mem.visitors.has(visitorId) : false;
  if (visitorId && isNewVisitor) mem.visitors.add(visitorId);

  const prevToday = mem.analytics.daily[today] ?? 0;
  const updated: AnalyticsSnapshot = {
    totalViews: mem.analytics.totalViews + 1,
    todayViews: prevToday + 1,
    uniqueVisitors: mem.analytics.uniqueVisitors + (isNewVisitor ? 1 : 0),
    lastUpdated: new Date().toISOString(),
    daily: {
      ...mem.analytics.daily,
      [today]: prevToday + 1,
    },
  };

  mem.analytics = updated;

  try {
    writeLocalStore({ analytics: updated, config: mem.config });
  } catch {
    /* Vercel read-only filesystem — memory store still works per instance */
  }

  return updated;
}

export async function updateSiteConfig(config: Partial<SiteConfig>): Promise<SiteConfig> {
  const redis = getRedis();
  const current = await getSiteConfig();
  const merged = { ...current, ...config };

  if (redis) {
    await redis.set("memon:config", merged);
    return merged;
  }

  const mem = getMemoryStore();
  mem.config = merged;

  try {
    writeLocalStore({ analytics: mem.analytics, config: merged });
  } catch {
    /* ignore on Vercel */
  }

  return merged;
}

export function isAdminAuthorized(authHeader: string | null): boolean {
  const secret = process.env.ADMIN_SECRET ?? "memon";
  if (!authHeader) return false;
  return authHeader === `Bearer ${secret}`;
}
