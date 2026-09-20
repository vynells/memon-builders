"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/utils";
import { useThemeFlash } from "@/components/animation/ThemeAnimationProvider";
import VisitorCounter from "@/components/VisitorCounter";

const PROJECT_LINKS = NAV_LINKS.filter((l) =>
  ["#delivered", "#in-build", "#for-sale"].includes(l.href)
);
const MAIN_LINKS = NAV_LINKS.filter(
  (l) => !["#delivered", "#in-build", "#for-sale"].includes(l.href)
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const flash = useThemeFlash();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    flash();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const linkClass =
    "relative whitespace-nowrap text-[13px] font-medium text-cream/60 transition-colors hover:text-cream";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-cream/[0.06] bg-charcoal/85 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.3)] backdrop-blur-xl"
            : "bg-gradient-to-b from-charcoal/80 to-transparent py-4"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <a
            href="#home"
            onClick={(e) => handleNav("#home", e)}
            className="shrink-0"
          >
            <BrandLogo size="sm" />
          </a>

          <nav className="hidden items-center justify-center gap-6 xl:flex">
            {MAIN_LINKS.filter((l) => l.href !== "#contact").map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(link.href, e)}
                className={linkClass}
              >
                {link.label}
              </a>
            ))}
            <span className="h-4 w-px bg-cream/10" aria-hidden />
            {PROJECT_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(link.href, e)}
                className={cn(linkClass, "text-cream/50")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center xl:flex">
            <VisitorCounter />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex xl:hidden">
              <VisitorCounter />
            </div>
            <motion.a
              href="#contact"
              onClick={(e) => handleNav("#contact", e)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden rounded-full bg-amber px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-charcoal sm:inline-flex"
            >
              Contact
            </motion.a>
            <button
              type="button"
              className="rounded-lg border border-cream/10 p-2 text-cream xl:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-x-0 top-[60px] z-40 max-h-[calc(100vh-60px)] overflow-y-auto border-b border-cream/10 bg-charcoal/98 p-6 backdrop-blur-xl xl:hidden"
          >
            <nav className="flex flex-col gap-1">
              {MAIN_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={(e) => handleNav(link.href, e)}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-cream/80 hover:bg-cream/5"
                >
                  {link.label}
                </motion.a>
              ))}
              {PROJECT_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (MAIN_LINKS.length + i) * 0.04 }}
                  onClick={(e) => handleNav(link.href, e)}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-cream/70 hover:bg-cream/5"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-4 flex justify-center border-t border-cream/10 pt-4">
              <VisitorCounter />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
