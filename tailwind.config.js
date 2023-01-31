/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-mode': '#202328',
        bitcoin: '#F7931A',
        'input-bg': '#31353d',
        'b-orange': '#F7931A',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
