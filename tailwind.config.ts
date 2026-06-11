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
        "inverse-on-surface": "#edf1f5",
        "inverse-surface": "#2c3134",
        "secondary-fixed-dim": "#fabd00",
        "on-primary": "#ffffff",
        "primary-container": "#0075d8",
        "on-error-container": "#93000a",
        "surface-tint": "#005fb0",
        "on-secondary-fixed": "#261a00",
        "surface-container-highest": "#dfe3e7",
        "text-main": "#1A1A1B",
        "on-error": "#ffffff",
        "surface-white": "#FFFFFF",
        "outline-variant": "#c1c6d5",
        "surface-container": "#eaeef2",
        "secondary": "#785900",
        "outline": "#717784",
        "on-secondary-fixed-variant": "#5b4300",
        "on-background": "#171c1f",
        "tertiary": "#ac2e00",
        "surface-variant": "#dfe3e7",
        "primary-fixed-dim": "#a6c8ff",
        "primary": "#005cac",
        "error-container": "#ffdad6",
        "on-tertiary-fixed-variant": "#862200",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#d73b00",
        "on-primary-fixed-variant": "#004787",
        "secondary-fixed": "#ffdf9e",
        "on-secondary-container": "#6c5000",
        "tertiary-fixed": "#ffdbd1",
        "on-tertiary-container": "#fffbff",
        "inverse-primary": "#a6c8ff",
        "on-surface-variant": "#414753",
        "on-primary-container": "#fefcff",
        "on-surface": "#171c1f",
        "background": "#f6fafe",
        "surface-bright": "#f6fafe",
        "on-tertiary-fixed": "#3b0900",
        "deep-blue": "#009CFF",
        "surface-container-low": "#f0f4f8",
        "neon-mint": "#83FFE7",
        "tertiary-fixed-dim": "#ffb5a0",
        "surface-container-high": "#e4e9ed",
        "surface-dim": "#d6dade",
        "error": "#ba1a1a",
        "surface": "#f6fafe",
        "electric-purple": "#7C4DFF"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "mobile-margin": "16px",
        "grid-margin": "24px",
        "tile-gap": "12px",
        "section-padding": "64px",
        "mobile-gutter": "8px",
        "grid-gutter": "16px"
      },
      fontFamily: {
        "headline-xl": ["Plus Jakarta Sans"],
        "body-md": ["Plus Jakarta Sans"],
        "headline-lg-mobile": ["Plus Jakarta Sans"],
        "body-lg": ["Plus Jakarta Sans"],
        "label-sm": ["Plus Jakarta Sans"],
        "label-bold": ["Plus Jakarta Sans"],
        "headline-md": ["Plus Jakarta Sans"],
        "headline-lg": ["Plus Jakarta Sans"]
      },
      fontSize: {
        "headline-xl": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "500" }],
        "headline-lg-mobile": ["24px", { lineHeight: "1.2", fontWeight: "800" }],
        "body-lg": ["18px", { lineHeight: "1.5", fontWeight: "500" }],
        "label-sm": ["12px", { lineHeight: "1", fontWeight: "600" }],
        "label-bold": ["14px", { lineHeight: "1", fontWeight: "700" }],
        "headline-md": ["20px", { lineHeight: "1.3", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "1.2", fontWeight: "800" }]
      }
    },
  },
  plugins: [],
};

export default config;
