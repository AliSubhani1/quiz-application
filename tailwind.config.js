/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
    colors: {
      white: {
        0: "#ffffff",
      },
      black: {
        0: "#111927",
      },
      gray: {
        0: "#F3F4F6",
        1: "#FAFAFA",
        2: "#fafafb",
        3: "#E5E7EB",
      },
      red: {
        0: "#cc3928",
        1: "#FF0000",
      },
      green: {
        0: "#12832E",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
    },
  },
  plugins: [],
};
