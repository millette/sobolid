// npm
import type { JSX } from "solid-js/jsx-runtime"
import { NavLink, useRoutes, useLocation } from "solid-app-router"
import { Portal } from "solid-js/web"
import { Show, createEffect } from "solid-js"
import { useSupabase } from "solid-supabase"

// self
import "~/components/nav.css"
import { pathPrefix, routes } from "~/routes"
import LoginForm from "~/components/login-form"
import PasswordResetForm from "~/components/password-reset-form"
import {
  disabled,
  setDisabled,
  modal,
  openModal,
  modalPR,
  openModalPR,
  session,
  clearSession,
  setSession,
} from "~/utils/session"

const modalLogin = document.getElementById("modal-login")
const modalPasswordReset = document.getElementById("modal-password-reset")

function Nav(): JSX.Element {
  const supabase = useSupabase()

  const location = useLocation()
  const Route: JSX.Element = useRoutes(routes, pathPrefix)

  supabase.auth.onAuthStateChange((event, session) => {
    switch (event) {
      case "SIGNED_IN":
        console.log("SIGNED_IN")
        setSession("user", session.user)
        break

      case "PASSWORD_RECOVERY":
        console.log("PASSWORD_RECOVERY")
        openModalPR(true)
        break

      case "SIGNED_OUT":
        console.log("SIGNED_OUT")
        clearSession()
        break

      case "USER_UPDATED":
        console.log("USER_UPDATED")
        setSession("user", session.user)
        break

      default:
        console.log("onAuthStateChange-other-event", event, session)
    }
  })

  async function logout() {
    setDisabled(true)
    try {
      const { error } = await supabase.auth.signOut()
      setDisabled(false)
      if (error) {
        console.error("logout", error)
      }
    } catch (e) {
      console.error("EEEEE", e)
      setDisabled(false)
    }
  }

  function loginModal() {
    openModal((o) => !o)
  }

  createEffect(() => {
    if (modal() && session?.user?.email) openModal(false)
  })

  createEffect(() => {
    modalLogin.style.display = modal() ? "block" : "none"
  })

  createEffect(() => {
    modalPasswordReset.style.display = modalPR() ? "block" : "none"
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
            <Show when={!session?.user?.email}>
              <button
                disabled={disabled()}
                onClick={loginModal}
                class="py-2 px-4"
              >
                Login
              </button>
            </Show>
            <Show when={session?.user?.email}>
              <NavLink
                href={`${pathPrefix}profile`}
                class="no-underline hover:underline"
              >
                {session?.user?.email}
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
        <Portal mount={modalLogin}>
          <LoginForm />
        </Portal>
        <Portal mount={modalPasswordReset}>
          <PasswordResetForm />
        </Portal>
      </main>
    </>
  )
}

export default Nav
