"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Share2,
  Globe,
  MessageCircle,
  Send,
  ExternalLink,
  Video,
} from "lucide-react";
import { CONTACT, MAP } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import InteractiveTile from "@/components/ui/InteractiveTile";
import MagneticButton from "@/components/ui/MagneticButton";
import { slideLeft, slideRight } from "@/lib/motion";
import { cn } from "@/lib/utils";

const perks = ["Free Site Visit", "Free Estimation", "Free Investment Advice"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `Hello Memon Builders,

Name: ${form.name}
Phone: ${form.phone}

${form.message}

(Sent from memonbuilders website)`;
    window.open(`${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const socialLinks = [
    { icon: Share2, label: "Instagram", value: CONTACT.instagramHandle, href: CONTACT.instagram },
    { icon: Globe, label: "Facebook", value: "Memon Builders & Developers", href: CONTACT.facebook },
    { icon: Video, label: "TikTok", value: CONTACT.tiktokHandle, href: CONTACT.tiktok },
    { icon: Video, label: "YouTube", value: CONTACT.youtubeHandle, href: CONTACT.youtube },
  ];

  return (
    <section id="contact" className="section-padding relative z-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Get In Touch"
          title="Let's build your future."
          subtitle="Tell us about your plot, your vision or your investment goal. Initial consultation, site visit and estimation — all on us."
          glow
        />

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {perks.map((perk, i) => (
            <motion.span
              key={perk}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="rounded-full border border-amber/30 bg-amber/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-light"
            >
              {perk}
            </motion.span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-4"
          >
            {[
              { icon: Phone, label: "Phone", value: CONTACT.phoneDisplay, href: CONTACT.phoneTel },
              { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
              { icon: MapPin, label: "Office", value: CONTACT.office, href: MAP.url },
            ].map((item) => {
              const Icon = item.icon;
              const inner = (
                <InteractiveTile glow="steel" className="glass-card p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber/15 text-amber">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-cream/45">{item.label}</p>
                      <p className="font-medium text-cream">{item.value}</p>
                    </div>
                  </div>
                </InteractiveTile>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "Office" ? "_blank" : undefined}
                  rel={item.label === "Office" ? "noopener noreferrer" : undefined}
                >
                  {inner}
                </a>
              ) : (
                <div key={item.label}>{inner}</div>
              );
            })}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                    <InteractiveTile glow="amber" className="glass-card p-5 text-center">
                      <Icon className="mx-auto mb-2 h-5 w-5 text-amber" />
                      <p className="text-xs text-cream/45">{link.label}</p>
                      <p className="mt-1 text-sm text-cream">{link.value}</p>
                    </InteractiveTile>
                  </a>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <MagneticButton href={CONTACT.whatsapp} variant="whatsapp">
                <MessageCircle className="h-4 w-4" />
                WhatsApp Direct
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6"
          >
            <InteractiveTile glow="amber" tilt={false} className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-heading text-2xl text-cream">Send a message</h3>
                {[
                  { key: "name", label: "Your Name", type: "text", placeholder: "Full name" },
                  { key: "phone", label: "Phone", type: "tel", placeholder: "03XX XXXXXXX" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="mb-2 block text-sm font-medium text-cream/70">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      className="w-full rounded-xl border border-cream/10 bg-charcoal/50 px-4 py-3 text-cream outline-none transition focus:border-amber/50 focus:ring-2 focus:ring-amber/20"
                    />
                  </div>
                ))}
                <div>
                  <label className="mb-2 block text-sm font-medium text-cream/70">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Plot size, location, budget or investment goals..."
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full resize-none rounded-xl border border-cream/10 bg-charcoal/50 px-4 py-3 text-cream outline-none transition focus:border-amber/50 focus:ring-2 focus:ring-amber/20"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "btn-primary shimmer-btn flex w-full items-center justify-center gap-2"
                  )}
                >
                  <Send className="h-4 w-4" />
                  Send via WhatsApp
                </motion.button>
              </form>
            </InteractiveTile>

            <InteractiveTile glow="steel" tilt={false} className="overflow-hidden rounded-3xl">
              <iframe
                src={MAP.embedUrl}
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Memon Builders office location — B17 F Block Mini Markaz Islamabad"
                className="w-full"
              />
              <div className="flex items-start gap-3 bg-slate px-5 py-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                <div>
                  <p className="text-sm font-medium text-cream">{MAP.note}</p>
                  <a
                    href={MAP.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm text-amber hover:underline"
                  >
                    Open in Google Maps
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </InteractiveTile>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
