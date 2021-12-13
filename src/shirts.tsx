import { createSignal, createResource, Show } from "solid-js";

const partsFileName = "/sprites/whole-shirt.svg"

async function parseIt(fn) {
  const res = await fetch(fn)
  const txt = await res.text()
  const parser = new DOMParser()
  const svgDoc = parser.parseFromString(txt, "image/svg+xml")
  const symbols = svgDoc.querySelectorAll('symbol')
  const z = Array.from(symbols).map((x) => x.getAttribute("id"))
  const y = z.map((x) => `${fn}#${x}`)
  return y
}

export default function Shirts () {
  const [name1, setName1] = createSignal(0)
  const [shirts, {refetch}] = createResource(partsFileName, parseIt)

  // refetch()

  function name2() {
    return name1() + 1
  }

  function clicky() {
    if (4 === name1()) {
      setName1(0)
    } else {
      setName1(name1() + 2)
    }
  }

  return (
    <div>
    <Show when={!shirts.loading}>
      <svg onClick={clicky}> 
        <use href={shirts()[name1()]}></use>
        <use href={shirts()[name2()]}></use>
      </svg>
    </Show>
    </div>
  )
}
