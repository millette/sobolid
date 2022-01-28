// npm
import { useSupabase } from "solid-supabase"

// self
import { disabled, setDisabled, openModalRegister } from "~/utils/session"
import parentForm from "~/utils/parent-form"

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
    console.log("ok to Register?")
    if (!email || !password || password !== passwordTwice) return
    console.log("YES! Register")

    setDisabled(true)

    // setTimeout(() => setDisabled(false), 666)
    // return
    try {
      const { error, user, session } = await supabase.auth.signUp({
        email,
        password,
      })

      console.log("REG-USER", user)
      console.log("REG-SESS", session)

      setDisabled(false)
      if (error) {
        console.log("ERROR", error)
        return
      }
      ev.target.reset()
    } catch (e) {
      console.error("EEEEE", e)
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
