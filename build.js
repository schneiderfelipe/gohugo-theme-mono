#!/usr/bin/env node

const fs = require("fs/promises");

const { vanillaExtractPlugin } = require("@vanilla-extract/esbuild-plugin");

const postcss = require("postcss");
const autoprefixer = require("autoprefixer");

async function processCss(css) {
  const result = await postcss([autoprefixer]).process(css, {
    from: undefined /* suppress source map warning */,
  });

  return result.css;
}

require("esbuild")
  .build({
    entryPoints: ["assets/ts/index.ts"],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ["chrome98", "safari14.8", "edge99", "firefox98", "esnext"],
    plugins: [
      vanillaExtractPlugin({
        processCss,
      }),
    ],
    outfile: "assets/js/index.js",
  })
  .then(() => fs.rename("assets/js/index.css", "assets/css/index.css"))
  .then(() => fs.rename("assets/js/index.css.map", "assets/css/index.css.map"))
  .then(() => console.log("Build complete!"))
  .catch((reason) => {
    console.error(reason);
    process.exit(1);
  });
