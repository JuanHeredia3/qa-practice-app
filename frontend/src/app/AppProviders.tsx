import { AuthContextProvider } from "@/features/Login/context/AuthContext"
import type { FC, PropsWithChildren } from "react"

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  )
}
