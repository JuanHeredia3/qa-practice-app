import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface Props {
  login: (username: string, password: string) => void
}

export const useLogin = ({ login }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(username, password);
    } catch (error) {
      toast('Usuario o contraseña incorrectos',{
        description: 'Intente nuevamente',
        duration: 5000,
        position: 'top-center',
        action: {
          label: 'Cerrar',
          onClick: () => toast.dismiss(),
        }
      });
    }

    navigation('/home');
  }
  
  return {
    handleLogin,
    setUsername,
    setPassword,
  }
}
