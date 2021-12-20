function isLayeredItem(item) {
  const p = item.indexOf("_of_")
  if (p === -1) return { name: item, n: 1 }
  const n = parseInt(item.slice(p + 4), 10)
  const name = item.slice(0, p - 2)
  return { name, n }
}

export async function parseIt(fn) {
  const res = await fetch(fn)
  const txt = await res.text()
  const parser = new DOMParser()
  const svgDoc = parser.parseFromString(txt, "image/svg+xml")

  const items = new Map()
  svgDoc.querySelectorAll("symbol").forEach((a, b) => {
    const { name, n } = isLayeredItem(a.getAttribute("id"))
    items.set(`${fn}#${name}`, n)
  })

  return Array.from(items)
}
