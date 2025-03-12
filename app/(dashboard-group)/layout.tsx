"use client";

import MainSidebar from "../../components/MainSidebar";
import { Card } from "../../components/ui/card";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f1f5f9] shadow-md h-1/2 flex flex-row">
      <MainSidebar />

      <div className="flex-1 p-1 bg-[#f1f5f9]">
        <main className="flex-1 p-1">{children}</main>
      </div>
    </div>
  );
}
