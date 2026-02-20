import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../hooks/useAuth";
import { useRegister } from "../hooks/useRegister";

export const SignupForm = () => {
  const { register } = useAuth();
  const { errors, setUsername, setPassword, setFullName, setEmail, handleRegister } = useRegister({ register });

  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col justify-center w-[500px] rounded-b-3xl p-4 gap-3"
    >
      <label 
        htmlFor="fullname"
      >
        Nombre
      </label>
      <Input 
        type="text"
        name="fullname"
        id="fullname"
        placeholder="Nombre"
        required
        className="w-full p-2 rounded-md mb-2 text-black bg-white"
        onChange={(e) => setFullName(e.target.value)}
      />

      <label 
        htmlFor="email"
      >
        Email
      </label>
      <Input 
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        required
        className="w-full p-2 rounded-md mb-2 text-black bg-white"
        onChange={(e) => setEmail(e.target.value)}
      />

      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email}</p>
      )}

      <label 
        htmlFor="username"
      >
        Usuario
      </label>
      <Input 
        type="username"
        name="username"
        id="username"
        placeholder="Usuario"
        required
        className="w-full p-2 rounded-md mb-2 text-black bg-white"
        onChange={(e) => setUsername(e.target.value)}
      />

      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username}</p>
      )}

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

      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}

      <Button 
        type="submit" 
        className="bg-indigo-500 hover:bg-purple-500 text-white p-2 rounded-md w-full"
      >Registrate</Button>
    </form>
  )
}
