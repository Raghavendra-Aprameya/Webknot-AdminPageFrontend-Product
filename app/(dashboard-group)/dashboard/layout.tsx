"use client";

import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/Navbar";
import { Card } from "../../../components/ui/card";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Card className="bg-white shadow-md border border-gray-200 rounded-xl m-2">
      <div className="flex h-screen w-full">
        <AppSidebar />

        <div className="flex flex-1 flex-col">
          <div className="sticky top-0 z-10 bg-white shadow-md">
            <Navbar />
            <div className="px-4 py-2">
            </div>
          </div>

          <main className="flex-1 overflow-auto p-4 bg-gray-100">
            {children}
          </main>
        </div>
      </div>
    </Card>
  );
}