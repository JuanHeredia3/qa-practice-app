export const LoginForm = () => {
  const handleLogin = (formData: FormData) => {
    console.log('TODO');
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
        placeholder="test@test.com"
        required
        className="w-full p-2 rounded-md mb-2 text-black bg-white"
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
