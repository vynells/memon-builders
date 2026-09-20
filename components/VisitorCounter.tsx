"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/visitor-count")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setCount(data.count);
      })
      .catch(() => {
        if (!cancelled) setCount(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-cream/10 bg-cream/[0.04] px-3 py-1.5">
      <Users className="h-3 w-3 text-amber/70" strokeWidth={2} />
      <span className="text-[11px] font-medium text-cream/50">
        Visitor{" "}
        <span className="font-semibold text-amber">
          #{count.toLocaleString()}
        </span>
      </span>
    </div>
  );
}
