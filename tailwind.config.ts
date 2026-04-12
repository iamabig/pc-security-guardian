import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080e1c",
        foreground: "#e3e7fc",
        primary: {
          DEFAULT: "#8ff5ff",
          container: "#00eefc",
          dim: "#00deec",
        },
        surface: {
          DEFAULT: "#080e1c",
          bright: "#232c42",
          container: "#12192a",
          high: "#181f32",
          highest: "#1d253a",
          low: "#0c1323",
        },
        error: {
          DEFAULT: "#ff716c",
          container: "#9f0519",
        },
        tertiary: {
          DEFAULT: "#8eff71",
          container: "#2ff801",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      backgroundImage: {
        "glass-gradient": "linear-gradient(135deg, rgba(143, 245, 255, 0.1) 0%, rgba(0, 238, 252, 0.05) 100%)",
      },
      boxShadow: {
        'neon-blue': '0 0 15px rgba(143, 245, 255, 0.3)',
        'neon-red': '0 0 15px rgba(255, 113, 108, 0.3)',
      }
    },
  },
  plugins: [],
};
export default config;
