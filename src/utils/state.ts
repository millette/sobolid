// npm
import { createSignal } from "solid-js"
import { createStorage } from "@solid-primitives/storage"

const [elStore, setElstore, { clear, remove, toJSON }] = createStorage()

// TODO Fix type (Record..?)
function fromStore(): Record<string, unknown> {
  const j = toJSON()
  const j2 = {}
  let r
  for (r in j) {
    j2[r] = JSON.parse(j[r])
  }
  return j2
}

const [theParts, setParts] = createSignal(fromStore())

function addPart(type: string, item: string[]): void {
  setElstore(type, JSON.stringify(item))
  const pp = { ...theParts() }
  pp[type] = item
  setParts(pp)
}

function removePart(type: string): void {
  remove(type)
  const pp = { ...theParts() }
  delete pp[type]
  setParts(pp)
}

function hasPart(type: string): boolean {
  return undefined !== theParts()[type]
}

function pickedBody() {
  return elStore._bodyType || 0
}

function setBody(bodyType) {
  setElstore("_bodyType", bodyType)
}

export { clear, pickedBody, setBody, theParts, addPart, removePart, hasPart }
