// npm
import { createClient } from "@supabase/supabase-js"

const supabaseClient = createClient(
  String(import.meta.env.VITE_SUPABASE_URL),
  String(import.meta.env.VITE_SUPABASE_ANON_KEY)
)

const auth = supabaseClient.auth

export { auth }
