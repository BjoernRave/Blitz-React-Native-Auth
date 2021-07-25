module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-100': '#edf9f8',
        'main-200': '#c8ecea',
        'main-500': '#7ed2cd',
        'main-600': '#6bccc6',
        'main-700': '#59c5bf',
        'main-800': '#46bfb8',
      },
      backgroundColor: {
        'bg-main-100': '#edf9f8',
        'main-200': '#c8ecea',
        'main-500': '#7ed2cd',
        'main-600': '#6bccc6',
        'main-700': '#59c5bf',
        'main-800': '#46bfb8',
      },
    },
  },
  variants: {},
  plugins: [],
}
