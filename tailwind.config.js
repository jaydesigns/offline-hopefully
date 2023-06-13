const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-switzer)', ...fontFamily.sans],
      },
      colors: {
        grey: '#DFE0E2',
        black: '#141011',
        white: '#FFFFFF',
        red: '#F45844',
        darkGrey: '#939393',
        32: '#323232',
      },
      fontSize: {
        xxl: '6vw',
        xxxl: '11vw',
        msm: '3vw',
        mxxxl: '10vw',
        bio: ['16vw',0.8],
        XS: ['2vw',1],
        SM: ['2.5vw',1],
        MED: ['6vw',1],
        LG: ['12vw',1],
        XL: ['12vw',1],
        XXL: ['16vw',0.8],
      },
      gridTemplateRows: {
        layout: 'auto 1fr 1fr 9.7vw 9.7vw 1fr',
        mobileLayout: 'auto 1fr 10vw 10.5vw 10.5vw 1fr',
        contact: 'fit-content(10%) fit-content 1fr 1fr fit-content(10%) 10%',
      },
      width: {
        ampMobile: '10vw',
        ampMd: '9vw',
      },
      lineHeight: {
        suis: '0.85em',
      },
      padding: {
        '25pct': '25%',
      },
    },
  },
  plugins: [],
}
