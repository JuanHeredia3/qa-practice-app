import { LoginPage } from "@/features/Login/LoginPage";
import { createBrowserRouter, Navigate } from "react-router";
import { PublicRoute } from "./PublicRoute";

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
