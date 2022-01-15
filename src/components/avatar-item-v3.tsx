// npm
import type { JSX } from "solid-js/jsx-runtime"
import { createSignal, createResource, Show, For, createEffect } from "solid-js"

// self
import {
  clear,
  pickedBody,
  setBody,
  theParts,
  removePart,
} from "../utils/state"
import { pathPrefix } from "../routes"

function bodyParts(item: string): { name: string | undefined; more: string } {
  const parts: string[] = item.split("_")
  if (parts.length === 2 && (parts[1] === "left" || parts[1] === "right")) {
    return { name: undefined, more: item }
  }
  return { name: parts.slice(-1)[0], more: parts.slice(0, -1).join("_") }
}

async function parseIt(fn: string): Promise<Array<[string, Array<string>]>> {
  const res: Response = await fetch(`${pathPrefix}${fn}`)
  const txt: string = await res.text()
  const parser = new DOMParser()
  const svgDoc: Document = parser.parseFromString(txt, "image/svg+xml")

  const items: Map<string, string[]> = new Map()
  svgDoc.querySelectorAll("symbol").forEach((a: SVGSymbolElement) => {
    const { name, more }: { name: string | undefined; more: string } =
      bodyParts(a.getAttribute("id"))
    const gg: string[] = items.get(name)
    if (!gg) {
      items.set(name, [more])
    } else {
      gg.push(more)
      items.set(name, gg)
    }
  })

  return Array.from(items)
}

export default function AvatarItemV3(props: {
  layers
  partsFileName: string
}): JSX.Element {
  const [fullBodyId, setFullBodyId] = createSignal(pickedBody())
  const [shirts] = createResource(props.partsFileName, parseIt)

  createEffect(() => {
    setBody(fullBodyId())
  })

  function fullBody() {
    const [type, parts] = shirts()[fullBodyId()]
    return parts.map((x) => {
      return `${x}_${type}`
    })
  }

  function theItem(items, item) {
    return `${items}_${item.slice(20 + items.length)}`
  }

  function underBody(items, item) {
    const x = theItem(items, item)
    return props.layers().bodyBack.find((z) => z === x) !== undefined
  }

  function overBody(items, item) {
    const x = theItem(items, item)
    return props.layers().bodyFront.find((z) => z === x) !== undefined
  }

  function clearChar() {
    console.log("CLEAR")
    clear()
    setFullBodyId(0)
    // FIXME: better reset/reload
    window.location.href = window.location.href + "?cleared"
  }

  return (
    <div class="border-solid border-4 border-teal-600">
      <Show when={!shirts.loading && !props.layers.loading}>
        <div>
          <ul class="flex items-center">
            <For each={shirts()}>
              {(item, n) => (
                <Show when={item[0]}>
                  <li class="flex-1">
                    <button
                      onClick={setFullBodyId.bind(null, n())}
                      class="p-2 text-white bg-red-600 rounded-full"
                    >
                      {item[0]}
                    </button>
                  </li>
                </Show>
              )}
            </For>
          </ul>
          <p>
            Number of parts: {Object.keys(theParts()).length - 1}
            <Show when={Object.keys(theParts()).length - 1}>
              {" "}
              <button class="p-3 bg-red-600 text-white-300" onClick={clearChar}>
                RESET
              </button>
            </Show>
          </p>

          <Show when={fullBody().length > 0} fallback="Pick a body type">
            <svg viewBox="0 0 560 560" class="bg-white">
              <For each={Object.keys(theParts())}>
                {(items: string) => (
                  <For each={theParts()[items]}>
                    {(item: string) => (
                      <Show when={underBody(items, item)}>
                        <use
                          onClick={removePart.bind(null, items)}
                          href={`${pathPrefix}${item}`}
                        ></use>
                      </Show>
                    )}
                  </For>
                )}
              </For>

              <For each={fullBody().reverse()}>
                {(item) => (
                  <use
                    href={`${pathPrefix}${props.partsFileName}#${item}`}
                  ></use>
                )}
              </For>

              <use
                href={`${pathPrefix}${props.partsFileName}#ifoot_left`}
              ></use>
              <use
                href={`${pathPrefix}${props.partsFileName}#ifoot_right`}
              ></use>
              <use
                href={`${pathPrefix}${props.partsFileName}#ihand_left`}
              ></use>
              <use
                href={`${pathPrefix}${props.partsFileName}#ihand_right`}
              ></use>

              <For each={Object.keys(theParts())}>
                {(items: string) => (
                  <For each={theParts()[items]}>
                    {(item: string) => (
                      <Show when={overBody(items, item)}>
                        <use
                          onClick={removePart.bind(null, items)}
                          href={`${pathPrefix}${item}`}
                        ></use>
                      </Show>
                    )}
                  </For>
                )}
              </For>
            </svg>
          </Show>
        </div>
      </Show>
    </div>
  )
}
