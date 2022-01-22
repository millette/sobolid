// self
import { state } from "~/utils/session-state"

// npm
import { Show } from "solid-js"

function Profile() {
  return (
    <div>
      <Show when={state.session} fallback="Must login">
        <h1 class="text-2xl font-bold">Profile</h1>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </Show>
    </div>
  )
}

export default Profile
