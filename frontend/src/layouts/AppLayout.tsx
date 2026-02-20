import { Outlet } from "react-router"

export const AppLayout = () => {
  return (
    <div className="bg-gradient">
      <Outlet />
    </div>
  )
}
