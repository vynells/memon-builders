"use client";

import { type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "whatsapp";
}

export default function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = "primary",
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const variants = {
    primary: "btn-primary shimmer-btn",
    outline: "btn-outline",
    whatsapp: "btn-whatsapp",
  };

  function handleMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const motionProps = {
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    style: { x: springX, y: springY },
    className: cn(variants[variant], className),
    whileTap: { scale: 0.96 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  );
}
