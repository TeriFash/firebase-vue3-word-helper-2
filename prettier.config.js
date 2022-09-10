module.exports = {
  tabWidth: 2,
  printWidth: 80,
  useTabs: false,
  semi: true,
  singleQuote: true,
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
};
