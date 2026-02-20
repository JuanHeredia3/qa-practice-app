import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import { ChartNoAxesCombined, Home, Settings } from "lucide-react"
import { Link } from "react-router"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white mb-8">QA PRACTICE APP</SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/" className="text-xl font-medium">
                  <Home className="w-4 h-4" />
                  Inicio
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/dashboards" className="text-xl font-medium">
                  <ChartNoAxesCombined className="w-4 h-4" />
                  Dashboards
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/configuracion" className="text-xl font-medium">
                  <Settings className="w-4 h-4" />
                  Configuración
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
