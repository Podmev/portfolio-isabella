const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E1E8EF",
          100: "#D4DEE7",
          200: "#B7C7D7",
          300: "#99B0C7",
          400: "#7C99B6",
          500: "#5E82A6",
          600: "#4C6B8A",
          700: "#3C546C",
          800: "#2C3D4F",
          900: "#1B2631",
          950: "#141C24",
        },
        accent: {
          50: "#fdf9e6",
          100: "#faecb4",
          200: "#f9e59b",
          300: "#f5d968",
          400: "#f2cc36",
          500: "#efbf04",
          600: "#d7ac04",
          700: "#a78603",
          800: "#786002",
          900: "#483901",
          950: "#302601",
        },
      },
    },
  },
  plugins: [],
};
export default config;
