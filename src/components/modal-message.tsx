// npm
import { createSignal } from "solid-js"

const [modalMessage, setModalMessage] = createSignal("")

function close() {
  setModalMessage("")
}

function ModalMessage() {
  return (
    <div>
      <button onClick={close} class="float-right">
        X
      </button>
      <div class="error-message" />
    </div>
  )
}

export { ModalMessage, modalMessage, setModalMessage }
