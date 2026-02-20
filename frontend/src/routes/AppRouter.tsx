import { createBrowserRouter, Navigate } from "react-router";
import { PublicRoute } from "./PublicRoute";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { PrivateRoute } from "./PrivateRoute";
import { HomePage } from "@/pages/HomePage";
import { AppLayout } from "@/layouts/AppLayout";

export const appRouter = createBrowserRouter([
  {
    path:'/login',
    element: <PublicRoute children={<LoginPage />} />
  },
  {
    path:'/signup',
    element: <PublicRoute children={<SignupPage />} />
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <PrivateRoute children={<HomePage />} />
      },
    ]
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
])
