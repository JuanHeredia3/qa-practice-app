import type { User } from "@/data/user.data";
import userService from "@/features/Auth/services";
import { createContext, useState, type FC, type PropsWithChildren } from "react"

interface AuthContextProps {
  user: User | null
  login: (username: string, password: string) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await userService.loginUser({ username, password });
      setUser(response.data.user);
      localStorage.setItem('session', JSON.stringify({
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      }));
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Error inesperado al iniciar sesión";

      throw new Error(message);
    }

  }

  return (
    <AuthContext value={{
      user,
      login: handleLogin
    }}
    >{children}</AuthContext>
  )
}
