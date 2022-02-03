// npm
import type { JSX } from "solid-js/jsx-runtime"
import {
  createSignal,
  createResource,
  Show,
  For,
  createEffect,
  createMemo,
} from "solid-js"

// self
import {
  clearChar,
  pickedBody,
  setBody,
  theParts,
  removePart,
} from "~/utils/bodyparts"
import { pathPrefix } from "~/routes"

const nParts = createMemo(() => Object.keys(theParts()).length)

function bodyParts(item: string): { name: string | undefined; more: string } {
  const elParts: string[] = item.split("_")
  if (
    elParts.length === 2 &&
    (elParts[1] === "left" || elParts[1] === "right")
  ) {
    return { name: undefined, more: item }
  }
  return { name: elParts.slice(-1)[0], more: elParts.slice(0, -1).join("_") }
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

  const [parts] = createResource(props.partsFileName, parseIt) // eslint-disable-line solid/reactivity

  createEffect(() => {
    setBody(fullBodyId())
  })

  function fullBody() {
    const [type, elParts] = parts()[fullBodyId()]
    return elParts.map((x) => {
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

  function clearCharAction() {
    clearChar()
    setFullBodyId(0)
    // FIXME: better reset/reload
    window.location.reload()
    // window.location.href = window.location.href + "?cleared"
  }

  return (
    <div class="border-solid border-4 border-teal-600">
      <Show when={!parts.loading && !props.layers.loading}>
        <div>
          <ul class="flex items-center">
            <For each={parts()}>
              {(item, n) => (
                <Show when={item[0]}>
                  <li class="flex-1">
                    <button
                      onClick={() => setFullBodyId(n())}
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
            <Show when={!nParts()}>
              <b>Start adding parts to the character.</b>
            </Show>
            <Show when={nParts()}>
              Number of parts: {nParts()}.{" "}
              <button
                class="p-3 bg-red-600 text-white-300"
                onClick={clearCharAction}
              >
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
