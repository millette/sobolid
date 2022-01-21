// self
import "./login-form.css"
import {
  setUsername,
  disabled,
  setDisabled,
  openModal,
} from "~/utils/username-state"
import { auth } from "~/utils/supabase"

// npm
// import { createStore } from "solid-js/store";

function cancel(ev) {
  openModal(false)
  let p = ev.target
  // prevents infinite loop
  for (let r = 0; r < 50; ++r) {
    p = p.parentNode
    if (!p || p.reset) break
  }
  // find form and reset it
  if (p && p.reset) p.reset()
}

async function submitLogin(ev) {
  ev.preventDefault()
  console.log("submitLogin")
  if (disabled()) return
  const email = ev.target.email.value
  const password = ev.target.password.value
  if (!email || !password) return

  setDisabled(true)

  try {
    const { session, user, provider, url, error } = await auth.signIn({
      email,
      password,
    })
    console.log("SESSION", session)
    console.log("USER", user)
    console.log("PROVIDER", provider)
    console.log("URL", url)
    console.log("ERROR", error)

    setDisabled(false)
    if (error) {
      return
    }
    setUsername(email)
    ev.target.reset()
  } catch (e) {
    console.error("EEEEE", e)
    setDisabled(false)
  }
}

function LoginForm() {
  return (
    <form onSubmit={submitLogin}>
      <label>
        email: <input disabled={disabled()} type="email" name="email" />
      </label>
      <br />
      <label>
        password:{" "}
        <input disabled={disabled()} type="password" name="password" />
      </label>
      <br />
      <button disabled={disabled()}>Login</button>
      <button onClick={cancel} type="button">
        Cancel
      </button>
    </form>
  )
}

export default LoginForm
