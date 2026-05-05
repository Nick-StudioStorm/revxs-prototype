import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070b",
        panel: "#0d1117",
        panelSoft: "#121821",
        line: "#223044",
        signal: "#34d399",
        warn: "#f59e0b",
        danger: "#fb7185"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(52, 211, 153, 0.24), 0 16px 60px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
