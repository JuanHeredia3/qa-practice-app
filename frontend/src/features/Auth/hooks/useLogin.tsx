import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface Props {
  login: (username: string, password: string) => Promise<void>
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
      toast.error('Usuario o contraseña incorrectos');
      throw error;
    }

    toast.success('Sesión iniciada',{
      duration: 5000,
      position: 'top-center',
    });
    navigation('/home');
  }
  
  return {
    handleLogin,
    setUsername,
    setPassword,
  }
}
