// npm
import { lazy } from "solid-js"
import type { RouteDefinition } from "solid-app-router"

// self
import Home from "~/pages/home"
import AboutData from "~/pages/about.data"

// import.meta.env.VITE_... supported by VITE frontend tooling
export const pathPrefix = String(import.meta.env.VITE_PATHPREFIX || "/")
export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: lazy(() => import("~/pages/about")),
    data: AboutData,
  },
  {
    path: "/credits",
    component: lazy(() => import("~/pages/credits")),
  },
  {
    path: "/profile",
    component: lazy(() => import("~/pages/profile")),
  },
  {
    path: "**",
    component: lazy(() => import("~/errors/404")),
  },
]
