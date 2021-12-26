import { createSignal, createResource, Show, For } from "solid-js"

import { theParts } from "../utils/state"

function bodyParts(item) {
  const parts = item.split("_")
  if (parts.length === 2 && (parts[1] === "left" || parts[1] === "right")) {
    return { more: item }
  }
  return { name: parts.slice(-1)[0], more: parts.slice(0, -1).join("_"), n: 0 }
}

async function parseIt(fn) {
  const res = await fetch(fn)
  const txt = await res.text()
  const parser = new DOMParser()
  const svgDoc = parser.parseFromString(txt, "image/svg+xml")

  const items = new Map()
  svgDoc.querySelectorAll("symbol").forEach((a, b) => {
    const { name, more } = bodyParts(a.getAttribute("id"))
    const gg = items.get(name)
    if (!gg) {
      items.set(name, [more])
    } else {
      gg.push(more)
      items.set(name, gg)
    }
  })

  return Array.from(items)
}

export default function AvatarItemV3(props) {
  const [fullBody, setFullBody] = createSignal([])
  const [shirts] = createResource(props.partsFileName, parseIt)

  function pickBodyType(a) {
    const [type, parts] = shirts()[a]
    const full = parts.map((x) => {
      return `${x}_${type}`
    })
    setFullBody(full)
  }

  function elItem(type) {
    return `/sprites/whole-${type}.svg#${theParts()[type]}`
  }

  return (
    <div class="border-solid border-4 border-teal-600">
      <Show when={!shirts.loading}>
        <div>
          <ul class="flex items-center">
            <For each={shirts()}>
              {(item, n) => (
                <Show when={item[0]}>
                  <li class="flex-1">
                    <button
                      onClick={pickBodyType.bind(null, n())}
                      class="p-2 text-white bg-red-600 rounded-full"
                    >
                      {item[0]}
                    </button>
                  </li>
                </Show>
              )}
            </For>
          </ul>
          <p>Number of parts: {Object.keys(theParts()).length}</p>

          <Show when={fullBody().length > 0} fallback="Pick a body type">
            <svg viewBox="0 0 560 560" class="bg-white">
              <use href={`${props.partsFileName}#ifoot_left`}></use>
              <use href={`${props.partsFileName}#ifoot_right`}></use>
              <use href={`${props.partsFileName}#ihand_left`}></use>
              <use href={`${props.partsFileName}#ihand_right`}></use>
              <For each={fullBody()}>
                {(item) => <use href={`${props.partsFileName}#${item}`}></use>}
              </For>

              <For each={Object.keys(theParts())}>
                {(item) => <use width="560" href={elItem(item)}></use>}
              </For>
            </svg>
          </Show>
        </div>
      </Show>
    </div>
  )
}
