import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Unocss from 'unocss/vite'
import presetWind from '@unocss/preset-wind'

export default defineConfig({
  plugins: [solidPlugin(), Unocss(
    {
      presets: [
        presetWind()
      ]
    }    
  )],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
