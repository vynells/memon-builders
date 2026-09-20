"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:bottom-8 md:right-8">
      <motion.a
        href={CONTACT.phoneTel}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 260 }}
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/10 bg-slate/90 text-amber shadow-lg backdrop-blur-md md:h-14 md:w-14"
        aria-label="Call"
      >
        <Phone className="h-5 w-5" />
      </motion.a>
      <motion.a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.55, type: "spring", stiffness: 260 }}
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_0_26px_rgba(37,211,102,0.42)] md:h-16 md:w-16"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.a>
    </div>
  );
}
