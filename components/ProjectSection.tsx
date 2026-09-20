"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { X, ArrowUpRight } from "lucide-react";
import {
  getProjectsByCategory,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { CONTACT } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import InteractiveTile from "@/components/ui/InteractiveTile";
import MagneticButton from "@/components/ui/MagneticButton";
import { staggerContainer, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

const statusLabel: Record<Project["status"], string> = {
  delivered: "Delivered",
  "in-build": "In Build",
  "for-sale": "For Sale",
};

const coverLabel: Record<Project["status"], string> = {
  delivered: "Delivered · 2025–26",
  "in-build": "Under Construction",
  "for-sale": "For Sale",
};

function projectWhatsAppMessage(project: Project): string {
  // For-sale listings include house/shop number in description (e.g. #3701, #07).
  if (project.description?.trim()) {
    return `Hello, I'm interested in ${project.description.trim()}. Please share details and rates for this property.`;
  }

  const parts = [project.title, project.location].filter(Boolean);
  const label = parts.length > 0 ? parts.join(" — ") : coverLabel[project.status];
  return `Hello, I'm interested in ${label}. Please share details and rates for this specific project.`;
}

const sectionConfig: Record<
  ProjectCategory,
  { id: string; label: string; title: string; subtitle: string; bg: string }
> = {
  delivered: {
    id: "delivered",
    label: "Projects Delivered",
    title: "Homes we've handed over.",
    subtitle: "Tap any project to browse the full gallery.",
    bg: "bg-slate/30",
  },
  "under-construction": {
    id: "in-build",
    label: "Projects Under Construction",
    title: "Under Construction",
    subtitle: "Live builds with daily reporting and CCTV monitoring.",
    bg: "bg-charcoal",
  },
  "for-sale": {
    id: "for-sale",
    label: "Inventory for Sale",
    title: "Inventory For Sale",
    subtitle: "Message us on WhatsApp for rates and site visits.",
    bg: "bg-slate/40",
  },
};

function ProjectModal({
  selected,
  onClose,
  onLightbox,
}: {
  selected: Project;
  onClose: () => void;
  onLightbox: (index: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        className="glass-card max-h-[92vh] w-full max-w-4xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-cream/10 bg-slate/95 p-6 backdrop-blur-md">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber">
            {statusLabel[selected.status]}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-cream/10 p-2 text-cream/60 hover:text-cream"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {selected.description && (
            <p className="mb-4 text-sm leading-relaxed text-cream/75">
              {selected.description}
            </p>
          )}

          {selected.details && (
            <ul className="mb-6 space-y-2 text-sm text-cream/70">
              {selected.details.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-amber">◆</span>
                  {line}
                </li>
              ))}
            </ul>
          )}

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {selected.images.map((src, index) => (
              <button
                key={src}
                type="button"
                className="relative aspect-[4/3] overflow-hidden rounded-xl"
                onClick={() => onLightbox(index)}
              >
                <Image
                  src={src}
                  alt="Project photo"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </button>
            ))}
          </div>

          <MagneticButton
            href={`${CONTACT.whatsapp}?text=${encodeURIComponent(projectWhatsAppMessage(selected))}`}
            variant="whatsapp"
            className="mt-8 w-full"
          >
            Get details on WhatsApp
          </MagneticButton>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectSection({ category }: { category: ProjectCategory }) {
  const config = sectionConfig[category];
  const projects = getProjectsByCategory(category);
  const [selected, setSelected] = useState<Project | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const slides =
    selected?.images.map((src) => ({ src, alt: "Project photo" })) ?? [];

  return (
    <section id={config.id} className={cn("section-padding relative z-10", config.bg)}>
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label={config.label}
          title={config.title}
          subtitle={config.subtitle}
          align="left"
          action={
            category === "for-sale" ? (
              <MagneticButton href={CONTACT.whatsapp} variant="primary">
                Get Details
              </MagneticButton>
            ) : undefined
          }
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="perspective-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <motion.div key={project.id} custom={i} variants={scaleIn}>
              <InteractiveTile glow="amber" className="glass-card overflow-hidden">
                <button
                  type="button"
                  className="group w-full text-left"
                  onClick={() => setSelected(project)}
                >
                  <div className="relative h-56 overflow-hidden sm:h-60">
                    {project.cover ? (
                      <Image
                        src={project.cover}
                        alt="Project"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="h-full bg-gradient-to-br from-amber/20 to-charcoal" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-transparent" />
                    <span
                      className={cn(
                        "absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                        project.status === "delivered"
                          ? "bg-emerald-500/25 text-emerald-200"
                          : project.status === "for-sale"
                            ? "bg-amber/30 text-amber-light"
                            : "bg-cream/15 text-cream"
                      )}
                    >
                      {statusLabel[project.status]}
                    </span>
                    <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-cream/50 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-amber" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-sm font-medium text-cream">
                        {coverLabel[project.status]}
                      </p>
                    </div>
                  </div>
                </button>
              </InteractiveTile>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            selected={selected}
            onClose={() => setSelected(null)}
            onLightbox={(index) => {
              setLightboxIndex(index);
              setLightboxOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
      />
    </section>
  );
}
