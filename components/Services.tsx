"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import InteractiveTile from "@/components/ui/InteractiveTile";
import { staggerContainer, scaleIn } from "@/lib/motion";

export default function Services() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="services" className="section-padding relative z-10 bg-slate/40">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="What We Do"
          title="Complete construction & real estate, under one roof."
          subtitle="From architectural drawings to property management — every service you need to build, own and grow real estate."
          glow
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="perspective-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            const isActive = active === service.id;
            return (
              <motion.div key={service.id} custom={i} variants={scaleIn}>
                <InteractiveTile glow="amber" className="glass-card h-full cursor-pointer p-6" popup>
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => setActive(isActive ? null : service.id)}
                    onMouseEnter={() => setActive(service.id)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-heading text-3xl text-amber/35">
                        {service.number}
                      </span>
                      <motion.div
                        animate={isActive ? { scale: 1.12, rotate: 4 } : { scale: 1, rotate: 0 }}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber/15 text-amber"
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                    </div>
                    <h3 className="font-heading text-xl text-cream">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/60">
                      {service.description}
                    </p>
                  </button>
                </InteractiveTile>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
