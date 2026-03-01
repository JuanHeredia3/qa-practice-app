import { RouterProvider } from "react-router"
import { appRouter } from "../routes/AppRouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <div className="bg-gradient">
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />

      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
    </div>
  )
}
