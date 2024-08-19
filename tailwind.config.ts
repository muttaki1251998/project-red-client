import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      height: {
        "1/2-screen": "50vh",
        128: "32rem", // Custom height value
      },
      width: {
        64: "16rem",
      },
      screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        greatVibes: ["Great Vibes", "cursive"],
        poppins: ["Poppins", "sans-serif"],
        nanum: ["Nanum Gothic", "sans-serif"],
      },
      rotate: {
        60: "-60deg",
      },
      transitionDuration: {
        0: "0ms",
      },
    },
  },
  variants: {
    extend: {
      rotate: ["hover"],
    },
  },
  darkMode: "class",
  plugins: [nextui(), addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
