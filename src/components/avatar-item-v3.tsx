// npm
import { JSX } from "solid-js/jsx-runtime"
import { createSignal, createResource, Show, For } from "solid-js"

// self
import { theParts, removePart } from "../utils/state"

function bodyParts(item: string): { name: string | undefined; more: string } {
  const parts: string[] = item.split("_")
  if (parts.length === 2 && (parts[1] === "left" || parts[1] === "right")) {
    return { name: undefined, more: item }
  }
  return { name: parts.slice(-1)[0], more: parts.slice(0, -1).join("_") }
}

async function parseIt(fn: string): Promise<Array<[string, Array<string>]>> {
  const res: Response = await fetch(fn)
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
  partsFileName: string
}): JSX.Element {
  const [fullBody, setFullBody] = createSignal([])
  const [shirts] = createResource(props.partsFileName, parseIt)

  function pickBodyType(a: string): void {
    const [type, parts] = shirts()[a]
    const full = parts.map((x) => {
      return `${x}_${type}`
    })
    setFullBody(full)
  }

  function elItem(type: string): string {
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
              <For each={fullBody().reverse()}>
                {(item) => <use href={`${props.partsFileName}#${item}`}></use>}
              </For>

              <use href={`${props.partsFileName}#ifoot_left`}></use>
              <use href={`${props.partsFileName}#ifoot_right`}></use>
              <use href={`${props.partsFileName}#ihand_left`}></use>
              <use href={`${props.partsFileName}#ihand_right`}></use>

              <For each={Object.keys(theParts())}>
                {(item) => (
                  <use
                    onClick={removePart.bind(null, item)}
                    href={elItem(item)}
                  ></use>
                )}
              </For>
            </svg>
          </Show>
        </div>
      </Show>
    </div>
  )
}
