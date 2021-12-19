import { createSignal, For, Show } from "solid-js"
import { Title } from "solid-meta"

import AvatarItem from "../avatar-item"

const itemTypes = [
  "/sprites/whole-armband.svg",
  "/sprites/whole-belt.svg",
  // '/sprites/whole-body.svg',
  "/sprites/whole-button.svg",
  "/sprites/whole-cloak.svg",
  "/sprites/whole-coat.svg",
  "/sprites/whole-gloves.svg",
  "/sprites/whole-holster.svg",
  "/sprites/whole-jacket.svg",
  "/sprites/whole-kneepads.svg",
  "/sprites/whole-necklace.svg",
  "/sprites/whole-pants.svg",
  "/sprites/whole-pet.svg",
  "/sprites/whole-scarf.svg",
  "/sprites/whole-scar.svg",
  "/sprites/whole-shirt.svg",
  "/sprites/whole-shoes.svg",
  "/sprites/whole-shoulderpads.svg",
  "/sprites/whole-socks.svg",
  "/sprites/whole-suit.svg",
  "/sprites/whole-tatoo.svg",
  "/sprites/whole-tie.svg",
  "/sprites/whole-underwear.svg",
  // '/sprites/whole-vest-orig.svg',
  "/sprites/whole-vest.svg",
  "/sprites/whole-watch.svg",
  "/sprites/whole-wings.svg",
]

function itemName(item) {
  return item.slice(15, -4)
}

export default function Credits() {
  const [selected, setSelected] = createSignal(0)

  return (
    <section class="bg-pink-100 text-gray-700 p-8">
      <Title>Credits page</Title>
      <h1 class="text-2xl font-bold">Credits</h1>

      <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <For each={itemTypes} fallback={<div>Loading...</div>}>
          {(item, i) => (
            <div>
              <button onClick={setSelected.bind(null, i())}>
                {itemName(item)}
              </button>
              <Show when={i() === selected()}>
                <AvatarItem partsFileName={item} />
              </Show>
            </div>
          )}
        </For>
      </div>
    </section>
  )
}
