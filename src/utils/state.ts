// npm
import { createSignal } from "solid-js"

const [theParts, setParts] = createSignal({})

function addPart(type: string, item: string): void {
  console.log("ADDPART", type, item)
  const pp = { ...theParts() }
  pp[type] = item
  setParts(pp)
}

function removePart(type: string): void {
  console.log("REMOVEPART", type)
  const pp = { ...theParts() }
  delete pp[type]
  setParts(pp)
}

function hasPart(type: string): boolean {
  console.log("HASPART", type)
  return undefined !== theParts()[type]
}

export { theParts, addPart, removePart, hasPart }
