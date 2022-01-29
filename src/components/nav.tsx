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
import RegisterForm from "~/components/register-form"
import PasswordResetForm from "~/components/password-reset-form"
import {
  disabled,
  setDisabled,
  modal,
  openModal,
  modalRegister,
  openModalRegister,
  modalPR,
  openModalPR,
  session,
  clearSession,
  setSession,
} from "~/utils/session"
import {
  ModalMessage,
  modalMessage,
  setModalMessage,
} from "~/components/modal-message"

const modalMessageEl = document.getElementById("modal-message")
const modalLoginEl = document.getElementById("modal-login")
const modalPasswordResetEl = document.getElementById("modal-password-reset")
const modalRegisterEl = document.getElementById("modal-register")

function Nav(): JSX.Element {
  const supabase = useSupabase()

  const location = useLocation()
  const Route: JSX.Element = useRoutes(routes, pathPrefix)

  supabase.auth.onAuthStateChange((event, session) => {
    switch (event) {
      case "SIGNED_IN":
        setSession("user", session.user)
        break

      case "PASSWORD_RECOVERY":
        openModalPR(true)
        break

      case "SIGNED_OUT":
        clearSession()
        break

      case "USER_UPDATED":
        setSession("user", session.user)
        break

      default:
        console.log("onAuthStateChange", event, session)
    }
  })

  async function logout() {
    setDisabled(true)
    try {
      const { error } = await supabase.auth.signOut()
      setDisabled(false)
      if (error) {
        setModalMessage(error.message)
      }
    } catch (e) {
      setModalMessage(e)
      setDisabled(false)
    }
  }

  function registerModal() {
    openModalRegister((o) => !o)
    openModal(false)
  }

  function loginModal() {
    openModal((o) => !o)
    openModalRegister(false)
  }

  createEffect(() => {
    const msg = modalMessage()
    if (msg) {
      modalMessageEl.style.display = "block"
      const el = modalMessageEl.querySelector(".error-message")

      el.innerHTML = msg
      setTimeout(() => {
        setModalMessage("")
      }, 5000)
    } else {
      modalMessageEl.style.display = "none"
    }
  })

  createEffect(() => {
    if (modal() && session?.user?.email) openModal(false)
  })

  createEffect(() => {
    modalLoginEl.style.display = modal() ? "block" : "none"
  })

  createEffect(() => {
    modalPasswordResetEl.style.display = modalPR() ? "block" : "none"
  })

  createEffect(() => {
    modalRegisterEl.style.display = modalRegister() ? "block" : "none"
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

          <li class="flex items-center space-x-1 ml-auto">
            <Show when={!session?.user?.email}>
              <button
                disabled={disabled()}
                onClick={loginModal}
                class="bg-red-300 py-2 px-4"
              >
                Login
              </button>

              <button
                disabled={disabled()}
                onClick={registerModal}
                class="bg-red-300 py-2 px-4"
              >
                Register
              </button>
            </Show>
            <Show when={session?.user?.email}>
              <NavLink
                href={`${pathPrefix}profile`}
                class="bg-red-300 py-2 px-4 no-underline hover:underline"
              >
                {session?.user?.email}
              </NavLink>
              <button
                disabled={disabled()}
                onClick={logout}
                class="bg-red-300 py-2 px-4"
              >
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

        <Portal mount={modalMessageEl}>
          <ModalMessage />
        </Portal>

        <Portal mount={modalLoginEl}>
          <LoginForm />
        </Portal>
        <Portal mount={modalPasswordResetEl}>
          <PasswordResetForm />
        </Portal>
        <Portal mount={modalRegisterEl}>
          <RegisterForm />
        </Portal>
      </main>
    </>
  )
}

export default Nav
