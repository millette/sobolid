// core
import { resolve } from "node:path"

// npm
import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import Unocss from "unocss/vite"
import presetWind from "@unocss/preset-wind"
import { visualizer } from "rollup-plugin-visualizer"

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${resolve(__dirname, "src")}/`,
    },
  },
  base: "./",
  plugins: [
    solidPlugin(),
    Unocss({
      presets: [presetWind()],
    }),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    rollupOptions: {
      plugins: [visualizer()],
    },
  },
})
