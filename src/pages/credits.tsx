import { Suspense, lazy } from "solid-js";
import { useData } from "solid-app-router";
import Shirts from "../shirts"

// const Shirts = lazy(() => import("../shirts"))
export default function Credits() {
  const data = useData();

//  <Suspense>  </Suspense>

  return (
    <section class="bg-pink-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">Credits</h1>

        <Shirts />

      <p class="mt-4">This website's credits.</p>
      
      <Suspense>
        <pre class="mt-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </Suspense>
    </section>
  );
}
