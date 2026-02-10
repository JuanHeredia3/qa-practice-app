import { LoginForm } from "./components/LoginForm"

export const LoginPage = () => {
  return (
    <div className="flex flex-col bg-gradient pb-5">
      <h1 className="text-3xl font-bold">
        Bienvenido a la QA practice app!
      </h1>

      <LoginForm />
    </div>
  )
}
