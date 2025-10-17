/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
        fontFamily: {
        henny: ['"Henny Penny"', 'cursive'], 
      },
    },
  },
  plugins: [],
};

