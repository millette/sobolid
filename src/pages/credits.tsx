import { Suspense, createSignal } from "solid-js";
import { useData } from "solid-app-router";



const partsFileName = "/whole-shirt.svg"
const shirts = [
  "icolar_1_of_2",
  "icolar_2_of_2",
  "ikurta_1_of_2",
  "ikurta_2_of_2",
  // "itshirt",
  // "iturtleneck",
].map((x) => `${partsFileName}#${x}`)

export default function Credits() {
  const data = useData();

  const [name1, setName1] = createSignal(0)

  function name2() {
    return name1() + 1
  }
  
  /*
  let parsed = false

  async function parseIt() {
    parsed = true
    const res = await fetch(partsFileName)
    const txt = await res.text()
    const parser = new DOMParser()
    const svgDoc = parser.parseFromString(txt, "image/svg+xml")
    const symbols = svgDoc.querySelectorAll('symbol')
    // let i = 0
    symbols.forEach((x, i) => {
      const id = x.getAttribute("id")
      console.log("XXX", i, id)
    })
  }
  */

  function clicky() {
    /*
    if (!parsed) {
      parseIt().catch(console.error)
    }
    */

    if (0 === name1()) {
      setName1(2)
    } else {
      setName1(0)
    }
  }
  
  return (
    <section class="bg-pink-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">Credits</h1>

      <svg onClick={clicky}> 
        <use href={shirts[name1()]}></use>
        <use href={shirts[name2()]}></use>
      </svg>

      <p class="mt-4">This website's credits.</p>
      

      <Suspense>
        <pre class="mt-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </Suspense>
    </section>
  );
}
