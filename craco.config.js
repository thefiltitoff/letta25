// react-scripts 5.0.1 hardcodes its postcss-loader plugin list (config: false) and only
// enables it when a tailwind.config.js exists, using the classic Tailwind v3 postcss-plugin
// shape (`require('tailwindcss')`). Tailwind v4 moved the postcss plugin to a separate
// `@tailwindcss/postcss` package, so without an override `@import "tailwindcss"` is left
// unprocessed in the built CSS. craco's default postcss override mode *extends* CRA's
// hardcoded plugin list (runs ours after postcss-preset-env/postcss-normalize), which breaks
// Tailwind's own import/candidate-scanning pass — `mode: "file"` instead removes CRA's
// hardcoded plugins/config:false and defers to our own postcss.config.js.
// css-loader resolves every url()/image-set() in CSS as a webpack module by
// default, including root-relative ones — so `url(/fonts/...)` fails with
// "Module not found" instead of being left as a literal browser-resolved path.
// Fonts live in public/fonts (not src/assets) specifically so their filenames
// stay stable and match the <link rel="preload"> hrefs in index.html; this
// tells css-loader to leave that one path prefix alone.
function skipFontsUrlResolution(webpackConfig) {
  for (const rule of webpackConfig.module.rules) {
    if (!Array.isArray(rule.oneOf)) continue;
    for (const oneOf of rule.oneOf) {
      if (!Array.isArray(oneOf.use)) continue;
      for (const use of oneOf.use) {
        if (typeof use === "object" && use.loader && /[\\/]css-loader[\\/]/.test(use.loader)) {
          use.options = {
            ...use.options,
            url: { filter: (url) => !url.startsWith("/fonts/") },
          };
        }
      }
    }
  }
  return webpackConfig;
}

module.exports = {
  style: {
    postcss: {
      mode: "file",
    },
  },
  webpack: {
    configure: skipFontsUrlResolution,
  },
};
