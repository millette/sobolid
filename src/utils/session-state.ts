// npm
import { createStore } from "solid-js/store"

const [state, setState] = createStore({
  session: null, // object
  user: null, // object
  provider: null, // string
  url: null, // string
})

function clearState() {
  setState("session", null)
  setState("user", null)
  setState("provider", null)
  setState("url", null)
}

export { state, setState, clearState }
