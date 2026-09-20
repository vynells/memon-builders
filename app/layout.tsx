import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { SITE } from "@/lib/constants";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} — Islamabad Construction & Real Estate`,
  description: SITE.description,
  keywords: [
    "Memon Builders",
    "construction Islamabad",
    "turnkey homes Islamabad",
    "CDA approved builders",
    "real estate Islamabad",
  ],
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    type: "website",
    locale: "en_PK",
    url: SITE.url,
    siteName: SITE.name,
  },
  alternates: {
    canonical: SITE.url,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable}`}>
      <body className="overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}