module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{vue,js}'
  ],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'black': '#131313',
        'blue-dark': '#282A4E',
        'red': '#F70048',
        'grey': '#E1E6F0',
        'grey-dark': '#D1D1D1',
        'grey-light': '#F6F7FB',
        'pink-light': '#FD5888',
      }
    },
  },
  plugins: [],
}

/*

npx tailwindcss -o ./src/assets/style.css -w -m

*/