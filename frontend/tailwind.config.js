/** @type {import('tailwindcss').Config} */

// @media (min-width: 1200px)
// .container {
//     max-width: 1140px;
// }
// @media (min-width: 992px)
// .container {
//     max-width: 960px;
// }
// @media (min-width: 768px)
// .container {
//     max-width: 720px;
// }
// @media (min-width: 576px)
// .container {
//     max-width: 540px;
// }

module.exports = {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '768px',
      // => @media (min-width: 960px) { ... }

      'lg': '992px',
      // => @media (min-width: 1440px) { ... }
      'xl': '1200px'
    },
    container: {
      // margin: {
      //   // DEFAULT: '1rem',
      //   // sm: '3rem',
      //   // lg: '6rem',
      //   // xl: '8rem',
      //   // '2xl': '8rem',
      // },
    },
    extend: {
      colors: {
        'light-brown' : '#735e59',
        'brown' : '#544541',
        'beige' : '#eceada',
        'red' : '#ff0000'
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
