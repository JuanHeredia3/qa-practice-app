import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface Props {
  register: (username: string, password: string, email: string, fullName: string) => Promise<void>
}

export const useRegister = ({ register }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigation = useNavigate();

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      newErrors.username = "El usuario solo puede contener letras y números";
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Email inválido";
    }

    if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await register(username, password, email, fullName);
    } catch (error) {
      toast.error('Error inesperado al crear el nuevo usuario');
      throw error;
    }

    toast.success('Usuario creado',{
      duration: 5000,
      position: 'top-center',
    });
    navigation('/login');
  }
  
  return {
    errors,
    handleRegister,
    setUsername,
    setPassword,
    setEmail,
    setFullName
  }
}
