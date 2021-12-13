import { Suspense, lazy } from "solid-js";
import { useData } from "solid-app-router";
// import Shirts from "../shirts"

const Shirts = lazy(() => import("../shirts"))
export default function Credits() {
  const data = useData();

  /*
  setTimeout((p) => {
    refetch()
  }, 500)
  */

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

  // let shirts = []

  /*
  setTimeout((p) => {
    refetch()
    shirts = thingies().map((x) => `${p}#${x}`)
  }, 500, partsFileName)
  */



  /*

      <pre>
        loading? {thingies.loading ? "yes" : "no"}
      </pre>
      <Show when={!thingies.loading} fallback={<div>Loading...</div>}>
      </Show>

  */

  return (
    <section class="bg-pink-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">Credits</h1>

      <Suspense>
        <Shirts />
      </Suspense>

      <p class="mt-4">This website's credits.</p>
      
      <Suspense>
        <pre class="mt-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </Suspense>
    </section>
  );
}
