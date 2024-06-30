/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'secondary-button': '#ddd',
        'blue-ribbon': '#0b4fff',
        'gray-one': '#d1d5db',
      },
      fontSize: {
        sm: '0.85rem',
        base: '0.9rem',
      },
      fontFamily: {
        'text-body': ['"Ubuntu", sans-serif;'],
      },
    },
  },
  plugins: [],
};
