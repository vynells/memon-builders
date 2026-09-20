"use client";

import { useEffect } from "react";

function getVisitorId() {
  const key = "memon_visitor_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export default function PageViewTracker() {
  useEffect(() => {
    const visitorId = getVisitorId();
    fetch("/api/analytics/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId }),
    }).catch(() => {});
  }, []);

  return null;
}
