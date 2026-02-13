import { useState } from "react";
import userService from "../services";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await userService.loginUser({ username: username, password: password });
    console.log(response);
  }

  return (
    <form
      action={handleLogin}
      className="flex flex-col justify-center w-[500px] rounded-b-3xl p-4 gap-3"
    >
      <label 
        htmlFor="email"
      >
        Email
      </label>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="username"
        required
        className="w-full p-2 rounded-md mb-2 text-black bg-white"
        onChange={(e) => setUsername(e.target.value)}
      />

      <label 
        htmlFor="password"
      >
        Contraseña
      </label>
      <input
        type="text"
        name="password"
        id="password"
        placeholder="Contraseña"
        required
        className="w-full p-2 rounded-md mb-2 text-black bg-white"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        disabled={false}
        className="bg-purple-500 text-white p-2 rounded-md w-full"
      >
        Enviar
      </button>
    </form>
  )
}
