/** @type {import('tailwindcss').Config} */
module.exports = {
  // important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontSize: {
        '10xl': '9rem'
      },
      lineHeight: {
        '12': '3rem',
        '14': '6.5rem'
      },
      rotate: {
        '20': '35deg',
      },
      margin: {
        '0.25': '1px',
        '5.25': '21px', 
        '18': '72px',
        '38.5': '154px'
      },
      width: {
        '90%': '90%'
      },
      height: {
        '480': '480px'
      },
      boxShadow: {
        'black-inner': 'inset 0 0 24px 14px rgba(0, 0, 0, 1)'
      },
      transformOrigin: {
        'rotate-x-45': 'rotateX(-45deg)',
      },
    },
  },
  plugins: [],
}
