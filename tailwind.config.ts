import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#12141a",
        slate: "#1e2430",
        steel: "#3d4f61",
        amber: "#e6a817",
        "amber-light": "#f5d074",
        concrete: "#eceae6",
        cream: "#f7f6f3",
        whatsapp: "#25d366",
      },
      fontFamily: {
        heading: ["var(--font-dm-serif)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "beam-sweep": "beam-sweep 0.8s ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(230, 168, 23, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(230, 168, 23, 0.45)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "beam-sweep": {
          "0%": { opacity: "0", transform: "scaleX(0)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
          "100%": { opacity: "0", transform: "scaleX(1)" },
        },
      },
      backgroundImage: {
        "grid-blueprint":
          "linear-gradient(rgba(230,168,23,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(230,168,23,0.06) 1px, transparent 1px)",
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(230,168,23,0.15) 0%, transparent 60%), linear-gradient(180deg, #12141a 0%, #1e2430 100%)",
      },
      backgroundSize: {
        blueprint: "48px 48px",
      },
    },
  },
  plugins: [],
} satisfies Config;
