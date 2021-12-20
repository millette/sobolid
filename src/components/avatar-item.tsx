import { createSignal, createResource, Show } from "solid-js"

import { parseIt } from "../utils/parse-it"

// type HeHa = Function => Array<number>

/*
type Bar = (
  () => number
)

type Foo = Array<Bar>
*/

export default function AvatarItem(props) {
  const [name1, setName1] = createSignal(0)
  const [shirts] = createResource(props.partsFileName, parseIt) //  : Foo

  function s1() {
    if (shirts()[name1()][1] > 1)
      return `${shirts()[name1()][0]}_1_of_${shirts()[name1()][1]}`
    return shirts()[name1()][0]
  }

  function s2() {
    if (shirts()[name1()][1] > 1)
      return `${shirts()[name1()][0]}_2_of_${shirts()[name1()][1]}`
    return ""
  }

  function s3() {
    if (shirts()[name1()][1] > 2)
      return `${shirts()[name1()][0]}_3_of_${shirts()[name1()][1]}`
    return ""
  }

  function s4() {
    if (shirts()[name1()][1] > 3)
      return `${shirts()[name1()][0]}_4_of_${shirts()[name1()][1]}`
    return ""
  }

  function s5() {
    if (shirts()[name1()][1] > 4)
      return `${shirts()[name1()][0]}_5_of_${shirts()[name1()][1]}`
    return ""
  }

  function s6() {
    if (shirts()[name1()][1] > 5)
      return `${shirts()[name1()][0]}_6_of_${shirts()[name1()][1]}`
    return ""
  }

  function next() {
    if (shirts().length === 1) return
    if (name1() + 1 === shirts().length) {
      setName1(0)
    } else {
      setName1(name1() + 1)
    }
  }

  function previous() {
    if (shirts().length === 1) return
    if (name1() === 0) {
      setName1(shirts().length - 1)
    } else {
      setName1(name1() - 1)
    }
  }

  function woot() {
    const p = shirts()[name1()][0].split("#")
    return {
      type: p[0].slice(15, -4),
      item: p[1],
    }
  }

  function punch(type, item) {
    console.log("PUNCH", type, item)
  }

  return (
    <div
      class="border-solid border-4 border-teal-600"
      style="min-height: 300px"
    >
      <Show when={!shirts.loading}>
        <div>
          <Show when={shirts().length > 1}>
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

          <div style="height: 7rem">
            <p>Name: {woot().type}</p>
            <p>Layers: {shirts()[name1()][1]}</p>
            <p>
              Item: {woot().item} ({name1() + 1} of {shirts().length})
            </p>
          </div>
          <svg
            class="bg-white"
            onClick={punch.bind(null, woot().type, woot().item)}
          >
            <Show when={s6()}>
              <use href={s6()}></use>
            </Show>
            <Show when={s5()}>
              <use href={s5()}></use>
            </Show>
            <Show when={s4()}>
              <use href={s4()}></use>
            </Show>
            <Show when={s3()}>
              <use href={s3()}></use>
            </Show>
            <Show when={s2()}>
              <use href={s2()}></use>
            </Show>
            <use href={s1()}></use>
          </svg>
        </div>
      </Show>
    </div>
  )
}
