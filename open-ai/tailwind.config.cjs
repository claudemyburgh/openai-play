const colors = require("tailwindcss/colors")


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        gray: colors.zinc
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp"), require("@tailwindcss/forms"), require("tailwindcss-attributes")],
}
