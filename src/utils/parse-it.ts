// self
import { pathPrefix } from "~/routes"

function isLayeredItem(item: string): { name: string; n: number } {
  const p: number = item.indexOf("_of_")
  if (p === -1) return { name: item, n: 1 }
  const n: number = parseInt(item.slice(p + 4), 10)
  const name: string = item.slice(0, p - 2)
  return { name, n }
}

export async function parseIt(fn: string): Promise<Array<[string, number]>> {
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
