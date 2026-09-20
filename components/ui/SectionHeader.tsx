"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT, viewport } from "@/lib/motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
  glow?: boolean;
  action?: React.ReactNode;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  light = false,
  glow = false,
  action,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
      }}
      className={cn(
        "mb-14",
        align === "center" ? "text-center" : "text-left",
        action && "flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      )}
    >
      <div className={cn(align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl")}>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
          }}
          className={cn("section-label", glow && "text-glow-amber")}
        >
          {label}
        </motion.p>
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.8, delay: 0.08, ease: EASE_OUT },
            },
          }}
          className={cn(
            "section-title",
            light && !glow && "text-white",
            glow && "text-glow-amber",
            align === "center" && "mx-auto"
          )}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.16, ease: EASE_OUT },
              },
            }}
            className={cn(
              "section-subtitle",
              light && "text-cream/65",
              glow && "text-amber-light/90",
              align === "center" && "mx-auto"
            )}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {action}
    </motion.div>
  );
}

export { rotateIn } from "@/lib/motion";
