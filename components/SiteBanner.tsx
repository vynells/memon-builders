"use client";

import { useEffect, useState } from "react";
import type { SiteConfig } from "@/lib/analytics";

export default function SiteBanner() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    fetch("/api/site-config")
      .then((r) => r.json())
      .then(setConfig)
      .catch(() => {});
  }, []);

  if (!config?.bannerEnabled || !config.bannerText) return null;

  return (
    <div className="fixed left-0 right-0 top-[72px] z-40 border-b border-amber/30 bg-amber/95 px-4 py-2 text-center text-sm font-semibold text-charcoal backdrop-blur-sm">
      {config.bannerText}
    </div>
  );
}
