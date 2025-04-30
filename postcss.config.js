module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@tailwindcss/postcss'),
  ],
};
