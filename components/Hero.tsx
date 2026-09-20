"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { CONTACT, SITE } from "@/lib/constants";
import { BrandLogo } from "@/components/ui/BrandLogo";
import MagneticButton from "@/components/ui/MagneticButton";
import { EASE_OUT } from "@/lib/motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-grid-blueprint bg-blueprint opacity-30" />

      {[
        { top: "15%", left: "8%", delay: 0 },
        { top: "25%", right: "10%", delay: 0.3 },
        { bottom: "20%", left: "12%", delay: 0.6 },
        { bottom: "30%", right: "8%", delay: 0.9 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute hidden h-16 w-16 border border-amber/20 md:block"
          style={{ ...pos }}
          animate={{ rotate: [0, 90, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, delay: pos.delay }}
        />
      ))}

      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
          className="mb-6 text-xs font-semibold uppercase tracking-[0.45em] text-cream/70"
        >
          {SITE.est}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.45, ease: EASE_OUT }}
          className="flex justify-center"
        >
          <BrandLogo size="hero" className="items-center text-center" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: EASE_OUT }}
          className="mx-auto mt-6 max-w-xl font-heading text-2xl italic text-cream/90 md:text-3xl"
        >
          {SITE.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE_OUT }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/65 md:text-lg"
        >
          A decade of crafting turnkey homes, commercial spaces and lasting investments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: EASE_OUT }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton href={CONTACT.whatsapp} variant="whatsapp">
            <MessageCircle className="h-4 w-4" />
            {CONTACT.phoneDisplay}
          </MagneticButton>
          <MagneticButton href="#projects" variant="outline">
            View Projects
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-14 grid grid-cols-2 gap-6 md:gap-16"
        >
          {[
            { value: "12+", label: "Years Experience" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass-card px-6 py-5"
            >
              <p className="font-heading text-3xl text-cream md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-cream/50">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href={CONTACT.phoneTel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 right-8 hidden items-center gap-2 rounded-full border border-cream/10 bg-slate/60 px-4 py-2 text-sm text-cream/70 backdrop-blur-md md:flex"
      >
        <Phone className="h-4 w-4 text-cream" />
        Call now
      </motion.a>
    </section>
  );
}
