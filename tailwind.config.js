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
        xxxl: '10.5vw',
        msm: '3vw',
        mxxxl: '13vw',
        bio: ['16vw',0.8],
        XS: ['2vw',1],
        SM: ['3vw',0.8],
        MED: ['6vw',0.8],
        LG: ['10vw',1],
        XL: ['12vw',1],
        XXL: ['16vw',0.8],
      },
      gridTemplateRows: {
        layout: 'auto 1fr 1fr 10vw 10vw 1fr',
        mobileLayout: 'auto 1fr 1fr 10vw 10vw 1fr',
      },
      width: {
        ampMobile: '10.5vw',
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
