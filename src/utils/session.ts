// npm
import { createStore } from "solid-js/store"
import { createSignal } from "solid-js"

const [disabled, setDisabled] = createSignal(false)
const [modal, openModal] = createSignal(false)
const [modalRegister, openModalRegister] = createSignal(false)
const [modalPR, openModalPR] = createSignal(false)
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
  modalRegister,
  openModalRegister,
  modalPR,
  openModalPR,
  session,
  setSession,
  clearSession,
}
