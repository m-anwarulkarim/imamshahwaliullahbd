import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const [menu, setMenu] = useState(false);
  const { dir } = useLanguage();
  return (
    <>
      <AdminGuard>
        <div dir={dir} className="flex h-screen bg-background overflow-hidden">
          <div className="hidden lg:block"><AdminSidebar /></div>
          {menu && <div className="fixed inset-0 z-50 flex bg-background/80 lg:hidden"><AdminSidebar onNavigate={() => setMenu(false)}/><Button variant="outline" size="icon" aria-label="Close" onClick={() => setMenu(false)} className="m-4"><X className="h-5 w-5"/></Button><div className="flex-1" onClick={() => setMenu(false)}/></div>}
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <DashboardHeader onMenu={() => setMenu(true)} />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </AdminGuard>
      <Toaster />
    </>
  );
}
