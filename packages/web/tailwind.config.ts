/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brands: {
          primary: '#4640de',
          secondary: '#ccccf5',
          tertiary: '#e9ebfd'
        },
        neutrals: {
          0: '#ffffff',
          10: '#f8f8fd',
          20: '#d6ddeb',
          40: '#a8adb7',
          60: '#7c8493',
          80: '#515b6f',
          100: '#25324b'
        },
        accents: {
          yellow: '#ffb836',
          green: '#56cdad',
          red: '#ff6550',
          blue: '#26a4ff',
          purple: '#7b61ff',
          black: '#202430',
        }
      },
      fontSize: {
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
        '5xl': '4.5rem'
      },
      fontFamily: {
        serif: 'Clash Display',
        sans: 'Epilogue',
        button: 'Epilogue',
        heading: 'Monument Extended',
      },
      borderRadius: {
        none: '0',
        xs: '0.03125rem',
        sm: '0.0833333358168602rem',
        default: '0.125rem',
        lg: '0.1666666716337204rem',
        xl: '0.1875rem',
        '2xl': '0.25rem',
        '3xl': '0.3125rem',
        '4xl': '0.5rem',
        '5xl': '0.7673361301422119rem',
        '6xl': '0.9900097250938416rem',
        '7xl': '1.25rem',
        '8xl': '1.5rem',
        '9xl': '1.6539466381072998rem',
        '10xl': '1.6702461242675781rem',
        '11xl': '2rem',
        '12xl': '2.0498476028442383rem',
        '13xl': '2.5rem',
        '14xl': '3.125rem',
        '15xl': '4.15625rem',
        '16xl': '5rem',
        '17xl': '5.610937595367432rem',
        '18xl': '6rem',
        full: '9999px'
      },
      height: {
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl' : '3rem',
      },
      width: {
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl' : '3rem',
      },
    }
  },
  plugins: [],
}

