import { Users, Calendar, BarChart3, Brain, Target, Building2 } from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "CRM Sportowców", url: "/", icon: Users },
  { title: "Panel Klubu", url: "/club", icon: Building2 },
  { title: "Panel Sportowca", url: "/athlete-dashboard", icon: Target },
  { title: "Plany Treningowe", url: "/training", icon: Calendar },
  { title: "Analizator AI", url: "/analyzer", icon: BarChart3 },
  { title: "Analiza Ruchu", url: "/motion", icon: Brain },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar 
      className={`${isCollapsed ? "w-14" : "w-64"} bg-gradient-to-b from-background to-sport-accent border-border`}
      collapsible="icon"
    >
      <SidebarContent>
        <div className="p-4 border-b border-border">
          <h2 className={`font-bold text-lg ${isCollapsed ? "text-center" : ""}`}>
            {isCollapsed ? "SA" : "SportApp"}
          </h2>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground px-2 py-1 text-xs font-medium">
            {!isCollapsed && "Zarządzanie"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sport font-medium" 
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}