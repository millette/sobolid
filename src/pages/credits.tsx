import { Suspense, createSignal, createResource } from "solid-js";
import { useData } from "solid-app-router";

const partsFileName = "/whole-shirt.svg"


async function parseIt(fn) {
  const res = await fetch(fn)
  const txt = await res.text()
  const parser = new DOMParser()
  const svgDoc = parser.parseFromString(txt, "image/svg+xml")
  const symbols = svgDoc.querySelectorAll('symbol')

  return Array.from(symbols).map((x) => x.getAttribute("id"))
}

export default function Credits() {
  const data = useData();
  const [name1, setName1] = createSignal(0)
  const [thingies, {refetch}] = createResource(partsFileName, parseIt)


  /*
  0 icolar_1_of_2 
  1 icolar_2_of_2 
  2 ikurta_1_of_2 
  3 ikurta_2_of_2 
  4 itanktop_1_of_2
  5 itanktop_2_of_2
  6 itshirt
  7 iturtleneck  
  */

  let shirts = []

  setTimeout(() => {
    refetch()
    shirts = thingies().map((x) => `${partsFileName}#${x}`)
    }, 500)

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
    <section class="bg-pink-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">Credits</h1>

      {!thingies.loading &&
      <svg onClick={clicky}> 
        <use href={shirts[name1()]}></use>
        <use href={shirts[name2()]}></use>
      </svg>
      }

      <p class="mt-4">This website's credits.</p>
      

        <pre class="mt-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
    </section>
  );
}
