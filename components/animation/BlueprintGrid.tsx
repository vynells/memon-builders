"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BlueprintGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.4, 0.3, 0.2, 0.12]);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0 bg-grid-blueprint bg-blueprint" />
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#12141a_78%)]"
      />
      <motion.div
        animate={{ x: ["-10%", "110%"], y: ["20%", "75%", "25%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute h-px w-28 bg-amber/15"
      />
      <motion.div
        animate={{ y: ["-10%", "110%"], x: ["25%", "70%", "35%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute h-28 w-px bg-amber/15"
      />
    </div>
  );
}
