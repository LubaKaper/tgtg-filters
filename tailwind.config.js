/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: { center: true, padding: "1rem" },
      colors: {
        brand: {
          DEFAULT: "#8AE66E", // Chartreuse-style accent color
          dark: "#3C643C"
        },
      },
    },
  },
  plugins: [],
}