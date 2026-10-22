import manifest from "./projects-manifest.json";

export type ProjectCategory = "delivered" | "under-construction" | "for-sale";
export type ProjectStatus = "delivered" | "in-build" | "for-sale";

export interface Project {
  id: string;
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  title: string;
  location?: string;
  period?: string;
  type?: string;
  description?: string;
  details?: string[];
  cover: string | null;
  images: string[];
}

const meta: Record<
  string,
  Omit<Project, "id" | "slug" | "category" | "status" | "cover" | "images">
> = {
  "delivered-project-1": {
    title: "Residential Villa — B-17",
    period: "Delivered · 2025–26",
    location: "B-17, Islamabad",
    type: "Turnkey Residence",
    description: "Double-storey villa with premium finishing and full MEP.",
  },
  "delivered-project-2": {
    title: "Modern Home — MPCHS",
    period: "Delivered · 2025–26",
    location: "MPCHS, Islamabad",
    type: "Gray + Finish",
    description: "Contemporary facade with engineered gray structure.",
  },
  "delivered-project-3": {
    title: "Family Residence — DHA",
    period: "Delivered · 2025–26",
    location: "DHA, Islamabad",
    type: "Turnkey Build",
    description: "Five-bed family home with basement parking.",
  },
  "delivered-project-4": {
    title: "Commercial Unit — Mini Markaz",
    period: "Delivered · 2025–26",
    location: "B-17, Islamabad",
    type: "Commercial",
    description: "Ground + upper floors with premium lobby finish.",
  },
  "delivered-project-5": {
    title: "Investment Villa — Park View",
    period: "Delivered · 2025–26",
    location: "Park View, Islamabad",
    type: "Investment",
    description: "High-ROI rental villa — delivered turnkey.",
  },
  "delivered-project-6": {
    title: "Luxury Residence — B-17",
    period: "Delivered · 2025–26",
    location: "B-17, Islamabad",
    type: "Turnkey Residence",
    description: "Premium finishing with landscaped front and rooftop details.",
  },
  "under-construction-project-1": {
    title: "Under Construction — B-17 Block F",
    period: "Under Construction",
    location: "B-17, Islamabad",
    type: "Gray Structure",
    description: "Gray structure phase with daily site reporting and CCTV monitoring.",
  },
  "under-construction-project-2": {
    title: "Live Build — Multi-Unit",
    period: "Under Construction",
    location: "Islamabad",
    type: "Turnkey",
    description: "Multi-unit residential — finishing phase underway.",
  },
  "under-construction-project-3": {
    title: "Under Construction — New Project",
    period: "Under Construction",
    location: "Islamabad",
    type: "Gray Structure",
    description: "Gray structure phase with daily site reporting.",
  },
};

type ManifestEntry = (typeof manifest)[number];

export const projects: Project[] = (manifest as ManifestEntry[]).map((entry) => ({
  ...entry,
  category: entry.category as ProjectCategory,
  status: entry.status as ProjectStatus,
  ...(meta[entry.id] ?? {
    title: entry.folderName.replace(/PROJECT\s*/i, "").trim() || "Project",
    period:
      entry.status === "delivered"
        ? "Delivered · 2025–26"
        : entry.status === "for-sale"
          ? "For Sale"
          : "Under Construction",
    location: "Islamabad",
  }),
}));

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((p) => p.category === category);
}
