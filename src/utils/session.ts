// npm
import { createStore } from "solid-js/store"
import { createSignal } from "solid-js"

const [disabled, setDisabled] = createSignal(false)
const [modal, openModal] = createSignal(false)
const [session, setSession] = createStore({
  user: null, // object
})

function clearSession() {
  setSession("user", null)
}

export {
  disabled,
  setDisabled,
  modal,
  openModal,
  session,
  setSession,
  clearSession,
}
