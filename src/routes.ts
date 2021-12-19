import { lazy } from "solid-js"
import type { RouteDefinition } from "solid-app-router"

import Home from "./pages/home"
import AboutData from "./pages/about.data"
import CreditsData from "./pages/credits.data"

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
    data: CreditsData,
  },
  {
    path: "/mix",
    component: lazy(() => import("./pages/mix")),
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
]
