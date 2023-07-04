/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
delete colors["lightBlue"];
delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontfamily: {
      open_sans: ["Open Sans", "sans-serif"],
    },
    colors: {
      ...colors,
      ...{
        primary: "#6F47EB",
        secondary: "#FFFFFF",
        font_color: "#1E1926",
        sub_font_color: "#5E5D6D",

        lightBlue: "#BFE8FF",
        blue: "#005EAB",
        softPurple: "#a991f3",
      },
    },
  },
  plugins: [],
};
