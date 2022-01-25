// npm
import { createSignal } from "solid-js"
import { createStorage } from "@solid-primitives/storage"

const [elStore, setElstore, { clear, remove, toJSON }] = createStorage()

// TODO: prefix body parts with BP:
function fromStore(): Record<string, string[]> {
  const j = toJSON()
  const j2 = {}
  let r
  for (r in j) {
    if (r === "_bodyType") continue
    if (r.startsWith("supabase.")) continue
    j2[r] = JSON.parse(j[r])
  }
  return j2
}

const [theParts, setParts] = createSignal<Record<string, string[]>>(fromStore())

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
