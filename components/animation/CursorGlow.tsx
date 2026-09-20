"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9990] hidden md:block"
      animate={{ x: pos.x - 200, y: pos.y - 200 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.5 }}
    >
      <div className="h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(230,168,23,0.08)_0%,transparent_70%)]" />
    </motion.div>
  );
}
