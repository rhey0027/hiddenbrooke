// tailwind.config.js
/** @type {import('tailwindcss').Config} */

import tailwindScrollbar from "tailwind-scrollbar";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    animation: {
      "spin-slow": "spin 3s linear infinite",
    },
    keyframes: {
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },

      drop: {
        "0%, 100%": { borderRadius: "50% 50% 50% 50% / 50% 50% 50% 50%" },
        "33%": { borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%" },
        "66%": { borderRadius: "40% 60% 42% 58% / 41% 51% 49% 59%" },
      },
    },

    animation: {
      "water-drop": "drop 3s ease-in-out infinite",
    },
  },
  plugins: [tailwindScrollbar],
};
