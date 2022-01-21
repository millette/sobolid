// npm
import { createClient } from "@supabase/supabase-js"
// import { createStore } from "solid-js/store";

const supabaseClient = createClient(
  String(import.meta.env.VITE_SUPABASE_URL),
  String(import.meta.env.VITE_SUPABASE_ANON_KEY)
)

const auth = supabaseClient.auth

export { auth }
