"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "hero";
  showImage?: boolean;
  light?: boolean;
}

const imageSizes = {
  sm: { w: 44, h: 44, className: "h-9 w-9 md:h-10 md:w-10" },
  md: { w: 48, h: 48, className: "h-10 w-10 md:h-11 md:w-11" },
  lg: { w: 52, h: 52, className: "h-11 w-11 md:h-12 md:w-12" },
  hero: { w: 56, h: 56, className: "h-12 w-12 md:h-14 md:w-14" },
};

export function BrandLogo({
  className,
  size = "md",
  showImage = true,
}: BrandLogoProps) {
  const s = imageSizes[size];

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {showImage && (
        <Image
          src="/images/logo.png"
          alt=""
          width={s.w}
          height={s.h}
          className={cn(s.className, "shrink-0 object-contain")}
          priority={size === "hero"}
        />
      )}
      <span className="inline-flex flex-col leading-none">
        <span className="font-heading text-base tracking-wide text-cream md:text-lg">
          MEMON
        </span>
        <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.22em] text-cream/80 md:text-[9px] md:tracking-[0.28em]">
          Builders &amp; Developers
        </span>
      </span>
    </span>
  );
}
