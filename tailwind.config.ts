import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#0f2419",
          light: "#1a3d2e",
        },
        sage: {
          DEFAULT: "#8fa88b",
          light: "#c5d4b8",
          dark: "#6b7f68",
        },
        earth: {
          DEFAULT: "#c4764a",
          dark: "#9a5638",
          light: "#e8a67a",
        },
        page: "#faf8f3",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(15, 36, 25, 0.08)",
        "card-hover": "0 12px 40px rgba(15, 36, 25, 0.15)",
      },
    },
  },
};

export default config;
