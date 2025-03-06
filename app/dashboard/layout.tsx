"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-full">
      <SidebarProvider>
        <div className="flex flex-1 h-full overflow-hidden">

          <AppSidebar />

          <div className="flex-1 w-full flex flex-col">
            <div className="sticky top-0 z-10 bg-white">
              <Navbar />
              <div className="px-4 py-2">
                <SidebarTrigger />
              </div>
            </div>

            <main className="flex-1 overflow-auto p-4">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
