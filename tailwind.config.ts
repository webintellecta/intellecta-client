/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extends: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      animation: {
        hit: "hitEffect 0.5s ease-out",
      },
      keyframes: {
        hitEffect: {
          "0%": { transform: "scale(0.5)", opacity: 1 },
          "100%": { transform: "scale(1.5)", opacity: 0 },
        },
      },
    },
  },

  plugins: [require("tailwind-scrollbar")],
};
