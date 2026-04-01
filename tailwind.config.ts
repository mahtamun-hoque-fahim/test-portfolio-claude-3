import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#111111",
          soft: "#333333",
          muted: "#666666",
          faint: "#999999",
        },
        paper: {
          DEFAULT: "#FAFAF8",
          warm: "#F5F3EF",
          border: "#E8E6E1",
        },
        accent: {
          DEFAULT: "#C8A96E",   // warm gold — editorial accent
          light: "#E8D5A8",
          dark: "#9C7A3C",
        },
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.35em",
      },
      lineHeight: {
        tight2: "1.15",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fadeIn 0.5s ease both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
