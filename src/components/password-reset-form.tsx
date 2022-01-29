// npm
import { useSupabase } from "solid-supabase"

// self
import { disabled, setDisabled, openModal, openModalPR } from "~/utils/session"
import parentForm from "~/utils/parent-form"
import { setModalMessage } from "~/components/modal-message"

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
    const password = ev.target.password.value
    const passwordTwice = ev.target["password-twice"].value
    if (!password || password !== passwordTwice) {
      setModalMessage("Passwords don't match")
      return
    }

    setDisabled(true)

    try {
      const { error } = await supabase.auth.update({ password })
      setDisabled(false)
      if (error) {
        setModalMessage(error.message)
        return
      }
      ev.target.reset()
      openModalPR(false)
    } catch (e) {
      setModalMessage(e)
      setDisabled(false)
    }
  }

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
