import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { UserHeader } from "./UserHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-4">
            <div className="flex items-center">
              <SidebarTrigger />
              <div className="ml-4">
                <h1 className="text-xl font-semibold">System Zarządzania Sportowcami</h1>
              </div>
            </div>
            <UserHeader />
          </header>
          
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}