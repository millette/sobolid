// npm
import type { Component } from "solid-js"
import { NavLink, useRoutes, useLocation } from "solid-app-router"
import { MetaProvider, Title } from "solid-meta"

// self
import { routes } from "./routes"
import "./styles.css"

const App: Component = () => {
  const location = useLocation()
  const Route = useRoutes(routes)

  return (
    <MetaProvider>
      <Title>Title of page</Title>
      <nav class="bg-gray-200 text-gray-900 px-4">
        <ul class="flex items-center">
          <li class="py-2 px-4">
            <NavLink end href="/" class="no-underline hover:underline">
              Home
            </NavLink>
          </li>
          <li class="py-2 px-4">
            <NavLink href="/about" class="no-underline hover:underline">
              About
            </NavLink>
          </li>
          <li class="py-2 px-4">
            <NavLink href="/credits" class="no-underline hover:underline">
              Credits
            </NavLink>
          </li>
          <li class="py-2 px-4">
            <NavLink href="/error" class="no-underline hover:underline">
              Error
            </NavLink>
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
      </main>
    </MetaProvider>
  )
}

export default App
