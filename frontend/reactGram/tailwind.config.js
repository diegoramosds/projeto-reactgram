import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
    animation: {
      spin: "spin 1s linear infinite",
      toTop: "toTop .4s ease-in",
    },
    keyframes: {
      spin: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
      toTop: {
        "0%": { transform: "translateY(2%)" },
        "100%": { transform: "translateY(0)" },
      },
    },
  },
  plugins: [],
};
