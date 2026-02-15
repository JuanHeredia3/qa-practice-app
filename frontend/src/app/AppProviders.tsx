import { AuthContextProvider } from "@/features/Auth/context/AuthContext"
import type { FC, PropsWithChildren } from "react"

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  )
}
