// npm
import { useSupabase } from "solid-supabase"

// self
import "~/components/login-form.css"
import { disabled, setDisabled, openModal } from "~/utils/session"
import parentForm from "~/utils/parent-form"
import { setModalMessage } from "~/components/modal-message"

function LoginForm() {
  const supabase = useSupabase()

  function cancel(ev) {
    openModal(false)
    const p = parentForm(ev.target)
    if (p) p.reset()
  }

  async function submitLogin(ev) {
    ev.preventDefault()
    if (disabled()) return
    const email = ev.target.email.value
    const password = ev.target.password.value
    if (!email) {
      setModalMessage("Missing email")
      return
    }
    if (!password) {
      setModalMessage("Missing password")
      return
    }

    setDisabled(true)

    try {
      const { error } = await supabase.auth.signIn({
        email,
        password,
      })

      setDisabled(false)
      if (error) {
        setModalMessage(String(error))
        return
      }
      ev.target.reset()
    } catch (e) {
      setModalMessage(e)
      setDisabled(false)
    }
  }

  async function resetPassword(ev) {
    if (disabled()) return
    const p = parentForm(ev.target)
    if (!p) return

    const email = p.email.value
    if (!email) {
      setModalMessage("Missing email")
      return
    }

    setDisabled(true)
    try {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(
        email
      )
      setDisabled(false)

      if (error) {
        setModalMessage(String(error))
        return
      }

      console.log("DATA", data)
    } catch (e) {
      setModalMessage(e)
      setDisabled(false)
    }
  }

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
      <button disabled={disabled()} onClick={resetPassword} type="button">
        Reset password
      </button>
      <button disabled={disabled()} onClick={cancel} type="button">
        Cancel
      </button>
    </form>
  )
}

export default LoginForm
