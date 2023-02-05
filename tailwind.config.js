/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: '#DFE0E2',
        black: '#141011',
        white: '#FFFFFF',
        red: '#F45844',
        darkGrey: '#939393',
      },
      fontSize: {
        xxl: '6vw',
        xxxl: '10vw',
        msm: '3vw',
        mxxxl: '11.5vw',
        bio: ['16vw',0.8],
        SM: ['3vw',0.8],
        MED: ['6vw',1],
        LG: ['10vw',1],
        XL: ['11.5vw',1],
        XXL: ['16vw',0.8],
      },
      gridTemplateRows: {
        layout: '2vw 1fr 1fr 10vw 10vw 1fr',
        mobileLayout: 'auto 1fr 1fr 11.5vw 11.5vw 1fr',
      },
      width: {
        ampMobile: '11.5vw',
        ampMd: '9vw',
      },
      lineHeight: {
        suis: '0.85em',
      },
    },
  },
  plugins: [],
}
