import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Layers,
  Paintbrush,
  PenTool,
  Zap,
  FileCheck,
  FlaskConical,
  Home,
  ClipboardList,
  Key,
  TrendingUp,
  Headphones,
} from "lucide-react";

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    id: "turnkey",
    number: "01",
    title: "Turnkey Construction",
    description: "End-to-end build delivery — from foundation to keys in hand.",
    icon: Building2,
  },
  {
    id: "gray",
    number: "02",
    title: "Gray Structure",
    description: "Engineered structural shells built to last generations.",
    icon: Layers,
  },
  {
    id: "finishing",
    number: "03",
    title: "Premium Finishing",
    description: "Refined interiors, tilework and joinery with craftsman detail.",
    icon: Paintbrush,
  },
  {
    id: "drawings",
    number: "04",
    title: "Architectural Drawings",
    description: "Modern, functional designs tailored to your plot and lifestyle.",
    icon: PenTool,
  },
  {
    id: "mep",
    number: "05",
    title: "Electrical & Plumbing",
    description: "MEP systems engineered for safety, longevity and efficiency.",
    icon: Zap,
  },
  {
    id: "approvals",
    number: "06",
    title: "Approvals & NOC",
    description: "Complete CDA/RDA/MPCHS/DHA etc. documentation and regulatory clearance.",
    icon: FileCheck,
  },
  {
    id: "soil",
    number: "07",
    title: "Soil Testing",
    description: "Geo-technical analysis to anchor every project on solid ground.",
    icon: FlaskConical,
  },
  {
    id: "realtors",
    number: "08",
    title: "Realtors & Investment",
    description: "Curated plots, villas and commercial opportunities.",
    icon: Home,
  },
  {
    id: "pm",
    number: "09",
    title: "Project Management",
    description: "Daily site supervision, milestones and transparent reporting.",
    icon: ClipboardList,
  },
  {
    id: "property",
    number: "10",
    title: "Property Management",
    description: "Tenancy, maintenance and value preservation post-handover.",
    icon: Key,
  },
  {
    id: "investment",
    number: "11",
    title: "Investment Consulting",
    description: "Strategic advisory for ROI-focused real estate portfolios.",
    icon: TrendingUp,
  },
  {
    id: "aftersales",
    number: "12",
    title: "After-Sales Support",
    description: "We stay in touch long after the project is delivered.",
    icon: Headphones,
  },
];
