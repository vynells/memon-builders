"use client";

import { motion } from "framer-motion";
import { whyUsFeatures } from "@/data/whyUs";
import { SectionHeader, rotateIn } from "@/components/ui/SectionHeader";
import InteractiveTile from "@/components/ui/InteractiveTile";
import { staggerContainer } from "@/lib/motion";

export default function WhyUs() {
  return (
    <section id="why-us" className="section-padding relative z-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Why Choose Us"
          title="Years of experience."
          subtitle="Memon builders & developers offers the complete package — from one place."
          align="left"
          light
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="perspective-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {whyUsFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} custom={i} variants={rotateIn}>
                <InteractiveTile glow="amber" className="glass-card h-full p-7">
                  <motion.div
                    whileHover={{ rotate: [0, -6, 6, 0], scale: 1.08 }}
                    transition={{ duration: 0.45 }}
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber/15 text-amber"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <h3 className="font-heading text-xl text-cream">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">
                    {feature.description}
                  </p>
                </InteractiveTile>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
