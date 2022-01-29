// npm
import { useSupabase } from "solid-supabase"

// self
import { disabled, setDisabled, openModalRegister } from "~/utils/session"
import parentForm from "~/utils/parent-form"
import { setModalMessage } from "~/components/modal-message"

function RegisterForm() {
  const supabase = useSupabase()

  function cancel(ev) {
    openModalRegister(false)
    const p = parentForm(ev.target)
    if (p) p.reset()
  }

  async function submitLogin(ev) {
    ev.preventDefault()
    if (disabled()) return
    const email = ev.target.email.value
    const password = ev.target.password.value
    const passwordTwice = ev.target["password-twice"].value

    if (!email) {
      setModalMessage("Missing email")
      return
    }
    if (!password) {
      setModalMessage("Missing password")
      return
    }
    if (password !== passwordTwice) {
      setModalMessage("Passwords don't match")
      return
    }

    setDisabled(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      setDisabled(false)
      if (error) {
        setModalMessage(error.message)
        return
      }
      setModalMessage("Check your email for validation link")
      ev.target.reset()
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
      <label>
        password (again): <input type="password" name="password-twice" />
      </label>
      <br />

      <button disabled={disabled()}>Register</button>
      <button disabled={disabled()} onClick={cancel} type="button">
        Cancel
      </button>
    </form>
  )
}

export default RegisterForm
