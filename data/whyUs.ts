import type { LucideIcon } from "lucide-react";
import {
  Award,
  MapPin,
  Receipt,
  Eye,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

export interface WhyUsItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const whyUsFeatures: WhyUsItem[] = [
  {
    title: "Decade of expertise",
    description: "12+ years of delivering trusted construction.",
    icon: Award,
  },
  {
    title: "Local expertise",
    description: "Deep familiarity with geography, soil and regulations.",
    icon: MapPin,
  },
  {
    title: "Transparent pricing",
    description: "Itemized BOQs, fixed milestones — no hidden costs.",
    icon: Receipt,
  },
  {
    title: "24/7 supervision",
    description:
      "On-site managers and daily client reports at every stage and online cctv monitoring.",
    icon: Eye,
  },
  {
    title: "Quality guarantee",
    description: "Engineered materials, certified labour and structural warranties.",
    icon: ShieldCheck,
  },
  {
    title: "After-sales support",
    description: "We stand by every brick we lay, long after handover.",
    icon: HeartHandshake,
  },
];

export const stats = [
  { value: 12, suffix: "+", label: "years of constructing" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 20, suffix: "+", label: "hired labour teams" },
  { value: 24, suffix: "/7", label: "Site Supervision" },
] as const;
