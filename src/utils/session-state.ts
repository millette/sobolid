// npm
import { createStore } from "solid-js/store"

const [session, setSession] = createStore({
  user: null, // object
})

function clearSession() {
  setSession("user", null)
}

export { session, setSession, clearSession }
