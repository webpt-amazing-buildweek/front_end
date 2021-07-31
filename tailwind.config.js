module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    textShadow: {
      'default': '0 2px 0 #000',
      'md': '0 2px 2px #000',
      'h2': '0 0 1rem #FF0000, 0 0 1rem #0000FF',
      'h1': '0 0 1rem rgba(0, 0, 0, .8), 0 0 1rem rgba(0, 0, 0, .9)',
   }
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss-textshadow')],
}
