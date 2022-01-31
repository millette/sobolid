// self
import { session } from "~/utils/session"
import GithubProfile from "~/components/github-profile"
import ago from "~/utils/ago"
import { Dl, DtDd } from "~/components/dl"

// npm
import { Show } from "solid-js"
import { Title } from "solid-meta"

const hashedVersion =
  import.meta.env.MODE === "production"
    ? `v.${import.meta.env.VITE_HASHED_VERSION}`
    : import.meta.env.MODE

//       <pre>{JSON.stringify(session, null, 2)}</pre>

function Profile() {
  return (
    <Show when={session.user} fallback="Must login">
      <Title>
        {session.user.email} profile ({hashedVersion})
      </Title>
      <h1 class="text-2xl font-bold">{session.user.email} profile</h1>

      <Dl>
        <DtDd dt="Membership" dd={ago(session.user.created_at)} />
        <DtDd dt="Logged in" dd={ago(session.user.last_sign_in_at)} />
      </Dl>

      <GithubProfile />
    </Show>
  )
}

export default Profile
