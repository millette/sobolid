// npm
import { useSupabase } from "solid-supabase"

// self
import "~/components/password-reset-form.css"
import { disabled, setDisabled, openModal } from "~/utils/session"
import parentForm from "~/utils/parent-form"

function PasswordResetForm() {
  const supabase = useSupabase()

  function cancel(ev) {
    openModal(false)
    const p = parentForm(ev.target)
    if (p) p.reset()
  }

  async function submitPasswordReset(ev) {
    ev.preventDefault()
    if (disabled()) return
    // const email = ev.target.email.value
    const password = ev.target.password.value
    const passwordTwice = ev.target["password-twice"].value
    if (!password || password !== passwordTwice) return

    setDisabled(true)

    try {
      /*
      const { error } = await supabase.auth.signIn({
        // email,
        password,
      })
      */
      const error = false

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

  /*
  async function resetPassword(ev) {
    console.log("RESET... #1")
    if (disabled()) return
    console.log("RESET... #2")
    const p = parentForm(ev.target)
    console.log("RESET... #3")
    if (!p) return

    const email = p.email.value
    console.log("RESET... #4")
    if (!email) return

    setDisabled(true)
    try {
      console.log("RESET... #5")

      const { data, error } = await supabase.auth.api.resetPasswordForEmail(
        email
      )
      setDisabled(false)
      console.log("RESET... #6")

      if (error) {
        console.log("ERROR", error)
        return
      }
      console.log("RESET... #7")
      console.log("DATA", data)
    } catch (e) {
      console.log("RESET... #8")
      console.error("EEEEE", e)
      setDisabled(false)
    }
  }
  */

  return (
    <form onSubmit={submitPasswordReset}>
      <label>
        new password: <input type="password" name="password" />
      </label>
      <br />
      <label>
        new password (again): <input type="password" name="password-twice" />
      </label>
      <br />
      <button disabled={disabled()}>Change password</button>
      <button onClick={cancel} type="button">
        Cancel
      </button>
    </form>
  )
}

export default PasswordResetForm
