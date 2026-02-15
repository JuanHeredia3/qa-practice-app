import { createBrowserRouter, Navigate } from "react-router";
import { PublicRoute } from "./PublicRoute";
import { LoginPage } from "@/pages/LoginPage";

export const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <PublicRoute children={<LoginPage />} />
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
])
