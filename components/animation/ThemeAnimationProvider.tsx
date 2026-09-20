"use client";

import { createContext, useContext, useCallback, type ReactNode } from "react";

const ThemeCtx = createContext<(x?: number, y?: number) => void>(() => {});

export function useThemeFlash() {
  return useContext(ThemeCtx);
}

export function ThemeAnimationProvider({ children }: { children: ReactNode }) {
  const flash = useCallback((x = 50, y = 50) => {
    document.body.style.setProperty("--flash-x", `${x}%`);
    document.body.style.setProperty("--flash-y", `${y}%`);
    document.body.classList.add("theme-flash-active");
    window.setTimeout(() => document.body.classList.remove("theme-flash-active"), 650);
  }, []);

  return <ThemeCtx.Provider value={flash}>{children}</ThemeCtx.Provider>;
}
