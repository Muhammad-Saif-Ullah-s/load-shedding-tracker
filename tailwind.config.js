/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pk: {
          green: '#01411C',
          'green-light': '#026B2F',
          'green-muted': '#04A843',
          white: '#FFFFFF',
          cream: '#F5F5F0',
        },
      },
      fontFamily: {
        urdu: ['Noto Nastaliq Urdu', 'serif'],
      },
    },
  },
  plugins: [],
};
