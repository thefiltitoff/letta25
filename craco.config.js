// react-scripts 5.0.1 hardcodes its postcss-loader plugin list (config: false) and only
// enables it when a tailwind.config.js exists, using the classic Tailwind v3 postcss-plugin
// shape (`require('tailwindcss')`). Tailwind v4 moved the postcss plugin to a separate
// `@tailwindcss/postcss` package, so without an override `@import "tailwindcss"` is left
// unprocessed in the built CSS. craco's default postcss override mode *extends* CRA's
// hardcoded plugin list (runs ours after postcss-preset-env/postcss-normalize), which breaks
// Tailwind's own import/candidate-scanning pass — `mode: "file"` instead removes CRA's
// hardcoded plugins/config:false and defers to our own postcss.config.js.
module.exports = {
  style: {
    postcss: {
      mode: "file",
    },
  },
};
