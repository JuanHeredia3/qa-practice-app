import { LoginForm } from "@/features/Auth/components/LoginForm"

export const LoginPage = () => {
  return (
    <div className="flex flex-col items-center pb-5">
      <h1 className="text-3xl font-bold mb-15">
        Bienvenido a la QA practice app!
      </h1>

      <LoginForm />
    </div>
  )
}
