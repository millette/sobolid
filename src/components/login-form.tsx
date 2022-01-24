// npm
import { useSupabase } from "solid-supabase"

// self
import "./login-form.css"
import {
  setUsername,
  disabled,
  setDisabled,
  openModal,
} from "~/utils/username-state"
// import { auth } from "~/utils/supabase"
import { setState } from "~/utils/session-state"

function LoginForm() {
  const supabase = useSupabase()

  function parentForm(target) {
    let p = target
    // prevents infinite loop
    for (let r = 0; r < 50; ++r) {
      p = p.parentNode
      // if (!p || p.reset) break
      if (!p || p.nodeName === "FORM") break
    }
    // find form and reset it
    if (p && p.reset) return p
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
    if (!email || !password) return

    setDisabled(true)

    try {
      const { session, user, provider, url, error } =
        await supabase.auth.signIn({
          email,
          password,
        })

      setDisabled(false)
      if (error) {
        console.log("ERROR", error)
        return
      }
      setUsername(email)
      setState("session", session)
      setState("user", user)
      setState("provider", provider)
      setState("url", url)
      ev.target.reset()
    } catch (e) {
      console.error("EEEEE", e)
      setDisabled(false)
    }
  }

  /*
  // http://localhost:3000/#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjQyOTY5OTAzLCJzdWIiOiIwMDMxZTgxNy0zMmE3LTQ4YWQtYTBiYy1jMjYwOTZlNDg5MjMiLCJlbWFpbCI6InJvYmluQG1pbGxldHRlLmluZm8iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImdpdGh1YiJdfSwidXNlcl9tZXRhZGF0YSI6eyJoZWxsbzY2NiI6IndvcmxkNjY2In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIn0.-fFhK2rKnKnqUs2XxUvhz_tb85hiZuTb2TVuxh3_zrQ&expires_in=3600&refresh_token=MLoGCqU-cffB6g6UqsniZQ&token_type=bearer&type=recovery
  
  http://localhost:3000/
  #access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjQyOTY5OTAzLCJzdWIiOiIwMDMxZTgxNy0zMmE3LTQ4YWQtYTBiYy1jMjYwOTZlNDg5MjMiLCJlbWFpbCI6InJvYmluQG1pbGxldHRlLmluZm8iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImdpdGh1YiJdfSwidXNlcl9tZXRhZGF0YSI6eyJoZWxsbzY2NiI6IndvcmxkNjY2In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIn0.-fFhK2rKnKnqUs2XxUvhz_tb85hiZuTb2TVuxh3_zrQ
  &expires_in=3600
  &refresh_token=MLoGCqU-cffB6g6UqsniZQ
  &token_type=bearer
  &type=recovery
  */

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
      <button onClick={resetPassword} type="button">
        Reset password
      </button>
      <button onClick={cancel} type="button">
        Cancel
      </button>
    </form>
  )
}

export default LoginForm
