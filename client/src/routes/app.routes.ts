import { lazy } from "react";

export const AppRoutes = [
  {
    path: "/",
    title: "Home page",
    description: "Home page",
    component: lazy(() => import("../pages/home"))
  },
  {
    path: "/sign-in",
    title: "Sign in",
    description: "Sign in page",
    component: lazy(() => import("../pages/sign-in"))
  },
  {
    path: "/sign-up",
    title: "Sign up",
    description: "Sign up page",
    component: lazy(() => import("../pages/sign-up"))
  },
  {
    path: "/activated",
    title: "Activated",
    description: "Activated page",
    component: lazy(() => import("../pages/activated"))
  }
];
