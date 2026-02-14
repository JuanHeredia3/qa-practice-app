import userService from "@/features/Login/services";
import { createContext, type FC, type PropsWithChildren } from "react"

interface AuthContextProps {
  login: (username: string, password: string) => void
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await userService.loginUser({ username, password });
      localStorage.setItem('session', JSON.stringify(response.data));
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Error inesperado al iniciar sesión";

      throw new Error(message);
    }

  }

  return (
    <AuthContext value={{
      login: handleLogin
    }}
    >{children}</AuthContext>
  )
}
