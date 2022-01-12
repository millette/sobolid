// npm
import { lazy } from "solid-js"
import type { RouteDefinition } from "solid-app-router"

// self
import Home from "./pages/home"
import AboutData from "./pages/about.data"

// const pathPrefix = "/sobolid"
export const pathPrefix = "/sobolid"

export const routes: RouteDefinition[] = [
  {
    path: `${pathPrefix}/`,
    component: Home,
  },
  {
    path: `${pathPrefix}/about`,
    component: lazy(() => import("./pages/about")),
    data: AboutData,
  },
  {
    path: `${pathPrefix}/credits`,
    component: lazy(() => import("./pages/credits")),
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
]
