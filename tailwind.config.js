/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: { default: '#2aa0e4', dark: '#305063' },
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwindcss-safe-area')],
};
