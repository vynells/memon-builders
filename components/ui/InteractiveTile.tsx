"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveTileProps {
  children: ReactNode;
  className?: string;
  glow?: "amber" | "steel" | "slate";
  tilt?: boolean;
  popup?: boolean;
  borderGlow?: boolean;
}

export default function InteractiveTile({
  children,
  className,
  glow = "amber",
  tilt = true,
  popup = true,
  borderGlow = true,
}: InteractiveTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 290,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 290,
    damping: 22,
  });

  const glowClass = {
    amber: "from-amber/30 via-amber/8 to-transparent",
    steel: "from-steel/25 via-steel/8 to-transparent",
    slate: "from-cream/12 via-cream/4 to-transparent",
  }[glow];

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        tilt
          ? { rotateX, rotateY, transformStyle: "preserve-3d" as const }
          : undefined
      }
      whileHover={
        popup
          ? {
              scale: 1.025,
              y: -8,
              transition: { type: "spring", stiffness: 340, damping: 18 },
            }
          : undefined
      }
      whileTap={{ scale: 0.98 }}
      className={cn(
        "interactive-tile group relative overflow-hidden rounded-[inherit]",
        borderGlow && "hover:shadow-[0_18px_50px_-14px_rgba(230,168,23,0.22)]",
        className
      )}
    >
      <motion.div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          "bg-gradient-to-br",
          glowClass
        )}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 ring-1 ring-amber/0 transition-all duration-500 group-hover:opacity-100 group-hover:ring-amber/40" />
      <div className="shimmer-sweep pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100" />
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}
