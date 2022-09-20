const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontSize: {
        huge: ["6rem", "1"],
      },
      flexGrow: {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
      },
      // colors: {
      //   primary: "#22a2bd",
      //   seconday: "",
      // },
      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      sm: "720px",
      md: "900px",
      lg: "1280px",
      xl: "1500px",
    },
  },
  plugins: [],
};
