// npm
import "uno.css"
import "@unocss/reset/tailwind.css"
import { render } from "solid-js/web"
import { Router } from "solid-app-router"
import { createClient } from "@supabase/supabase-js"
import { SupabaseProvider } from "solid-supabase"

// self
import App from "./app"

const supabase = createClient(
  String(import.meta.env.VITE_SUPABASE_URL),
  String(import.meta.env.VITE_SUPABASE_ANON_KEY)
)

async function woot() {
  const u = await supabase.auth.user()
  const s = await supabase.auth.session()

  console.log("U", u)
  console.log("S", s)
}

woot()

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
