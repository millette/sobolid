// self
import { session } from "~/utils/session-state"

// npm
import { Show } from "solid-js"

function Profile() {
  return (
    <div>
      <Show when={session} fallback="Must login">
        <h1 class="text-2xl font-bold">Profile</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </Show>
    </div>
  )
}

export default Profile
