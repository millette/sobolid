import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Unocss from 'unocss/vite'
// import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  plugins: [solidPlugin(), Unocss()],
  // plugins: [solidPlugin(), WindiCSS()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
