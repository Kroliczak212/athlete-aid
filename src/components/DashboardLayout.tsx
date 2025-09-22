import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { UserHeader } from './UserHeader';
import { Outlet } from 'react-router-dom';
import { useMe } from '@/api/queries/auth/useMe';

export function DashboardLayout() {
  useMe();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 backdrop-blur bg-background/60 border-b">
            <div className="flex items-center gap-2 px-4 py-2">
              <SidebarTrigger />
              <div className="ml-auto">
                <UserHeader />
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
