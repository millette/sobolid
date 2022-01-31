// npm
import type { JSX } from "solid-js/jsx-runtime"
import { createSignal, createResource, Show } from "solid-js"

// self
import { parseIt } from "~/utils/parse-it"
import { addPart, removePart, hasPart } from "~/utils/bodyparts"
import { pathPrefix } from "~/routes"

export default function AvatarItem(props: {
  layers
  partsFileName: string
}): JSX.Element {
  const [name1, setName1] = createSignal(0)
  const [parts] = createResource(props.partsFileName, parseIt) // eslint-disable-line solid/reactivity

  function s1(): string {
    if (parts()[name1()][1] > 1)
      return `${parts()[name1()][0]}_1_of_${parts()[name1()][1]}`
    return parts()[name1()][0]
  }

  function s2(): string {
    if (parts()[name1()][1] > 1)
      return `${parts()[name1()][0]}_2_of_${parts()[name1()][1]}`
    return ""
  }

  function s3(): string {
    if (parts()[name1()][1] > 2)
      return `${parts()[name1()][0]}_3_of_${parts()[name1()][1]}`
    return ""
  }

  function s4(): string {
    if (parts()[name1()][1] > 3)
      return `${parts()[name1()][0]}_4_of_${parts()[name1()][1]}`
    return ""
  }

  function s5(): string {
    if (parts()[name1()][1] > 4)
      return `${parts()[name1()][0]}_5_of_${parts()[name1()][1]}`
    return ""
  }

  function s6(): string {
    if (parts()[name1()][1] > 5)
      return `${parts()[name1()][0]}_6_of_${parts()[name1()][1]}`
    return ""
  }

  function next(): void {
    if (parts().length === 1) return
    if (name1() + 1 === parts().length) {
      setName1(0)
    } else {
      setName1(name1() + 1)
    }
  }

  function previous(): void {
    if (parts().length === 1) return
    if (name1() === 0) {
      setName1(parts().length - 1)
    } else {
      setName1(name1() - 1)
    }
  }

  function typeItem(): { type: string; item: string } {
    const p = parts()[name1()][0].split("#")
    return {
      type: p[0].slice(14, -4),
      item: p[1],
    }
  }

  function punch(type: string): void {
    addPart(type, [s1(), s2(), s3(), s4(), s5(), s6()].filter(Boolean))
  }

  function removeit(type: string): void {
    removePart(type)
  }

  return (
    <div class="border-solid border-4 border-teal-600">
      <Show when={!parts.loading}>
        <div>
          <Show when={parts().length > 1}>
            <ul class="flex items-center">
              <li class="flex-1" onClick={previous}>
                <button class="p-2 text-white bg-indigo-600 rounded-full">
                  ⬅ Previous
                </button>
              </li>
              <li class="flex-1 text-right" onClick={next}>
                <button class="p-2 text-white bg-indigo-600 rounded-full">
                  Next ➡
                </button>
              </li>
            </ul>
          </Show>

          <div>
            <p>
              Name: {typeItem().type}
              <Show when={hasPart(typeItem().type)}>
                <span
                  onClick={removeit.bind(
                    null,
                    typeItem().type /* eslint-disable-line solid/reactivity */
                  )}
                >
                  [remove]
                </span>
              </Show>
            </p>
            <p>Layers: {parts()[name1()][1]}</p>
            <p>
              Item: {typeItem().item} ({name1() + 1} of {parts().length})
            </p>
          </div>
          <svg
            viewBox="0 0 560 560"
            class="bg-white"
            onClick={punch.bind(
              null,
              typeItem().type /* eslint-disable-line solid/reactivity */
            )}
          >
            <Show when={s6()}>
              <use href={`${pathPrefix}${s6()}`}></use>
            </Show>
            <Show when={s5()}>
              <use href={`${pathPrefix}${s5()}`}></use>
            </Show>
            <Show when={s4()}>
              <use href={`${pathPrefix}${s4()}`}></use>
            </Show>
            <Show when={s3()}>
              <use href={`${pathPrefix}${s3()}`}></use>
            </Show>
            <Show when={s2()}>
              <use href={`${pathPrefix}${s2()}`}></use>
            </Show>
            <use href={`${pathPrefix}${s1()}`}></use>
          </svg>
        </div>
      </Show>
    </div>
  )
}
