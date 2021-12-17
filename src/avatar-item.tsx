import { createSignal, createResource, Show } from "solid-js";

function isLayeredItem(item) {
  console.log(item)
  const p = item.indexOf("_of_")
  if (p === -1) return { name: item, n: 1 }
  const n = parseInt(item.slice(p + 4), 10)
  const name = item.slice(0, p - 2)
  return { name, n }
}

async function parseIt(fn) {
  const res = await fetch(fn)
  const txt = await res.text()
  const parser = new DOMParser()
  const svgDoc = parser.parseFromString(txt, "image/svg+xml")

  const items = new Map()
  svgDoc.querySelectorAll('symbol').forEach((a, b) => {
    const { name, n } = isLayeredItem(a.getAttribute("id"))
    items.set(`${fn}#${name}`, n)
  })

  return Array.from(items)
}

export default function AvatarItem ({partsFileName}) {
  const [name1, setName1] = createSignal(0)
  const [shirts] = createResource(partsFileName, parseIt)

  function s1() {
    if (shirts()[name1()][1] > 1) 
      return `${shirts()[name1()][0]}_1_of_${shirts()[name1()][1]}`
    return shirts()[name1()][0]
  }

  function s2() {
    if (shirts()[name1()][1] > 1) 
      return `${shirts()[name1()][0]}_2_of_${shirts()[name1()][1]}`
    return ""
  }

  function s3() {
    if (shirts()[name1()][1] > 2) 
      return `${shirts()[name1()][0]}_3_of_${shirts()[name1()][1]}`
    return ""
  }



  function clicky() {
    if (name1() + 1 === shirts().length) {
      setName1(0)
    } else {
      setName1(name1() + 1)
    }
  }

  return (
    <div>
    <Show when={!shirts.loading}>
      <div onClick={clicky}>
      <p>Holla</p>
      <svg> 
        <use href={s1()}></use>
        <Show when={s2()}>
          <use href={s2()}></use>
        </Show>
        <Show when={s3()}>
          <use href={s3()}></use>
        </Show>
      </svg>
      </div>
    </Show>
    </div>
  )
}
