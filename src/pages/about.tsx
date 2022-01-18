// npm
import { Suspense } from "solid-js"
import { useData } from "solid-app-router"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://nozbgzbnquvaxdgcbcgs.supabase.co"
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

console.log(
  "import.meta.env.VITE_SUPABASE_KEY",
  import.meta.env.VITE_SUPABASE_KEY
)
// console.log("supabase", supabase)

/*
const { user, session, error } = await supabase.auth.signIn({
  email: 'example@email.com',
  password: 'example-password',
})

console.log("supabase", user, session, error)
*/

const user = supabase.auth.user()
const session = supabase.auth.session()
console.log("supabase", user, session)

async function signInWithGithub() {
  const { user, session, error } = await supabase.auth.signIn({
    email: "robin@millette.info",
    // provider: 'github',
  })

  console.log("supabase-github", error, user, session)
}
export default function About() {
  const data = useData()

  return (
    <section class="bg-pink-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">About</h1>

      <p class="mt-4">A page all about this website.</p>

      <button
        class="p-3 m-4 bg-red-600 text-white-600"
        onClick={signInWithGithub}
      >
        Login (github)
      </button>

      <Suspense>
        <pre class="mt-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </Suspense>
    </section>
  )
}
