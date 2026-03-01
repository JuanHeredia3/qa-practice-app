import { createBrowserRouter, Navigate } from "react-router";
import { PublicRoute } from "./PublicRoute";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { PrivateRoute } from "./PrivateRoute";
import { HomePage } from "@/pages/HomePage";
import { AppLayout } from "@/layouts/AppLayout";
import { TrackerPage } from "@/pages/TrackerPage";

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
      {
        path: 'tracker/:id',
        element: <PrivateRoute children={<TrackerPage />} />
      },
    ]
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
])
