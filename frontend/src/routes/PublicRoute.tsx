import { AuthContext } from "@/features/Login/context/AuthContext";
import { use, type FC, type PropsWithChildren } from "react"
import { Navigate } from "react-router";

export const PublicRoute: FC<PropsWithChildren> = ({ children }) => {
  const { user } = use(AuthContext);

  if (!user) return children
  
  return <Navigate to='/home'/>
}
