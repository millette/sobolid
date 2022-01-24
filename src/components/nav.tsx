// npm
import type { JSX } from "solid-js/jsx-runtime"
import { NavLink, useRoutes, useLocation } from "solid-app-router"
import { Portal } from "solid-js/web"
import { Show, createEffect, createResource } from "solid-js"
import { useSupabase } from "solid-supabase"

// self
import "./nav.css"
import { pathPrefix, routes } from "~/routes"
import LoginForm from "~/components/login-form"
import {
  // username,
  // setUsername,
  disabled,
  setDisabled,
  modal,
  openModal,
} from "~/utils/username-state"
import { state, clearState, setState } from "~/utils/session-state"

const modalEl = document.getElementById("modal")

function Nav(): JSX.Element {
  const supabase = useSupabase()

  const location = useLocation()
  const Route: JSX.Element = useRoutes(routes, pathPrefix)

  supabase.auth.onAuthStateChange((event, session) => {
    switch (event) {
      case "SIGNED_IN":
        console.log("SIGNED_IN")
        setState("session", session)
        setState("user", session.user)
        // setUsername(session.user.email)
        break

      case "SIGNED_IN":
        console.log("PASSWORD_RECOVERY")
        break

      default:
        console.log("onAuthStateChange-other-event", event)
    }
  })

  async function logout() {
    setDisabled(true)
    try {
      const { error } = await supabase.auth.signOut()
      setDisabled(false)
      if (error) {
        return
      }
      // setUsername("")
      clearState()
    } catch (e) {
      console.error("EEEEE", e)
      setDisabled(false)
    }
  }

  function loginModal() {
    openModal((o) => !o)
  }

  createEffect(() => {
    if (modal() && state?.session?.user?.email) openModal(false)
  })

  createEffect(() => {
    modalEl.style.display = modal() ? "block" : "none"
  })

  return (
    <>
      <nav class="bg-gray-200 text-gray-900 px-4">
        <ul class="flex items-center">
          <li class="py-2 px-4">
            <NavLink
              end
              href={`${pathPrefix}`}
              class="no-underline hover:underline"
            >
              Home
            </NavLink>
          </li>
          <li class="py-2 px-4">
            <NavLink
              href={`${pathPrefix}about`}
              class="no-underline hover:underline"
            >
              About
            </NavLink>
          </li>
          <li class="py-2 px-4">
            <NavLink
              href={`${pathPrefix}credits`}
              class="no-underline hover:underline"
            >
              Credits
            </NavLink>
          </li>
          <li class="py-2 px-4">
            <NavLink
              href={`${pathPrefix}error`}
              class="no-underline hover:underline"
            >
              Error
            </NavLink>
          </li>

          <li class="bg-red-300 flex items-center space-x-1 ml-auto">
            <Show when={!state?.session?.user?.email}>
              <button
                disabled={disabled()}
                onClick={loginModal}
                class="py-2 px-4"
              >
                Login
              </button>
            </Show>
            <Show when={state?.session?.user?.email}>
              <NavLink
                href={`${pathPrefix}profile`}
                class="no-underline hover:underline"
              >
                {state?.session?.user?.email}
              </NavLink>
              <button disabled={disabled()} onClick={logout} class="py-2 px-4">
                Logout
              </button>
            </Show>
          </li>

          <li class="text-sm flex items-center space-x-1 ml-auto">
            <label>
              URL:
              <input
                class="w-75px p-1 bg-white text-sm rounded-lg"
                type="text"
                readOnly
                value={location.pathname}
              />
            </label>
          </li>
        </ul>
      </nav>
      <main>
        <Route />

        <Portal mount={modalEl}>
          <LoginForm />
        </Portal>
      </main>
    </>
  )
}

export default Nav
