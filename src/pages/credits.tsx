import { Suspense } from "solid-js";
import { useData } from "solid-app-router";
import AvatarItem from "../avatar-item"

// const partsFileName = "/sprites/whole-shirt.svg"
// const partsFileName = "/sprites/whole-pants.svg"
const partsFileName = "/sprites/whole-coat.svg"

/*
whole-armband.svg
whole-belt.svg
whole-body.svg
whole-button.svg
whole-cloak.svg
whole-coat.svg
whole-gloves.svg
whole-holster.svg
whole-jacket.svg
whole-kneepads.svg
whole-necklace.svg
whole-pants.svg
whole-pet.svg
whole-scarf.svg
whole-scar.svg
whole-shirt.svg
whole-shoes.svg
whole-shoulderpads.svg
whole-socks.svg
whole-suit.svg
whole-tatoo.svg
whole-tie.svg
whole-underwear.svg
whole-vest-orig.svg
whole-vest.svg
whole-watch.svg
whole-wings.svg

*/

export default function Credits() {
  const data = useData();

  return (
    <section class="bg-pink-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">Credits</h1>
      
      <Suspense fallback="One moment...">
        <AvatarItem partsFileName={partsFileName} />
      </Suspense>
      
      <p class="mt-4">This website's credits.</p>
      <Suspense fallback="Loading...">
        <pre class="mt-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </Suspense>
    </section>
  );
}
