/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx}',
    "./node_modules/tw-elements/dist/js/**/*.js"
],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      fontFamily: {
        inter: ['Inter var', 'sans-serif'],
      },
      boxShadow: {
        card: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)',
        cardhover: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)',
      },
      colors: {
        primary: '#FF5A5F',
        secondary: '#00A699',
        primarydark: 'das',
        secondarydark: 'asd',
      },
    }
  },
  plugins: [
    require("tw-elements/dist/plugin"), 
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
  ],
};

