"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle, MapPin, Calendar, Briefcase } from "lucide-react";
import { CONTACT, MANAGING_DIRECTOR, SITE } from "@/lib/constants";
import { HeroTitle } from "@/components/ui/HeroTitle";
import { SectionHeader } from "@/components/ui/SectionHeader";
import MagneticButton from "@/components/ui/MagneticButton";
import InteractiveTile from "@/components/ui/InteractiveTile";
import { EASE_OUT, slideRight } from "@/lib/motion";

const facts = [
  { icon: MapPin, label: "Office", value: CONTACT.office },
  { icon: Calendar, label: "Experience", value: "12+ Years in Construction" },
  { icon: Briefcase, label: "Services", value: "Build · Realty · Investment" },
];

export default function HomeSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative overflow-hidden">
      <div className="relative flex min-h-[92vh] items-center pt-24 pb-20 md:min-h-screen">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src="/images/hero-cover.jpg"
            alt="Memon Builders luxury residence at night"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/40" />
        </motion.div>

        <motion.div style={{ opacity }} className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT }}
            className="mb-10 text-[11px] font-semibold uppercase tracking-[0.4em] text-amber/90"
          >
            {SITE.est}
          </motion.p>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE_OUT }}
            >
              <HeroTitle />
              <p className="mt-8 font-heading text-2xl leading-snug text-cream md:text-[1.75rem]">
                12+ Years of building trust.
              </p>
              <p className="mt-4 max-w-md font-heading text-lg italic text-cream/70">
                {SITE.tagline}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <MagneticButton href={CONTACT.whatsapp} variant="whatsapp">
                  <MessageCircle className="h-4 w-4" />
                  {CONTACT.phoneDisplay}
                </MagneticButton>
                <MagneticButton href="#delivered" variant="outline">
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </div>

              <div className="mt-12 flex gap-8 border-t border-cream/10 pt-8">
                {[
                  { value: "12+", label: "Years" },
                  { value: "100%", label: "Satisfaction" },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.04, y: -3 }}
                    className="rounded-xl border border-cream/10 bg-charcoal/50 px-5 py-4 backdrop-blur-sm"
                  >
                    <p className="font-heading text-3xl text-amber md:text-4xl">{stat.value}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-cream/50">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
              className="relative lg:pt-2"
            >
              <div className="hidden lg:absolute lg:-left-10 lg:top-0 lg:bottom-0 lg:w-px lg:bg-cream/10" />
              <div className="space-y-5 text-[15px] leading-[1.75] text-cream/80 md:text-base">
                <p>
                  Memon Builders & Developers is a construction and real estate firm based in
                  Islamabad. We deliver turnkey residences, commercial structures and investment
                  opportunities with a single promise: quality without compromise, and commitment
                  that outlasts the contract.
                </p>
                <p>
                  Our mission is simple — to be the most trusted name in the construction landscape
                  by combining engineering discipline, transparent pricing and a craftsman&apos;s eye
                  for detail.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="section-divider" />

      <div id="about" className="relative z-10 section-padding">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="About the Firm"
            title="Built on trust, delivered with care."
            subtitle="Everything you need to know about who we are and how we work."
            align="left"
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-3"
            >
              {facts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <InteractiveTile key={fact.label} glow="steel" tilt={false} className="glass-card p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber/10 text-amber">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-cream/40">
                          {fact.label}
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-cream">{fact.value}</p>
                      </div>
                    </div>
                  </InteractiveTile>
                );
              })}
            </motion.div>

            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <InteractiveTile glow="amber" tilt={false} className="glass-card overflow-hidden p-0">
                <div className="grid grid-cols-1 sm:grid-cols-[minmax(220px,44%)_1fr]">
                  <div className="relative flex min-h-[300px] items-center justify-center bg-charcoal sm:min-h-[360px]">
                    <Image
                      src="/images/usama.jpg"
                      alt="Muhammad Usama — Managing Director"
                      fill
                      className="object-contain object-center p-2"
                      sizes="(max-width: 640px) 100vw, 280px"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-7">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-amber/90">
                      {MANAGING_DIRECTOR.role}
                    </p>
                    <p className="mt-2 font-heading text-2xl text-cream">
                      {MANAGING_DIRECTOR.name}
                    </p>
                    <p className="mt-1 text-sm text-cream/55">{MANAGING_DIRECTOR.title}</p>
                    <p className="mt-4 text-sm leading-relaxed text-cream/65">
                      {MANAGING_DIRECTOR.quote}
                    </p>
                  </div>
                </div>
              </InteractiveTile>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
