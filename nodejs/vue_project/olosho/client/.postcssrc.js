// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": [
    require('postcss-import'),
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer')(),
  ]
}
/* module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}
('tailwind.config.js')
 */