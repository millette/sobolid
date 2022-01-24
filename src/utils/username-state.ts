// npm
import { createSignal } from "solid-js"

// const [username, setUsername] = createSignal("")
const [disabled, setDisabled] = createSignal(false)
const [modal, openModal] = createSignal(false)

// export { username, setUsername, disabled, setDisabled, modal, openModal }
export { disabled, setDisabled, modal, openModal }
