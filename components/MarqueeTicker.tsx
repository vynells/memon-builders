"use client";

import { motion } from "framer-motion";
import { MARQUEE_ITEMS } from "@/lib/constants";

export default function MarqueeTicker() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-amber/20 bg-slate/80 py-4 backdrop-blur-md">
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-8 text-sm font-semibold uppercase tracking-[0.25em] text-cream/65"
          >
            {item}
            <span className="text-amber">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
