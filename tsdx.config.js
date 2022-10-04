const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          tailwindcss({
            content: ['./src/**/*.tsx'],
            darkMode: 'media', // or 'media' or 'class'
            theme: {
            },
            plugins: [],
          }),
          autoprefixer(),
        ]
      })
    );
    return config;
  },
};