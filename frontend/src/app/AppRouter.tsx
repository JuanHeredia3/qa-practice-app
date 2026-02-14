import { LoginPage } from "@/features/Login/LoginPage";
import { createBrowserRouter, Navigate } from "react-router";

export const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <LoginPage />
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
])
