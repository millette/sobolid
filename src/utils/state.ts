// npm
import { createSignal } from "solid-js"

const [theParts, setParts] = createSignal({})

function addPart(type: string, item: string[]): void {
  const pp = { ...theParts() }
  pp[type] = item
  setParts(pp)
}

function removePart(type: string): void {
  const pp = { ...theParts() }
  delete pp[type]
  setParts(pp)
}

function hasPart(type: string): boolean {
  return undefined !== theParts()[type]
}

export { theParts, addPart, removePart, hasPart }
