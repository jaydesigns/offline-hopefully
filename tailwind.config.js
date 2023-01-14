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
        msm: '3.5vw',
        mxxxl: '11.5vw',
      },
      gridTemplateRows: {
        layout: '1fr 1fr 1fr 10vw 10vw 1fr',
        mobileLayout: '1fr 1fr 1fr 12vw 12vw 1fr',
      },
      width: {
        ampMobile: '12vw',
        ampMd: '9vw',
      },
    },
  },
  plugins: [],
}
