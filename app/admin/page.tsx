"use client";

import { useCallback, useEffect, useState } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { AnalyticsSnapshot } from "@/lib/analytics";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://memon-builders.vercel.app";

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsSnapshot | null>(null);
  const [bannerText, setBannerText] = useState("");
  const [bannerEnabled, setBannerEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchStats = useCallback(async (token: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setAnalytics(data.analytics);
      setBannerText(data.config.bannerText ?? "");
      setBannerEnabled(data.config.bannerEnabled ?? false);
      setAuthed(true);
      setMessage("");
    } catch {
      setMessage("Wrong admin key or server error.");
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("memon_admin_secret");
    if (saved) {
      setSecret(saved);
      fetchStats(saved);
    }
  }, [fetchStats]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("memon_admin_secret", secret);
    fetchStats(secret);
  };

  const saveConfig = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${secret}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bannerText, bannerEnabled }),
      });
      if (!res.ok) throw new Error("Save failed");
      const data = await res.json();
      setBannerText(data.config.bannerText ?? "");
      setBannerEnabled(data.config.bannerEnabled ?? false);
      setMessage("Settings saved.");
    } catch {
      setMessage("Could not save settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-cream">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <BrandLogo size="md" />
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-amber hover:underline"
          >
            Open live site →
          </a>
        </div>

        {!authed ? (
          <form onSubmit={handleLogin} className="glass-card mx-auto max-w-md p-8">
            <h1 className="font-heading text-2xl text-cream">Admin Login</h1>
            <p className="mt-2 text-sm text-cream/60">
              Enter your admin key to view analytics and manage the site.
            </p>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Admin key"
              className="mt-6 w-full rounded-xl border border-cream/10 bg-charcoal/60 px-4 py-3 outline-none focus:border-amber/50"
            />
            <button type="submit" className="btn-primary mt-4 w-full" disabled={loading}>
              {loading ? "Checking…" : "Enter Dashboard"}
            </button>
            {message && <p className="mt-3 text-sm text-red-400">{message}</p>}
          </form>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="font-heading text-3xl text-cream">Dashboard</h1>
              <button
                type="button"
                onClick={() => fetchStats(secret)}
                className="btn-outline px-4 py-2 text-xs"
                disabled={loading}
              >
                Refresh
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { label: "Total Views", value: analytics?.totalViews ?? 0 },
                { label: "Today", value: analytics?.todayViews ?? 0 },
                { label: "Unique Visitors", value: analytics?.uniqueVisitors ?? 0 },
                {
                  label: "Last Updated",
                  value: analytics?.lastUpdated
                    ? new Date(analytics.lastUpdated).toLocaleTimeString()
                    : "—",
                },
              ].map((item) => (
                <div key={item.label} className="glass-card p-5 text-center">
                  <p className="font-heading text-3xl text-amber">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-cream/50">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="glass-card p-6">
              <h2 className="font-heading text-xl text-cream">Site banner</h2>
              <p className="mt-1 text-sm text-cream/55">
                Toggle a short announcement on the live website.
              </p>
              <label className="mt-4 flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={bannerEnabled}
                  onChange={(e) => setBannerEnabled(e.target.checked)}
                />
                Show banner on website
              </label>
              <textarea
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                rows={3}
                placeholder="e.g. Eid bookings open — message us on WhatsApp"
                className="mt-4 w-full rounded-xl border border-cream/10 bg-charcoal/60 px-4 py-3 outline-none focus:border-amber/50"
              />
              <button
                type="button"
                onClick={saveConfig}
                className="btn-primary mt-4"
                disabled={loading}
              >
                Save settings
              </button>
              {message && <p className="mt-3 text-sm text-emerald-400">{message}</p>}
            </div>

            <div className="glass-card p-6 text-sm text-cream/60">
              <p>
                <strong className="text-cream">Desktop app:</strong> Use the Memon Builders
                Admin shortcut on your Desktop — it opens this dashboard in its own window.
              </p>
              <p className="mt-2">
                Default admin key: <code className="text-amber">memon</code> — change
                via <code className="text-amber">ADMIN_SECRET</code> on Vercel.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
