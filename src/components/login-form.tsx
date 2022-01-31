// npm
import { useSupabase } from "solid-supabase"

// self
import "~/components/login-form.css"
import { disabled, setDisabled, openModal } from "~/utils/session"
import parentForm from "~/utils/parent-form"
import { setModalMessage } from "~/components/modal-message"

function LoginForm() {
  const supabase = useSupabase()

  async function githubLogin() {
    if (disabled()) return
    setDisabled(true)

    try {
      // this reloads the page, makes handling errors a bit more difficult
      const { error } = await supabase.auth.signIn({ provider: "github" })
      setDisabled(false)
      if (error) {
        setModalMessage(error.message)
        return
      }
      openModal(false)
    } catch (e) {
      setModalMessage(e)
      setDisabled(false)
    }
  }

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

    setDisabled(true)

    try {
      const { error } = await supabase.auth.signIn({
        email,
        password,
      })

      setDisabled(false)
      if (error) {
        setModalMessage(error.message)
        return
      }
      ev.target.reset()
      if (!email) setModalMessage("Check email for Magic Link to login")
      openModal(false)
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
      const { error } = await supabase.auth.api.resetPasswordForEmail(email)
      setDisabled(false)

      if (error) {
        setModalMessage(error.message)
        return
      }

      setModalMessage("Check your email for password reset link")
    } catch (e) {
      setModalMessage(e)
      setDisabled(false)
    }
  }

  return (
    <form onSubmit={submitLogin}>
      Login with:{" "}
      <button disabled={disabled()} type="button" onClick={githubLogin}>
        github
      </button>{" "}
      <button type="button" disabled>
        facebook
      </button>
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
