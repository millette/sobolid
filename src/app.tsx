// npm
import type { JSX } from "solid-js/jsx-runtime"
import { NavLink, useRoutes, useLocation } from "solid-app-router"
import { MetaProvider, Title } from "solid-meta"

// self
import { pathPrefix, routes } from "./routes"
import "./styles.css"

function App(): JSX.Element {
  const location = useLocation()
  const Route: JSX.Element = useRoutes(routes)

  return (
    <MetaProvider>
      <Title>Title of page</Title>
      <nav class="bg-gray-200 text-gray-900 px-4">
        <ul class="flex items-center">
          <li class="py-2 px-4">
            <NavLink
              end
              href={`${pathPrefix}/`}
              class="no-underline hover:underline"
            >
              Home
            </NavLink>
          </li>
          <li class="py-2 px-4">
            <NavLink
              href={`${pathPrefix}/about`}
              class="no-underline hover:underline"
            >
              About
            </NavLink>
          </li>
          <li class="py-2 px-4">
            <NavLink
              href={`${pathPrefix}/credits`}
              class="no-underline hover:underline"
            >
              Credits
            </NavLink>
          </li>
          <li class="py-2 px-4">
            <NavLink
              href={`${pathPrefix}/error`}
              class="no-underline hover:underline"
            >
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
