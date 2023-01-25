/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      dropShadow: { appBar: 'rgb(0 0 0 / 10%) 0px -2px 8px' },
      colors: {
        blue: { default: '#2aa0e4', dark: '#305063' },
        appBar: {
          icons: { disabled: 'rgb(128 128 128)' },
        },
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwindcss-safe-area')],
};
