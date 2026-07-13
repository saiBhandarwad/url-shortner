/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "sans-serif"] },
      boxShadow: { soft: "0 12px 30px -14px rgb(15 23 42 / .22)" },
    },
  },
  plugins: [],
};
