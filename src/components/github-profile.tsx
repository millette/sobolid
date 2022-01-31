// self
import { session } from "~/utils/session"
import { Dl, DtDd } from "~/components/dl"

// npm
import { Show } from "solid-js"

const hashedVersion =
  import.meta.env.MODE === "production"
    ? `v.${import.meta.env.VITE_HASHED_VERSION}`
    : import.meta.env.MODE

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

/*
const i = [
  {
    "id": "50741",
    "user_id": "0031e817-32a7-48ad-a0bc-c26096e48923",
    "identity_data": {
      "avatar_url": "https://avatars.githubusercontent.com/u/50741?v=4",
      "email": "robin@millette.info",
      "email_verified": true,
      "full_name": "Robin Millette",
      "iss": "https://api.github.com",
      "name": "Robin Millette",
      "preferred_username": "millette",
      "provider_id": "50741",
      "sub": "50741",
      "user_name": "millette"
    },
    "provider": "github",
    "last_sign_in_at": "2022-01-18T15:08:19.162122Z",
    "created_at": "2022-01-18T15:08:19.16216Z",
    "updated_at": "2022-01-18T15:08:19.16216Z"
  }
]

const x = providerIdentity({ identities: i }, "github")
console.log(x)
*/
