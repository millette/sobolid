// core
import { readFileSync, writeFileSync } from "node:fs"

// npm
import fg from "fast-glob"

fg.sync("public/sprites/whole-*.svg").forEach((z) => {
  const x = readFileSync(z, "utf-8")
  const y = x.replace(/ viewBox="[-0-9 ]+"/g, ' viewBox="0 0 560 560"')
  console.log(z, x.length, y.length, x.length - y.length)
  writeFileSync(`v2/${z}`, y)
})
