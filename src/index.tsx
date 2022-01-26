// npm
import "uno.css"
import "@unocss/reset/tailwind.css"
import { render } from "solid-js/web"
import { Router } from "solid-app-router"
import { createClient } from "@supabase/supabase-js"
import { SupabaseProvider } from "solid-supabase"

// self
import App from "~/app"
import { clearSession, setSession } from "~/utils/session"

const supabase = createClient(
  String(import.meta.env.VITE_SUPABASE_URL),
  String(import.meta.env.VITE_SUPABASE_ANON_KEY)
)

supabase.auth.onAuthStateChange((event, session) => {
  switch (event) {
    case "SIGNED_IN":
      console.log("SIGNED_IN")
      setSession("user", session.user)
      break

    case "PASSWORD_RECOVERY":
      console.log("PASSWORD_RECOVERY")
      break

    case "SIGNED_OUT":
      console.log("SIGNED_OUT")
      clearSession()
      break

    default:
      console.log("onAuthStateChange-other-event", event)
  }
})

render(
  () => (
    <SupabaseProvider client={supabase}>
      <Router>
        <App />
      </Router>
    </SupabaseProvider>
  ),
  document.getElementById("root") as HTMLElement
)
