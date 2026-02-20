import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/shared/components/AppSidebar"
import { Outlet } from "react-router"

export const AppLayout = () => {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />

      <SidebarInset className="bg-gradient-to-br">
        <header className="flex h-14 items-center border-b px-4">
          <SidebarTrigger />
        </header>

        <main className="flex-1 p-6">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
