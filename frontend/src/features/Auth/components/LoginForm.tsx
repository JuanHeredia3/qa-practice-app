import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { useLogin } from "../hooks/useLogin";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const { login } = useAuth();
  const { setUsername, setPassword, handleLogin } = useLogin({ login });
  const navigation = useNavigate();

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col justify-center w-[500px] rounded-b-3xl p-4 gap-3"
    >
      <label 
        htmlFor="email"
      >
        Email
      </label>
      <Input 
        type="text"
        name="email"
        id="email"
        placeholder="Usuario"
        required
        className="w-full p-2 rounded-md mb-2 text-black bg-white"
        onChange={(e) => setUsername(e.target.value)}
      />

      <label 
        htmlFor="password"
      >
        Contraseña
      </label>
      <Input 
        type="password"
        name="password"
        id="password"
        placeholder="Contraseña"
        required
        className="w-full p-2 rounded-md mb-2 text-black bg-white"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button 
        type="submit" 
        className="bg-indigo-500 hover:bg-purple-500 text-white p-2 rounded-md w-full"
      >Ingresar</Button>

      <div className="flex gap-3 justify-between items-center mt-10">
        <small className="font-thin">¿Aún no tenes cuenta?</small>
        <Button 
          type="submit" 
          className="bg-indigo-400 hover:bg-purple-400 text-white p-2 rounded-md w-[50%]"
          onClick={() => navigation("/signup")}
        >Registrarse</Button>
      </div>
    </form>
  )
}
