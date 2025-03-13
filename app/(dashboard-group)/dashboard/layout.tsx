"use client"

import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="sticky top-0 z-10 bg-white shadow-md w-full">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-white border-r shadow-md">
          <AppSidebar />
        </div>

        <main className="flex-1 overflow-auto p-4 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
