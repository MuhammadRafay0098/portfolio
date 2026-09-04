import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0A0F1D",
        surface: "#121826",
        surface2: "#0D1220",
        accent: {
          violet: "#7C5CFC",
          teal: "#2DD4BF",
          amber: "#F2C078",
        },
        ink: {
          DEFAULT: "#E7EAF3",
          muted: "#8B93A7",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(14px,-18px)" },
        },
        floatSlow2: {
          "0%, 100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(-16px,16px)" },
        },
      },
      animation: {
        floatSlow: "floatSlow 9s ease-in-out infinite",
        floatSlow2: "floatSlow2 11s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
