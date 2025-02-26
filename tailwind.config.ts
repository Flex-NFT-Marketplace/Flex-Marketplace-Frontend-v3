import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sell: "#ef4444",
        bid: "#FF9F0A",
        stroke: "#303030",
        "thin-grays": "#D1D5DB",
        "dark-black": "#171921",
        danger: "#FF648A",
        background: "#0D0E13",
        text: "#fafafa",
        line: "#27272a",
        primary: "#FFE720",
        grays: "#929292",
        hover: "#171921",
        popup: "#09090b",
        card: "#171921",
        secondary: "#FF9F0A",
        buy: "#92F7CB",
        cancel: "#FF648A",
        border: "#3A3A3C",
        green: "#30D158",
        pink: "#FF8AD0",
        blue: "#64D2FF",
        gray: "#8E8E93",
      },
      fontFamily: {
        atyp: ["atyp", "sans-serif"],
        monument: ["monument", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        solid: "0px 0px 0px 2px rgba(255, 255, 255)",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        fadeOut: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateX(0%)", opacity: "1" },
          "100%": { transform: "translateX(-100%)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out forwards",
        "fade-out": "fadeOut 0.3s ease-in-out forwards",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-out": "slideOut 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
export default config;
