import { RouterProvider } from "react-router"
import { appRouter } from "../routes/AppRouter"

export const App = () => {
  return (
    <div className="bg-gradient">
      <RouterProvider router={appRouter}/>
    </div>
  )
}
