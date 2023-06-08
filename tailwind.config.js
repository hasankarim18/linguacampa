/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkNavyBlue: "#1E293B",
        yellow1: "#FEE100",
        yellow2: "#E4CA00",
      },
    },
  },
  plugins: [require("daisyui")],
};

