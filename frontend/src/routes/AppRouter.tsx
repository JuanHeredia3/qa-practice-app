import { createBrowserRouter, Navigate } from "react-router";
import { PublicRoute } from "./PublicRoute";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";

export const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <PublicRoute children={<LoginPage />} />
  },
  {
    path:'/signup',
    element: <PublicRoute children={<SignupPage />} />
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
])
