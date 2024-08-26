import plugin from 'tailwindcss/plugin';
/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#1db954',
        secondary: '#1ed760',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.hstack': {
          display: 'flex',
          flexDirection: 'row',
        },
        '.vstack': {
          display: 'flex',
          flexDirection: 'column',
        },
        '.debug': {
          border: '1px solid',
          borderColor: theme('colors.red.500'),
        },
        '.center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      });
    }),
  ],
};
