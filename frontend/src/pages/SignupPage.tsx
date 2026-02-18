import { SignupForm } from "@/features/Auth/components/SignupForm"

export const SignupPage = () => {
  return (
    <div className="flex flex-col items-center pb-5">
      <h2 className="text-3xl font-bold mb-15">
        Registrate
      </h2>

      <SignupForm />
    </div>
  )
}
