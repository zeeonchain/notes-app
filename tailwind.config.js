/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          bg: '#FCFCFD',
          card: '#FFFFFF',
          rule: '#E7E8EC',
          ruleFaint: '#F1F2F5',
        },
        night: {
          bg: '#0E0F13',
          card: '#17191F',
          rule: '#282B34',
        },
        ink: {
          DEFAULT: '#14161F',
          muted: '#767C8C',
          invert: '#F3F4F6',
          mutedInvert: '#9AA0AE',
        },
        pen: {
          DEFAULT: '#4F46E5',
          dim: '#4038C4',
        },
        highlight: {
          DEFAULT: '#FFD23F',
          dim: '#F4B400',
        },
        marker: {
          DEFAULT: '#E5484D',
          dim: '#C93A3E',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
