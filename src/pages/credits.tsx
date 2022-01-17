// core
import fs from "node:fs"

// npm
import type { JSX } from "solid-js/jsx-runtime"
import { createResource, createSignal, For, Show, Suspense } from "solid-js"
import { Title } from "solid-meta"
// import {resolveRef} from "isomorphic-git"
import * as git from "isomorphic-git"

// self
import AvatarItem from "../components/avatar-item"
import Body from "../components/body"
import { pathPrefix } from "../routes"

/*
async function hashedVersion() {
  return git.resolveRef({ fs, dir: '.', ref: 'HEAD' })
}
*/

// const hashedVersion = await git.resolveRef({ fs, dir: '../../', ref: 'HEAD' })

/*
async function hv() {
  if (import.meta.env.MODE !== "production") return import.meta.env.MODE
  const res = await fetch(`${pathPrefix}manifest.json`)
  const json = await res.json()
  const msgUint8 = new TextEncoder().encode(json) // encode comme (utf-8) Uint8Array
  if (!(crypto && crypto.subtle && crypto.subtle.digest)) return "v.unknown"
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8) // fait le condensé
  const hashArray = Array.from(new Uint8Array(hashBuffer)) // convertit le buffer en tableau d'octet
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("") // convertit le tableau en chaîne hexadélimale
  return "v." + hashHex.slice(0, 10)
}

const [hashedVersion] = createResource(`${pathPrefix}manifst.json`, hv)
*/

const itemTypes: string[] = [
  "sprites/whole-armband.svg",
  "sprites/whole-belt.svg",
  "sprites/whole-button.svg",
  "sprites/whole-cloak.svg",
  "sprites/whole-coat.svg",
  "sprites/whole-gloves.svg",
  "sprites/whole-holster.svg",
  "sprites/whole-jacket.svg",
  "sprites/whole-kneepads.svg",
  "sprites/whole-necklace.svg",
  "sprites/whole-pants.svg",
  "sprites/whole-pet.svg",
  "sprites/whole-scarf.svg",
  "sprites/whole-scar.svg",
  "sprites/whole-shirt.svg",
  "sprites/whole-shoes.svg",
  "sprites/whole-shoulderpads.svg",
  "sprites/whole-socks.svg",
  "sprites/whole-suit.svg",
  "sprites/whole-tatoo.svg",
  "sprites/whole-tie.svg",
  "sprites/whole-underwear.svg",
  "sprites/whole-vest.svg",
  "sprites/whole-watch.svg",
  "sprites/whole-wings.svg",
]

function itemName(item: string): string {
  return item.slice(14, -4)
}

async function tada(fn) {
  const res = await fetch(fn)
  const json = await res.json()
  return json
}

async function hv(abc) {
  const x = "abc123"
  console.log("HV", abc, x)
  const y = await git.resolveRef({
    fs,
    gitdir: "/home/millette/sol/ts-wind-rout/.git",
    ref: "HEAD",
  })
  return x
}

/*
async function hv(abc) {
  const x = await git.resolveRef({ fs, gitdir: '/home/millette/sol/ts-wind-rout/.git', ref: 'HEAD' })
  console.log("HV", abc, x)
  return x
}
*/

export default function Credits(): JSX.Element {
  const [selected, setSelected] = createSignal(0)
  const [layers] = createResource(
    `${pathPrefix}sprites/male-body_front_swaying.json`,
    tada
  )

  const [hashedVersion] = createResource("xyz", hv)

  return (
    <section class="bg-pink-100 text-gray-700 p-8">
      <Title>
        Credits page
        <Suspense> ({hashedVersion})</Suspense>
      </Title>
      <h1 class="text-2xl font-bold">Credits</h1>

      <details>
        <summary>PRE {layers.loading ? "loading..." : "ready"}</summary>
        <pre>{JSON.stringify(layers(), null, 2)}</pre>
      </details>

      <Body layers={layers} />

      <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <For each={itemTypes} fallback={<div>Loading...</div>}>
          {(item, i) => (
            <div>
              <button onClick={setSelected.bind(null, i())}>
                {itemName(item)}
              </button>
              <Show when={i() === selected()}>
                <AvatarItem layers={layers} partsFileName={item} />
              </Show>
            </div>
          )}
        </For>
      </div>
    </section>
  )
}
