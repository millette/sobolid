// self
import { session } from "~/utils/session"
import { Dl, DtDd } from "~/components/dl"

// npm
import { Show } from "solid-js"

function providerIdentity({ identities }, p) {
  return identities.find(({ provider }) => provider === p)?.identity_data
}

//       <pre>{JSON.stringify(gh, null, 2)}</pre>

function GithubProfile() {
  const gh = providerIdentity(session.user, "github")
  return (
    <Show when={gh}>
      <h2 class="text-xl font-bold">On GitHub</h2>

      <img class="float-left mr-4" src={gh.avatar_url} />

      <Dl>
        <DtDd dt="Name" dd={gh.full_name} />
        <DtDd dt="Username" dd={gh.preferred_username} />
      </Dl>
      <br class="clear-both" />
    </Show>
  )
}

export default GithubProfile
