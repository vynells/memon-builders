"use client";

import { cn } from "@/lib/utils";

interface HeroTitleProps {
  className?: string;
  align?: "left" | "center";
}

export function HeroTitle({ className, align = "left" }: HeroTitleProps) {
  return (
    <span
      className={cn(
        "inline-flex flex-col leading-none",
        align === "center" ? "items-center" : "items-start",
        className
      )}
    >
      <span className="font-heading text-3xl tracking-wide text-cream md:text-4xl lg:text-[2.75rem]">
        MEMON
      </span>
      <span className="mt-2 font-body text-[11px] font-medium uppercase tracking-[0.32em] text-cream/75 md:text-xs md:tracking-[0.38em]">
        Builders &amp; Developers
      </span>
    </span>
  );
}
