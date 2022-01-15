// npm
import { lazy } from "solid-js"
import type { RouteDefinition } from "solid-app-router"

// self
import Home from "./pages/home"
import AboutData from "./pages/about.data"

export const pathPrefix = import.meta.env.VITE_PATHPREFIX || "/"

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: lazy(() => import("./pages/about")),
    data: AboutData,
  },
  {
    path: "/credits",
    component: lazy(() => import("./pages/credits")),
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
]
