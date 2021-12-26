import { createSignal } from "solid-js"

const [theParts, setParts] = createSignal({})

function addPart(type, item) {
  const pp = { ...theParts() }
  pp[type] = item
  setParts(pp)
}

function removePart(type) {
  const pp = { ...theParts() }
  delete pp[type]
  setParts(pp)
}

function hasPart(type) {
  return undefined !== theParts()[type]
}

export { theParts, addPart, removePart, hasPart }
