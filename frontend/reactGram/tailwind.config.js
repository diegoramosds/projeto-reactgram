/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      }
    },
    keyframes: {
      '0%, 100%': { transform: 'transform' },
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
    },
  },
  plugins: [],
}