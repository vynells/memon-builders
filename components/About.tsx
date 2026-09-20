"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase, User } from "lucide-react";
import { CONTACT, MANAGING_DIRECTOR } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import InteractiveTile from "@/components/ui/InteractiveTile";
import { slideLeft, slideRight } from "@/lib/motion";

const facts = [
  { icon: MapPin, label: "Office", value: CONTACT.office },
  { icon: Calendar, label: "Experience", value: "12+ Years in Construction" },
  { icon: Briefcase, label: "Services", value: "Build · Realty · Investment" },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative z-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <SectionHeader
              label="About the firm"
              title="12+ Years of building trust."
              align="left"
            />
            <p className="text-base leading-relaxed text-cream/60">
              Memon Builders & Developers is a construction and real estate firm based in
              Islamabad. We deliver turnkey residences, commercial structures and investment
              opportunities with a single promise: quality without compromise, and commitment
              that outlasts the contract.
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream/60">
              Our mission is simple — to be the most trusted name in the construction landscape
              by combining engineering discipline, transparent pricing and a craftsman&apos;s eye
              for detail.
            </p>
          </motion.div>

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-4"
          >
            {facts.map((fact) => {
              const Icon = fact.icon;
              return (
                <InteractiveTile key={fact.label} glow="steel" className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber/15 text-amber"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-cream/45">
                        {fact.label}
                      </p>
                      <p className="mt-1 font-medium text-cream">{fact.value}</p>
                    </div>
                  </div>
                </InteractiveTile>
              );
            })}

            <InteractiveTile glow="amber" className="glass-card border-amber/20 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber text-charcoal">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber">
                    {MANAGING_DIRECTOR.role}
                  </p>
                  <p className="mt-1 font-heading text-xl text-cream">
                    {MANAGING_DIRECTOR.name}
                  </p>
                  <p className="mt-1 text-sm font-medium text-cream/70">
                    {MANAGING_DIRECTOR.title}
                  </p>
                  <p className="mt-2 text-sm text-cream/60">{MANAGING_DIRECTOR.quote}</p>
                </div>
              </div>
            </InteractiveTile>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
