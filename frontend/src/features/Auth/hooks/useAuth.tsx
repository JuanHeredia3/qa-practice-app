import { use } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = use(AuthContext);
  
  return context
}
