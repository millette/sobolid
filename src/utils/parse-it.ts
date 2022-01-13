// self
import { pathPrefix } from "../routes"

function isLayeredItem(item: string): { name: string; n: number } {
  const p: number = item.indexOf("_of_")
  console.log("YA", p, item)
  if (p === -1) return { name: item, n: 1 }
  const n: number = parseInt(item.slice(p + 4), 10)
  const name: string = item.slice(0, p - 2)
  console.log("isLayered", n, name)
  return { name, n }
}

export async function parseIt(fn: string): Promise<Array<[string, number]>> {
  console.log("FNparseit", fn, `${pathPrefix}${fn}`)
  const res: Response = await fetch(`${pathPrefix}${fn}`)
  const txt: string = await res.text()
  const parser = new DOMParser()
  const svgDoc: Document = parser.parseFromString(txt, "image/svg+xml")

  const items: Map<string, number> = new Map()
  svgDoc.querySelectorAll("symbol").forEach((a: SVGSymbolElement) => {
    const { name, n }: { name: string; n: number } = isLayeredItem(
      a.getAttribute("id")
    )
    items.set(`${fn}#${name}`, n)
  })

  return Array.from(items)
}
