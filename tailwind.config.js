import plugin from "tailwindcss/plugin";
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          50: "rgb(var(--color-primary-50) / <alpha-value>)",
          100: "rgb(var(--color-primary-100) / <alpha-value>)",
          200: "rgb(var(--color-primary-200) / <alpha-value>)",
          300: "rgb(var(--color-primary-300) / <alpha-value>)",
          400: "rgb(var(--color-primary-400) / <alpha-value>)",
          500: "rgb(var(--color-primary-500) / <alpha-value>)",
          600: "rgb(var(--color-primary-600) / <alpha-value>)",
          700: "rgb(var(--color-primary-700) / <alpha-value>)",
          800: "rgb(var(--color-primary-800) / <alpha-value>)",
          900: "rgb(var(--color-primary-900) / <alpha-value>)",
        },
        secondary: {
          50: "rgb(var(--color-secondary-50) / <alpha-value>)",
          100: "rgb(var(--color-secondary-100) / <alpha-value>)",
          200: "rgb(var(--color-secondary-200) / <alpha-value>)",
          300: "rgb(var(--color-secondary-300) / <alpha-value>)",
          400: "rgb(var(--color-secondary-400) / <alpha-value>)",
          500: "rgb(var(--color-secondary-500) / <alpha-value>)",
          600: "rgb(var(--color-secondary-600) / <alpha-value>)",
          700: "rgb(var(--color-secondary-700) / <alpha-value>)",
          800: "rgb(var(--color-secondary-800) / <alpha-value>)",
          900: "rgb(var(--color-secondary-900) / <alpha-value>)",
        },
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        active: "rgb(var(--color-active) / <alpha-value>)",
        icon: "rgb(var(--color-icon) / <alpha-value>)",
        "gradient-start": "rgb(var(--color-gradient-start) / <alpha-value>)",
        "gradient-end": "rgb(var(--color-gradient-end) / <alpha-value>)",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, addUtilities, theme }) {
      addComponents({
        ".hstack": {
          display: "flex",
          flexDirection: "row",
        },
        ".vstack": {
          display: "flex",
          flexDirection: "column",
        },
        ".debug": {
          border: "1px solid",
          borderColor: theme("colors.red.500"),
        },
        ".center": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      });
      addUtilities({
        ".app-container": {
          "@apply max-w-screen-2xl mx-auto w-full px-5": {},
        },
      });
    }),
  ],
};
